package com.plotkovid.app.utils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.DecimalFormat;
import java.time.Duration;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.XML;
import org.springframework.beans.factory.annotation.Autowired;
import org.w3c.dom.Document;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

import org.w3c.dom.Element;

public class Utils {

	@Autowired
	private   CityRepo cityrepo;
	
	
	public static void main(String[] args) throws SAXException, IOException, ParserConfigurationException {
		
		String xmlfilePath[] = {"/home/hasura/Documents/PLOTKOVID/plotKovid-backend/uploadDir/abc/history-2020-03-05.kml"};
		List<Cords> cordsList = new ArrayList<Cords>();
		long LockdownInSecs =0l;
		long TravelHours =0l;
		List<String> Stays = new ArrayList<String>();
		User user = new User();
		
		// Iterate through files 
		
		for(String file : xmlfilePath) {
			JSONObject root = parseXML(file);
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
					if (Data.get("name").equals("Distance")) {
						int value = Integer.parseInt(Data.get("value").toString());
						// TimeSpan
						JSONObject TimeSpan = (JSONObject) placemark.get("TimeSpan");
						String endTime = TimeSpan.getString("end");
						String beginTime = TimeSpan.getString("begin");
						DateTimeFormatter dtf = DateTimeFormatter.ISO_DATE_TIME;
						ZonedDateTime zdt_StartTime = ZonedDateTime.parse(beginTime, dtf);
						ZonedDateTime zdt_EndTime = ZonedDateTime.parse(endTime, dtf);
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
							 LockdownInSecs = timeDiff_Seconds+LockdownInSecs;
							 
							// Stays
						 
							 String address = getStateCity(placemark.get("address").toString());
							 Stays.add(address);
							 
							 
						} else {

							 TravelHours = timeDiff_Seconds+TravelHours;
							 
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
		//END
		
		
		 
		System.out.println("Total lockdown ");
		user.setCords(cordsList);
		
        long totalMinutes = LockdownInSecs / 60;
	    long hours = totalMinutes / 60;
	    user.setLockdownhours(hours);
	    
	    
	    long totalTravelMinutes = TravelHours / 60;
	    long Travelhours = totalTravelMinutes / 60;
	    user.setTravelhours(Travelhours);
	    System.out.println("Travel hrs" +Travelhours);
	    
	   List<String> StaysUnique = new ArrayList<String>(new HashSet<String>(Stays));
	    user.setStays(StaysUnique);
	      
	     System.out.println(user.toString());
	      System.out.println(user.getStays().size());// 9
	     
		 //System.out.println(placeAPI());
		 
 
	}
	
	public static String getStateCity(String address){
		///"16/251 Panagal Rd Balaji Colony, Panagal, Srikalahasti, Andhra Pradesh 517640"
		try {
			String addressSplits[]   = address.split("\\,");
			int length = addressSplits.length;
			String State_Pincode = addressSplits[length-1].trim();
			
			String city =addressSplits[length-2].trim();
			return city+","+State_Pincode;
		}catch(Exception e) {
			return "NoCity,NoState";
		}
		
		 
	}
	
	
	
// 
//	public static String placeAPI(long lat, long lng)  {
//	 
//	  String S_lat = String.valueOf(lat);
//	  String S_lng = String.valueOf(lng);
//	  
//	  
//		OkHttpClient client = new OkHttpClient();
//
//		Request request = new Request.Builder()
//		  .url("https://revgeocode.search.hereapi.com/v1/revgeocode?at="+S_lat+"%2C"+S_lng+"&lang=en-US&apiKey=jx50FFqTJjbPl3Ng3fyP7HGqSU6esUK2Y_jVQ83Lgrs")
//		  .get()
//		   
//		  .build();
//		  
//
//		try {
//			Response response = client.newCall(request).execute();
//			 String jsonData = response.body().string();
//			    JSONObject Jobject = new JSONObject(jsonData);
//			    //items
//			    JSONArray ExtendedData = (JSONArray) Jobject.get("items");
//			    JSONObject obj = (JSONObject) ExtendedData.get(0);
//			    JSONObject addr = (JSONObject) obj.get("address");
//			    
//			    return addr.getString("city");
//			    
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//			return "notfound";
//		}
//	}

	static long zonedDateTimeDifference(ZonedDateTime d1, ZonedDateTime d2, ChronoUnit unit) {
		return unit.between(d1, d2);
	}

	public static JSONObject parseXML(String file) throws IOException {
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
}
