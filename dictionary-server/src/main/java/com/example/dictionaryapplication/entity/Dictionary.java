package com.example.dictionaryapplication.entity;

import jakarta.persistence.*;


    @Entity
    @Table(name = "dictionaries")
    public class Dictionary {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(name = "vietnamese")
        private String vietnamese;

        @Column(name = "english")
        private String english;

        @Column(name = "phonetic_transcription")
        private String phoneticTranscription;

        @Column(name = "explanation") // Đổi tên cột này
        private String explanation; // Đổi tên biến và tên phương thức setter

        @Column(name = "word_type")
        private String wordType;

        @Column(name = "thumbnail")
        private String thumbnail;

        @ManyToOne
        @JoinColumn(name = "category_id", referencedColumnName = "id")
        private Category category;

        // Constructors
        // Getters and setters
        // ...

        // Constructors
        public Dictionary() {
        }

        // Getters and Setters
        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getVietnamese() {
            return vietnamese;
        }

        public void setVietnamese(String vietnamese) {
            this.vietnamese = vietnamese;
        }

        public String getEnglish() {
            return english;
        }

        public void setEnglish(String english) {
            this.english = english;
        }

        public String getPhoneticTranscription() {
            return phoneticTranscription;
        }

        public void setPhoneticTranscription(String phoneticTranscription) {
            this.phoneticTranscription = phoneticTranscription;
        }

        public String getExplanation() {
            return explanation;
        }

        public void setExplanation(String explanation) {
            this.explanation = explanation;
        }

        public String getWordType() {
            return wordType;
        }

        public void setWordType(String wordType) {
            this.wordType = wordType;
        }

        public String getThumbnail() {
            return thumbnail;
        }

        public void setThumbnail(String thumbnail) {
            this.thumbnail = thumbnail;
        }

        public Category getCategory() {
            return category;
        }

        public void setCategory(Category category) {
            this.category = category;
        }
    }

