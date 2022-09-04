package com.techelevator.service;

import com.techelevator.entity.AppUser;
import com.techelevator.entity.Recipe;
import com.techelevator.entity.Role;
import com.techelevator.exception.ValidationException;
import com.techelevator.model.RegisterUserDTO;
import com.techelevator.repo.AppUserRepo;
import com.techelevator.repo.RoleRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class AppUserServiceImpl implements AppUserService {

    private final AppUserRepo appUserRepo;

    private final RoleRepo roleRepo;

    private final PasswordEncoder passwordEncoder;

    @Override
    public AppUser getUser(String username) {
        log.info("Fetching AppUser {} from database", username);
        Optional<AppUser> appUser = Optional.ofNullable(appUserRepo.findByUsername(username));
        if (appUser.isPresent()) {
            return appUser.get();
        }
        throw new UsernameNotFoundException(username + " not found");
    }

    @Override
    public AppUser addRoleToAppUser(String username, String roleName) {
        log.info("Saving new Role {} to AppUser {}", roleName, username);
        AppUser appUser = appUserRepo.findByUsername(username);
        Role role = roleRepo.findByName(roleName);
        appUser.getRoles().add(role);
        return appUserRepo.save(appUser);
    }

    @Override
    public AppUser saveUser(AppUser appUser) throws ValidationException {
        log.info("Saving new AppUser {} to the database", appUser.getUsername());
        return appUserRepo.save(appUser);
    }

    @Override
    public AppUser registerNewUser(RegisterUserDTO newUser) {
        log.info("Registering new user {} to the database", newUser.getUsername());
        Role userRole = roleRepo.findByName("ROLE_USER");
        AppUser appUser = AppUser.builder()
                .username(newUser.getUsername())
                .password(passwordEncoder.encode(newUser.getPassword()))
                .activated(true)
                .roles(List.of(userRole))
                .build();
        return appUserRepo.save(appUser);
    }

    @Override
    public List<AppUser> getUsers() {
        log.info("Fetching all AppUsers from database");
        return appUserRepo.findAll();
    }

}
