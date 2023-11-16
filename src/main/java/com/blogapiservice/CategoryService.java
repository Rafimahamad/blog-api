package com.blogapiservice;

import java.util.List;

import com.blogapi.payloads.CategoryDto;

public interface CategoryService {

	
	CategoryDto createCategoryDto(CategoryDto categoryDto);
	
	CategoryDto updateCategoryDto(CategoryDto categoryDto,Integer categoryId);
	
	CategoryDto getCategoryDto(Integer categoryId);
	
	void deleteCategoryDto(Integer categoryId);
	
	List<CategoryDto> getCategories();
	
	
}
