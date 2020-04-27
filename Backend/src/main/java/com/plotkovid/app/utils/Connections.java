package com.plotkovid.app.utils;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Connections")
public class Connections implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	private String _id; 
	
	public String getId() {
		return _id;
	}
	public void setId(String id) {
		this._id = id;
	}
	
	private String user;
	private List<String> connectedusers;
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	public List<String> getConnectedusers() {
		return connectedusers;
	}
	public void setConnectedusers(List<String> connectedusers) {
		this.connectedusers = connectedusers;
	}
	@Override
	public String toString() {
		return "Connections [user=" + user + ", connectedusers=" + connectedusers + "]";
	}
	
	
	
}
