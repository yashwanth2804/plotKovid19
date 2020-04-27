package com.plotkovid.app.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.plotkovid.app.utils.City;
import com.plotkovid.app.utils.CityRepo;
import com.plotkovid.app.utils.User;
import com.plotkovid.app.utils.UserRepo;

@RestController

@CrossOrigin
@RequestMapping("/app")
public class PlotController {

	@Autowired
	private CityRepo cityrepo;


	@Autowired
	private UserRepo userrepo;
	
	@RequestMapping(value = "/getTopPlaces", method = RequestMethod.GET)
	public List<City> getTopPlaces() {
		
		
		List<City> top3  =  cityrepo.findTop3ByOrderByAddressDesc();
		 
 
		return top3;
	}

	
	
	
	@RequestMapping(value = "/placeAutoComplete", method = RequestMethod.GET)
	public List<City> uploadFile(@RequestParam("placename") String placename) {

		List<City> searchresults  =  cityrepo.findByAddressLikeIgnoreCase(placename);
		List<City> first10Results = searchresults.stream().limit(10).collect(Collectors.toList());
 
		return first10Results;
	}
	
	
	@RequestMapping(value = "/getVictims", method = RequestMethod.GET)
	public List<User> getVictims(@RequestParam("placename") String placename,@RequestParam("sortBy") String sortBy,
			@RequestParam("page") int page
			) {

		//travelDistance 
		System.out.println(placename+ sortBy+" Page"+page);
		Pageable sortedBytravelDistance =  PageRequest.of(page, 1, Sort.by("traveldistance").descending());
		//lockDown
		Pageable sortedBylockDown =  PageRequest.of(page, 1, Sort.by("lockdownhours").descending());
		//testDate
		Pageable sortedBytestDate =  PageRequest.of(page, 1, Sort.by("testeddate").descending());
		
		if(sortBy.equals("travelDistance"))
			return userrepo.findAllByStaysInAndIsnormal(placename, false,sortedBytravelDistance);
		
		if(sortBy.equals("lockDown"))
			return userrepo.findAllByStaysInAndIsnormal(placename, false,sortedBylockDown);
		
		if(sortBy.equals("testDate"))
			return userrepo.findAllByStaysInAndIsnormal(placename, false,sortedBytestDate);
		 
		 return new ArrayList<User>();
		//return	userrepo.findByStaysInAndIsnormalOrderByTraveldistanceDesc(placename,false);
		
	 
	}
	
	
	
	
	
	
	
	
	
	
	
}
