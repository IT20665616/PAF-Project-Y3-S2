package com.influenzer.backend.Controllers;

import java.util.List;

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
import com.influenzer.backend.Services.CommentService;

@RestController
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:8080" },allowedHeaders = "*")
public class CommetnController {
	
	@Autowired
	private CommentService commentService;
	
	@GetMapping("/getAllComments")
	public List<Comment> getAllCommnets() {
		return commentService.getComments();
	}
	
	@GetMapping("/getComments/{postID}")
	public List<Comment> getCommnets(@PathVariable int postID) {
		return commentService.getComments(postID);
	}
	
	@PostMapping("/addComment")
	public String addComment(@RequestBody Comment comment) {
		return commentService.addComment(comment);
	}
	
	@PutMapping("/editComment")
	public String editComment(@RequestBody Comment comment) {
		return commentService.updateComment(comment);
	}
	
	@DeleteMapping("/deleteComment/{id}")
	public String deleteComment(@PathVariable String id) {
		return commentService.deleteComment(id);
	}

}
