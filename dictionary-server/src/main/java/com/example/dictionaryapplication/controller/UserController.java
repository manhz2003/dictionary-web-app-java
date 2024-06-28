package com.example.dictionaryapplication.controller;

import com.example.dictionaryapplication.entity.User;
import com.example.dictionaryapplication.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register/user")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            User registeredUser = userService.registerUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(registeredUser);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/register/admin")
    public ResponseEntity<?> registerAdmin(@RequestBody User user) {
        try {
            User registeredAdmin = userService.registerAdmin(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(registeredAdmin);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        try {
            User loggedInUser = userService.login(email, password);
            Map<String, Object> response = loggedInUser.getBasicUserInfo();

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePasswordByEmailAndOldPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String oldPassword = request.get("oldPassword");
        String newPassword = request.get("newPassword");

        try {
            userService.changePasswordByEmailAndOldPassword(email, oldPassword, newPassword);
            return ResponseEntity.ok("Password changed successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping(value = "/forgot-password", produces = "application/json")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");

        try {
            String newPassword = generateNewPassword();
            userService.forgotPassword(email, newPassword);

            return ResponseEntity.ok("Password updated successfully. Check your email for the new password.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    private String generateNewPassword() {
        return UUID.randomUUID().toString().substring(0, 8);
    }

    @PutMapping("/update-profile")
    public ResponseEntity<String> updateProfile(@RequestBody Map<String, Object> requestData) {
        Long userId = Long.parseLong(requestData.get("userId").toString());
        String fullname = (String) requestData.get("fullname");
        String email = (String) requestData.get("email");
        String phoneNumber = (String) requestData.get("phoneNumber");
        String address = (String) requestData.get("address");
        String avatarUrl = (String) requestData.get("avatar");

        try {
            userService.updateUserProfile(userId, fullname, email, phoneNumber, address, avatarUrl);
            return ResponseEntity.ok("Profile updated successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/get-profile/{userId}")
    public ResponseEntity<?> getProfile(@PathVariable Long userId) {
        try {
            User user = userService.getUserProfile(userId);
            Map<String, Object> profileData = new HashMap<>();
            profileData.put("id", user.getId());
            profileData.put("fullname", user.getFullname());
            profileData.put("email", user.getEmail());
            profileData.put("phoneNumber", user.getPhoneNumber());
            profileData.put("address", user.getAddress());
            profileData.put("avatar", user.getAvatarUrl());

            return ResponseEntity.ok(profileData);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/total")
    public long getTotalUsers() {
        return userService.getTotalUsers();
    }

    @GetMapping("/all")
    public ResponseEntity<List<Map<String, Object>>> getAllUsers() {
        List<Map<String, Object>> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("delete/{userId}")
    public ResponseEntity<String> deleteUserById(@PathVariable Long userId) {
        userService.deleteUserById(userId);
        return ResponseEntity.ok("User deleted successfully");
    }

    @PutMapping("/update-user")
    public ResponseEntity<String> updateUserProfileAndRoles(@RequestBody Map<String, Object> requestData) {
        Long userId = Long.parseLong(requestData.get("userId").toString());
        String fullname = (String) requestData.get("fullname");
        String email = (String) requestData.get("email");
        String phoneNumber = (String) requestData.get("phoneNumber");
        String address = (String) requestData.get("address");
        Long roleId = Long.parseLong(requestData.get("roleId").toString());

        try {
            userService.updateUserProfileAndRoles(userId, fullname, email, phoneNumber, address, roleId);
            return ResponseEntity.ok("Profile updated successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/create-user")
    public ResponseEntity<String> createUser(@RequestBody Map<String, Object> requestData) {
        String fullname = (String) requestData.get("fullname");
        String email = (String) requestData.get("email");
        String phoneNumber = (String) requestData.get("phoneNumber");
        String address = (String) requestData.get("address");
        Long roleId = Long.parseLong(requestData.get("roleId").toString());

        try {
            userService.createUser(fullname, email, phoneNumber, address, roleId);
            return ResponseEntity.status(HttpStatus.CREATED).body("User created successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}