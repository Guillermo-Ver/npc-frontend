package ecommerce.repository;

import ecommerce.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Spring genera la SQL automáticamente para buscar por email gracias a este
    // nombre:
    Optional<User> findByEmail(String email);
}