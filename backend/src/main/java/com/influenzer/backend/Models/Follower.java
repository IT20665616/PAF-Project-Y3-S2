package com.influenzer.backend.Models;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@Document (collection = "Followers")

public class Follower {   
    @Id 
    private String id;

    private String userId;

    private String followerId;

    private String status;
}


