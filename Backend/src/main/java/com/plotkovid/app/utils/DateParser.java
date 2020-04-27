package com.plotkovid.app.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Date;

public class DateParser {

	public static void main(String[] args) throws ParseException {
		//2020-03-03T18:26:51.297Z
		DateTimeFormatter dtf = DateTimeFormatter.ISO_DATE_TIME;
		String pattern = "yyyy-MM-dd";
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
		
		DateTimeFormatter dtf1 = DateTimeFormatter.ofPattern(pattern);
		 
		String  zdt_StartTime = ZonedDateTime.parse("2020-03-13T18:26:51.297Z", dtf).format(dtf1);
		 
		System.out.println(zdt_StartTime);
		 Date date = simpleDateFormat.parse(zdt_StartTime);
		System.out.println(date.toString());
		
		Instant y  = Instant.parse( "2020-03-13T18:26:51.297Z" )
	       .truncatedTo( ChronoUnit.DAYS )
	        ;
		System.out.println(y.toString());
		
	       
	}
}
