package com.techelevator.service;

import com.cloudinary.api.exceptions.BadRequest;
import com.techelevator.entity.AppUser;
import com.techelevator.entity.Role;
import com.techelevator.exception.ApiException;
import com.techelevator.exception.ValidationException;
import com.techelevator.model.RegisterUserDTO;

import javax.validation.Valid;
import java.util.List;

public interface AppUserService {
    AppUser addUser(AppUser appUser) throws ValidationException;
    AppUser addRoleToAppUser(String username, String roleName) throws ApiException;
    AppUser getUser(String username);
    List<AppUser> getUsers();
    AppUser addNewUser(RegisterUserDTO newUser);
}
