package com.techelevator.repo;

import com.techelevator.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeRepo extends JpaRepository<Recipe, Long> {
    Recipe findByTitle (String title);
}
