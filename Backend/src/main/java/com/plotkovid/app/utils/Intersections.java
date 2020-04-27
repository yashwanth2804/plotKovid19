package com.plotkovid.app.utils;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Id;

public class Intersections implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String  user;
	private String gender;
	 
	private String id;
	//private List<PathsCords> paths;
	List<Cords[]> intersectionlines;
	 


	public List<Cords[]> getIntersectionlines() {
		return intersectionlines;
	}


	public void setIntersectionlines(List<Cords[]> intersectionlines) {
		this.intersectionlines = intersectionlines;
	}


	public String getUser() {
		return user;
	}


	public void setUser(String user) {
		this.user = user;
	}


	public String getId() {
		return id;
	}


	public void setId(String id) {
		this.id = id;
	}


	public String getGender() {
		return gender;
	}


	public void setGender(String gender) {
		this.gender = gender;
	}
	
//
//
//	public List<PathsCords> getPaths() {
//		return paths;
//	}
//
//
//	public void setPaths(List<PathsCords> paths) {
//		this.paths = paths;
//	}

 
	
	
}
