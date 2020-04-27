package com.plotkovid.app.utils;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.time.Instant;
import com.plotkovid.app.utils.TravelDatesHistory;
import java.util.List;

public interface TravelDatesHistoryRepo extends MongoRepository<TravelDatesHistory,String> {
	TravelDatesHistory findByDate(Instant date);
	
	List<TravelDatesHistory> findTop30ByOrderByDateDesc();
	
}
