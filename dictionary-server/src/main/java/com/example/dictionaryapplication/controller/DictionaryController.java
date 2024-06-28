package com.example.dictionaryapplication.controller;

import com.example.dictionaryapplication.entity.Dictionary;
import com.example.dictionaryapplication.entity.ExampleDictionary;
import com.example.dictionaryapplication.service.DictionaryService;
import com.example.dictionaryapplication.entity.Category;
import com.example.dictionaryapplication.repository.CategoryRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/dictionaries")
public class DictionaryController {

    private final DictionaryService dictionaryService;
    private final CategoryRepository categoryRepository;

    public DictionaryController(DictionaryService dictionaryService, CategoryRepository categoryRepository) {
        this.dictionaryService = dictionaryService;
        this.categoryRepository = categoryRepository;
    }

    @PostMapping("/dictionary")
    public ResponseEntity<?> createOrUpdateDictionary(@RequestBody List<DictionaryPayload> payloads) {
        try {
            List<Dictionary> savedDictionaries = new ArrayList<>();

            for (DictionaryPayload payload : payloads) {
                Dictionary dictionary = payload.getDictionary();

                // Ensure the category is set correctly and exists
                if (dictionary.getCategory() == null || dictionary.getCategory().getId() == null) {
                    return ResponseEntity.badRequest().body("Category ID cannot be null");
                }

                // Check if the category exists in the database before proceeding
                Optional<Category> category = categoryRepository.findById(dictionary.getCategory().getId());
                if (!category.isPresent()) {
                    return ResponseEntity.badRequest().body("Category does not exist");
                }

                List<ExampleDictionary> examples = payload.getExamples();
                Dictionary savedDictionary = dictionaryService.saveOrUpdateDictionary(dictionary, examples);
                savedDictionaries.add(savedDictionary); // Add the saved dictionary to the list
            }

            return ResponseEntity.ok(savedDictionaries);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error: " + e.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateDictionary(@RequestBody DictionaryUpdatePayload payload) {
        try {
            Dictionary updatedDictionary = payload.getDictionary();
            Long id = updatedDictionary.getId();

            // Ensure the dictionary ID exists
            Optional<Dictionary> existingDictionaryOptional = dictionaryService.getDictionaryById(id);
            if (!existingDictionaryOptional.isPresent()) {
                return ResponseEntity.notFound().build();
            }

            Dictionary existingDictionary = existingDictionaryOptional.get();

            // Check if the category exists in the database before proceeding
            Optional<Category> category = categoryRepository.findById(updatedDictionary.getCategory().getId());
            if (!category.isPresent()) {
                return ResponseEntity.badRequest().body("Category does not exist");
            }

            // Update fields from payload
            existingDictionary.setVietnamese(updatedDictionary.getVietnamese());
            existingDictionary.setEnglish(updatedDictionary.getEnglish());
            existingDictionary.setPhoneticTranscription(updatedDictionary.getPhoneticTranscription());
            existingDictionary.setExplanation(updatedDictionary.getExplanation());
            existingDictionary.setWordType(updatedDictionary.getWordType());
            existingDictionary.setThumbnail(updatedDictionary.getThumbnail());
            existingDictionary.setCategory(updatedDictionary.getCategory());

            // Save examples if provided
            List<ExampleDictionary> examples = payload.getExamples();
            if (examples != null && !examples.isEmpty()) {
                dictionaryService.saveOrUpdateDictionary(existingDictionary, examples);
            } else {
                dictionaryService.saveOrUpdateDictionary(existingDictionary, null);
            }

            return ResponseEntity.ok(existingDictionary);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Dictionary>> getAllDictionaries() {
        List<Dictionary> dictionaries = dictionaryService.getAllDictionaries();
        return ResponseEntity.ok(dictionaries);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Dictionary> getDictionaryById(@PathVariable Long id) {
        Optional<Dictionary> dictionary = dictionaryService.getDictionaryById(id);
        return dictionary.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDictionary(@PathVariable Long id) {
        dictionaryService.deleteDictionary(id);
        return ResponseEntity.noContent().build();
    }
}

@Getter
@Setter
class DictionaryPayload {
    private Dictionary dictionary;
    private List<ExampleDictionary> examples;
}

@Getter
@Setter
class DictionaryUpdatePayload {
    private Dictionary dictionary;
    private List<ExampleDictionary> examples;
}

