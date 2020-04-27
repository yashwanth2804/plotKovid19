package com.plotkovid.app.controller;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.imageio.ImageIO;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.XML;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;

import com.plotkovid.app.utils.City;
import com.plotkovid.app.utils.CityRepo;
import com.plotkovid.app.utils.Connections;
import com.plotkovid.app.utils.ConnectionsRepo;
import com.plotkovid.app.utils.Cords;
import com.plotkovid.app.utils.IntersectionLogic;
import com.plotkovid.app.utils.Intersections;
import com.plotkovid.app.utils.PathsCords;
import com.plotkovid.app.utils.TravelDatesHistory;
import com.plotkovid.app.utils.TravelDatesHistoryRepo;
import com.plotkovid.app.utils.UploadFileResponse;
import com.plotkovid.app.utils.User;
import com.plotkovid.app.utils.UserCordsList;
import com.plotkovid.app.utils.UserRepo;

import twitter4j.Status;
import twitter4j.Twitter;
import twitter4j.TwitterException;
import twitter4j.TwitterFactory;

import org.w3c.dom.Node;
import org.w3c.dom.Element;

@RestController

@CrossOrigin
@RequestMapping("/app")
public class Controller {

	@Autowired
	private CityRepo cityrepo;

	@Autowired
	private UserRepo userrepo;
	
	@Autowired
	private TravelDatesHistoryRepo travelhistoryrepo;
	
	@Autowired
	private IntersectionLogic il;
	
	@Autowired
	private ConnectionsRepo connrepo;

	public static final String uploadDir = System.getProperty("user.dir") + "/uploadDir/";

	@RequestMapping(value = "/uploadFile1", method = RequestMethod.POST)
	public ResponseEntity<Integer> uploadFile(@RequestParam("file") MultipartFile[] uploadedFiles,
			@RequestParam("id") String id) throws InterruptedException, IllegalStateException, IOException {

		User user = userrepo.findById(id).get();

		String UserDir = uploadDir + "/" + user.getUsername().trim() + "/";
		new File(UserDir).mkdir();

		for (MultipartFile f : uploadedFiles) {

			System.out.println("Uploading File ......." + f.getName() + " " + f.getOriginalFilename());
			File file = new File(UserDir + f.getOriginalFilename());
			f.transferTo(file);
		}

		return new ResponseEntity<Integer>(200, HttpStatus.OK);
	}

	 


	private void tweetStatus(User user) throws TwitterException {
		String city = user.getCity();
		String gender = (user.getGender().equals("male")) ? "his": "her";
		
		List<String> places = user.getStays().stream().limit(8).map(f -> f.split("\\,")[0])
				.collect(Collectors.toList());
		String Places = String.join(",", places);
		
		places.forEach(f -> System.out.println(f));
		TwitterFactory tf = new TwitterFactory( );
		Twitter twitter = tf.getInstance();
		String Text = "New case reported by victim living in "+city+","+gender+" travel history includes "+Places+" locations";
		System.out.println(Text);
		System.out.println(Text.length()); 
		Status status = twitter.updateStatus(Text);
		System.out.println("Successfully updated the status to [" + status.getText() + "].");
	}
	@GetMapping(value = "/analyze")
	public User analyzeMyData(@RequestParam("id") String id) throws IOException {
		User user = userrepo.findById(id).get();

		 
		User userWithCords = analyzeKMLFiles(user);
		User userObjSaved  = userrepo.save(userWithCords);
		System.out.println("User daved obj"+userObjSaved.toString());
		System.out.println("userwithcords"+userWithCords.toString());
	 
		List<Intersections> LOI =  il.getIntersectionsForUser(userWithCords);
		System.out.println("Total interc conn "+LOI.size());
		List<String> usersList = new ArrayList<String>();
		
		
		for(Intersections i : LOI)
		{	if(!user.getUsername().equals(i.getUser()))
			usersList.add(i.getUser());
			}
		
		System.out.println(Arrays.asList(usersList));
		
		Connections userconnections = connrepo.findByUser(user.getUsername());
		
		if(userconnections == null) {
			Connections userconnectionsObj = new Connections();
			userconnectionsObj.setUser(user.getUsername());
			
			userconnectionsObj.setConnectedusers(usersList);
			 connrepo.save(userconnectionsObj);
		}else {
		  usersList.addAll(userconnections.getConnectedusers());
		  List<String> usersListUnique = new ArrayList<String>(new HashSet<String>(usersList));
		   userconnections.setConnectedusers(usersListUnique);
		   connrepo.save(userconnections);
			
		}
		
		// Publish a tweet
		
		try {
			if(user.getHealthstatus().equals("victim"))
			tweetStatus(user);
		} catch (TwitterException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		return userWithCords;
	}
 
 

	private User analyzeKMLFiles( User user) throws IOException {

		String UserDir = uploadDir + "/" + user.getUsername().trim() + "/";
		new File(UserDir).mkdir();
		User userCords = generateCords(UserDir,user.isIsnormal());

		List<String> StaysUnique = new ArrayList<String>(new HashSet<String>(userCords.getStays()));
		user.setStays(StaysUnique);
		user.setCords(userCords.getCords());
		user.setTravelhours(userCords.getTravelhours());
		user.setTraveldistance(userCords.getTraveldistance());
		 
		user.setLockdownhours(userCords.getTraveldistance());
		
		for (String addr : StaysUnique) {
			
			if(!addr.equals(null) && !addr.equals("") && addr != null ) {
			City citys = cityrepo.findByAddress(addr);
			City c = new City();
			if (citys == null) {

				c.setAddress(addr);
				c.setCases(1);
				System.out.println(c.toString());
				 cityrepo.save(c);
			} else {
				citys.setCases(citys.getCases() + 1);
				 cityrepo.save(c);
				System.out.println(c.toString());
			}
			}
		}
		return user;
	}

	public User generateCords( String UserDir,boolean isNormal) throws IOException {
		
		File folder = new File(UserDir);
		File[] listOfFiles = folder.listFiles();
		
		List<Cords> cordsList = new ArrayList<Cords>();
		long LockdownInSecs = 0l;
		long TravelHours = 0l;
		int TravelDistance = 0;
		List<Instant> TravelDates  = new ArrayList<Instant>();

		List<String> Stays = new ArrayList<String>();

		User user = new User();
		for (File file : listOfFiles) {
 

			// LOGIC
			JSONObject root = parseXMLFile(file);
			///// TEST 1
			JSONObject kml = (JSONObject) root.get("kml");
			JSONObject Document = (JSONObject) kml.get("Document");

			JSONArray PlacemarkList = (JSONArray) Document.get("Placemark");

			for (Object placemarkObj : PlacemarkList) {

				JSONObject placemark = (JSONObject) placemarkObj;
				// ExtendedData
				JSONObject ExtendedData = (JSONObject) placemark.get("ExtendedData");
				// Data
				JSONArray DataList = (JSONArray) ExtendedData.get("Data");
				for (Object dataObj : DataList) {
					JSONObject Data = (JSONObject) dataObj;
					
					// TimeSpan
					JSONObject TimeSpan = (JSONObject) placemark.get("TimeSpan");
					String endTime = TimeSpan.getString("end");
					String beginTime = TimeSpan.getString("begin");
					DateTimeFormatter dtf = DateTimeFormatter.ISO_DATE_TIME;
					ZonedDateTime zdt_StartTime = ZonedDateTime.parse(beginTime, dtf);
					ZonedDateTime zdt_EndTime = ZonedDateTime.parse(endTime, dtf);
					
					if (Data.get("name").equals("Distance")) {
						int value = Integer.parseInt(Data.get("value").toString());
						
						
						long timeDiff_Seconds = zonedDateTimeDifference(zdt_StartTime, zdt_EndTime, ChronoUnit.SECONDS);
						// System.out.println("=========== Start time END time============");
						// System.out.println(zdt_StartTime.toLocalDateTime() + " " +
						// zdt_EndTime.toLocalDateTime());
						if (value == 0) {

							JSONObject Point = (JSONObject) placemark.get("Point");
							// coordinates
							String coordinates = Point.get("coordinates").toString();
							Double lat = Double.parseDouble(coordinates.split("\\,")[1]);
							Double lng = Double.parseDouble(coordinates.split("\\,")[0]);

							Cords cords = new Cords();
							cords.setLat(lat);
							cords.setLng(lng);

							cords.setStarttime(zdt_StartTime.toInstant());
							cords.setEndtime(zdt_EndTime.toInstant());

							cordsList.add(cords);
							LockdownInSecs = timeDiff_Seconds + LockdownInSecs;

							// Stays

							String address = getStateCity(placemark.get("address").toString());
							if (!address.equalsIgnoreCase("Error")) {
								Stays.add(address);
							}

						} else {
							
							//beginTime
						  Instant beginTime_Instant  = Instant.parse( beginTime )
						       .truncatedTo( ChronoUnit.DAYS )
						        ;
						  	//endTime
						  Instant endTime_Instant  = Instant.parse( endTime )
							       .truncatedTo( ChronoUnit.DAYS )
							        ;
						  TravelDates.add(beginTime_Instant);
						  TravelDates.add(endTime_Instant);
						  
						  
						  
							TravelDistance = value + TravelDistance;

							TravelHours = timeDiff_Seconds + TravelHours;

							JSONObject LineString = (JSONObject) placemark.get("LineString");
							// coordinates
							String coordinates = LineString.get("coordinates").toString();

							String coordinatesList[] = coordinates.split("\\s+");

							List<String> coordinatesArray = new ArrayList<String>(Arrays.asList(coordinatesList));

							if (coordinatesArray.get(0).equals(coordinatesArray.get(1))) {
								coordinatesArray.remove(0);
							}

							long timeInterval = timeDiff_Seconds / (coordinatesArray.size() - 1);
							int index = 0;
							for (String cordinates : coordinatesArray) {
								Double lat = Double.parseDouble(cordinates.split("\\,")[1]);
								Double lng = Double.parseDouble(cordinates.split("\\,")[0]);
								Cords cords = new Cords();
								if (index != 0) {

									zdt_StartTime = zdt_StartTime.plusSeconds(timeInterval);

								}

								cords.setLat(lat);
								cords.setLng(lng);
								cords.setStarttime(zdt_StartTime.toInstant());
								cords.setEndtime(zdt_StartTime.toInstant());

								cordsList.add(cords);
								index = index + 1;
							}

						}

					}
				}

			} 

		} 
		List<Instant> TravelDatesUnique = new ArrayList<Instant>(new HashSet<Instant>(TravelDates));
		 
		for(Instant t : TravelDatesUnique) {
			TravelDatesHistory travelData = travelhistoryrepo.findByDate(t);
			if(travelData == null) {
				System.out.println("Date not found");
				TravelDatesHistory travelObj = new TravelDatesHistory();
				travelObj.setDate(t);
				if(isNormal)
					travelObj.setNormalcount(1);
				else
					travelObj.setVictimscount(1);
				
				System.out.println(travelObj.toString());
				travelhistoryrepo.save(travelObj);
				
				
			}else {
				System.out.println("Date   found");
				 
				if(isNormal)
				travelData.setNormalcount(travelData.getNormalcount()+1);
				else
				travelData.setVictimscount(travelData.getVictimscount()+1);
				  
				travelhistoryrepo.save(travelData);
				 
			}
		}
		
		cordsList.sort((Cords c1, Cords c2) -> c1.getStarttime().compareTo(c2.getStarttime()));

		user.setCords(cordsList);
		user.setStays(Stays);
		long totalTravelMinutes = TravelHours / 60;
		long Travelhours = totalTravelMinutes / 60;
		user.setTravelhours(Travelhours);
		user.setTraveldistance(TravelDistance / 1000);
		long totalMinutes = LockdownInSecs / 60;
		long hours = totalMinutes / 60;
		user.setLockdownhours(hours);

		return user;
	}
	 
	 
	private UserCordsList generateCordsList(User user) {

		UserCordsList usrcordsList = new UserCordsList();
		usrcordsList.setUsername(user.getUsername());

		List<double[]> cordslist = user.getCords().stream()

				.map(f -> new double[] { f.getLat(), f.getLng() }).collect(Collectors.toList());

		usrcordsList.setCordsList(cordslist);
		return usrcordsList;
	}  
	private boolean checkFileTypes(MultipartFile[] uploadedFiles) {
		boolean isKml = true;
		for (MultipartFile f : uploadedFiles) {

		 
			if (!f.getContentType().equalsIgnoreCase("application/vnd.google-earth.kml+xml"))
				isKml = false;

		}

		return isKml;
	}

	public long zonedDateTimeDifference(ZonedDateTime d1, ZonedDateTime d2, ChronoUnit unit) {
		return unit.between(d1, d2);
	}

	public JSONObject parseXML(String file) throws IOException {
		String content = new String(Files.readAllBytes(Paths.get(file)));
		// TODO Auto-generated method stub
		try {
			JSONObject xmlJSONObj = XML.toJSONObject(content);

			return xmlJSONObj;
		} catch (JSONException je) {
			System.out.println(je.toString());
			return new JSONObject();
		}
	}

	public JSONObject parseXMLFile(File file) throws IOException {
		String content = new String(Files.readAllBytes(file.toPath()));
		 
		try {
			JSONObject xmlJSONObj = XML.toJSONObject(content);

			return xmlJSONObj;
		} catch (JSONException je) {
			System.out.println(je.toString());
			return new JSONObject();
		}
	}

	public String getStateCity(String address) {
		 
		try {
			String addressSplits[] = address.split("\\,");
			int length = addressSplits.length;
			String State_Pincode = addressSplits[length - 1].trim();

			String city = addressSplits[length - 2].trim();
			return city + "," + State_Pincode;
		} catch (Exception e) {
			System.out.println(address);
			// e.printStackTrace();
			return "Error";
		}

	}

}
