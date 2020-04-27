package com.plotkovid.app.utils;

import twitter4j.Status;
import twitter4j.Twitter;
import twitter4j.TwitterException;
import twitter4j.TwitterFactory;
import twitter4j.conf.ConfigurationBuilder;

public class TwitterApp {
	public static void main(String[] args) throws IllegalStateException, TwitterException {
//		ConfigurationBuilder cb = new ConfigurationBuilder();
// 
//		cb.setDebugEnabled(true)
//		 
//		  .setOAuthConsumerKey("mdMWq4tNtoXVPE6zzcnqmgj0c")
//		  .setOAuthConsumerSecret("6tHoZv1BMq1nky2TsP3fHs0J8FPbUHNvsqmHZRLrBf8a7C2Y3k")
//		  .setOAuthAccessToken("702713648104415233-URPYLdFdqQbd6QPGV9QYfL2xhr6GV1t")
//		  .setOAuthAccessTokenSecret("ka4VItlMDeXj4UfzSFRyAWCjVgsU9YtzjLdzAs1WKNqFV")
//		;
//		TwitterFactory tf = new TwitterFactory(cb.build() );
//		Twitter twitter = tf.getInstance();
//		  
//		System.out.println(twitter.getId());
		
		String Text = "New case reported by victim living in place,hi travel history includes  locations";
		System.out.println(Text.length());
	}
	
}
