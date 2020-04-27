package com.plotkovid.app.utils;

import java.io.Serializable;
import java.util.Arrays;

public class PathsCords implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private double[] pointa;
	private double[] pointb;
	private double[] pointc;
	private double[] pointd;
	public double[] getPointa() {
		return pointa;
	}
	public void setPointa(double[] pointa) {
		this.pointa = pointa;
	}
	public double[] getPointb() {
		return pointb;
	}
	public void setPointb(double[] pointb) {
		this.pointb = pointb;
	}
	public double[] getPointc() {
		return pointc;
	}
	public void setPointc(double[] pointc) {
		this.pointc = pointc;
	}
	public double[] getPointd() {
		return pointd;
	}
	public void setPointd(double[] pointd) {
		this.pointd = pointd;
	}
	@Override
	public String toString() {
		return "PathsCords [pointa=" + Arrays.toString(pointa) + ", pointb=" + Arrays.toString(pointb) + ", pointc="
				+ Arrays.toString(pointc) + ", pointd=" + Arrays.toString(pointd) + "]";
	}
	
	
	
}
