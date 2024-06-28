package com.example.dictionaryapplication.repository;

import com.example.dictionaryapplication.entity.ExampleDictionary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExampleDictionaryRepository extends JpaRepository<ExampleDictionary, Long> {
    void deleteByDictionaryId(Long dictionaryId);
}
