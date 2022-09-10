package com.techelevator.repo;

import com.techelevator.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MealPlanRepo extends JpaRepository<MealPlan, Long> {

//    MealPlan findMealPlanByTitle(Long userId, String title); //Useful if we impl a search feature
    List<MealPlan> findByAppUser(AppUser appuser); //FK appuser_id

}
