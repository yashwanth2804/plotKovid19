package com.plotkovid.app.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class Bcrypt {
	 
	public static void main(String[] args) {
		String password = "test12m3";
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String hashedPassword =   passwordEncoder.encode(password);
		System.out.println(hashedPassword);
		System.out.println(passwordEncoder.matches(password, "$2a$10$LtD8HKgsFOuNUl5dQY.fO.Q8ELQyAXD/W.3S8LFycR0CLCWC6LVxe"));
	}
	
	
	
//	@Bean
//	public PasswordEncoder passwordEncoder(){
//		PasswordEncoder encoder = new BCryptPasswordEncoder();
//		return encoder;
//	}
}
