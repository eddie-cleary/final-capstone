package com.techelevator.service;


import com.techelevator.entity.Day;
import com.techelevator.model.DayDTO;
import com.techelevator.repo.DayRepo;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class DayServiceImpl implements DayService {

    private final AppUserService appUserService;
    private final DayRepo dayRepo;

    @Override
    public Day addDay(String username, DayDTO dayDTO) {
        try {
            log.info("Adding days to meal plan for \"{}\"", username);
            Day newDay = new Day();
            return dayRepo.save(newDay);
        } catch (Exception e) {
            log.warn("Exception occurred trying to add day to  \"{}\": " + e.getMessage(), username);
            throw new RuntimeException("Could not add day to meal plan.");
        }
    }
}
//    @Override
//    public Day addDay(String username, DayDTO dayDTO) {
//        Long currentUserId = getId(username);
//        try {
//            log.info("Creating day for \"{}\"", username);
//            Day newDay = new Day();
//            day.setMealPlan(day.getMealPlanId());
//            return dayRepo.save(newDay);
//        } catch (Exception e) {
//            log.warn("Exception occurred trying to create day for \"{}\": " + e.getMessage(), username);
//            throw new RuntimeException("Could not create day.");
//        }
//    }
//    @Override
//    public Day getDayById(String username, Long dayId) {
//        try {
//            log.info("Retrieving day {} for \"{}\"", dayId, username);
//            AppUser currentUser = new AppUser();
//            currentUser.setId(getId(username));
//            if (isDayCreator(username, dayId, "dayId", "get")) {
//                Optional<Day> day = dayRepo.findById(dayId);
//                if (day.isPresent()) {
//                    return day.get();
//                }
//            }
//        } catch (Exception e) {
//            log.warn("Unable to get day id {} for \"{}\"", dayId, username);
//            throw new RuntimeException("Unable to get day.");
//        }
//    }
//    @Override
//    public List<Day> getDaysByMealPlanId(String username, Long mealPlanId) {
//        try {
//            log.info("Retrieving days of mealplan {} for \"{}\"", mealPlanId, username);
//            if (isDayCreator(username, mealPlanId, "mealPlanId", "get")) {
//                AppUser currentUser = new AppUser();
//                currentUser.setId(getId(username));
//                return dayRepo.findByMealPlanId(mealPlanId);
//            }
//        } catch (Exception e) {
//            log.warn("Unable to get days of mealplan id {} for \"{}\"",mealPlanId, username);
//            throw new RuntimeException("Unable to get meals.");
//        }
//    }

//    @Override
//    public Boolean deleteDay(String username, Long dayId) {
//        Long currentUserId = getId(username);
//        log.info("User \"{}\" is deleting day with id {}", username, dayId);
//        try {
//            if (isDayCreator(username, dayId, "dayId", "delete")) {
//                dayRepo.deleteById(dayId);
//                return true;
//            }
//        } catch (Exception e) {
//            log.warn("Exception occurred trying to delete day with id {} " + e.getMessage(), dayId);
//            return false;
//        }
//        return false;
//    }

//    public Boolean isDayCreator(String username, Long paramId, String paramType, String action) {
//        //validates if day is created by user
//        try {
//            MealPlan mealPlanFromDB = null;
//            if (paramType.equals("dayId")) {
//                Day dayFromDB = dayRepo.findById(paramId).get();
//                mealPlanFromDB = mealPlanService.findById(dayFromDB.getMealId());
//            } else {
//                mealPlanFromDB = mealPlanService.findById(paramId);
//            }
//            if (getId(username).equals(mealPlanFromDB.getAppUser().getId())) {
//                return true;
//            } else {
//                log.warn("User \"{}\" attempted to {} a day that is not theirs.", username, action);
//                return false;
//            }
//        } catch (Exception e) {
//            log.warn("Exception occurred trying to validate (day) user: " + e.getMessage());
//            return false;
//        }
//    }
//    public Long getId(String username) {
//        //returns user id
//        AppUser appUser = appUserService.getId(username);
//        return appUser.getId();
//    }
//
//}
