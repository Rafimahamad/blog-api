package com.blogapi.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blogapi.config.AppConstants;
import com.blogapi.entity.Role;
import com.blogapi.entity.User;
import com.blogapi.exception.ResourceNotFoundException;
import com.blogapi.payloads.UserDto;
import com.blogapi.repository.RoleRepo;
import com.blogapi.repository.UserRepository;
import com.blogapiservice.UserService;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepo roleRepo;
	
	@Autowired
	private ModelMapper modelMapper;
	

	
	@Override
	public UserDto createUser(UserDto userDto) {
		User user = this.dtoToUser(userDto);
//		user.setPassword(passwordEncoder.encode(user.getPassword()));
		User savedUser = this.userRepository.save(user);
		return this.userToUserDto(savedUser);
	}

	@Override
	public UserDto updateUser(UserDto userDto, Integer userId) {
		
	User user=this.userRepository.findById(userId).orElseThrow(()-> new ResourceNotFoundException("User","id",userId));
	
	user.setName(userDto.getName());
	user.setName(userDto.getName());
	user.setAbout(userDto.getAbout());
//	user.setPassword(passwordEncoder.encode(userDto.getPassword()));
	user.setPassword(userDto.getPassword());
	
	User updateUser = this.userRepository.save(user);
	UserDto userDto1=this.userToUserDto(updateUser);
		
	return userDto1;
	}

	
	@Override
	public UserDto getUserById(Integer userId) {
		
		User user = this.userRepository.findById(userId).orElseThrow(()-> new ResourceNotFoundException("User","id",userId));
		return this.userToUserDto(user);
	}

	@Override
	public List<UserDto> getAllUsers() {
		List<User> users = this.userRepository.findAll();
		
		List<UserDto> userDtos = users.stream().map((user)->this.userToUserDto(user)).collect(Collectors.toList());
		
		return userDtos;
	}

	@Override
	public void deleteUser(Integer userId) {
		User user = this.userRepository.findById(userId).orElseThrow(()-> new ResourceNotFoundException("User","id",userId));
		this.userRepository.delete(user);
		
	}
	
	
	public User dtoToUser(UserDto userDto) {
		User user = this.modelMapper.map(userDto ,User.class);
		
//		use model mapper instead of this code
//		User user=new User();
//		user.setId(userDto.getId());
//		user.setName(userDto.getName());
//		user.setEmail(userDto.getEmail());
//		user.setPassword(userDto.getPassword());
//		user.setAbout(userDto.getAbout());
		return user;
	}

	
	public UserDto userToUserDto(User user) {
		
		UserDto userDto=this.modelMapper.map(user,UserDto.class);
		
//		UserDto userDto = new UserDto();
//		userDto.setId(user.getId());
//		userDto.setName(user.getName());
//		userDto.setEmail(user.getEmail());
//		userDto.setPassword(user.getPassword());
//		userDto.setAbout(user.getAbout());
		return userDto;
	}

	@Override
	public UserDto registerNewUser(UserDto userDto) {
		User user = this.modelMapper.map(userDto, User.class);
//		encode password 
		user.setPassword(user.getPassword());
		Role role = this.roleRepo.findById(AppConstants.NORMAL_USER).get();
		user.getRoles().add(role);
		User newUser = this.userRepository.save(user);
		
		return this.modelMapper.map(newUser,UserDto.class);
	}

	@Override
	public UserDto findUserByEmail(String email) {
		User user = this.userRepository.findByEmail(email).orElseThrow( ()->new ResourceNotFoundException("user", "email:"+email, 0));
		return this.modelMapper.map(user, UserDto.class);
	}
	
	
	
}
