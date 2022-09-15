package com.techelevator.service;

import com.techelevator.entity.Role;
import com.techelevator.repo.RoleRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepo roleRepo;

    public RoleServiceImpl(RoleRepo roleRepo) {
        this.roleRepo = roleRepo;
    }

    @Override
    public Role addRole(Role role) {
        log.info("Saving new Role {} to the database", role.getName());
        return roleRepo.save(role);
    }
}
