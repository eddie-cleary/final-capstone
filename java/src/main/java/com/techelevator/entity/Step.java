package com.techelevator.entity;

import com.fasterxml.jackson.annotation.*;
import lombok.*;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="id", scope = Long.class)
public class Step {

    @Id
    @Column(name = "step_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private int index;
    private String info;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "recipe_id", referencedColumnName = "recipe_id")
    @JsonIgnore
    private Recipe recipe;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Step step = (Step) o;
        return index == step.index && Objects.equals(id, step.id) && Objects.equals(info, step.info);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, index, info);
    }
}
