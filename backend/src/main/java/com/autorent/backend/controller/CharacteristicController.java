package com.autorent.backend.controller;

import com.autorent.backend.dto.CharacteristicDto;
import com.autorent.backend.dto.CharacteristicRequestDto;
import com.autorent.backend.service.CharacteristicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/characteristics")
@CrossOrigin(origins = "http://localhost:5173")
public class CharacteristicController {

    private final CharacteristicService characteristicService;

    @Autowired
    public CharacteristicController(CharacteristicService characteristicService) {
        this.characteristicService = characteristicService;
    }

    /**
     * Obtiene todas las características
     */
    @GetMapping
    public ResponseEntity<List<CharacteristicDto>> getAllCharacteristics() {
        try {
            List<CharacteristicDto> characteristics = characteristicService.getAllCharacteristics();
            return ResponseEntity.ok(characteristics);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Obtiene una característica por ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<CharacteristicDto> getCharacteristicById(@PathVariable Long id) {
        try {
            Optional<CharacteristicDto> characteristic = characteristicService.getCharacteristicById(id);
            
            if (characteristic.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            return ResponseEntity.ok(characteristic.get());
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Crea una nueva característica
     */
    @PostMapping
    public ResponseEntity<CharacteristicDto> createCharacteristic(@RequestBody CharacteristicRequestDto requestDto) {
        try {
            CharacteristicDto createdCharacteristic = characteristicService.createCharacteristic(requestDto);
            return ResponseEntity.ok(createdCharacteristic);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Actualiza una característica existente
     */
    @PutMapping("/{id}")
    public ResponseEntity<CharacteristicDto> updateCharacteristic(
            @PathVariable Long id, 
            @RequestBody CharacteristicRequestDto requestDto) {
        try {
            CharacteristicDto updatedCharacteristic = characteristicService.updateCharacteristic(id, requestDto);
            return ResponseEntity.ok(updatedCharacteristic);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Elimina una característica
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCharacteristic(@PathVariable Long id) {
        try {
            characteristicService.deleteCharacteristic(id);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Obtiene una característica por nombre
     */
    @GetMapping("/by-name/{name}")
    public ResponseEntity<CharacteristicDto> getCharacteristicByName(@PathVariable String name) {
        try {
            Optional<CharacteristicDto> characteristic = characteristicService.getCharacteristicByName(name);
            
            if (characteristic.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            return ResponseEntity.ok(characteristic.get());
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
} 