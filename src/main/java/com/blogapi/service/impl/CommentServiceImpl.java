package com.blogapi.service.impl;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blogapi.entity.Comment;
import com.blogapi.entity.Post;
import com.blogapi.exception.ResourceNotFoundException;
import com.blogapi.payloads.CommentDto;
import com.blogapi.repository.CommentRepo;
import com.blogapi.repository.PostRepo;
import com.blogapiservice.CommentService;

@Service
public class CommentServiceImpl implements CommentService {

	@Autowired
	private CommentRepo commentRepo; 
	
	@Autowired
	private PostRepo postRepo; 
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public CommentDto createComment(CommentDto commentDto, Integer postId) {
		
		Post post = this.postRepo.findById(postId).orElseThrow(()-> new ResourceNotFoundException("post","post Id", postId));
		
		Comment comment = this.modelMapper.map(commentDto,Comment.class);
		comment.setPost(post);
		Comment saveComment = this.commentRepo.save(comment);
		
		return this.modelMapper.map(saveComment,CommentDto.class);
	}

	@Override
	public void deleteComment(Integer commentId) {
	Comment comment = this.commentRepo.findById(commentId).orElseThrow(()->new ResourceNotFoundException("Comment", "comment Id", commentId));
	this.commentRepo.delete(comment);
	
	}

	

	
}
