package com.blogapi.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blogapi.payloads.ApiResponse;
import com.blogapi.payloads.CategoryDto;
import com.blogapiservice.CategoryService;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin("*")
public class CategoryController {

	@Autowired
	private CategoryService categoryService;
	
	@PostMapping("/")
	public ResponseEntity<CategoryDto> createCategory( @Valid @RequestBody CategoryDto categoryDto){
		
		CategoryDto createCategoryDto = this.categoryService.createCategoryDto(categoryDto);
		return new ResponseEntity<CategoryDto>(createCategoryDto,HttpStatus.CREATED);
	}
	
	@PutMapping("/{catId}")
	public ResponseEntity<CategoryDto> updateCategory( @Valid @RequestBody CategoryDto categoryDto,@PathVariable("catId") Integer catId){
		
		CategoryDto updateCategoryDto = this.categoryService.updateCategoryDto(categoryDto, catId);
		
		return new ResponseEntity<CategoryDto>(updateCategoryDto,HttpStatus.OK);
	}
	
	
	@DeleteMapping("/{catId}")
	public ResponseEntity<ApiResponse> deleteCategory(@PathVariable("catId") Integer catId){
		
                 this.categoryService.deleteCategoryDto(catId);
		
		return new ResponseEntity<ApiResponse>( new ApiResponse("category deleted Successfully !..",true),HttpStatus.OK);
	}
	
	@GetMapping("/{catId}")
	public ResponseEntity<CategoryDto> getSingleCategory(@PathVariable("catId") Integer catId){
		
                 CategoryDto categoryDto = this.categoryService.getCategoryDto(catId);
		
		return new ResponseEntity<CategoryDto>( categoryDto,HttpStatus.OK);
	}
	
	@GetMapping("/")
	public ResponseEntity<List<CategoryDto>> getAllCategories(){
		
                 List<CategoryDto> categoryDtos = this.categoryService.getCategories();
		
		return new ResponseEntity<List<CategoryDto>>( categoryDtos,HttpStatus.OK);
	}
	
	
	
}
