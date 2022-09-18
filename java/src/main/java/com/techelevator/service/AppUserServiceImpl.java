package com.techelevator.service;

import com.techelevator.entity.AppUser;
import com.techelevator.entity.Role;
import com.techelevator.exception.ApiException;
import com.techelevator.exception.UserAlreadyExistsException;
import com.techelevator.model.RegisterUserDTO;
import com.techelevator.repo.AppUserRepo;
import com.techelevator.repo.RoleRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Set;

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
        AppUser appUser = appUserRepo.findByUsername(username);
        if (Objects.isNull(appUser)) {
            throw new UsernameNotFoundException("User " + username + " not found.");
        }
        return appUser;
    }

    @Override
    public AppUser addRoleToAppUser(String username, String roleName) throws ApiException {
        log.info("Saving new Role {} to AppUser {}", roleName, username);
        AppUser appUser = appUserRepo.findByUsername(username);
        Role role = roleRepo.findByName(roleName);
        for (Role userRole : appUser.getRoles()) {
            if (role == userRole) {
                log.warn("User {} already has role {}", username, role.getName());
                throw new ApiException("User already has that role");
            }
        }
        appUser.getRoles().add(role);
        return appUserRepo.save(appUser);
    }

    @Override
    public AppUser addUser(AppUser appUser) {
        log.info("Saving new AppUser {} to the database", appUser.getUsername());
        AppUser userFound = appUserRepo.findByUsername(appUser.getUsername());
        if (Objects.nonNull(userFound)) {
            throw new UserAlreadyExistsException();
        }
        return appUserRepo.save(appUser);
    }

    @Override
    public AppUser addNewUser(RegisterUserDTO newUser) {
        log.info("Registering new user {} to the database", newUser.getUsername());
        Role userRole = roleRepo.findByName("ROLE_USER");
        AppUser userFound = appUserRepo.findByUsername(newUser.getUsername());
        if (Objects.nonNull(userFound)) {
            throw new UserAlreadyExistsException();
        }
        AppUser appUser = AppUser.builder()
                .username(newUser.getUsername())
                .password(passwordEncoder.encode(newUser.getPassword()))
                .activated(true)
                .roles(Set.of(userRole))
                .build();

        return appUserRepo.save(appUser);
    }

    @Override
    public List<AppUser> getUsers() {
        log.info("Fetching all AppUsers from database");
        return appUserRepo.findAll();
    }
}
