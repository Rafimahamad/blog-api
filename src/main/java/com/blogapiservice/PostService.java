package com.blogapiservice;

import java.util.List;

import com.blogapi.entity.Post;
import com.blogapi.payloads.PostDto;
import com.blogapi.payloads.PostResponse;

public interface PostService {
	
	PostDto createPost(PostDto postDto,Integer userId,Integer categoryId);
	
	PostDto updatePost(PostDto postDto,Integer postId);
	
	void deletePost(Integer postId);
	
	List<PostDto> getAllPosts1(Integer pageNumber, Integer pageSize);
	
	PostResponse getAllPosts(Integer pageNumber, Integer pageSize, String sortBy);
	
	
	PostDto getPostById(Integer postId);
	
	List<PostDto> getPostByCategory(Integer categoryId);
	
	List<PostDto> getPostbyUser(Integer userId);
	
	List<PostDto> searchPost(String keyword);
	

}
