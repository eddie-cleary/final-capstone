package com.techelevator.config;

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

//            AppUser chantele = AppUser.builder()
//                    .username("edward")
//                    .password(passwordEncoder.encode("Testpass123"))
//                    .activated(true)
//                    .build();
//
//            appUserService.addUser(chantele);
//
//            Role userRole = Role.builder()
//                    .name("ROLE_USER")
//                    .appUserRoles(Set.of(chantele))
//                    .build();
//
//            Role adminRole = Role.builder()
//                    .name("ROLE_ADMIN")
//                    .appUserRoles(Set.of(chantele))
//                    .build();
//
//            roleRepo.save(userRole);
//            roleRepo.save(adminRole);
//
//            AppUser appUser = appUserService.getUser("edward");
//
//            Role adminRole = roleRepo.findByName("ADMIN");
//            appUser.getAppUserRoles().add(adminRole);
//
//            roleRepo.save(adminRole);

        };
    }
}
