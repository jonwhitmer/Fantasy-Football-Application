package com.fantasyfootballapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fantasyfootballapp.domain.User;
import com.fantasyfootballapp.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class UserController {
    
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User register(@RequestParam String usernameOrEmail, @RequestParam String password) {
        return userService.registerUser(usernameOrEmail, password, usernameOrEmail);
    }

    @PostMapping("/login")
    public User login(@RequestParam String usernameOrEmail, @RequestParam String password) {
        return userService.authenticate(usernameOrEmail, password);
    }
}
