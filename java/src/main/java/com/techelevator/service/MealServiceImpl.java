package com.techelevator.service;


import com.techelevator.entity.AppUser;
import com.techelevator.model.MealDTO;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@AllArgsConstructor
public class MealServiceImpl implements MealService {
    @Autowired
    AppUserService appUserService;
    @Autowired
    MealRepo mealRepo;

    @Override
    public Meal getMealById(String username, Long mealId) {
        try {
            AppUser currentUser = new AppUser();
            currentUser.setId(getId(username));
            Optional<Meal> meal = mealRepo.findById(mealId);
            if (meal.isPresent()) {
                return meal.get();
            }
        } catch (Exception e) {
            log.warn("Unable to get meal id {} for \"{}\"", mealId, username);
            throw new RuntimeException("Unable to get meal.");
        }
    }
    @Override
    public List<Meal> getMeals(String username) {
        try {
            AppUser currentUser = new AppUser();
            currentUser.setId(getId(username));
            Optional<Meal> meals = mealRepo.findByAppUser(currentUser);
            return meals.get();
        } catch (Exception e) {
            log.warn("Unable to get meal for \"{}\"", username);
            throw new RuntimeException("Unable to get meals.");
        }
    }

    @Override
    public Meal createMeal(String username, MealDTO mealDTO) {
        Long currentUserId = getId(username);
        try {
            log.info("Creating meal for \"{}\"", username);
            Meal newMeal = new Meal();
            newMeal.setTitle(mealDTO.getTitle());
            newMeal.setAppUserId(currentUserId);
            return mealRepo.save(newMeal);
        } catch (Exception e) {
            log.warn("Exception occurred trying to create a meal for \"{}\": " + e.getMessage(), username);
            throw new RuntimeException("Could not create a new meal.");
        }
    }

    @Override
    public Boolean updateMealTitle(String username, MealDTO mealDTO, Long mealId) {
        Long currentUserId = getId(username);
        log.info("User \"{}\" is updating meal id {}", username, mealDTO.mealId);
        try {
            if (isMealCreator(username, mealId, "update")) {
                log.info("Updating \"{}\"'s meal with id {}", username);
                if (mealDTO.getId().equals(currentUserId)) { //validates the meal obj
                    mealRepo.save(mealDTO);
                }
            }
        } catch (Exception e) {
            log.warn("Exception occurred trying to update meal with id {}" + e.getMessage());
            return false;
        }
        return false;
    }

    @Override
    public Boolean deleteMeal(String username, Long mealId) {
        Long currentUserId = getId(username);
        log.info("User \"{}\" is deleting meal with id {}", username, mealId);
        try {
            if (isMealCreator(username, mealId, "delete")) {
                mealRepo.deleteById(mealId);
            }
        } catch (Exception e) {
            log.warn("Exception occurred trying to delete meal with id {} " + e.getMessage());
            return false;
        }
        return false;
    }

    public Long getId(String username) {
        //returns user id
        AppUser appUser = appUserService.getId(username);
        return appUser.getId();
    }

    public Boolean isMealCreator(String username, Long mealId, String action) {
        //validates if meal is created by user
        try {
            MealDTO mealFromDB = mealRepo.findById(mealId);
            if (getId(username).equals(mealFromDB.getAppUser().getId())) {
                return true;
            } else {
                log.warn("User \"{}\" attempted to {} a meal that is not theirs.", username, action);
                return false;
            }
        } catch (Exception e) {
            log.warn("Exception occurred trying to validate user: " + e.getMessage());
            return false;
        }
    }
}
