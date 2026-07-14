package com.wellnessos.controller;

import com.wellnessos.entity.Favorite;
import com.wellnessos.repository.FavoriteRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/favorites")
@Tag(name = "Favorites", description = "Favorite management APIs for saving favorite services")
public class FavoriteController {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Operation(summary = "Get favorites by user", description = "Retrieves all favorites for a specific user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Favorites retrieved successfully")
    })
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Favorite>> getFavorites(@PathVariable Long userId) {
        return ResponseEntity.ok(favoriteRepository.findByUserId(userId));
    }

    @Operation(summary = "Add a favorite", description = "Adds a service to user's favorites")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Favorite added successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid favorite data")
    })
    @PostMapping
    public ResponseEntity<Favorite> addFavorite(@RequestBody Favorite favorite) {
        var existing = favoriteRepository.findByUserIdAndServiceId(favorite.getUserId(), favorite.getServiceId());
        if (existing.isPresent()) {
            return ResponseEntity.ok(existing.get());
        }
        return ResponseEntity.ok(favoriteRepository.save(favorite));
    }

    @DeleteMapping("/{userId}/{serviceId}")
    public ResponseEntity<?> removeFavorite(@PathVariable Long userId, @PathVariable Long serviceId) {
        favoriteRepository.findByUserIdAndServiceId(userId, serviceId).ifPresent(favorite -> {
            favoriteRepository.delete(favorite);
        });
        Map<String, String> response = new HashMap<>();
        response.put("message", "Favorite removed successfully");
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/user/{userId}/clear")
    public ResponseEntity<?> clearFavorites(@PathVariable Long userId) {
        List<Favorite> favorites = favoriteRepository.findByUserId(userId);
        favoriteRepository.deleteAll(favorites);
        Map<String, String> response = new HashMap<>();
        response.put("message", "All favorites cleared successfully");
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Check if favorite exists", description = "Checks if a service is in user's favorites")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Favorite check completed")
    })
    @GetMapping("/check/{userId}/{serviceId}")
    public ResponseEntity<Map<String, Boolean>> checkFavorite(@PathVariable Long userId, @PathVariable Long serviceId) {
        boolean exists = favoriteRepository.findByUserIdAndServiceId(userId, serviceId).isPresent();
        Map<String, Boolean> response = new HashMap<>();
        response.put("isFavorite", exists);
        return ResponseEntity.ok(response);
    }
}
