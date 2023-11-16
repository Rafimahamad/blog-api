package com.blogapiservice;

import com.blogapi.payloads.CommentDto;

public interface CommentService {

	CommentDto createComment(CommentDto commentDto,Integer postID);
	
	void deleteComment(Integer commentId);
}
