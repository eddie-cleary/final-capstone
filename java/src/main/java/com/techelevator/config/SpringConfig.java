package com.techelevator.config;

import com.techelevator.entity.AppUser;
import com.techelevator.entity.Role;
import com.techelevator.repo.RoleRepo;
import com.techelevator.service.AppUserService;
import com.techelevator.service.RecipeService;
import com.techelevator.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Set;

@Configuration
public class SpringConfig {

    @Autowired
    private RoleRepo roleRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${spring.profiles.active}")
    private String activeProfile;

    @Bean
    CommandLineRunner run(AppUserService appUserService, RoleService roleService, RecipeService recipeService) {
        return args -> {

            roleService.addRole(new Role(null, "ROLE_USER"));
            roleService.addRole(new Role(null, "ROLE_ADMIN"));
            roleService.addRole(new Role(null, "ROLE_SUPER_ADMIN"));


            if (activeProfile == "dev") {
                Role userRole = roleRepo.findByName("ROLE_USER");
                Role adminRole = roleRepo.findByName("ROLE_ADMIN");
                AppUser brandon = AppUser.builder()
                        .username("brandon")
                        .password(passwordEncoder.encode("brandon123"))
                        .activated(true)
                        .roles(Set.of(userRole, adminRole))
                        .build();

                appUserService.addUser(brandon);
            }
        };
    }
}
