package com.blogapi.controller;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blogapi.entity.User;
import com.blogapi.payloads.ApiResponse;
import com.blogapi.payloads.JwtAuthResponse;
import com.blogapi.payloads.UserDto;
import com.blogapiservice.LoginService;
import com.blogapiservice.UserService;

@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
public class UserController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private LoginService loginService;
	
	
	@PostMapping("/login")
	public ResponseEntity<JwtAuthResponse>loginUser(@RequestBody UserDto userDto){
		
		UserDto user = this.loginService.login(userDto.getEmail(), userDto.getPassword());
		
		System.out.println("login user ---------------------------"+user);
//		return ResponseEntity.ok(user);
		JwtAuthResponse response = new JwtAuthResponse();
		response.setToken("without token");
		response.setUser(user);
		
		return new ResponseEntity<JwtAuthResponse>(response,HttpStatus.OK);
	}
	
	@PostMapping("/register")
	public ResponseEntity<UserDto> createUser(@Valid @RequestBody UserDto userDto){
	
		UserDto createdUserDto = this.userService.registerNewUser(userDto);
		
		return new ResponseEntity<>(createdUserDto,HttpStatus.CREATED);
		
	}
	
	@PutMapping("/{userId}")
	public ResponseEntity<UserDto> updateUser(  @RequestBody UserDto userDto, @PathVariable("userId") Integer userId){
		
		UserDto updatedUser = this.userService.updateUser(userDto, userId);
		return ResponseEntity.ok(updatedUser);
		
	}
	
	
	
	@DeleteMapping("/{userId}")
	public ResponseEntity<ApiResponse>  deleteUser(@PathVariable("userId") Integer userId){
		 this.userService.deleteUser(userId);
//		 return ResponseEntity.ok(HttpStatus.OK);
//		 return new ResponseEntity(Map.of("message","user deleted Successfully"),HttpStatus.OK);
		 return new ResponseEntity(new ApiResponse("user deleted Successfully",true),HttpStatus.OK);
		
	}

	@GetMapping("/")
	public ResponseEntity<List<UserDto>> getAllUsersData(){
		
		return ResponseEntity.ok(this.userService.getAllUsers());
	}
	
	@GetMapping("/{userId}")
	public ResponseEntity<UserDto> getSingleUser(@PathVariable("userId") Integer userId){
		
		return ResponseEntity.ok(this.userService.getUserById(userId));
	}
	
}
