package com.techelevator.service;

import com.techelevator.entity.Category;

import java.security.Principal;
import java.util.List;

public interface CategoryService {

    Category addCategory(Category category);
    List<Category> getCategories();
}
