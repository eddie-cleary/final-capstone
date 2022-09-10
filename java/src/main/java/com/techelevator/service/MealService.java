package com.techelevator.service;


import com.techelevator.model.MealDTO;

import java.util.List;

public interface MealService {

    public List<MealDTO> getMeals(String username);
    public MealDTO createMeal(String username, MealDTO mealDTO);
    public Boolean updateMealTitle(String username, MealDTO mealDTO, Long mealId);
    public Boolean deleteMeal(String username, Long mealId);
}
