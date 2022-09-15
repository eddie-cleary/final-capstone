package com.techelevator.service;

import com.cloudinary.api.exceptions.BadRequest;
import com.techelevator.entity.Category;
import com.techelevator.exception.ApiException;

import java.security.Principal;
import java.util.List;

public interface CategoryService {

    Category addCategory(Category category) throws ApiException;
    List<Category> getCategories();
}
