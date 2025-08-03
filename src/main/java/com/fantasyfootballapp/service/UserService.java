package com.fantasyfootballapp.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.fantasyfootballapp.domain.User;
import com.fantasyfootballapp.repository.UserRepository;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User registerUser(String username, String password, String email) {
        if (username == null || password == null || email == null) {
            throw new RuntimeException("Username, password, and email are required");
        }

        if (userRepository.findByUsername(username).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        String hashedPassword = passwordEncoder.encode(password);

        User user = new User(null, username, hashedPassword, email);
        return userRepository.save(user);
    }

    public User authenticate(String usernameOrEmail, String password) {
        if (usernameOrEmail.contains("@")) {
            Optional<User> user = userRepository.findByEmail(usernameOrEmail);
            if (user.isPresent()) {
                if (passwordEncoder.matches(password, user.get().getPassword())) {
                    return user.get();
                }
            }
        } else {
            Optional<User> user = userRepository.findByUsername(usernameOrEmail);
            if (user.isPresent()) {
                if (passwordEncoder.matches(password, user.get().getPassword())) {
                    return user.get();
                }
            }
        }

        throw new RuntimeException("Invalid username or email");
    }
}
