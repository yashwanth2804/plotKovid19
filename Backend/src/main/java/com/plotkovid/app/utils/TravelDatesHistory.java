package com.plotkovid.app.utils;

import java.io.Serializable;
import java.time.Instant;

import javax.persistence.Id;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "TravelDatesHistory")
public class TravelDatesHistory implements Serializable {

	
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
	private Instant date;
	private int victimscount;
	private int normalcount;
	 
	public Instant getDate() {
		return date;
	}
	public void setDate(Instant date) {
		this.date = date;
	}
	public int getVictimscount() {
		return victimscount;
	}
	public void setVictimscount(int victimscount) {
		this.victimscount = victimscount;
	}
	public int getNormalcount() {
		return normalcount;
	}
	public void setNormalcount(int normalcount) {
		this.normalcount = normalcount;
	}
	@Override
	public String toString() {
		return "TravelDatesHistory [date=" + date + ", victimscount=" + victimscount + ", normalcount=" + normalcount
				+ "]";
	}
	
	
}
