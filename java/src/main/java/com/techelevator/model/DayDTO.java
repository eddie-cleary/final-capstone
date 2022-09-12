package com.techelevator.model;

import com.techelevator.entity.Meal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class DayDTO {
    private Long id;

    @NotNull
    private List<MealDTO> meals;
}
