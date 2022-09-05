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

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="id")
public class AppUser {

   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
   private Long id;
   @NotNull(message = "Username should not be null")
   @Pattern(regexp = "^[a-zA-Z0-9_-]{4,15}$", message="Username not valid")
   private String username;
   @JsonIgnore
   @NotNull
   private String password;
   @JsonIgnore
   private boolean activated;

   @ManyToMany
   private List<Role> roles = new ArrayList<>();

   @OneToMany(mappedBy = "appUser")
   @JsonIgnore
   private List<Recipe> recipes = new ArrayList<>();
}
