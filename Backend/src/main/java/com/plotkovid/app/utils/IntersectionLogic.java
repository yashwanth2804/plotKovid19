package com.plotkovid.app.utils;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component; 

@Component
public class IntersectionLogic {


	@Autowired
	private   UserRepo userrepo;

public   List<Intersections> getIntersectionsForUser(User user) {
		
		System.out.println(user.getStays());
		List<User> VictimUsersInSameLoc = userrepo.findByStaysInAndIsnormal(user.getStays(), false);
	 System.out.println(VictimUsersInSameLoc.size());
		List<Intersections> ListOfInteraction = new ArrayList<Intersections>();
		
		
		for (User victim : VictimUsersInSameLoc) {
			
			Intersections intersecObj = new Intersections();
			intersecObj.setUser(victim.getUsername());
			intersecObj.setId(victim.get_id());
			intersecObj.setGender(victim.getGender());
			
			int VictimCordsLength = victim.getCords().size();
			int UserCordsLength = user.getCords().size();
			List<Cords[]> CordsList_Intersected = new ArrayList<Cords[]>();
			
			for (int i = 0; i < UserCordsLength - 1; i++) {
				for (int j = 0; j < VictimCordsLength - 1; j++) {
					 List<Cords> CordList_Intersected = new ArrayList<Cords>();
					Cords User_Line_Point_A = user.getCords().get(i);
					Cords User_Line_Point_B = user.getCords().get(i+1);
					
					Cords Victim_Line_Point_A = victim.getCords().get(j);
					Cords Victim_Line_Point_B = victim.getCords().get(j+1);
					 
					 if(isLineIntersectingLine(
								User_Line_Point_A.getLat(),User_Line_Point_A.getLng(),User_Line_Point_B.getLat(),User_Line_Point_B.getLng(),
								Victim_Line_Point_A.getLat(),Victim_Line_Point_A.getLng(),Victim_Line_Point_B.getLat(),Victim_Line_Point_B.getLng()
								
								)) {
						
						 
						 //Get Intersection point
						double[] IP =  getlineIntersectPoint(
								 User_Line_Point_A.getLat(),User_Line_Point_A.getLng(),User_Line_Point_B.getLat(),User_Line_Point_B.getLng()
								 ,
								 Victim_Line_Point_A.getLat(),Victim_Line_Point_A.getLng(),Victim_Line_Point_B.getLat(),Victim_Line_Point_B.getLng()
								 
								 );
						 
						if(IP != null) {
						 
						 //Get user speed
						 
						Instant timeOfUser_At_IP  = getSpeed(User_Line_Point_A,User_Line_Point_B,IP);
						Instant timeOfVictim_At_IP  = getSpeed(Victim_Line_Point_A,Victim_Line_Point_B,IP);
					   
					   
					   long timeDiffInContact  =Math.abs(Duration.between(timeOfUser_At_IP, timeOfVictim_At_IP).getSeconds());
					  
					      
					   
					   if(timeDiffInContact < 3600) {
						   CordList_Intersected.add(User_Line_Point_A);
							 CordList_Intersected.add(User_Line_Point_B);
							 CordList_Intersected.add(Victim_Line_Point_A);
							 CordList_Intersected.add(Victim_Line_Point_B);
							 Cords[] Cordsarr = CordList_Intersected.stream().toArray(Cords[] ::new); 
							 CordsList_Intersected.add(Cordsarr);
					   }
						}else {
							CordList_Intersected.add(User_Line_Point_A);
							 CordList_Intersected.add(User_Line_Point_B);
							 CordList_Intersected.add(Victim_Line_Point_A);
							 CordList_Intersected.add(Victim_Line_Point_B);
							 Cords[] Cordsarr = CordList_Intersected.stream().toArray(Cords[] ::new); 
							 CordsList_Intersected.add(Cordsarr);
						}
					    
						// System.out.println("UserLine "+user.getUsername()+""+ User_Line_Point_A.toString()+" to  "+User_Line_Point_B.toString());
						//System.out.println("VictimLine "+victim.getUsername()+""+ Victim_Line_Point_A.toString()+" to  "+Victim_Line_Point_B.toString());
					 }
					 
					
					}
				}
			
			intersecObj.setIntersectionlines(CordsList_Intersected);
			if(intersecObj.getIntersectionlines().size()!=0)
				ListOfInteraction.add(intersecObj);
			 
		}
		return ListOfInteraction;
	}



public static Instant getSpeed(Cords Line_Point_A,Cords Line_Point_B,double[] IP) {
	
	double dstInMeters = distance(Line_Point_A.getLat(), Line_Point_A.getLng(), Line_Point_B.getLat(), Line_Point_B.getLng(),"K")*1000;
	long timeInsec = Math.abs(Duration.between(Line_Point_A.getStarttime(),Line_Point_B.getStarttime()).getSeconds());
	//System.out.println("=====timeinSec====>"+timeInsec);
	double speed = dstInMeters/timeInsec;
	//System.out.println("=====speed====>"+speed);
	double dstBetweenIntersectionPoint = distance(Line_Point_A.getLat(), Line_Point_A.getLng(),
												 IP[0],IP[1],"K")*1000;
	//System.out.println("====dstbtw interse=====>"+dstBetweenIntersectionPoint);
	long timeInsecToReachIP = (long) (dstBetweenIntersectionPoint/speed);
	//System.out.println("====dstbtw time interse=====>"+timeInsecToReachIP);
	Instant timeAtIntersectionPoint  =  Line_Point_A.getStarttime().plusSeconds(timeInsecToReachIP);
	//System.out.println("======= ADDED==========>"+ Line_Point_A.getStarttime().toString()+" , "+timeAtIntersectionPoint.toString());
	return  timeAtIntersectionPoint;
}


private static double distance(double lat1, double lon1, double lat2, double lon2, String unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		double theta = lon1 - lon2;
		double dist = Math.sin(Math.toRadians(lat1)) * Math.sin(Math.toRadians(lat2)) + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) * Math.cos(Math.toRadians(theta));
		dist = Math.acos(dist);
		dist = Math.toDegrees(dist);
		dist = dist * 60 * 1.1515;
		if (unit.equals("K")) {
			dist = dist * 1.609344;
		} else if (unit.equals("N")) {
			dist = dist * 0.8684;
		}
		return (dist);
	}
}

public static double[] getlineIntersectPoint(
		double x1, double y1, double x2, double y2, 
		
		double x3, double y3, double x4, double y4) {
	  double denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
	  if (denom == 0.0) { // Lines are parallel.
	     return null;
	  }
	  double ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3))/denom;
	  double ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3))/denom;
	    if (ua >= 0.0f && ua <= 1.0f && ub >= 0.0f && ub <= 1.0f) {
	        // Get the intersection point.
	    	 
	    	
	        double[]  IP = new double[2];
	        IP[0]=x1 + ua*(x2 - x1);
	        IP[1]=y1 + ua*(y2 - y1);
	        return  IP;
	        
	    }

	  return null;
	  }

public static boolean isLineIntersectingLine(double point1,double point2, double point3,double point4, 
		 double point5,double point6, double point7,double point8) {
int s1 = sameSide(point1, point2, point3, point4, point5, point6, point7, point8);
int s2 = sameSide(point5, point6, point7, point8, point1, point2, point3, point4);

return s1 <= 0 && s2 <= 0;
}

private static int sameSide(double x0, double y0, double x1, double y1, double px0, double py0, double px1,
double py1) {
int sameSide = 0;

double dx = x1 - x0;
double dy = y1 - y0;
double dx1 = px0 - x0;
double dy1 = py0 - y0;
double dx2 = px1 - x1;
double dy2 = py1 - y1;

double c1 = dx * dy1 - dy * dx1;
double c2 = dx * dy2 - dy * dx2;

if (c1 != 0 && c2 != 0)
sameSide = c1 < 0 != c2 < 0 ? -1 : 1;
else if (dx == 0 && dx1 == 0 && dx2 == 0)
sameSide = !isBetween(y0, y1, py0) && !isBetween(y0, y1, py1) ? 1 : 0;
else if (dy == 0 && dy1 == 0 && dy2 == 0)
sameSide = !isBetween(x0, x1, px0) && !isBetween(x0, x1, px1) ? 1 : 0;

return sameSide;
}

private static boolean isBetween(double a, double b, double c) {
return b > a ? c >= a && c <= b : c >= b && c <= a;
}

}
