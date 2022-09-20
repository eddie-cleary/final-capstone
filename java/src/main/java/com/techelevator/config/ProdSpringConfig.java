package com.techelevator.config;

import com.techelevator.entity.AppUser;
import com.techelevator.entity.Role;
import com.techelevator.repo.RoleRepo;
import com.techelevator.service.AppUserService;
import com.techelevator.service.RecipeService;
import com.techelevator.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Set;

@Configuration
@Profile("prod")
public class ProdSpringConfig {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepo roleRepo;

    @Bean
    CommandLineRunner run(AppUserService appUserService, RoleService roleService, RecipeService recipeService) {
        return args -> {

            AppUser edward = AppUser.builder()
                    .username("edward")
                    .password(passwordEncoder.encode("Testpass123"))
                    .activated(true)
                    .build();

            appUserService.addUser(edward);

            Role userRole = Role.builder()
                    .name("ROLE_USER")
                    .appUserRoles(Set.of(edward))
                    .build();

            Role adminRole = Role.builder()
                    .name("ROLE_ADMIN")
                    .appUserRoles(Set.of(edward))
                    .build();

            roleRepo.save(userRole);
            roleRepo.save(adminRole);
        };
    }
}
