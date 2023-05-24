package com.influenzer.backend.Models;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@Document (collection = "Posts")

public class Post {   
    @Id 
    private String id;

    private String name;

    private String location;

    private String createdDate;

    private String image;

    private String caption;

    private String userId;

}


