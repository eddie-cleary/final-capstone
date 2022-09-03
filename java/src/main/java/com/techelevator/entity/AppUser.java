package com.techelevator.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Collection;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppUser {

   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
   private Long id;
   @NotNull(message = "Username should not be null")
   @Pattern(regexp = "^[a-z0-9_-]{4,15}$", message="Username not valid")
   private String username;
   @JsonIgnore
   @NotNull
   private String password;
   @JsonIgnore
   private boolean activated = true;
   @ManyToMany(fetch = FetchType.EAGER)
   private Collection<Role> roles = new ArrayList<>();
}
