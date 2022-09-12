package com.techelevator.model;

import com.techelevator.entity.MealRecipe;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class MealDTO {
    private Long user_id;
    private String title;
    private Set<MealRecipeDTO> recipes;
}
