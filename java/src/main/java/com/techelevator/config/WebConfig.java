package com.techelevator.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Value("${spring.profiles.active}")
    private String activeProfile;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        if (activeProfile == "dev") {
            registry.addMapping("/**").allowedOrigins("http://localhost:3000");
        } else if (activeProfile == "prod") {
            registry.addMapping("/**").allowedOrigins("https://mealplannerma.herokuapp.com/");
        }
    }
}
