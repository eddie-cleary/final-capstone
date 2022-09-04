package com.techelevator.controller;

import com.techelevator.entity.AppUser;
import com.techelevator.service.AppUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/user")
public class AppUserController {

    private AppUserService appUserService;

    @GetMapping
    public AppUser getLoggedInUser(Principal principal) {
        return appUserService.getUser(principal.getName());
    }

}
