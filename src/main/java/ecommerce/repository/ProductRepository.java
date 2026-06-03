package ecommerce.repository;

import ecommerce.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Solo con extender JpaRepository ya tienes el CRUD completo (save, findAll,
    // delete...)
}