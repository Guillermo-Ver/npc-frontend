package ecommerce.controller;

import ecommerce.model.Order;
import ecommerce.repository.OrderRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderRepository orderRepository;

    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createOrder(@RequestBody Order order) {
        log.info(">> SYSTEM LOG: Registrando pedido para: {}", order.getUsername());
        Order savedOrder = orderRepository.save(order);
        return ResponseEntity.ok(Map.of(
                "message", "SUCCESS: Orden guardada",
                "orderId", savedOrder.getId()));
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<List<Order>> getUserOrders(@PathVariable String username) {
        return ResponseEntity.ok(orderRepository.findByUsername(username));
    }
}