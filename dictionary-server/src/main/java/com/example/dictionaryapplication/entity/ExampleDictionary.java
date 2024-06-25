package com.example.dictionaryapplication.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "example_dictionaries")
public class ExampleDictionary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "dictionary_id", referencedColumnName = "id")
    private Dictionary dictionary;

    @Column(name = "example_vietnamese")
    private String exampleVietnamese;

    @Column(name = "example_english")
    private String exampleEnglish;

    // Constructors
    // Getters and setters
    // ...

    // Constructors
    public ExampleDictionary() {
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Dictionary getDictionary() {
        return dictionary;
    }

    public void setDictionary(Dictionary dictionary) {
        this.dictionary = dictionary;
    }

    public String getExampleVietnamese() {
        return exampleVietnamese;
    }

    public void setExampleVietnamese(String exampleVietnamese) {
        this.exampleVietnamese = exampleVietnamese;
    }

    public String getExampleEnglish() {
        return exampleEnglish;
    }

    public void setExampleEnglish(String exampleEnglish) {
        this.exampleEnglish = exampleEnglish;
    }
}
