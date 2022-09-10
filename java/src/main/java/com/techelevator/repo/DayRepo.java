package com.techelevator.repo;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DayRepo extends JpaRepository<Day, Long> {
    List<Day> findByMealPlanId(Long id);

}
