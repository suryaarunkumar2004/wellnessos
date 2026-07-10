package com.wellnessos.controller;

import com.wellnessos.entity.BlogPost;
import com.wellnessos.entity.UserInteraction;
import com.wellnessos.repository.BlogPostRepository;
import com.wellnessos.repository.UserInteractionRepository;
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
@RequestMapping("/api/interactions")
@Tag(name = "User Interactions", description = "User interaction APIs for likes and bookmarks")
public class UserInteractionController {

    @Autowired
    private UserInteractionRepository interactionRepository;

    @Autowired
    private BlogPostRepository blogPostRepository;

    @Operation(summary = "Toggle like", description = "Toggles like status on a blog post")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Like toggled successfully"),
        @ApiResponse(responseCode = "404", description = "Post not found")
    })
    @PostMapping("/like")
    public ResponseEntity<Map<String, Object>> toggleLike(@RequestBody Map<String, Long> request) {
        Long userId = request.get("userId");
        Long postId = request.get("postId");
        
        BlogPost post = blogPostRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        
        var existing = interactionRepository.findByUserIdAndPostIdAndInteractionType(userId, postId, "like");
        
        if (existing.isPresent()) {
            // Unlike
            interactionRepository.delete(existing.get());
            post.setLikes(post.getLikes() - 1);
            blogPostRepository.save(post);
            
            Map<String, Object> response = new HashMap<>();
            response.put("liked", false);
            response.put("likeCount", post.getLikes());
            return ResponseEntity.ok(response);
        } else {
            // Like
            UserInteraction interaction = new UserInteraction();
            interaction.setUserId(userId);
            interaction.setPostId(postId);
            interaction.setInteractionType("like");
            interactionRepository.save(interaction);
            
            post.setLikes(post.getLikes() + 1);
            blogPostRepository.save(post);
            
            Map<String, Object> response = new HashMap<>();
            response.put("liked", true);
            response.put("likeCount", post.getLikes());
            return ResponseEntity.ok(response);
        }
    }

    @Operation(summary = "Toggle bookmark", description = "Toggles bookmark status on a blog post")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Bookmark toggled successfully"),
        @ApiResponse(responseCode = "404", description = "Post not found")
    })
    @PostMapping("/bookmark")
    public ResponseEntity<Map<String, Object>> toggleBookmark(@RequestBody Map<String, Long> request) {
        Long userId = request.get("userId");
        Long postId = request.get("postId");
        
        blogPostRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        
        var existing = interactionRepository.findByUserIdAndPostIdAndInteractionType(userId, postId, "bookmark");
        
        if (existing.isPresent()) {
            interactionRepository.delete(existing.get());
            Map<String, Object> response = new HashMap<>();
            response.put("bookmarked", false);
            return ResponseEntity.ok(response);
        } else {
            UserInteraction interaction = new UserInteraction();
            interaction.setUserId(userId);
            interaction.setPostId(postId);
            interaction.setInteractionType("bookmark");
            interactionRepository.save(interaction);
            
            Map<String, Object> response = new HashMap<>();
            response.put("bookmarked", true);
            return ResponseEntity.ok(response);
        }
    }

    @Operation(summary = "Get user likes", description = "Retrieves all liked posts for a user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Likes retrieved successfully")
    })
    @GetMapping("/likes/{userId}")
    public ResponseEntity<List<UserInteraction>> getUserLikes(@PathVariable Long userId) {
        return ResponseEntity.ok(interactionRepository.findByUserIdAndInteractionType(userId, "like"));
    }

    @Operation(summary = "Get user bookmarks", description = "Retrieves all bookmarked posts for a user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Bookmarks retrieved successfully")
    })
    @GetMapping("/bookmarks/{userId}")
    public ResponseEntity<List<UserInteraction>> getUserBookmarks(@PathVariable Long userId) {
        return ResponseEntity.ok(interactionRepository.findByUserIdAndInteractionType(userId, "bookmark"));
    }

    @Operation(summary = "Check interaction status", description = "Checks if user has liked or bookmarked a post")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Status retrieved successfully")
    })
    @GetMapping("/status/{userId}/{postId}")
    public ResponseEntity<Map<String, Boolean>> getInteractionStatus(
            @PathVariable Long userId,
            @PathVariable Long postId) {
        
        boolean liked = interactionRepository
                .findByUserIdAndPostIdAndInteractionType(userId, postId, "like")
                .isPresent();
        
        boolean bookmarked = interactionRepository
                .findByUserIdAndPostIdAndInteractionType(userId, postId, "bookmark")
                .isPresent();
        
        Map<String, Boolean> response = new HashMap<>();
        response.put("liked", liked);
        response.put("bookmarked", bookmarked);
        return ResponseEntity.ok(response);
    }
}
