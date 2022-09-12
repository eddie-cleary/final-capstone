package com.techelevator.model;

import com.techelevator.entity.Day;
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
public class MealPlanDTO {
    private Long id;
    @NotNull
    private String title;
    @NotNull
    private List<Day> days;
}
