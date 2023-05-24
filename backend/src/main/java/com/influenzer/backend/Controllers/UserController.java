package com.influenzer.backend.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.influenzer.backend.Models.User;
import com.influenzer.backend.Repositories.UserRepo;

@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:8080" }, allowedHeaders = "*")
@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    UserRepo userRepo;

    @GetMapping("/findall")
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable("id") String id) {
        return userRepo.findById(id).orElse(null);
    }

    @PostMapping("/add")
    public String createUser(@RequestBody User user) {
        // if (!user.getPassword().equals(user.getConfirmPassword())) {
        // return "Passwords Does not match";
        // }
        userRepo.save(user);
        return "User Created";
    }

    @GetMapping("/userProfile")
    public User getUserByEmailAndPassword(@RequestParam("email") String email,@RequestParam("password") String password) {
        User user = userRepo.findByEmailAndPassword(email, password);
        if (user != null) {
            return user;
        } else {
            return null;
        }
    }

    @GetMapping("/follow")
    public User getUserByEmailAndPassword(@RequestParam("status") String status) {
        User user = userRepo.findByStatus(status);
        if (user != null) {
            return user;
        } else {
            return null;
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") String id, @RequestBody User user) {
        User existingUser = userRepo.findById(id).orElse(null);
        if (existingUser == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        user.setId(id);
        User updatedUser = userRepo.save(user);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable("id") String id) {
        try {
            userRepo.deleteById(id);
            return "Deletion Successful";
        } catch (Exception e){
            return "Something went wrong." + e;
        }
        
    }

    // @PostMapping("/login")
    // public String loginUser(@RequestBody User user) {
    // Optional<User> existingUser =
    // userRepo.findByEmailAndPassword(user.getEmail(), user.getPassword());
    // if (existingUser.isPresent()) {
    // return "Login successful";
    // }
    // return "Invalid email or password";
    // }

    // Login a user
    @PostMapping("/login")
    public String loginUser(String username, String password) {

        // Validate the user input
        if (username == null || username.isEmpty()) {
            return "redirect:/login?error=username";
        }
        if (password == null || password.isEmpty()) {
            return "redirect:/login?error=password";
        }

        // Find the user by username
        User user = userRepo.findByUsername(username);

        // Check if the user exists and the password is correct
        if (user == null || !user.getPassword().equals(password)) {
            return "redirect:/login?error=invalidCredentials";
        }

        // Redirect to the home page
        return "redirect:/";
    }
}

// @PutMapping("/add/follower")
// public void addElement(@RequestBody String follower) {
// userRepo.User.getFollowing().add(follower);
// }

// @GetMapping("/users/{username}/following")
// public List<Integer> getFollowingList(@PathVariable String id) {
// User user = userRepo.findById(id);
// return user.getFollowing();
// }
