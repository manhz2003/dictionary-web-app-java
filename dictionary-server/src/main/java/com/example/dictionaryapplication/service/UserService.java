package com.example.dictionaryapplication.service;

import com.example.dictionaryapplication.entity.Role;
import com.example.dictionaryapplication.entity.User;
import com.example.dictionaryapplication.entity.UserRoles;
import com.example.dictionaryapplication.repository.RoleRepository;
import com.example.dictionaryapplication.repository.UserRepository;
import com.example.dictionaryapplication.repository.UserRolesRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserRolesRepository userRolesRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public User login(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        List<Role> roles = userRolesRepository.findRolesByUserId(user.getId());
        user.setRoles(new ArrayList<>(new HashSet<>(roles)));
        return user;
    }


    public UserService(UserRepository userRepository, RoleRepository roleRepository, UserRolesRepository userRolesRepository, PasswordEncoder passwordEncoder, EmailService emailService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.userRolesRepository = userRolesRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    public User registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new RuntimeException("Email is already registered");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setStatus(true);
        User savedUser = userRepository.save(user);

        Role userRole = roleRepository.findByNameRole("USER");
        UserRoles userRoles = new UserRoles(savedUser, userRole);
        userRolesRepository.save(userRoles);

        return savedUser;
    }

    public User registerAdmin(User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new RuntimeException("Email is already registered");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setStatus(true);
        User savedUser = userRepository.save(user);

        Role adminRole = roleRepository.findByNameRole("ADMIN");
        UserRoles userRoles = new UserRoles(savedUser, adminRole);
        userRolesRepository.save(userRoles);

        return savedUser;
    }


    public void changePasswordByEmailAndOldPassword(String email, String oldPassword, String newPassword) {
        User user = userRepository.findByEmail(email);
        if (user == null || !passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }


    public void forgotPassword(String email, String newPassword) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("Email not found");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        // Gửi email thông báo cấp mật khẩu mới
        emailService.sendForgotPasswordEmail(email, newPassword);
    }
}
