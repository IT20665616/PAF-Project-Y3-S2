package com.influenzer.backend.Controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.influenzer.backend.Models.Post;
import com.influenzer.backend.Repositories.PostRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@CrossOrigin(origins="http://localhost:3000")

@RestController
public class PostController {

    @Autowired
    private PostRepository postRepository;

    @PostMapping("/add")
    public Post savePost (@RequestBody Post post)
    {
        postRepository.save(post);
        return post;
    }

    @GetMapping("/findall")
    public List<Post> getPosts() {
        return postRepository.findAll();
    }

    @GetMapping("/get/{id}")
    public Optional<Post> getPostById(@PathVariable String id) {
        return postRepository.findById(id);
    }

    @GetMapping("/getPost")
    public List<Post> getUserByEmailAndPassword(@RequestParam("userId") String userId) {
        List<Post> postList = postRepository.findByUserId(userId);
        if (postList != null) {
            return postList;
        } else {
            return null;
        }
    }

    @DeleteMapping("/delete/{id}")
    public String deletePost(@PathVariable String id) {
        try {
            postRepository.deleteById(id);
            return "Deletion Successful";
        } catch (Exception e){
            return "Something went wrong.";
        }
    }

    @PutMapping("/update/{id}")
    public String updatePost(@PathVariable String id, @RequestBody Post post) {
        Post exsitingPost = postRepository.findById(id).orElse(null);
        if (exsitingPost != null) {
            post.setId(id);
            postRepository.save(post);
            return "updated successfully";
        } else {
            return "record not found";
        }
    }

    // @PutMapping("/{id}")
    // public ResponseEntity<User> updateUser(@PathVariable("id") String id, @RequestBody User user) {
    //     User existingUser = userRepo.findById(id).orElse(null);
    //     if (existingUser == null) {
    //         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    //     }
    //     user.setId(id);
    //     User updatedUser = userRepo.save(user);
    //     return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    // }

    
}
