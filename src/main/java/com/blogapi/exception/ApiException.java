package com.blogapi.exception;

public class ApiException extends RuntimeException {

	public ApiException() {
		super();
		
	}

	public ApiException(String msg) {
		super(msg);
		
	}

}
