package com.wellnessos.controller;

import com.wellnessos.dto.OrderDTO;
import com.wellnessos.entity.Order;
import com.wellnessos.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderDTO> createOrder(@RequestBody OrderDTO dto) {
        Order order = orderService.createOrder(dto);
        return ResponseEntity.ok(orderService.convertToDTO(order));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderDTO>> getUserOrders(@PathVariable Long userId) {
        List<Order> orders = orderService.getUserOrders(userId);
        return ResponseEntity.ok(orders.stream()
            .map(orderService::convertToDTO)
            .collect(Collectors.toList()));
    }

    @GetMapping("/{orderNumber}")
    public ResponseEntity<OrderDTO> getOrderByNumber(@PathVariable String orderNumber) {
        Order order = orderService.getOrderByNumber(orderNumber);
        return ResponseEntity.ok(orderService.convertToDTO(order));
    }

    @PutMapping("/{orderId}/status")
    public ResponseEntity<OrderDTO> updateOrderStatus(@PathVariable Long orderId, @RequestParam String status) {
        Order order = orderService.updateOrderStatus(orderId, status);
        return ResponseEntity.ok(orderService.convertToDTO(order));
    }

    @PutMapping("/{orderId}/payment")
    public ResponseEntity<OrderDTO> updatePaymentStatus(@PathVariable Long orderId, @RequestParam String status) {
        Order order = orderService.updatePaymentStatus(orderId, status);
        return ResponseEntity.ok(orderService.convertToDTO(order));
    }

    @GetMapping("/stats/{userId}")
    public ResponseEntity<Map<String, Object>> getOrderStats(@PathVariable Long userId) {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalOrders", orderService.getOrderCount(userId));
        stats.put("totalSpent", orderService.getTotalSpent(userId));
        stats.put("activeOrders", orderService.getUserOrdersByStatus(userId, "CONFIRMED").size());
        return ResponseEntity.ok(stats);
    }
}
