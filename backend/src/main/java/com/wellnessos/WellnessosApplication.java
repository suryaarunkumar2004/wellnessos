package com.wellnessos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class WellnessosApplication {

    public static void main(String[] args) {
        SpringApplication.run(WellnessosApplication.class, args);
        System.out.println("🚀 WellnessOS Backend Started!");
        System.out.println("📊 Daily health data scheduler is running...");
        System.out.println("🕐 Data will be added automatically every day at midnight.");
        System.out.println("📈 Graphs will display real-time data with proper values.");
    }
}
