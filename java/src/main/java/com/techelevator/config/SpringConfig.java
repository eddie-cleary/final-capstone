package com.techelevator.config;

import com.techelevator.entity.Recipe;
import com.techelevator.entity.Role;
import com.techelevator.model.RegisterUserDTO;
import com.techelevator.service.AppUserService;
import com.techelevator.service.RecipeService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SpringConfig {
    @Bean
    CommandLineRunner run(AppUserService appUserService, RecipeService recipeService) {
        return args -> {
            appUserService.saveRole(new Role(null, "ROLE_USER"));
            appUserService.saveRole(new Role(null, "ROLE_ADMIN"));
            appUserService.saveRole(new Role(null, "ROLE_SUPER_ADMIN"));

            appUserService.saveUser(new RegisterUserDTO("eddie", "12345"));
            appUserService.saveUser(new RegisterUserDTO("kimberly", "12345"));
            appUserService.saveUser(new RegisterUserDTO("brandon", "12345"));
            appUserService.saveUser(new RegisterUserDTO("chantele", "12345"));

            appUserService.addRoleToAppUser("eddie", "ROLE_SUPER_ADMIN");
            appUserService.addRoleToAppUser("eddie", "ROLE_ADMIN");
            appUserService.addRoleToAppUser("eddie", "ROLE_USER");
            appUserService.addRoleToAppUser("kimberly", "ROLE_ADMIN");
            appUserService.addRoleToAppUser("kimberly", "ROLE_USER");
            appUserService.addRoleToAppUser("brandon", "ROLE_ADMIN");
            appUserService.addRoleToAppUser("brandon", "ROLE_USER");
            appUserService.addRoleToAppUser("chantele", "ROLE_ADMIN");
            appUserService.addRoleToAppUser("chantele", "ROLE_USER");

//            recipeService.addRecipe(new Recipe(null, "A recipe", "Recipe description", 1, "https://www.google.com", appUserService.getUser("eddie")));
        };
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
