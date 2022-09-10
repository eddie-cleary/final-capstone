package com.techelevator.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.techelevator.model.RegisterUserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.*;
import com.techelevator.entity.MealPlan;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="id")
public class Day {

    @Id
    @Column(name = "day_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

//    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "mealplan_id", referencedColumnName = "mealplan_id")
    private MealPlan mealPlan;
}
