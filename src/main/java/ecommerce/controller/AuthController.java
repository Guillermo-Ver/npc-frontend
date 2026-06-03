package ecommerce.controller;

import ecommerce.model.User;
import ecommerce.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user) {
        log.info(">> SYSTEM LOG: Intento de registro para el email: {}", user.getEmail());

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            log.warn(">> SYSTEM ALERT: Registro fallido. Email ya existente: {}", user.getEmail());
            return ResponseEntity.badRequest().body(Map.of("message", "ERROR: El email ya está registrado"));
        }

        user.setRole("ROLE_CUSTOMER");
        User savedUser = userRepository.save(user);

        log.info(">> SYSTEM LOG: Usuario creado con éxito. ID: {}", savedUser.getId());
        return ResponseEntity.ok(Map.of("message", "SUCCESS: Usuario registrado", "userId", savedUser.getId()));
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        log.info(">> SYSTEM LOG: Intento de login para: {}", email);

        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isPresent() && userOpt.get().getPassword().equals(password)) {
            User user = userOpt.get();
            log.info(">> SYSTEM LOG: Login EXITOSO para: {}", email);
            return ResponseEntity.ok(Map.of(
                    "message", "ACCESS_GRANTED",
                    "username", user.getUsername(),
                    "role", user.getRole()));
        }

        log.warn(">> SYSTEM ALERT: Login FALLIDO para: {}", email);
        return ResponseEntity.status(401).body(Map.of("message", "ERROR: Credenciales inválidas"));
    }
}