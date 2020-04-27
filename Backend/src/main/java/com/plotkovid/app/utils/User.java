package com.plotkovid.app.utils;

import java.io.Serializable;
import java.time.Instant;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.persistence.Id;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.core.convert.DbRefResolver;
import org.springframework.data.mongodb.core.convert.DefaultDbRefResolver;
import org.springframework.data.mongodb.core.convert.DefaultMongoTypeMapper;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

public class User implements Serializable {

	private static final long serialVersionUID = 1L;
	@Autowired MongoDbFactory mongoDbFactory;
	 @Autowired MongoMappingContext mongoMappingContext;

	 @Bean
	 public MappingMongoConverter mappingMongoConverter() {

	  DbRefResolver dbRefResolver = new DefaultDbRefResolver(mongoDbFactory);
	  MappingMongoConverter converter = new MappingMongoConverter(dbRefResolver, mongoMappingContext);
	  converter.setTypeMapper(new DefaultMongoTypeMapper(null));

	  return converter;
	 }
	 
	 
	@Id
	private String _id;
	
	
	public String get_id() {
		return _id;
	}

	public void set_id(String _id) {
		this._id = _id;
	}


	private String username;
	private String password;
	private List<String> stays;
	private String city;
	private String country;
	
	private String healthstatus;
	private String submitedby;
	// Formats output date when this DTO is passed through JSON
	  @JsonFormat(pattern = "yyyy-MM-dd")
	  // Allows dd/MM/yyyy date to be passed into GET request in JSON
	  @DateTimeFormat(pattern = "yyyy-MM-dd")
	  private Date testeddate;
	
	private String gender;
	private int age;
	private boolean isnormal;
	
	private long lockdownhours;
	private long travelhours;
	private int traveldistance;
	
	
	private List<Cords> cords;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public long getLockdownhours() {
		return lockdownhours;
	}

	public void setLockdownhours(long lockdownhours) {
		this.lockdownhours = lockdownhours;
	}

	public List<String> getStays() {
		return stays;
	}

	public void setStays(List<String> stays) {
		this.stays = stays;
	}

	public List<Cords> getCords() {
		return cords;
	}

	public void setCords(List<Cords> cords) {
		this.cords = cords;
	}
	

	public String getHealthstatus() {
		return healthstatus;
	}

	public void setHealthstatus(String healthstatus) {
		this.healthstatus = healthstatus;
	}

	public String getSubmitedby() {
		return submitedby;
	}

	public void setSubmitedby(String submitedby) {
		this.submitedby = submitedby;
	}

	public Date getTesteddate() {
		return testeddate;
	}

	public void setTesteddate(Date testeddate) {
		this.testeddate = testeddate;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}
 

	@Override
	public String toString() {
		return "User [username=" + username + ", password=" + password + ", stays=" + stays + ", city=" + city
				+ ", country=" + country + ", healthstatus=" + healthstatus + ", submitedby=" + submitedby
				+ ", testeddate=" + testeddate + ", gender=" + gender + ", age=" + age + ", isnormal=" + isnormal
				+ ", lockdownhours=" + lockdownhours + ", travelhours=" + travelhours + ", traveldistance="
				+ traveldistance + ", cords=" + cords + "]";
	}

	public long getTravelhours() {
		return travelhours;
	}

	public void setTravelhours(long travelhours) {
		this.travelhours = travelhours;
	}

	public int getTraveldistance() {
		return traveldistance;
	}

	public void setTraveldistance(int traveldistance) {
		this.traveldistance = traveldistance;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public boolean isIsnormal() {
		return isnormal;
	}

	public void setIsnormal(boolean isnormal) {
		this.isnormal = isnormal;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
 
 
	
	
	
}
