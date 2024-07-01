package com.example.dictionaryapplication.repository;

import com.example.dictionaryapplication.entity.Category;
import com.example.dictionaryapplication.entity.Dictionary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface DictionaryRepository extends JpaRepository<Dictionary, Long> {

    long countByVietnameseIsNotNull();
    long countByExplanationIsNotNull();

    Page<Dictionary> findByVietnameseContainingIgnoreCase(String keyword, Pageable pageable);
    @Transactional
    List<Dictionary> findByCategoryId(Long categoryId);
    @Query("SELECT d FROM Dictionary d WHERE d.vietnamese LIKE %:keyword%")
    List<Dictionary> findByVietnameseContaining(@Param("keyword") String keyword, Pageable pageable);

}
