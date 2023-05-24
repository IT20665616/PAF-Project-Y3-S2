package com.influenzer.backend.Controllers;

import java.util.List;
import java.util.Optional;

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

import com.influenzer.backend.Models.Follower;
import com.influenzer.backend.Models.User;
import com.influenzer.backend.Repositories.FollowerRepo;
import com.influenzer.backend.Repositories.UserRepo;

@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:8080" }, allowedHeaders = "*")
@RequestMapping("/follower")

@RestController
public class FollowerController {

    @Autowired
    private FollowerRepo followerRepo;
    private UserRepo userRepo;

    @PostMapping("/create")
    public Follower saveFollower (@RequestBody Follower follower)
    {
        followerRepo.save(follower);
        return follower;
    }

    @GetMapping("/findall")
    public List<Follower> getFollowers() {
        return followerRepo.findAll();
    }

    @GetMapping("/get/{id}")
    public Optional<Follower> getFollowerById(@PathVariable String id) {
        return followerRepo.findById(id);
    }

    @GetMapping("/getFollower")
    public List<Follower> getUserByStatus(@RequestParam("status") String status) {
        List<Follower> FollowerList = followerRepo.findByStatus(status);
    
        if (FollowerList != null) {
            return FollowerList;
        } else {
            return null;
        }
    }

    @PutMapping("/{id}")
    public String updateFollower(@PathVariable("id") String id, @RequestBody Follower follower) {
        Follower existingUser = followerRepo.findById(id).orElse(null);
        if (existingUser == null) {
            return "user not fount";
        }
        follower.setId(id);
        followerRepo.save(follower);
        return "updated";
    }

    @DeleteMapping("/delete/{id}")
    public String deleteFollower(@PathVariable String id) {
        try {
            followerRepo.deleteById(id);
            return "Deletion Successful";
        } catch (Exception e){
            return "Something went wrong.";
        }
    }

    
    
}
