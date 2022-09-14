package com.techelevator.entity;

import antlr.CommonAST;
import antlr.build.ANTLR;
import com.fasterxml.jackson.annotation.*;
import com.techelevator.model.RecipeDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
//@JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="id", scope = Long.class)
@Builder
public class Recipe {

    @Id
    @Column(name = "recipe_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    private String title;
    @NotNull
    private String description;
    @NotNull
    private int servings;
    @NotNull
    private int prepTime;
    @NotNull
    private int cookTime;
    private String imgId;

    // add not null
    @ManyToOne
    @JoinColumn(name = "appuser_id", referencedColumnName = "appuser_id")
    private AppUser appUser;

    // add not null
    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    private List<Step> steps = new ArrayList<>();

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    List<RecipeIngredient> recipeIngredients = new ArrayList<>();

//    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
//    private List<MealRecipe> mealRecipes = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name="recipe_category",
            joinColumns = @JoinColumn(name = "recipe_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private Set<Category> recipeCategory = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name="recipes_liked",
            joinColumns = @JoinColumn(name = "recipe_id"),
            inverseJoinColumns = @JoinColumn(name = "appuser_id")
    )
    Set<AppUser> recipesLiked = new HashSet<>();

    public void addUserToLiked(AppUser appUser) {
        recipesLiked.add(appUser);
    }

    public void addRecipeDTO(RecipeDTO recipeDTO) {
        this.title = recipeDTO.getTitle();
        this.description = recipeDTO.getDescription();
        this.cookTime = recipeDTO.getCookTime();
        this.prepTime = recipeDTO.getPrepTime();
        this.servings = recipeDTO.getServings();
        this.imgId = recipeDTO.getImgId();
    }

    @Override
    public String toString() {
        return "Recipe{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", servings=" + servings +
                ", prepTime=" + prepTime +
                ", cookTime=" + cookTime +
                ", imgUrl='" + imgId + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Recipe recipe = (Recipe) o;
        return servings == recipe.servings && prepTime == recipe.prepTime && cookTime == recipe.cookTime && Objects.equals(id, recipe.id) && Objects.equals(title, recipe.title) && Objects.equals(description, recipe.description) && Objects.equals(imgId, recipe.imgId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, description, servings, prepTime, cookTime, imgId);
    }
}
