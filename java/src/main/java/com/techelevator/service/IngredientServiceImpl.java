package com.techelevator.service;

import com.techelevator.entity.Ingredient;
import com.techelevator.repo.IngredientRepo;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor
public class IngredientServiceImpl implements IngredientService{

    @Autowired
    private final IngredientRepo ingredientRepo;

    @Override
    public Ingredient addIngredient(Ingredient ingredient) {
        return ingredientRepo.save(ingredient);
    }

    @Override
    public Ingredient getIngredientByName(String name) {
        return ingredientRepo.findByName(name);
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
