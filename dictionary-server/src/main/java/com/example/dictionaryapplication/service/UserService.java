package com.example.dictionaryapplication.service;

import com.example.dictionaryapplication.entity.Role;
import com.example.dictionaryapplication.entity.User;
import com.example.dictionaryapplication.entity.UserRoles;
import com.example.dictionaryapplication.repository.RoleRepository;
import com.example.dictionaryapplication.repository.UserRepository;
import com.example.dictionaryapplication.repository.UserRolesRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

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

    // Service method
    public void updateUserProfile(Long userId, String fullname, String email, String phoneNumber, String address, String avatarUrl) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFullname(fullname);
        user.setEmail(email);
        user.setPhoneNumber(phoneNumber);
        user.setAddress(address);
        user.setAvatarUrl(avatarUrl);

        userRepository.save(user);
    }

    // Service method
    public User getUserProfile(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public long getTotalUsers() {
        return userRepository.count();
    }

    public List<Map<String, Object>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(user -> {
                    Map<String, Object> userData = new HashMap<>();
                    userData.put("id", user.getId());
                    userData.put("fullname", user.getFullname());
                    userData.put("email", user.getEmail());
                    userData.put("phoneNumber", user.getPhoneNumber());
                    userData.put("address", user.getAddress());
                    userData.put("role", user.getRoles().stream()
                            .map(Role::getNameRole)
                            .collect(Collectors.toList()));
                    return userData;
                })
                .collect(Collectors.toList());
    }

    public void deleteUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Xóa các bản ghi trong bảng UserRoles trước khi xóa User
        List<UserRoles> userRoles = userRolesRepository.findByUser_Id(userId);
        userRolesRepository.deleteAll(userRoles);
        userRepository.delete(user);
    }

    public void updateUserProfileAndRoles(Long userId, String fullname, String email, String phoneNumber, String address, Long roleId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFullname(fullname);
        user.setEmail(email);
        user.setPhoneNumber(phoneNumber);
        user.setAddress(address);

        // Tìm UserRoles của người dùng
        UserRoles userRole = (UserRoles) userRolesRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("User role not found"));

        // Cập nhật role
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        userRole.setRole(role);

        userRepository.save(user);
        userRolesRepository.save(userRole);
    }

    public User createUser(String fullname, String email, String phoneNumber, String address, Long roleId) {
        // Kiểm tra xem email đã được đăng ký chưa
        if (userRepository.findByEmail(email) != null) {
            throw new RuntimeException("Email is already registered");
        }

        // Tạo đối tượng User
        User user = new User();
        user.setFullname(fullname);
        user.setEmail(email);
        user.setPhoneNumber(phoneNumber);
        user.setAddress(address);
        user.setPassword(passwordEncoder.encode("defaultPassword")); // Có thể tạo mật khẩu mặc định

        // Lưu User vào database
        User savedUser = userRepository.save(user);

        // Tìm Role dựa trên roleId
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        // Tạo đối tượng UserRoles để gán User với Role
        UserRoles userRoles = new UserRoles(savedUser, role);
        userRolesRepository.save(userRoles);

        return savedUser;
    }
}
