package com.autorent.backend.repository;

import com.autorent.backend.model.Characteristic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CharacteristicRepository extends JpaRepository<Characteristic, Long> {
    
    Optional<Characteristic> findByName(String name);
    
    boolean existsByName(String name);
    
} 