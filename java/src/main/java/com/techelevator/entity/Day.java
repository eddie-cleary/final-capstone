package com.techelevator.entity;

import com.fasterxml.jackson.annotation.*;
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

    @ManyToOne
    @JoinColumn(name = "mealplan_id", referencedColumnName = "mealplan_id")
//    @JsonBackReference(value="mealplan-days")
    private MealPlan mealPlan;

    @OneToMany(mappedBy = "day", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Meal> meals = new HashSet<>();

    @Override
    public String toString() {
        return "Day{" +
                "id=" + id +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Day day = (Day) o;
        return id.equals(day.id) && Objects.equals(mealPlan, day.mealPlan);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, mealPlan);
    }
}
