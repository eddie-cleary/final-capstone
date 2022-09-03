package com.techelevator.config;

import com.techelevator.entity.Role;
import com.techelevator.model.RegisterUserDTO;
import com.techelevator.service.AppUserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SpringConfig {
    @Bean
    CommandLineRunner run(AppUserService appUserService) {
        return args -> {
            appUserService.saveRole(new Role(null, "ROLE_USER"));
            appUserService.saveRole(new Role(null, "ROLE_ADMIN"));
            appUserService.saveRole(new Role(null, "ROLE_SUPER_ADMIN"));

            appUserService.saveUser(new RegisterUserDTO("ej", "1234"));
            appUserService.saveUser(new RegisterUserDTO("kb", "1234"));
            appUserService.saveUser(new RegisterUserDTO("bv", "1234"));

            appUserService.addRoleToAppUser("ej", "ROLE_SUPER_ADMIN");
            appUserService.addRoleToAppUser("ej", "ROLE_ADMIN");
            appUserService.addRoleToAppUser("ej", "ROLE_USER");
            appUserService.addRoleToAppUser("kb", "ROLE_ADMIN");
            appUserService.addRoleToAppUser("kb", "ROLE_USER");
            appUserService.addRoleToAppUser("bv", "ROLE_ADMIN");
            appUserService.addRoleToAppUser("bv", "ROLE_USER");
        };
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
