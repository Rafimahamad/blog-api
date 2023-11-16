package com.blogapi.payloads;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class CategoryDto {

	
	private Integer categoryId;
	@NotBlank
	@Size(min = 4,message = "category title must be minimum of 4 characters")
	private String categoryTitle;
	@NotBlank
	@Size(min = 5, message = "category description must be minimum of 5 characters")
	private String categoryDescription;
}
