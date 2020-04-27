package com.plotkovid.app.utils;

import java.io.Serializable;
import java.time.Instant;
import java.time.ZonedDateTime;

public class Cords implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Double lat;
	private Double lng;
	
	private Instant starttime;
	private Instant endtime;
	 
	public Double getLat() {
		return lat;
	}
	public void setLat(Double lat) {
		this.lat = lat;
	}
	public Double getLng() {
		return lng;
	}
	public void setLng(Double lng) {
		this.lng = lng;
	}
	public Instant getStarttime() {
		return starttime;
	}
	public void setStarttime(Instant starttime) {
		this.starttime = starttime;
	}
	public Instant getEndtime() {
		return endtime;
	}
	public void setEndtime(Instant endtime) {
		this.endtime = endtime;
	}
	@Override
	public String toString() {
		return "Cords [lat=" + lat + ", lng=" + lng + ", starttime=" + starttime + ", endtime=" + endtime + "]";
	}
	
	
	
}
