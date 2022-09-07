package com.techelevator.controller;

import com.techelevator.entity.AppUser;
import com.techelevator.service.AppUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@Slf4j
@CrossOrigin
public class AppUserController {

    private final AppUserService appUserService;

    private AppUserController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @GetMapping
    @RequestMapping("/users")
    public List<AppUser> getUsers() {
        return appUserService.getUsers();
    }

    @GetMapping("/getme")
    public String getLoggedInUser(Principal principal) {
        return appUserService.getUser(principal.getName()).getUsername();
    }
}
