package com.plotkovid.app.utils;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.lang.String;
import com.plotkovid.app.utils.City;
import java.util.List;
@Repository
public interface CityRepo  extends MongoRepository<City,String> {

	 City findByAddress(String address);
	 List<City> findByAddressLikeIgnoreCase(String place);
	 
	 List<City> findTop3ByOrderByAddressDesc();
}
