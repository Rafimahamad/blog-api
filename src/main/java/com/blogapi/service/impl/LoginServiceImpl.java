package com.blogapi.service.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blogapi.entity.User;
import com.blogapi.exception.ResourceNotFoundException;
import com.blogapi.payloads.UserDto;
import com.blogapi.repository.UserRepository;
import com.blogapiservice.LoginService;

@Service
public class LoginServiceImpl implements LoginService {

	@Autowired
	private UserRepository repository;
	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public UserDto login(String userName, String password) {
		User user = this.repository.getUserDetails(userName, password).orElseThrow(()-> new ResourceNotFoundException("user","Email"+userName,0));
		return modelMapper.map(user, UserDto.class);
	}

}
