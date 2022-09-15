package com.techelevator.service;

import com.techelevator.entity.Category;
import com.techelevator.exception.ApiException;
import com.techelevator.repo.CategoryRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepo categoryRepo;

    @Override
    public Category addCategory(Category category) throws ApiException {
        Category categoryFound = categoryRepo.findByName(category.getName());
        if (!Objects.isNull(categoryFound)) {
            throw new ApiException("Category " + category.getName() + " already exists.");
        }
        return categoryRepo.save(category);
    }

    @Override
    public List<Category> getCategories() {
        return categoryRepo.findAll();
    }
}
