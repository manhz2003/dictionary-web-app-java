package com.example.dictionaryapplication.service;

import com.example.dictionaryapplication.entity.Dictionary;
import com.example.dictionaryapplication.entity.ExampleDictionary;
import com.example.dictionaryapplication.repository.DictionaryRepository;
import com.example.dictionaryapplication.repository.ExampleDictionaryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class DictionaryService {
    private final DictionaryRepository dictionaryRepository;

    private final ExampleDictionaryRepository exampleDictionaryRepository;

    public DictionaryService(DictionaryRepository dictionaryRepository, ExampleDictionaryRepository exampleDictionaryRepository) {
        this.dictionaryRepository = dictionaryRepository;
        this.exampleDictionaryRepository = exampleDictionaryRepository;
    }

    public Dictionary saveOrUpdateDictionary(Dictionary dictionary, List<ExampleDictionary> examples) {
        Dictionary savedDictionary = dictionaryRepository.save(dictionary);
        exampleDictionaryRepository.deleteByDictionaryId(savedDictionary.getId());

        for (ExampleDictionary example : examples) {
            example.setDictionary(savedDictionary);
            exampleDictionaryRepository.save(example);
        }

        return savedDictionary;
    }
    public List<Dictionary> getAllDictionaries() {
        List<Dictionary> dictionaries = dictionaryRepository.findAll();

        for (Dictionary dictionary : dictionaries) {
            List<ExampleDictionary> examples = exampleDictionaryRepository.findByDictionaryId(dictionary.getId());
            List<String> englishExamples = new ArrayList<>();
            List<String> vietnameseExamples = new ArrayList<>();

            for (ExampleDictionary example : examples) {
                englishExamples.add(example.getExample());
                vietnameseExamples.add(example.getExampleTranslation());
            }

            dictionary.setEnglishExample(englishExamples);
            dictionary.setVietnameseExample(vietnameseExamples);
        }

        return dictionaries;
    }


    public Optional<Dictionary> getDictionaryById(Long id) {
        return dictionaryRepository.findById(id);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void deleteDictionary(Long id) {
        try {
            exampleDictionaryRepository.deleteByDictionaryId(id);
            dictionaryRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete dictionary with id " + id, e);
        }
    }
}