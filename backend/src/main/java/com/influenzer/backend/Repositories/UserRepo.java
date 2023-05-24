package com.influenzer.backend.Repositories;


import org.springframework.data.mongodb.repository.MongoRepository;

import com.influenzer.backend.Models.User;

public interface UserRepo extends MongoRepository <User, String>{
   // Find a user by username
   User findByUsername(String username);

   // Find a user by email
   User findByEmail(String email);

   User findByStatus(String status);

   User findByEmailAndPassword(String email, String password);

}
