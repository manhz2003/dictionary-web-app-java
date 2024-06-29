package com.example.dictionaryapplication.repository;

import com.example.dictionaryapplication.entity.Dictionary;
import com.example.dictionaryapplication.entity.ExampleDictionary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExampleDictionaryRepository extends JpaRepository<ExampleDictionary, Long> {
    void deleteByDictionaryId(Long dictionaryId);
    List<ExampleDictionary> findByDictionaryId(Long dictionaryId);
}
