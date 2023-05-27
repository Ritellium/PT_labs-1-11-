package com.example.lab11_try2;

public class AngleConverter {
    public static double degreesToRadians(double degrees) {
        return Math.toRadians(degrees);
    }
    public static double minutesToRadians(double minutes) {
        return Math.toRadians(minutes / 60.0);
    }
    public static double secondsToRadians(double seconds) {
        return Math.toRadians(seconds / 3600.0);
    }
    public static double gradsToRadians(double grads) {
        return Math.toRadians(grads * 0.9);
    }
    public static double milsToRadians(double mils) {
        return Math.toRadians(mils * 0.05625);
    }
    public static double radiansToDegrees(double radians) {
        return Math.toDegrees(radians);
    }
    public static double radiansToMinutes(double radians) {
        return Math.toDegrees(radians) * 60.0;
    }
    public static double radiansToSeconds(double radians) {
        return Math.toDegrees(radians) * 3600.0;
    }
    public static double radiansToGrads(double radians) {
        return Math.toDegrees(radians) / 0.9;
    }
    public static double radiansToMils(double radians) {
        return Math.toDegrees(radians) / 0.05625;
    }
}
