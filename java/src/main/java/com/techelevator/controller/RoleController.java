package com.techelevator.controller;

import com.techelevator.entity.Role;
import com.techelevator.repo.RoleRepo;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class RoleController {

    private RoleRepo roleRepo;

    public RoleController(RoleRepo roleRepo) {
        this.roleRepo = roleRepo;
    }

    @PostMapping("/role")
    public Role addRole(@RequestBody Role role) {
        return roleRepo.save(role);
    }
}
