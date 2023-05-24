package com.influenzer.backend.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.influenzer.backend.Models.Comment;
import com.influenzer.backend.Repositories.CommentRepo;

@Service
public class CommentService {
	@Autowired
	private CommentRepo commentRepo;
	
	@Autowired
	private final MongoTemplate mongoTemplate;

    public CommentService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

	public List<Comment> getComments() {
		return commentRepo.findAll();
	}
	
	
	public String addComment(Comment comment) {
		commentRepo.save(comment);
		return comment.getId();
	}
	
    public List<Comment> getComments(String postId) {
        return commentRepo.findByPostID(postId);
    }
    
    public String updateComment(Comment comment) {
    	 Query query = new Query();
         query.addCriteria(Criteria.where("id").is(comment.getId()));
         Update update = new Update();
         update.set("message", comment.getMessage());
         update.set("time", comment.getTime());
         mongoTemplate.updateFirst(query, update, Comment.class);
    	
    	return comment.getId();
    }
    
    public String deleteComment(String id) {
    	Query query = new Query();
        query.addCriteria(Criteria.where("id").is(id));
        mongoTemplate.remove(query, Comment.class);
        
        return "deleted comment";
    }
	
}
