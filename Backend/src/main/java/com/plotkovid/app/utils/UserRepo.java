package com.plotkovid.app.utils;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends MongoRepository<User, String> {

	List<User> findByStaysInAndIsnormal(List<String> Stays, boolean isnormal);

	User findByUsernameAndPassword(String username, String password);

	User save(User user);

	User findByUsername(String username);
	//Traveldistance
	List<User> findByStaysInAndIsnormalOrderByTraveldistanceDesc(String place, boolean isnormal);
	
	List<User> findAllByStaysInAndIsnormal(String place, boolean isnormal,Pageable pageable);
	
	//Traveldistance top 20
	List<User> findTop10ByOrderByTraveldistanceDesc();
	List<User> findTop10ByOrderByTravelhoursDesc();
	List<User> findTop10ByOrderByLockdownhoursDesc();
 
	List<User> findTop20ByOrderByTesteddateDesc();
	
	
	
}
