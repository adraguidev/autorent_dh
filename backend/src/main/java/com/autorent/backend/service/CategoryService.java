package com.autorent.backend.service;

import com.autorent.backend.dto.CategoryDto;
import com.autorent.backend.dto.CategoryRequestDto;
import com.autorent.backend.model.Category;
import com.autorent.backend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // Convert Entity to DTO
    private CategoryDto convertToDto(Category category) {
        return new CategoryDto(
            category.getId(), 
            category.getName(), 
            category.getDescription(), 
            category.getImage()
        );
    }

    // Convert RequestDTO to Entity
    private Category convertToEntity(CategoryRequestDto categoryRequestDto) {
        return new Category(
            categoryRequestDto.getName(), 
            categoryRequestDto.getDescription(), 
            categoryRequestDto.getImage()
        );
    }

    public List<CategoryDto> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Optional<CategoryDto> getCategoryById(Long id) {
        return categoryRepository.findById(id).map(this::convertToDto);
    }

    public CategoryDto createCategory(CategoryRequestDto categoryRequestDto) {
        // Check if category with the same name already exists to avoid duplicates
        if (categoryRepository.findByName(categoryRequestDto.getName()).isPresent()) {
            throw new IllegalArgumentException("Category with name '" + categoryRequestDto.getName() + "' already exists.");
        }
        
        Category category = convertToEntity(categoryRequestDto);
        Category savedCategory = categoryRepository.save(category);
        return convertToDto(savedCategory);
    }

    public Optional<CategoryDto> updateCategory(Long id, CategoryRequestDto categoryRequestDto) {
        return categoryRepository.findById(id)
                .map(existingCategory -> {
                    // Check if another category with the same name exists (excluding current one)
                    Optional<Category> existingWithSameName = categoryRepository.findByName(categoryRequestDto.getName());
                    if (existingWithSameName.isPresent() && !existingWithSameName.get().getId().equals(id)) {
                        throw new IllegalArgumentException("Category with name '" + categoryRequestDto.getName() + "' already exists.");
                    }
                    
                    existingCategory.setName(categoryRequestDto.getName());
                    existingCategory.setDescription(categoryRequestDto.getDescription());
                    existingCategory.setImage(categoryRequestDto.getImage());
                    Category updatedCategory = categoryRepository.save(existingCategory);
                    return convertToDto(updatedCategory);
                });
    }

    public boolean deleteCategory(Long id) {
        if (categoryRepository.existsById(id)) {
            // Consider checking if any products are associated with this category before deleting
            categoryRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
