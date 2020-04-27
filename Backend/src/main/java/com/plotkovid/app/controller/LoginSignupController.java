package com.plotkovid.app.controller;

import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController; 

import com.plotkovid.app.utils.User;
import com.plotkovid.app.utils.UserRepo;

@RestController

@CrossOrigin
@RequestMapping("/app")
public class LoginSignupController {

	@Autowired
	private UserRepo userrepo;

	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String uploadFile(@RequestParam("username") String username, @RequestParam("password") String password)
			throws InterruptedException, IllegalStateException, IOException {

		User user = userrepo.findByUsername(username);
		
		System.out.println(user.toString()+" "+password);
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

		boolean isPasswordMatched = passwordEncoder.matches(password, user.getPassword());
		if(user == null || isPasswordMatched == false)
			return "user_not_found";
		System.out.println(isPasswordMatched);
		return user.get_id();
	}
	
	
	@RequestMapping(value = "/updatePassword", method = RequestMethod.GET)
	public int uploadFile(@RequestParam("id") String id,@RequestParam("oldPassword") String oldPassword, @RequestParam("newPassword") String password)
			  {

		User user = userrepo.findById(id).get();
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		if(user == null)
			return 201; // user not found
		else{
			boolean isPasswordMatched = passwordEncoder.matches(oldPassword, user.getPassword());
			if(isPasswordMatched) {
				user.setPassword(passwordEncoder.encode(password));
				userrepo.save(user);
				return 200;
			}else {
				return 202;// password not matched
			}
		}
		 
	}
	
	
	
	
	@RequestMapping(value = "/getUser", method = RequestMethod.GET)
	public User uploadFile(@RequestParam("id") String id ) {

		User user = userrepo.findById(id).get();
 
		if(user == null)
			return new User();
		else{
			user.setPassword("");
			return user;
		}
		 
	}
	
	@RequestMapping(value = "/updateProfile", method = RequestMethod.POST)
	public int updateProfile( @RequestBody User userObj) {
		User user = userrepo.findById(userObj.get_id()).get();
		 
		if(user == null)
			return   201;
		else{
			 user.setCity(userObj.getCity());
			 user.setCountry(userObj.getCountry());
			 user.setHealthstatus(userObj.getHealthstatus());
			 if(userObj.getHealthstatus().equals("normal"))
					user.setIsnormal(true);
				else
					user.setIsnormal(false); 
			 user.setTesteddate(userObj.getTesteddate());
			 user.setAge(userObj.getAge());
			 user.setGender(user.getGender());
			 
			 userrepo.save(user);
		}
		
		
		return 200;
	}
	
	@RequestMapping(value = "/signup", method = RequestMethod.POST)
	public String uploadFile( 
			@RequestBody User user
			)
			throws InterruptedException, IllegalStateException, IOException, ParseException {
 
	      System.out.println(user);
		User chk_user = userrepo.findByUsername(user.getUsername());

		if(chk_user != null)
			 return "User_Found"; // user already found
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		  
		user.setHealthstatus(user.getHealthstatus());
		System.out.println(user.getHealthstatus() == "normal");
		if(user.getHealthstatus().equals("normal"))
			user.setIsnormal(true);
		else
			user.setIsnormal(false); 
		
		System.out.println(user.toString());
	    User savedUser= userrepo.save(user);
	    System.out.println(savedUser.get_id());
		
		return savedUser.get_id();
	}
	

}
