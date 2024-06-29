package com.example.dictionaryapplication.entity;

import jakarta.persistence.*;


@Entity
@Table(name = "examples")
public class ExampleDictionary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "example")
    private String example;

    @Column(name = "example_translation")
    private String exampleTranslation;

    @ManyToOne
    @JoinColumn(name = "dictionary_id")
    private Dictionary dictionary;

    // Getters và Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getExample() {
        return example;
    }

    public void setExample(String example) {
        this.example = example;
    }

    public String getExampleTranslation() {
        return exampleTranslation;
    }

    public void setExampleTranslation(String exampleTranslation) {
        this.exampleTranslation = exampleTranslation;
    }

    public Dictionary getDictionary() {
        return dictionary;
    }

    public void setDictionary(Dictionary dictionary) {
        this.dictionary = dictionary;
    }
}
