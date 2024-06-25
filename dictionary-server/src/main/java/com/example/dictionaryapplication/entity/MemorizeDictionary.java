package com.example.dictionaryapplication.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "`memorize_dictionaries`")
public class MemorizeDictionary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "`user_id`", referencedColumnName = "`id`")
    private User user;

    @ManyToOne
    @JoinColumn(name = "`dictionary_id`", referencedColumnName = "`id`")
    private Dictionary dictionary;

    // Constructors
    // Getters and setters
    // ...

    // Constructors
    public MemorizeDictionary() {
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Dictionary getDictionary() {
        return dictionary;
    }

    public void setDictionary(Dictionary dictionary) {
        this.dictionary = dictionary;
    }
}
