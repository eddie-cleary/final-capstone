package com.techelevator.service;


import com.techelevator.entity.AppUser;
import com.techelevator.model.MealPlanDTO;
import com.techelevator.repo.MealPlanRepo;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@AllArgsConstructor
public class MealPlanServiceImpl implements MealPlanService {
    @Autowired
    AppUserService appUserService;
    @Autowired
    MealPlanRepo mealPlanRepo;

    @Override
    public MealPlan getMealPlanById(String username, Long mealPlanId) {
        try {
            AppUser currentUser = new AppUser();
            currentUser.setId(getId(username));
            Optional<MealPlan> mealPlan = mealPlanRepo.findById(mealPlanId);
            return mealPlan.get();
        } catch (Exception e) {
            log.warn("Unable to get meal plan id {} for \"{}\"", mealPlanId, username);
            throw new RuntimeException("Unable to get meal plans.");
        }
    }

    @Override
    public List<MealPlan> getMealPlans(String username) {
        try {
            AppUser currentUser = new AppUser();
            currentUser.setId(getId(username));
            return mealPlanRepo.findByAppUser(currentUser);
        } catch (Exception e) {
            log.warn("Unable to get meal plans for \"{}\"", username);
            throw new RuntimeException("Unable to get meal plans.");
        }
    }

    @Override
    public MealPlan createMealPlan(String username, MealPlanDTO mealPlanDTO) {
        Long currentUserId = getId(username);
        try {
            log.info("Creating meal plan for \"{}\"", username);
            Mealplan newMealPlan = new Mealplan();
            newMealPlan.setTitle(mealPlanDTO.getTitle());
            newMealPlan.setAppUserId(currentUserId);
            return mealPlanRepo.save(newMealPlan);
        } catch (Exception e) {
            log.warn("Exception occurred trying to create a meal plan for \"{}\": " + e.getMessage(), username);
            throw new RuntimeException("Could not create a new meal plan.");
        }
    }

    @Override
    public Boolean updateMealPlanTitle(String username, MealPlan mealPlan, Long mealPlanId) {
        Long currentUserId = getId(username);
        log.info("User \"{}\" is updating meal id {}", username, mealPlan.mealPlanId);
        try {
            if (isMealCreator(username, mealPlanId, "update")) {
                log.info("Updating \"{}\"'s meal plan with id {}", username);
                if (mealPlan.getId().equals(currentUserId)) { //validates the meal plan obj

                    mealPlanRepo.save(mealPlan);
                }
            }
        } catch (Exception e) {
            log.warn("Exception occurred trying to update meal plan with id {}" + e.getMessage());
            return false;
        }
        return false;
    }

    @Override
    public Boolean deleteMealPlan(String username, Long mealPlanId) {
        Long currentUserId = getId(username);
        log.info("User \"{}\" is deleting meal with id {}", username, mealPlan.mealPlanId);
        try {
            if (isMealCreator(username, mealPlanId, "delete")) {
                mealPlanRepo.deleteById(mealPlanId);
            }
        } catch (Exception e) {
            log.warn("Exception occurred trying to delete meal plan with id {} " + e.getMessage());
            return false;
        }
        return false;
    }

    public Long getId(String username) {
        //returns user id
        AppUser appUser = appUserService.getId(username);
        return appUser.getId();
    }

    public Boolean isMealCreator(String username, Long mealPlanId, String action) {
        //validates if meal plan is created by user
        try {
            MealPlan mealPlanFromDB = mealPlanRepo.findById(mealPlanId);
            if (getId(username).equals(mealPlanFromDB.getAppUser().getId())) {
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
