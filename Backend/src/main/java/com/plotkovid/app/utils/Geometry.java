package com.plotkovid.app.utils;

import java.awt.Point;

public class Geometry {

	public static void main(String[] args) {
		//13.752905, 79.700216 ,13.752389, 79.702732

		// 13.753030, 79.702335,  13.751983, 79.702062 
		double[] intersection = getlineIntersectPoint(
				 13.752905, 79.700216 ,13.752389, 79.702732,
				 13.753030, 79.702335,  13.751983, 79.702062
				 );
		
		 double p0[] = {13.752905, 79.700216,0};
		 double p1[] = {13.752389, 79.702732,0};
		 System.out.println(length(p0,p1)*1000);
		 System.out.println(distance(13.752905, 79.700216 ,13.752389, 79.702732,"K")*1000);
		 
		 
		 System.out.println(distance(13.749280, 79.688527,13.764005, 79.695157,"K")*1000);
		 System.out.println(intersection[0]+" "+intersection[1]);
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
	
	public static double length(final double[] p0, final double[] p1) {
		final double[] v = Geometry.createVector(p0, p1);
		return length(v);
	}
	public static double[] createVector(final double[] p0, final double[] p1) {
		final double v[] = { p1[0] - p0[0], p1[1] - p0[1], p1[2] - p0[2] };
		return v;
	}
 
	public static double length(final double[] v) {
		return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
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
		    	 
		    	
		        double[]  m = new double[2];
		        m[0]=x1 + ua*(x2 - x1);
		        m[1]=y1 + ua*(y2 - y1);
		        return  m;
		        
		    }

		  return null;
		  }
}
