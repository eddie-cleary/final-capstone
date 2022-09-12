package com.techelevator.controller;

import com.techelevator.entity.Day;
import com.techelevator.model.DayDTO;
import com.techelevator.service.DayService;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;


@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/days")
public class DayController {

    private final DayService dayService;

    @PostMapping
    public Day addDay(Principal principal, @RequestBody DayDTO dayDTO) {
        return dayService.addDay(principal.getName(), dayDTO);
    }
}

