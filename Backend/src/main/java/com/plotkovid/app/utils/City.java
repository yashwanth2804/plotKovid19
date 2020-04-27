package com.plotkovid.app.utils;

import java.io.Serializable;

import javax.persistence.Id;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.core.convert.DbRefResolver;
import org.springframework.data.mongodb.core.convert.DefaultDbRefResolver;
import org.springframework.data.mongodb.core.convert.DefaultMongoTypeMapper;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;

@Document(collection = "City")
@Configuration
public class City implements Serializable {

	 /**
	 * 
	 */
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
	@Field(value = "_id")
	private String _id;
 
	private String address;
	private int cases;
	

	public String get_id() {
		return _id;
	}

	public void set_id(String _id) {
		this._id = _id;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public int getCases() {
		return cases;
	}

	public void setCases(int cases) {
		this.cases = cases;
	}
 
	
}
