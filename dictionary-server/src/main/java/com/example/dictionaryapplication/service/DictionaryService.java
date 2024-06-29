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

        // Xóa các ví dụ cũ liên quan đến từ điển này
        exampleDictionaryRepository.deleteByDictionaryId(savedDictionary.getId());

        // Lưu các ví dụ mới
        for (ExampleDictionary example : examples) {
            example.setDictionary(savedDictionary);
            exampleDictionaryRepository.save(example);
        }

        return savedDictionary;
    }
    public List<Dictionary> getAllDictionaries() {
        return dictionaryRepository.findAll();
    }

    public Optional<Dictionary> getDictionaryById(Long id) {
        return dictionaryRepository.findById(id);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void deleteDictionary(Long id) {
        exampleDictionaryRepository.deleteByDictionaryId(id);
        dictionaryRepository.deleteById(id);
    }


}