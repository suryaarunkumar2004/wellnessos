package com.wellnessos.repository;

import com.wellnessos.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserIdOrderByCreatedAtDesc(Long userId);
    Optional<Order> findByOrderNumber(String orderNumber);
    List<Order> findByUserIdAndOrderStatus(Long userId, String orderStatus);
    List<Order> findByUserIdAndCreatedAtBetween(Long userId, LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT COUNT(o) FROM Order o WHERE o.userId = :userId")
    Integer getOrderCount(@Param("userId") Long userId);
    
    @Query("SELECT SUM(o.totalAmount) FROM Order o WHERE o.userId = :userId AND o.orderStatus = 'COMPLETED'")
    Double getTotalSpent(@Param("userId") Long userId);
}
