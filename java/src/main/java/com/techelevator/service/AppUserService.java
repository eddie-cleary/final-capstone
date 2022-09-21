package com.techelevator.service;

import com.techelevator.entity.AppUser;
import com.techelevator.exception.ApiException;
import com.techelevator.exception.ValidationException;
import com.techelevator.model.PasswordChangeDTO;
import com.techelevator.model.RegisterUserDTO;

import java.util.List;

public interface AppUserService {
    AppUser addUser(AppUser appUser) throws ValidationException;
    AppUser addRoleToAppUser(String username, String roleName) throws ApiException;
    AppUser getUser(String username);
    List<AppUser> getUsers();
    AppUser addNewUser(RegisterUserDTO newUser);
    Boolean changePassword(String username, PasswordChangeDTO passwordChangeDTO);
    Boolean deleteUser(String username);
}
