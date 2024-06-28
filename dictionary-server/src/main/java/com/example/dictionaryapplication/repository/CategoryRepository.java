package com.example.dictionaryapplication.repository;

import com.example.dictionaryapplication.entity.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Autowired
    CategoryRepository categoryRepository = null;
}
