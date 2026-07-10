package com.wellnessos.controller;

import com.wellnessos.entity.CartItem;
import com.wellnessos.repository.CartItemRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@Tag(name = "Cart", description = "Shopping cart management APIs for service booking")
public class CartController {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Operation(summary = "Get cart by user", description = "Retrieves all cart items for a specific user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Cart items retrieved successfully")
    })
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CartItem>> getCart(@PathVariable Long userId) {
        return ResponseEntity.ok(cartItemRepository.findByUserId(userId));
    }

    @Operation(summary = "Add to cart", description = "Adds a service to user's cart")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Item added to cart successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid cart data")
    })
    @PostMapping
    public ResponseEntity<CartItem> addToCart(@RequestBody CartItem cartItem) {
        return ResponseEntity.ok(cartItemRepository.save(cartItem));
    }

    @Operation(summary = "Update cart quantity", description = "Updates the quantity of an item in the cart")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Cart quantity updated successfully"),
        @ApiResponse(responseCode = "404", description = "Cart item not found")
    })
    @PutMapping("/{id}")
    public ResponseEntity<CartItem> updateQuantity(@PathVariable Long id, @RequestParam Integer quantity) {
        CartItem item = cartItemRepository.findById(id).orElseThrow();
        item.setQuantity(quantity);
        return ResponseEntity.ok(cartItemRepository.save(item));
    }

    @Operation(summary = "Remove from cart", description = "Removes a service from user's cart")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Item removed from cart successfully"),
        @ApiResponse(responseCode = "404", description = "Cart item not found")
    })
    @DeleteMapping("/{userId}/{serviceId}")
    public ResponseEntity<?> removeFromCart(@PathVariable Long userId, @PathVariable Long serviceId) {
        cartItemRepository.deleteByUserIdAndServiceId(userId, serviceId);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Item removed from cart");
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Clear cart", description = "Removes all items from user's cart")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Cart cleared successfully")
    })
    @DeleteMapping("/clear/{userId}")
    public ResponseEntity<?> clearCart(@PathVariable Long userId) {
        List<CartItem> items = cartItemRepository.findByUserId(userId);
        cartItemRepository.deleteAll(items);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Cart cleared successfully");
        return ResponseEntity.ok(response);
    }
}
