package com.example.dictionaryapplication.service;

import com.example.dictionaryapplication.entity.Category;
import com.example.dictionaryapplication.exception.ResourceNotFoundException;
import com.example.dictionaryapplication.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Optional<Category> getCategoryById(Long id) {
        return categoryRepository.findById(id);
    }

    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    public Category updateCategory(Category categoryDetails) {
        Category category = categoryRepository.findById(categoryDetails.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id " + categoryDetails.getId()));

        category.setNameCategory(categoryDetails.getNameCategory());
        category.setThumbnail(categoryDetails.getThumbnail());
        category.setDescription(categoryDetails.getDescription());

        return categoryRepository.save(category);
    }

    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        categoryRepository.delete(category);
    }

    public long countCategories() {
        return categoryRepository.count();
    }
}
