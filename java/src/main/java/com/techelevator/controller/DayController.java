package com.techelevator.controller;

import com.techelevator.entity.Day;
import com.techelevator.entity.MealPlan;
import com.techelevator.model.DayDTO;
import com.techelevator.model.MealPlanDTO;
import com.techelevator.service.AppUserService;
import com.techelevator.service.DayService;
import com.techelevator.service.MealPlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;


@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/days")
public class DayController {

    private final DayService dayService;
    private final AppUserService appUserService;

    @PostMapping
    public Day addDay(Principal principal, @RequestBody DayDTO dayDTO) {
        return dayService.addDay(principal.getName(), dayDTO);
    }



}

