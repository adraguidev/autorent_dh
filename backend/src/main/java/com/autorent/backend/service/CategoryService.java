package com.autorent.backend.service;

import com.autorent.backend.dto.CategoryDto;
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
        return new CategoryDto(category.getId(), category.getName());
    }

    // Convert DTO to Entity (useful for creation/update if DTO had more fields)
    // private Category convertToEntity(CategoryDto categoryDto) {
    //     return new Category(categoryDto.getName()); // Assuming constructor Category(String name)
    // }

    public List<CategoryDto> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Optional<CategoryDto> getCategoryById(Long id) {
        return categoryRepository.findById(id).map(this::convertToDto);
    }

    public CategoryDto createCategory(CategoryDto categoryDto) {
        // Check if category with the same name already exists to avoid duplicates
        if (categoryRepository.findByName(categoryDto.getName()).isPresent()) {
            throw new IllegalArgumentException("Category with name '" + categoryDto.getName() + "' already exists.");
        }
        Category category = new Category(categoryDto.getName());
        Category savedCategory = categoryRepository.save(category);
        return convertToDto(savedCategory);
    }

    public Optional<CategoryDto> updateCategory(Long id, CategoryDto categoryDto) {
        return categoryRepository.findById(id)
                .map(existingCategory -> {
                    existingCategory.setName(categoryDto.getName());
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
