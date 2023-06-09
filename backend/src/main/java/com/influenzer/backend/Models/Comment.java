package com.influenzer.backend.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString

@Document(collection = "Comment")
public class Comment {
	@Id
	private String id;
	
	private String user_id;
	private String comment;
	private String time;
	private String postID;
	
    public Object getMessage() {
        return null;
    }

}

