package com.blogapi.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.blogapi.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	
public	Optional<User> findByEmail(String email);

@Query("select u from User u where u.email=:email")
public Optional<User>  getUserbyemail(@Param("email")  String username);

@Query("select u from User u where u.email=:email AND u.password=:password")
public Optional<User> getUserDetails( @Param("email") String userName,@Param("password") String password);


}
