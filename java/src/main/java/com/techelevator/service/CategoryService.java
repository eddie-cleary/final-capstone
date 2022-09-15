package com.techelevator.service;

import com.techelevator.entity.Category;
import com.techelevator.exception.ApiException;

import java.util.List;

public interface CategoryService {

    Category addCategory(Category category) throws ApiException;
    List<Category> getCategories();
}
