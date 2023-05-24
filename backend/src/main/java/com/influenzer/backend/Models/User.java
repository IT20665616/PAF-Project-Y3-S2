package com.influenzer.backend.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Document(collection ="users")
@Setter
@Getter
@ToString
public class User {
    @Id
    private String id;
    
    private String username;
    private String password;
    private String email;
    private String mobileNo;
    private String profileImg;
    private String bio;
    private String status;
    
 
}
