package com.example.dictionaryapplication.repository;

import com.example.dictionaryapplication.entity.Dictionary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface DictionaryRepository extends JpaRepository<Dictionary, Long> {

    long countByVietnameseIsNotNull();
    long countByExplanationIsNotNull();

    Page<Dictionary> findByVietnameseContainingIgnoreCase(String keyword, Pageable pageable);
    List<Dictionary> findByCategoryId(Long categoryId);
}
