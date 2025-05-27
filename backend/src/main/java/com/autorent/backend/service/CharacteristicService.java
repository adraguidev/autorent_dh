package com.autorent.backend.service;

import com.autorent.backend.dto.CharacteristicDto;
import com.autorent.backend.dto.CharacteristicRequestDto;
import com.autorent.backend.model.Characteristic;
import com.autorent.backend.repository.CharacteristicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CharacteristicService {

    private final CharacteristicRepository characteristicRepository;

    @Autowired
    public CharacteristicService(CharacteristicRepository characteristicRepository) {
        this.characteristicRepository = characteristicRepository;
    }

    /**
     * Obtiene todas las características
     */
    public List<CharacteristicDto> getAllCharacteristics() {
        return characteristicRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene una característica por ID
     */
    public Optional<CharacteristicDto> getCharacteristicById(Long id) {
        return characteristicRepository.findById(id)
                .map(this::convertToDto);
    }

    /**
     * Crea una nueva característica
     */
    public CharacteristicDto createCharacteristic(CharacteristicRequestDto requestDto) {
        if (characteristicRepository.existsByName(requestDto.getName())) {
            throw new IllegalArgumentException("Ya existe una característica con ese nombre!");
        }

        Characteristic characteristic = new Characteristic();
        characteristic.setName(requestDto.getName());
        characteristic.setIcon(requestDto.getIcon());

        Characteristic savedCharacteristic = characteristicRepository.save(characteristic);
        return convertToDto(savedCharacteristic);
    }

    /**
     * Actualiza una característica existente
     */
    public CharacteristicDto updateCharacteristic(Long id, CharacteristicRequestDto requestDto) {
        Optional<Characteristic> characteristicOptional = characteristicRepository.findById(id);
        
        if (characteristicOptional.isEmpty()) {
            throw new IllegalArgumentException("Característica no encontrada!");
        }

        Characteristic characteristic = characteristicOptional.get();
        
        // Verificar si el nuevo nombre ya existe (excepto si es el mismo)
        if (!characteristic.getName().equals(requestDto.getName()) && 
            characteristicRepository.existsByName(requestDto.getName())) {
            throw new IllegalArgumentException("Ya existe una característica con ese nombre!");
        }

        characteristic.setName(requestDto.getName());
        characteristic.setIcon(requestDto.getIcon());

        Characteristic updatedCharacteristic = characteristicRepository.save(characteristic);
        return convertToDto(updatedCharacteristic);
    }

    /**
     * Elimina una característica
     */
    public void deleteCharacteristic(Long id) {
        if (!characteristicRepository.existsById(id)) {
            throw new IllegalArgumentException("Característica no encontrada!");
        }

        characteristicRepository.deleteById(id);
    }

    /**
     * Convierte una entidad Characteristic a DTO
     */
    private CharacteristicDto convertToDto(Characteristic characteristic) {
        return new CharacteristicDto(
            characteristic.getId(),
            characteristic.getName(),
            characteristic.getIcon()
        );
    }

    /**
     * Obtiene una característica por nombre
     */
    public Optional<CharacteristicDto> getCharacteristicByName(String name) {
        return characteristicRepository.findByName(name)
                .map(this::convertToDto);
    }
} 