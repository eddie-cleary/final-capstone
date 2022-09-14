package com.techelevator.model;

import com.techelevator.entity.Category;
import com.techelevator.entity.Ingredient;
import com.techelevator.entity.Step;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RecipeDTO {

    private Long id;
    private String title;
    private String description;
    private int servings;
    private int prepTime;
    private int cookTime;
    private String imgId;
    private List<CategoryDTO> recipeCategory;
    private List<RecipeIngredientDTO> recipeIngredients;
    private List<Step> steps;
    private boolean liked;
}
