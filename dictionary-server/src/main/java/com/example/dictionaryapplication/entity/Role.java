package com.example.dictionaryapplication.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
@Table(name = "`roles`")
public class Role {
    // Getters and Setters
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;
    private String nameRole;

    // Constructors
    // Getters and setters
    // ...

    // Constructors
    public Role() {
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setNameRole(String nameRole) {
        this.nameRole = nameRole;
    }
}
