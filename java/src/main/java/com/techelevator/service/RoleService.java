package com.techelevator.service;

import com.cloudinary.api.exceptions.BadRequest;
import com.techelevator.entity.Role;
import com.techelevator.exception.ApiException;

public interface RoleService {
    Role addRole(Role role) throws BadRequest, ApiException;
}
