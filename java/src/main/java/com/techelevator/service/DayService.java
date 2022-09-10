package com.techelevator.service;

import java.security.Principal;

public interface DayService {

    Day addDay(String username, Day day);

    Day getDayById(String username, Long id);

    List<Day> getDaysByMealPlanId(String username, Long mealPlanId);

    Boolean deleteDayById(String username, Long dayId);
}
