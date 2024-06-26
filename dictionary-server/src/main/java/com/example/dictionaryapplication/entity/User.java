package com.example.dictionaryapplication.entity;

import jakarta.persistence.*;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullname;
    private String email;
    private String phoneNumber;
    private String address;
    private String password;
    private String avatar;
    private String refreshToken;

    @Column(columnDefinition = "TINYINT(1) default 1")
    private Boolean status;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<UserRoles> userRoles = new HashSet<>();

    // Phương thức để trả về danh sách roles của user
    public Set<Role> getRoles() {
        if (userRoles == null) {
            userRoles = new HashSet<>();
        }
        return userRoles.stream()
                .map(UserRoles::getRole)
                .collect(Collectors.toSet());
    }

    // Phương thức để trả về thông tin cơ bản của user
    public Map<String, Object> getBasicUserInfo() {
        Map<String, Object> user = new HashMap<>();
        user.put("id", id);
        user.put("fullname", fullname);
        user.put("email", email);
        user.put("phoneNumber", phoneNumber);
        user.put("address", address);
        user.put("avatar", avatar);
        user.put("status", status);
        user.put("roles", getRoles().stream().map(role -> {
            Map<String, Object> roleMap = new HashMap<>();
            roleMap.put("nameRole", role.getNameRole());
            roleMap.put("type", role.getType());
            return roleMap;
        }).collect(Collectors.toList()));
        return user;
    }

    // Constructors
    public User() {
        this.userRoles = new HashSet<>();
    }

    public User(String fullname, String email, String phoneNumber, String address, String password, String avatar, String refreshToken, Boolean status) {
        this.fullname = fullname;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.password = password;
        this.avatar = avatar;
        this.refreshToken = refreshToken;
        this.status = status;
        this.userRoles = new HashSet<>();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Set<UserRoles> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(Set<UserRoles> userRoles) {
        this.userRoles = userRoles;
    }

    public void setRoles(List<Role> roles) {
        this.userRoles = roles.stream().map(role -> {
            UserRoles userRole = new UserRoles();
            userRole.setRole(role);
            userRole.setUser(this);
            return userRole;
        }).collect(Collectors.toSet());
    }
}
