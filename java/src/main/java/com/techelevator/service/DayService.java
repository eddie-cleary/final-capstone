package com.techelevator.service;

import com.techelevator.entity.Day;
import com.techelevator.model.DayDTO;

import java.util.List;

public interface DayService {

    Day addDay(String username, DayDTO dayDTO);

//    Day deleteDay(String username, Long dayId);

//    List<Day>getDaysByMealPlanId(String username, Long mealPlanId);

}


