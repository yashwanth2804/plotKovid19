package com.plotkovid.app.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.plotkovid.app.utils.City;
import com.plotkovid.app.utils.CityRepo;
import com.plotkovid.app.utils.Connections;
import com.plotkovid.app.utils.ConnectionsRepo;
import com.plotkovid.app.utils.TravelDatesHistory;
import com.plotkovid.app.utils.TravelDatesHistoryRepo;
import com.plotkovid.app.utils.User;
import com.plotkovid.app.utils.UserRepo;
import com.plotkovid.app.utils.Cords;


@RestController

@CrossOrigin
@RequestMapping("/app")
public class StatsController {
 


	@Autowired
	private TravelDatesHistoryRepo travelhistoryrepo;
	

	@Autowired
	private ConnectionsRepo connrepo;
	
	@Autowired
	private UserRepo userrepo;
	
	@RequestMapping(value = "/getTravelHistory", method = RequestMethod.GET)
	public List<TravelDatesHistory> getTopPlaces() {
		
		
		List<TravelDatesHistory> top30  =  travelhistoryrepo.findTop30ByOrderByDateDesc();
		 
 
		return top30;
	}
	
	@RequestMapping(value = "/getConnections", method = RequestMethod.GET)
	public List<Connections> getConnections() {
		
		
		List<Connections> Allconnections  =  connrepo.findAll();
		 
 
		return Allconnections;
	}
	
	@RequestMapping(value = "/getTop", method = RequestMethod.GET)
	public List<User> getTop(@RequestParam("type") String type) {
		
		System.out.println(type);
		if(type.equals("localdown_hr")) {
			List<User> user = userrepo.findTop10ByOrderByLockdownhoursDesc(); 
			List<User> user_withoutpass = user.stream().map(f -> {f.setPassword("");  f.setCords(new ArrayList<Cords>()); return f;})
					.collect(Collectors 
                            .toCollection(ArrayList::new));
			return  user_withoutpass;
			 
		}else if(type.equals("travel_dst")) {
			List<User> user = userrepo.findTop10ByOrderByTraveldistanceDesc();
			List<User> user_withoutpass = user.stream().map(f -> {f.setPassword(""); 
			 
			f.setCords(new ArrayList<Cords>()); return f;})
					.collect(Collectors 
                            .toCollection(ArrayList::new));
			return  user_withoutpass;
			
		}else if(type.equals("travel_hr")) {
			List<User> user = userrepo.findTop10ByOrderByTravelhoursDesc();

			List<User> user_withoutpass = user.stream().map(f -> {f.setPassword(""); f.setCords(new ArrayList<Cords>()); return f;})
					.collect(Collectors 
                            .toCollection(ArrayList::new));
			return  user_withoutpass;
		} 
		else if(type.equals("positive_dt")) {
			List<User> user =  userrepo.findTop20ByOrderByTesteddateDesc();
			List<User> user_withoutpass = user.stream().map(f -> {f.setPassword("");f.setCords(new ArrayList<Cords>()); return f;})
					.collect(Collectors 
                            .toCollection(ArrayList::new));
			return  user_withoutpass;
		}
		
		else {
			return new ArrayList<User>();	
		}
 
		
	}
	
	
	
}
