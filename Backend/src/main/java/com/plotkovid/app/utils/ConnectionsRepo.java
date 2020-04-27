package com.plotkovid.app.utils;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.lang.String;
import com.plotkovid.app.utils.Connections;
import java.util.List;

public interface ConnectionsRepo extends MongoRepository<Connections,String> {

	Connections findByUser(String user);
	 
	
}
