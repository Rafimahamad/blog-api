package com.blogapiservice;

import com.blogapi.entity.User;
import com.blogapi.payloads.UserDto;

public interface LoginService {

	 UserDto login(String userName,String password);
}
