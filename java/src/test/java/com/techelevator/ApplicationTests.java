package com.techelevator;

import com.techelevator.entity.*;
import com.techelevator.repo.*;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class ApplicationTests {

    @Autowired
    private IngredientRepo ingredientRepo;

    @Autowired
    private RecipeRepo recipeRepo;

    @Autowired
    private RecipeIngredientRepo recipeIngredientRepo;

    @Autowired
    private RoleRepo roleRepo;

    @Autowired
    private AppUserRepo appUserRepo;

//    @Test
//    void saveRecipeIngredient() {
//        AppUser currUser = appUserRepo.findByUsername("brandon");
//
//        Recipe newRecipe = new Recipe();
//        newRecipe.setAppUser(currUser);
//        newRecipe.setTitle("Test title");
//        newRecipe.setDescription("Test description");
//        newRecipe.setServings(1);
//        newRecipe.setPrepTime(30);
//        newRecipe.setCookTime(60);
//        newRecipe.setImgUrl("url");
//
//        Step newStep = Step.builder()
//                .index(1)
//                .info("step info")
//                .recipe(newRecipe)
//                .build();
//
//        newRecipe.setSteps(List.of(newStep));
//
//        Ingredient foundIngredient = ingredientRepo.findByName("Garlic");
//        RecipeIngredient newRecipeIngredient = RecipeIngredient.builder()
//                .ingredient(foundIngredient)
//                .recipe(newRecipe)
//                .quantity(recipeIngredientDTO.getQuantity())
//                .build();
//    }
}
