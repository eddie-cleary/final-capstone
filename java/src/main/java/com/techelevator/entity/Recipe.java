package com.techelevator.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    private String description;
    private int servings;
    private String img_url;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "appuser_id", referencedColumnName = "id")
    private AppUser appUser;
}
