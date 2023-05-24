package com.influenzer.backend.Repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.influenzer.backend.Models.Follower;

public interface FollowerRepo extends MongoRepository <Follower, String> {
    List<Follower> findByStatus(String status);
}
