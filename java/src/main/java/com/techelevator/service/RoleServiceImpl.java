package com.techelevator.service;

import com.cloudinary.api.exceptions.BadRequest;
import com.techelevator.entity.Role;
import com.techelevator.repo.RoleRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Slf4j
@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepo roleRepo;

    public RoleServiceImpl(RoleRepo roleRepo) {
        this.roleRepo = roleRepo;
    }

    @Override
    public Role addRole(Role role) throws BadRequest {
        log.info("Saving new Role {} to the database", role.getName());
        Role foundRole = roleRepo.findByName(role.getName());
        if (Objects.nonNull(foundRole)) {
//            throw new BadRequest("Role " + role.getName() + " already exists.");
            return null;
        }
        return roleRepo.save(role);
    }
}
