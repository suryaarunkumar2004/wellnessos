package com.wellnessos.service;

import com.wellnessos.dto.OrderDTO;
import com.wellnessos.dto.OrderItemDTO;
import com.wellnessos.entity.Order;
import com.wellnessos.entity.OrderItem;
import com.wellnessos.repository.OrderRepository;
import com.wellnessos.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Transactional
    public Order createOrder(OrderDTO dto) {
        Order order = new Order();
        order.setUserId(dto.getUserId());
        order.setOrderNumber(generateOrderNumber());
        order.setTotalAmount(dto.getTotalAmount());
        order.setTaxAmount(dto.getTaxAmount());
        order.setShippingAmount(dto.getShippingAmount());
        order.setPaymentMethod(dto.getPaymentMethod());
        order.setPaymentStatus("COMPLETED");
        order.setOrderStatus("CONFIRMED");
        order.setShippingAddress(dto.getShippingAddress());
        order.setBillingAddress(dto.getBillingAddress());
        order.setNotes(dto.getNotes());

        Order savedOrder = orderRepository.save(order);

        if (dto.getItems() != null) {
            for (OrderItemDTO itemDTO : dto.getItems()) {
                OrderItem item = new OrderItem();
                item.setOrder(savedOrder);
                item.setDrugId(itemDTO.getDrugId());
                item.setDrugName(itemDTO.getDrugName());
                item.setCategory(itemDTO.getCategory());
                item.setPrice(itemDTO.getPrice());
                item.setQuantity(itemDTO.getQuantity());
                item.setSubtotal(itemDTO.getSubtotal());
                orderItemRepository.save(item);
            }
        }

        return savedOrder;
    }

    @Transactional
    public Order updateOrderStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setOrderStatus(status);
        return orderRepository.save(order);
    }

    @Transactional
    public Order updatePaymentStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setPaymentStatus(status);
        return orderRepository.save(order);
    }

    public List<Order> getUserOrders(Long userId) {
        return orderRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public Order getOrderByNumber(String orderNumber) {
        return orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public List<Order> getUserOrdersByStatus(Long userId, String status) {
        return orderRepository.findByUserIdAndOrderStatus(userId, status);
    }

    public Integer getOrderCount(Long userId) {
        return orderRepository.getOrderCount(userId);
    }

    public Double getTotalSpent(Long userId) {
        Double total = orderRepository.getTotalSpent(userId);
        return total != null ? total : 0.0;
    }

    private String generateOrderNumber() {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String random = String.format("%04d", (int)(Math.random() * 10000));
        return "ORD-" + timestamp + "-" + random;
    }

    public OrderDTO convertToDTO(Order order) {
        OrderDTO dto = new OrderDTO();
        dto.setId(order.getId());
        dto.setUserId(order.getUserId());
        dto.setOrderNumber(order.getOrderNumber());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setTaxAmount(order.getTaxAmount());
        dto.setShippingAmount(order.getShippingAmount());
        dto.setPaymentMethod(order.getPaymentMethod());
        dto.setPaymentStatus(order.getPaymentStatus());
        dto.setOrderStatus(order.getOrderStatus());
        dto.setShippingAddress(order.getShippingAddress());
        dto.setBillingAddress(order.getBillingAddress());
        dto.setNotes(order.getNotes());
        dto.setCreatedAt(order.getCreatedAt());
        dto.setUpdatedAt(order.getUpdatedAt());
        
        if (order.getItems() != null) {
            List<OrderItemDTO> items = order.getItems().stream()
                .map(this::convertItemToDTO)
                .collect(Collectors.toList());
            dto.setItems(items);
        }
        
        return dto;
    }

    private OrderItemDTO convertItemToDTO(OrderItem item) {
        OrderItemDTO dto = new OrderItemDTO();
        dto.setId(item.getId());
        dto.setDrugId(item.getDrugId());
        dto.setDrugName(item.getDrugName());
        dto.setCategory(item.getCategory());
        dto.setPrice(item.getPrice());
        dto.setQuantity(item.getQuantity());
        dto.setSubtotal(item.getSubtotal());
        return dto;
    }
}
