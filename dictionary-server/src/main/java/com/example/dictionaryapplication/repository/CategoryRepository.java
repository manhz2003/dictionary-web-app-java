package com.example.dictionaryapplication.repository;

import com.example.dictionaryapplication.entity.Category;
import com.example.dictionaryapplication.entity.Dictionary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Autowired
    CategoryRepository categoryRepository = null;
}
