package com.blogapi.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.hibernate.engine.jdbc.StreamUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.blogapi.payloads.ApiResponse;
import com.blogapi.payloads.PostDto;
import com.blogapi.payloads.PostResponse;
import com.blogapiservice.FileService;
import com.blogapiservice.PostService;
import com.blogapi.config.AppConstants;

@RestController
@RequestMapping("/api/post")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PostController {

	@Autowired
	private PostService postService;
	@Autowired
	private FileService fileService; 
	
	@Value("${project.image}")
	private String path;
	
	
	
	@PostMapping("/user/{userId}/category/{categoryId}")
	public ResponseEntity<PostDto> createPost(@RequestBody PostDto postDto,@PathVariable("userId")Integer userId,@PathVariable("categoryId") Integer catId ){
		PostDto createdPostDto = this.postService.createPost(postDto, userId, catId);
		
		return new ResponseEntity<>(createdPostDto,HttpStatus.CREATED);
		
	}
	
	
	//get By user
	
	@GetMapping("/user/{userId}")
	public ResponseEntity<List<PostDto>> getPostsByUserId(@PathVariable("userId") Integer userId){
		List<PostDto> postDtos = this.postService.getPostbyUser(userId);
		return  new ResponseEntity<List<PostDto>>(postDtos,HttpStatus.OK);
	}
	
	//getBy Category
	
	
	@GetMapping("/category/{categoryId}")
	public ResponseEntity<List<PostDto>> getPostsByCategoryId(@PathVariable("categoryId") Integer categoryId){
		
		List<PostDto> postDtos = this.postService.getPostByCategory(categoryId);
		
		return new ResponseEntity<List<PostDto>>(postDtos,HttpStatus.OK);
		
	}
	
	//get all posts
//	@GetMapping("/posts")
//	public ResponseEntity<List<PostDto>> getAllPosts(
//			@RequestParam(value="pageNumber",defaultValue = "0",required = false) Integer pageNumber ,
//			@RequestParam(value="pageSize",defaultValue = "5",required = false) Integer pageSize
//			) {
//		
//		List<PostDto> postDtos=this.postService.getAllPosts(pageNumber,pageSize);
//		
//		return new ResponseEntity<List<PostDto>>(postDtos,HttpStatus.OK);
//		
//	}
	
	
	@GetMapping("/posts")
	public ResponseEntity<PostResponse> getAllPosts(
			@RequestParam(value="pageNumber",defaultValue = AppConstants.PAGE_NUMBER,required = false) Integer pageNumber ,
			@RequestParam(value="pageSize",defaultValue =AppConstants.PAGE_SIZE,required = false) Integer pageSize,
			@RequestParam(value="sortBy",defaultValue = AppConstants.SORT_BY,required = false) String sortBy
			) {
		
		PostResponse postResponse=this.postService.getAllPosts(pageNumber,pageSize,sortBy);
		
		return new ResponseEntity<PostResponse>(postResponse,HttpStatus.OK);
		
	}
	
	//get single post by postId
	
	@GetMapping("/{postId}")
	public ResponseEntity<PostDto> getPostById(@PathVariable("postId") Integer postId){
		
		PostDto postDto = this.postService.getPostById(postId);
		return new ResponseEntity<PostDto>(postDto,HttpStatus.OK);
		
	}
	
	
	//delete post
	@DeleteMapping("/{postId}")
	public ApiResponse deletePost(@PathVariable("postId")Integer postId) {
		this.postService.deletePost(postId);
		return new ApiResponse("post deleted Successfully !..",true);
	}
	
	//update Post
	
	@PutMapping("/{postId}")
public ResponseEntity<PostDto> updatePost(@RequestBody PostDto postDto,@PathVariable("postId") Integer postId){
		
		PostDto updatedPostDto = this.postService.updatePost(postDto, postId);
		return new ResponseEntity<PostDto>(updatedPostDto,HttpStatus.OK);
		
	}
	
//	search---------
	@GetMapping("/search/{keyword}")
	public ResponseEntity<List<PostDto>> searchPostByTitle( @PathVariable("keyword") String keyword){
		List<PostDto> postDtos = this.postService.searchPost(keyword);
	
		
		return  new ResponseEntity<>(postDtos,HttpStatus.OK);
		
	}
	
	
//	upload image
	
	@PostMapping("/image/upload/{postId}")
	public ResponseEntity<PostDto> uploadPostImage( @RequestParam("image") MultipartFile image,
			@PathVariable Integer postId) throws IOException {
		
		String uploadImage = this.fileService.uploadImage(path, image);
		PostDto postDto = this.postService.getPostById(postId);
		postDto.setImageName(uploadImage);
		PostDto updatePost = this.postService.updatePost(postDto, postId);
		
		return new ResponseEntity<PostDto>(updatePost,HttpStatus.OK);
	}
	
//	method to serve the files
	@GetMapping(value = "/image/{imageName}",produces=MediaType.IMAGE_JPEG_VALUE)
	public void downloadImage( @PathVariable("imageName") String imageName,HttpServletResponse response)
	throws IOException {
		
	InputStream resource = this.fileService.getResource(path, imageName);
	response.setContentType(MediaType.IMAGE_JPEG_VALUE);
	StreamUtils.copy(resource, response.getOutputStream());
	
	}
	
	
	
	
}
