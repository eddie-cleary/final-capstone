package com.techelevator.service;

import com.techelevator.entity.AppUser;
import com.techelevator.entity.Role;
import com.techelevator.model.RegisterUserDTO;
import com.techelevator.repo.AppUserRepo;
import com.techelevator.repo.RoleRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AppUserServiceImpl implements AppUserService {

    private final AppUserRepo appUserRepo;

    private final RoleRepo roleRepo;

    private final PasswordEncoder passwordEncoder;

    @Override
    public AppUser getUser(String username) {
        log.info("Fetching AppUser {} from database", username);
        AppUser appUser = appUserRepo.findByUsername(username);
        if (Objects.nonNull(appUser)) {
            return appUser;
        }
        throw new UsernameNotFoundException(username + " not found");
    }

    @Override
    public void addRoleToAppUser(String username, String roleName) {
        log.info("Saving new Role {} to AppUser {}", roleName, username);
        AppUser appUser = appUserRepo.findByUsername(username);
        Role role = roleRepo.findByName(roleName);
        appUser.getRoles().add(role);
    }

    @Override
    public AppUser saveUser(RegisterUserDTO newUser) {
        log.info("Saving new AppUser {} to the database", newUser.getUsername());
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        AppUser appUser = AppUser.builder()
                .username(newUser.getUsername())
                .password(newUser.getPassword())
                .activated(true)
                .roles(new ArrayList<Role>())
                .build();
        return appUserRepo.save(appUser);
    }

    @Override
    public Role saveRole(Role role) {
        log.info("Saving new Role {} to the database", role.getName());
        return roleRepo.save(role);
    }

    @Override
    public List<AppUser> getUsers() {
        log.info("Fetching all AppUsers from database");
        return appUserRepo.findAll();
    }
}