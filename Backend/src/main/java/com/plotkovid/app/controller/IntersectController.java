package com.plotkovid.app.controller;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.plotkovid.app.utils.CityRepo;
import com.plotkovid.app.utils.Cords;
import com.plotkovid.app.utils.IntersectionLogic;
import com.plotkovid.app.utils.Intersections;
import com.plotkovid.app.utils.User;
import com.plotkovid.app.utils.UserRepo;

@RestController

@CrossOrigin
@RequestMapping("/app")
public class IntersectController {
	

	@Autowired
	private CityRepo cityrepo;


	@Autowired
	private UserRepo userrepo;
	
	@Autowired
	private IntersectionLogic il;
	 
	@GetMapping(value = "/intersect")
	public List<Intersections> checkIntersect(@RequestParam("id") String id) {
		Optional<User> userObj = userrepo.findById("5e9c07c38bfaff206fdde314");

		if (userObj.isPresent()) {
			User user = userObj.get();
			return il.getIntersectionsForUser(user);
		} else {
			System.out.println("Else part");
			return new ArrayList<Intersections>();
		}

	}
 
}
