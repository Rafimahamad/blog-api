package com.blogapi.payloads;

import lombok.Data;

@Data
public class JwtAuthResponse {
	String token;
	private UserDto user;
}
