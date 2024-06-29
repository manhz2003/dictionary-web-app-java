package com.example.dictionaryapplication.repository;

import com.example.dictionaryapplication.entity.Dictionary;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public interface DictionaryRepository extends JpaRepository<Dictionary, Long> {
    Dictionary findByVietnameseAndEnglish(String vietnamese, String english);
    long countByVietnameseIsNotNull();
    long countByExplanationIsNotNull();

}
