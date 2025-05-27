package com.autorent.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(length = 1000) // Permitir descripciones más largas
    private String description;

    private String price; // Podríamos cambiarlo a BigDecimal para mayor precisión en el futuro

    @ManyToOne(fetch = FetchType.EAGER) // Cargar la categoría siempre con el producto
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    // Para las imágenes, podríamos usar una tabla separada o almacenar URLs como una lista de Strings
    // Por simplicidad inicial, y para alinear con el frontend, usaré una lista de Strings para las URLs.
    // En una implementación más robusta, esto sería una entidad separada Image con una relación OneToMany.
    @ElementCollection(fetch = FetchType.LAZY) // Cargar solo cuando se necesite
    @CollectionTable(name = "product_images", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "image_url", length = 500)
    private List<String> imageUrls;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "product_characteristics",
        joinColumns = @JoinColumn(name = "product_id"),
        inverseJoinColumns = @JoinColumn(name = "characteristic_id")
    )
    private Set<Characteristic> characteristics;

}
