package com.wellnessos.repository;

import com.wellnessos.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUserId(Long userId);
    Optional<CartItem> findByUserIdAndServiceId(Long userId, Long serviceId);
    void deleteByUserIdAndServiceId(Long userId, Long serviceId);
}
