package com.blogapi.payloads;

import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.blogapi.entity.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class UserDto {

	private int id;
	
	@NotEmpty
	@Size(min=4,message = "user name must be minimum of 4 characters !..")
	private String name;
	
	@NotEmpty(message="provide valid email Id")
	@Email(message = "email address is not valid")
	private String email;
	
	@NotEmpty(message = "about is required")
	private String about;
	

	@NotBlank(message = "password must be min of 3 chars and max of 8 chars")
	@Size(min = 3,max=8,message = "password must be min of 3 chars and max of 8 chars")
	private String password;
	
	private Set<RoleDto>roles=new HashSet<RoleDto>();
	
	@JsonIgnore
	public String getPassword() {
		return this.password;
	}
	
	@JsonProperty
	public void setPassword(String password) {
		this.password=password;
	}

	@Override
	public String toString() {
		return "UserDto [id=" + id + ", name=" + name + ", email=" + email + ", about=" + about + ", password="
				+ password + ", roles=" + roles + "]";
	}
	
	
	
}
