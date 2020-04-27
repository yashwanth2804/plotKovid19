package com.plotkovid.app.utils;

import java.io.Serializable;
import java.util.List;

public class UserCordsList implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String username;
	private List<double[]> cordsList;
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public List<double[]> getCordsList() {
		return cordsList;
	}
	public void setCordsList(List<double[]> cordsList) {
		this.cordsList = cordsList;
	}
	@Override
	public String toString() {
		return "UserCordsList [username=" + username + ", cordsList=" + cordsList + "]";
	}
	
	
}
