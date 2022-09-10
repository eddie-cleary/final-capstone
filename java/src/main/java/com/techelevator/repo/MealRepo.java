package com.techelevator.repo;

import com.techelevator.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MealRepo extends JpaRepository<Meal, Long> {
    List<Meal> findByAppUser(AppUser appuser); //appuser_id
}
