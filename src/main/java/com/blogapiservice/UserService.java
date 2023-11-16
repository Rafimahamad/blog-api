package com.blogapiservice;


import java.util.List;

import com.blogapi.payloads.UserDto;


public interface UserService {
	
	UserDto registerNewUser(UserDto userDto);

	UserDto createUser(UserDto user);
	UserDto updateUser(UserDto user,Integer userId);
	UserDto getUserById(Integer userId);
	List<UserDto> getAllUsers();
	
	UserDto findUserByEmail(String email);
	
	void deleteUser(Integer userId);
}
