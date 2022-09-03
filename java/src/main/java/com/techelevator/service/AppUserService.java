package com.techelevator.service;

import com.techelevator.entity.AppUser;
import com.techelevator.entity.Role;
import com.techelevator.model.RegisterUserDTO;

import java.util.List;

public interface AppUserService {
    AppUser saveUser(RegisterUserDTO newUser);
    Role saveRole(Role role);

    void addRoleToAppUser(String username, String roleName);
    AppUser getUser(String username);
    List<AppUser> getUsers();
}
