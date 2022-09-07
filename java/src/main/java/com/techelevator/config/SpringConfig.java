package com.techelevator.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.techelevator.entity.AppUser;
import com.techelevator.entity.Recipe;
import com.techelevator.entity.Role;
import com.techelevator.repo.RoleRepo;
import com.techelevator.service.AppUserService;
import com.techelevator.service.RecipeService;
import com.techelevator.service.RoleService;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Configuration
public class SpringConfig {

    @Autowired
    private RoleRepo roleRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner run(AppUserService appUserService, RoleService roleService, RecipeService recipeService) {
        return args -> {

            roleService.addRole(new Role(null, "ROLE_USER"));
            roleService.addRole(new Role(null, "ROLE_ADMIN"));
            roleService.addRole(new Role(null, "ROLE_SUPER_ADMIN"));

            Role userRole = roleRepo.findByName("ROLE_USER");

            AppUser brandon = AppUser.builder()
                    .username("brandon")
                    .password(passwordEncoder().encode("brandon123"))
                    .activated(true)
                    .roles(Set.of(userRole))
                    .build();

            appUserService.addUser(brandon);

//            System.out.println(dotenv.get("CLOUDNAME"));
        };
    }

//    @Bean
//    public Cloudinary cloudinaryConfig() {
//        Cloudinary cloudinary = null;
//        Map config = new HashMap();
//        config.put("cloud_name", cloudName);
//        config.put("api_key", apiKey);
//        config.put("api_secret", apiSecret);
//        cloudinary = new Cloudinary(config);
//        return cloudinary;
//    }

//    @Bean
//    public Cloudinary getCloudinaryConfig() {
//        Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
//                "cloud_name", "djoe",
//                "api_key", "362171829159456",
//                "api_secret", "jpGk4VgYFHr7jJcrIXdEVRLgxCo",
//                "secure", true
//        ));
//        return cloudinary;
//    }

//    @Bean
//    public void getDotEnvConfig() {
//        Dotenv.configure()
//                .directory("/")
//                .ignoreIfMalformed()
//                .ignoreIfMissing()
//                .load();
//    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
