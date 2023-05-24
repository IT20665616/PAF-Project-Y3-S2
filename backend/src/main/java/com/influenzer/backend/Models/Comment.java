package com.influenzer.backend.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "Comment")
public class Comment {
	@Id
	private String id;
	
	private String user_name;
	private String message;
	private String time;
	private int postID;
	
	public Comment(String user_name, String message, String time, int postID) {
		super();
		this.user_name = user_name;
		this.message = message;
		this.time = time;
		this.postID = postID;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
        this.id = id;
    }
	
	public int getPostID() {
		return postID;
	}

	public void setPostID(int postID) {
		this.postID = postID;
	}

	public Comment() {
		super();
	}
	
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
}
