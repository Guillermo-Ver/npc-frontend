package ecommerce.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String tag;
    private Double price;
    private String imageUrl;

    @Column(length = 500)
    private String description;

    // --- NUEVOS CAMPOS PARA EL DROP DETALLADO ---

    private String designerName;
    private String designerInstagram;

    @Column(length = 500)
    private String materials;

    private String productionLocation;

    // Aquí podremos guardar el ID de un vídeo de YouTube o la ruta de un vídeo
    // local
    private String videoUrl;
}