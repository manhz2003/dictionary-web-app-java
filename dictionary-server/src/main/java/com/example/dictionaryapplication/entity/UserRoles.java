package com.example.dictionaryapplication.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "`user_roles`")
public class UserRoles {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "`user_id`", referencedColumnName = "`id`")
    private User user;

    @ManyToOne
    @JoinColumn(name = "`role_id`", referencedColumnName = "`id`")
    private Role role;

    // Constructors
    // Getters and setters
    // ...

    // Constructors
    public UserRoles() {
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

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
