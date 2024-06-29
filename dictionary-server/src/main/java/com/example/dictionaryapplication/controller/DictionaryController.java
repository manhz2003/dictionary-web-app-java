package com.example.dictionaryapplication.controller;
import com.example.dictionaryapplication.entity.Dictionary;
import com.example.dictionaryapplication.entity.ExampleDictionary;
import com.example.dictionaryapplication.repository.DictionaryRepository;
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
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/dictionaries")
public class DictionaryController {

    private final DictionaryService dictionaryService;
    private final CategoryRepository categoryRepository;

    public DictionaryController(DictionaryService dictionaryService, CategoryRepository categoryRepository, DictionaryRepository dictionaryRepository) {
        this.dictionaryService = dictionaryService;
        this.categoryRepository = categoryRepository;
    }

    @PostMapping("/dictionary")
    public ResponseEntity<?> createOrUpdateDictionary(@RequestBody List<DictionaryPayload> payloads) {
        try {
            List<Dictionary> savedDictionaries = new ArrayList<>();

            for (DictionaryPayload payload : payloads) {
                Dictionary dictionary = new Dictionary();
                dictionary.setEnglish(payload.getEnglish());
                dictionary.setVietnamese(payload.getVietnamese());
                dictionary.setPhoneticTranscription(payload.getPhoneticTranscription());
                dictionary.setExplanation(payload.getExplain());
                dictionary.setWordType(payload.getWordType());
                dictionary.setThumbnail(payload.getThumbnail());

                Optional<Category> category = categoryRepository.findById(payload.getCategory());
                if (!category.isPresent()) {
                    return ResponseEntity.badRequest().body("Category does not exist");
                }
                dictionary.setCategory(category.get());

                List<ExampleDictionary> examples = new ArrayList<>();
                for (int i = 0; i < payload.getEnglishExample().size(); i++) {
                    ExampleDictionary example = new ExampleDictionary();
                    example.setExample(payload.getEnglishExample().get(i));
                    example.setExampleTranslation(payload.getVietnameseExample().get(i));
                    example.setDictionary(dictionary);
                    examples.add(example);
                }

                Dictionary savedDictionary = dictionaryService.saveOrUpdateDictionary(dictionary, examples);
                savedDictionaries.add(savedDictionary);
            }

            return ResponseEntity.ok(savedDictionaries);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error: " + e.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateDictionaries(@RequestBody List<DictionaryUpdatePayload> payloads) {
        try {
            List<Dictionary> updatedDictionaries = new ArrayList<>();

            for (DictionaryUpdatePayload payload : payloads) {
                Long id = payload.getId();
                Optional<Dictionary> existingDictionaryOptional = dictionaryService.getDictionaryById(id);

                if (!existingDictionaryOptional.isPresent()) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Dictionary with ID " + id + " not found.");
                }

                Dictionary existingDictionary = existingDictionaryOptional.get();

                // Check if the category exists in the database before proceeding
                Optional<Category> category = categoryRepository.findById(payload.getCategory());
                if (!category.isPresent()) {
                    return ResponseEntity.badRequest().body("Category with ID " + payload.getCategory() + " does not exist");
                }

                // Update fields from payload
                existingDictionary.setVietnamese(payload.getVietnamese());
                existingDictionary.setEnglish(payload.getEnglish());
                existingDictionary.setPhoneticTranscription(payload.getPhoneticTranscription());
                existingDictionary.setExplanation(payload.getExplain());
                existingDictionary.setWordType(payload.getWordType());
                existingDictionary.setThumbnail(payload.getThumbnail());
                existingDictionary.setCategory(category.get());

                // Save or update examples
                List<ExampleDictionary> examples = new ArrayList<>();
                if (payload.getEnglishExample() != null && payload.getVietnameseExample() != null) {
                    for (int i = 0; i < payload.getEnglishExample().size(); i++) {
                        ExampleDictionary example = new ExampleDictionary();
                        example.setExample(payload.getEnglishExample().get(i));
                        example.setExampleTranslation(payload.getVietnameseExample().get(i));
                        example.setDictionary(existingDictionary);
                        examples.add(example);
                    }
                }

                dictionaryService.saveOrUpdateDictionary(existingDictionary, examples);
                updatedDictionaries.add(existingDictionary);
            }

            return ResponseEntity.ok(updatedDictionaries);
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

    @GetMapping("/total-counts")
    public ResponseEntity<TotalCountsResponse> getTotalCounts() {
        long totalVietnameseCount = dictionaryService.getTotalVietnameseCount();
        long totalExplanationsCount = dictionaryService.getTotalExplanationsCount();

        TotalCountsResponse countsResponse = new TotalCountsResponse(totalVietnameseCount, totalExplanationsCount);
        return ResponseEntity.ok(countsResponse);
    }

    static class TotalCountsResponse {
        private final long totalVietnameseCount;
        private final long totalExplanationsCount;

        public TotalCountsResponse(long totalVietnameseCount, long totalExplanationsCount) {
            this.totalVietnameseCount = totalVietnameseCount;
            this.totalExplanationsCount = totalExplanationsCount;
        }

        public long getTotalVietnameseCount() {
            return totalVietnameseCount;
        }

        public long getTotalExplanationsCount() {
            return totalExplanationsCount;
        }
    }

}

@Getter
@Setter
class DictionaryPayload {
    private String english;
    private String vietnamese;
    private String phoneticTranscription;
    private String explain;
    private String wordType;
    private Long category;
    private String thumbnail;
    private List<String> englishExample;
    private List<String> vietnameseExample;
}


@Getter
@Setter
class DictionaryUpdatePayload {
    private Long id;
    private String english;
    private String vietnamese;
    private String phoneticTranscription;
    private String explain;
    private String wordType;
    private Long category;
    private String thumbnail;
    private List<String> englishExample;
    private List<String> vietnameseExample;

    // Getters and setters
}

@Setter
@Getter
class SearchRequest {
    // Getter và Setter
    private String keyword;

}