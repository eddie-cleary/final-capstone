package com.techelevator.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class MealRecipeDTO {

    private Long id;
    private int servings;
    private Long meal_id;
    private RecipeDTO recipe;
}
