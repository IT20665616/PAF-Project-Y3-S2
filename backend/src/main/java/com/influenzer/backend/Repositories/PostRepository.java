package com.influenzer.backend.Repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.influenzer.backend.Models.Post;

public interface PostRepository extends MongoRepository<Post,String>{ 
    
    List<Post> findByUserId(String userId);
}
