package com.example.dictionaryapplication.controller;

import com.example.dictionaryapplication.entity.Category;
import com.example.dictionaryapplication.service.CategoryService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        Category category = categoryService.getCategoryById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        return ResponseEntity.ok(category);
    }

    @PostMapping
    public Category createCategory(@RequestBody Category category) {
        return categoryService.createCategory(category);
    }

    @PutMapping
    public ResponseEntity<Category> updateCategory(@RequestBody Category categoryDetails) {
        Category updatedCategory = categoryService.updateCategory(categoryDetails);
        return ResponseEntity.ok(updatedCategory);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        try {
            categoryService.deleteCategory(id);
            return ResponseEntity.noContent().build();
        } catch (DataIntegrityViolationException e) {
            // Handle specific exception for data integrity violation
            return ResponseEntity.status(HttpStatus.CONFLICT).build(); // Conflict status code (409) could be appropriate
        } catch (RuntimeException e) {
            // Handle other runtime exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Generic internal server error
        }
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countCategories() {
        long count = categoryService.countCategories();
        return ResponseEntity.ok(count);
    }
}