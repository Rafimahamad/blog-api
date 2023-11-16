package com.blogapi.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blogapi.entity.Comment;
import com.blogapi.payloads.ApiResponse;
import com.blogapi.payloads.CommentDto;
import com.blogapiservice.CommentService;

@RestController
@RequestMapping("/api/comment")
@CrossOrigin("*")
public class CommentController {
	
	@Autowired
	private CommentService commentService;
	
	@Autowired
	private ModelMapper modelMapper;

	@PostMapping("/{postId}")
	public ResponseEntity<CommentDto> createComment( @RequestBody CommentDto comment,@PathVariable("postId") Integer postId  ){
		
		
		CommentDto createComment = this.commentService.createComment(comment, postId);
		
		return new ResponseEntity<CommentDto>(createComment,HttpStatus.CREATED);
	}
	
	
	@DeleteMapping("/{comId}")
	public ResponseEntity<ApiResponse> createComment(@PathVariable("comId") Integer comId  ){
		
		
		 this.commentService.deleteComment(comId);
		
		return new ResponseEntity<ApiResponse>(new ApiResponse("Comment deleted Successfully !..",true),HttpStatus.OK);
	} 
	
}
