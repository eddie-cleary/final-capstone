package com.techelevator.model;

import com.techelevator.entity.MealRecipe;
import com.techelevator.entity.Recipe;
import com.techelevator.entity.RecipeIngredient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class MealRecipeDTO {

    public MealRecipeDTO(MealRecipe mealRecipe) {
        this.servings = mealRecipe.getServings();
        MealPlanRecipeDTO mealPlanRecipeDTO = new MealPlanRecipeDTO(mealRecipe);
        this.recipe = mealPlanRecipeDTO;
    }

    @NotNull
    private int servings;
    @NotNull
    private MealPlanRecipeDTO recipe;
}
