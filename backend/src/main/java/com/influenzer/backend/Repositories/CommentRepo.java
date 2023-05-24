package com.influenzer.backend.Repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.influenzer.backend.Models.Comment;

@Repository
public interface CommentRepo extends MongoRepository<Comment, String> {
	
	@Query("{'PostID':?0}")
	List<Comment> findByPostID(int postID);
}
