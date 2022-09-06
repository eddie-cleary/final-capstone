package com.techelevator.controller;

import com.techelevator.entity.Role;
import com.techelevator.repo.RoleRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class RepoController {

    private RoleRepo roleRepo;

    public RepoController(RoleRepo roleRepo) {
        this.roleRepo = roleRepo;
    }

    @PostMapping("/role")
    public Role addRole(@RequestBody Role role) {
        return roleRepo.save(role);
    }
}
