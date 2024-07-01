package com.example.dictionaryapplication.service;

import com.example.dictionaryapplication.entity.Category;
import com.example.dictionaryapplication.entity.Dictionary;
import com.example.dictionaryapplication.entity.ExampleDictionary;
import com.example.dictionaryapplication.exception.ResourceNotFoundException;
import com.example.dictionaryapplication.repository.CategoryRepository;
import com.example.dictionaryapplication.repository.DictionaryRepository;
import com.example.dictionaryapplication.repository.ExampleDictionaryRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final DictionaryRepository dictionaryRepository;
    private final ExampleDictionaryRepository exampleRepository;

    public CategoryService(CategoryRepository categoryRepository, DictionaryRepository dictionaryRepository, ExampleDictionaryRepository exampleRepository) {
        this.categoryRepository = categoryRepository;

        this.dictionaryRepository = dictionaryRepository;
        this.exampleRepository = exampleRepository;
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

    @Transactional
    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        // Delete all dictionaries associated with this category
        List<Dictionary> dictionaries = dictionaryRepository.findByCategoryId(id);
        for (Dictionary dictionary : dictionaries) {
            // Delete all examples associated with this dictionary
            List<ExampleDictionary> examples = exampleRepository.findByDictionaryId(dictionary.getId());
            for (ExampleDictionary example : examples) {
                exampleRepository.delete(example);
            }
            // Delete the dictionary itself
            dictionaryRepository.delete(dictionary);
        }

        // Delete the category
        categoryRepository.delete(category);
    }


    public long countCategories() {
        return categoryRepository.count();
    }
}