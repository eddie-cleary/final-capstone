package com.techelevator.service;

import com.techelevator.entity.Ingredient;
import com.techelevator.exception.ApiException;
import com.techelevator.repo.IngredientRepo;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor
public class IngredientServiceImpl implements IngredientService{

    @Autowired
    private final IngredientRepo ingredientRepo;

    @Override
    public Ingredient addIngredient(Ingredient ingredient) throws ApiException {
        Ingredient ingredientFound = ingredientRepo.findByName(ingredient.getName());
        if (Objects.nonNull(ingredientFound)) {
            throw new ApiException("Ingredient " + ingredient.getName() + " already exists.");
        }
        return ingredientRepo.save(ingredient);
    }

    @Override
    public Ingredient getIngredientByName(String name) throws ApiException {
        Ingredient ingredientFound = ingredientRepo.findByName(name);
        if (Objects.isNull(ingredientFound)) {
            throw new ResourceNotFoundException("Ingredient not found.");
        }
        return ingredientFound;
    }

    @Override
    public Optional<Ingredient> getIngredientById(Long id) {
        return ingredientRepo.findById(id);
    }

    @Override
    public List<Ingredient> getAllIngredients() {
        return ingredientRepo.findAll();
    }
}
