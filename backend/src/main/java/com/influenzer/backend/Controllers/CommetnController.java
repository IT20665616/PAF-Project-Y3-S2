package com.influenzer.backend.Controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.influenzer.backend.Models.Comment;
import com.influenzer.backend.Repositories.CommentRepo;
import com.influenzer.backend.Services.CommentService;

@RestController
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:8080" },allowedHeaders = "*")
public class CommetnController {
	
	@Autowired
	private CommentService commentService;

	@Autowired
	private CommentRepo commentRepo;

	@PostMapping("/comment/add")
    public Comment saveComment (@RequestBody Comment comment)
    {
        commentRepo.save(comment);
        return comment;
    }

    @GetMapping("/comment/getall")
    public List<Comment> getComments() {
        return commentRepo.findAll();
    }

    @GetMapping("/comment/get/{id}")
    public Optional<Comment> getCommentById(@PathVariable String id) {
        return commentRepo.findById(id);
    }

	@GetMapping("/comment/getByPostId/{id}")
    public List<Comment> getCommentByPostId(@PathVariable String id) {
        return commentService.getComments(id);
    }

    @DeleteMapping("/comment/delete/{id}")
    public String deleteComment(@PathVariable String id) {
        try {
            commentRepo.deleteById(id);
            return "Deletion Successful";
        } catch (Exception e){
            return "Something went wrong.";
        }
    }

	@PutMapping("/comment/update/{id}")
    public Comment updateComment(@PathVariable String id, @RequestBody Comment comment) {
        Comment exsitingComment = commentRepo.findById(id).orElse(null);
        if (exsitingComment != null) {
            exsitingComment.setComment(comment.getComment());
			exsitingComment.setPostID(comment.getPostID());
			exsitingComment.setTime(comment.getTime());
            commentRepo.save(comment);
            return comment;
        } else {
            return exsitingComment;
        }
    }
}

    
	
	// @GetMapping("/getAllComments")
	// public List<Comment> getAllCommnets() {
	// 	return commentService.getComments();
	// }
	
	// @GetMapping("/getComments/{CommentID}")
	// public List<Comment> getCommnets(@PathVariable String CommentID) {
	// 	return commentService.getComments(CommentID);
	// }
	
	// @CommentMapping("/addComment")
	// public String addComment(@RequestBody Comment comment) {
	// 	return commentService.addComment(comment);
	// }
	
	// @PutMapping("/editComment")
	// public String editComment(@RequestBody Comment comment) {
	// 	return commentService.updateComment(comment);
	// }
	
	// @DeleteMapping("/deleteComment/{id}")
	// public String deleteComment(@PathVariable String id) {
	// 	return commentService.deleteComment(id);
	// }


