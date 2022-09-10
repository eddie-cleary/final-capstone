package com.techelevator.controller;

import com.cloudinary.Cloudinary;
import com.techelevator.entity.AppUser;
import com.techelevator.service.AppUserService;
import io.github.cdimascio.dotenv.Dotenv;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.security.Principal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@CrossOrigin
public class AppUserController {

    @Autowired
    private final AppUserService appUserService;

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private Dotenv dotenv;

    private AppUserController(AppUserService appUserService, Dotenv dotenv) {
        this.appUserService = appUserService;
        this.dotenv = dotenv;
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

    @GetMapping("/verifyUser")
    public AppUser getUserByToken(Principal principal) {
        return appUserService.getUser(principal.getName());
    }

    @GetMapping("/get-signature")
    public Map<String, String> getCloudinarySignature() {

        Long timestamp =  new Date().getTime() / 1000;
        String timestampString = timestamp.toString();

        String apiSecret = dotenv.get("CLOUDSECRET");

        Map<String, Object> paramsToSign = new HashMap<>();
        paramsToSign.put("timestamp", timestampString);
        paramsToSign.put("folder", "MealPlanner");

        String signature = cloudinary.apiSignRequest(paramsToSign, apiSecret);

        Map<String, String> response = new HashMap<>();
        response.put("timestamp", timestampString);
        response.put("signature", signature);

        return response;
    }
}
