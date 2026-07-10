package com.wellnessos.controller;

import com.wellnessos.dto.BlogPostDTO;
import com.wellnessos.dto.BlogCommentDTO;
import com.wellnessos.entity.BlogPost;
import com.wellnessos.entity.BlogComment;
import com.wellnessos.repository.BlogPostRepository;
import com.wellnessos.repository.BlogCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/blog")
public class BlogController {

    @Autowired
    private BlogPostRepository blogPostRepository;

    @Autowired
    private BlogCommentRepository blogCommentRepository;

    @GetMapping("/posts")
    public ResponseEntity<Page<BlogPostDTO>> getAllPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("date").descending());
        Page<BlogPost> posts = blogPostRepository.findAll(pageable);
        Page<BlogPostDTO> dtos = posts.map(this::convertToDTO);
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getCategories() {
        List<String> categories = blogPostRepository.findAllCategories();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BlogPostDTO> getPostById(@PathVariable Long id) {
        BlogPost post = blogPostRepository.findById(id).orElse(null);
        if (post == null) {
            return ResponseEntity.notFound().build();
        }
        post.setViews(post.getViews() + 1);
        blogPostRepository.save(post);
        return ResponseEntity.ok(convertToDTO(post));
    }

    @GetMapping("/{postId}/comments")
    public ResponseEntity<Page<BlogCommentDTO>> getCommentsByPost(
            @PathVariable Long postId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<BlogComment> comments = blogCommentRepository.findByPostId(postId, pageable);
        Page<BlogCommentDTO> dtos = comments.map(this::convertCommentToDTO);
        return ResponseEntity.ok(dtos);
    }

    @PostMapping("/{postId}/comments")
    public ResponseEntity<BlogCommentDTO> addComment(@PathVariable Long postId, @RequestBody BlogCommentDTO commentDTO) {
        BlogPost post = blogPostRepository.findById(postId).orElse(null);
        if (post == null) {
            return ResponseEntity.notFound().build();
        }
        BlogComment comment = new BlogComment();
        comment.setPost(post);
        comment.setAuthor(commentDTO.getAuthor() != null && !commentDTO.getAuthor().isEmpty() ? commentDTO.getAuthor() : "Anonymous");
        comment.setText(commentDTO.getText());
        comment.setLikes(0);
        BlogComment saved = blogCommentRepository.save(comment);
        
        // Update comment count on post
        post.setComments(post.getComments() + 1);
        blogPostRepository.save(post);
        
        return ResponseEntity.ok(convertCommentToDTO(saved));
    }

    private BlogPostDTO convertToDTO(BlogPost post) {
        BlogPostDTO dto = new BlogPostDTO();
        dto.setId(post.getId());
        dto.setTitle(post.getTitle() != null ? post.getTitle() : "Untitled");
        dto.setExcerpt(post.getExcerpt() != null ? post.getExcerpt() : "");
        dto.setContent(post.getContent() != null ? post.getContent() : "");
        dto.setCategory(post.getCategory() != null ? post.getCategory() : "General");
        dto.setAuthor(post.getAuthor() != null ? post.getAuthor() : "Unknown");
        dto.setAuthorImage(post.getAuthorImage() != null ? post.getAuthorImage() : "https://randomuser.me/api/portraits/lego/1.jpg");
        dto.setImageUrl(post.getImageUrl() != null ? post.getImageUrl() : "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop");
        dto.setThumbnail(post.getThumbnail() != null ? post.getThumbnail() : "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop");
        dto.setDate(post.getDate() != null ? post.getDate() : java.time.LocalDateTime.now());
        dto.setReadTime(post.getReadTime() != null ? post.getReadTime() : "5 min read");
        dto.setViews(post.getViews() != null ? post.getViews() : 0);
        dto.setLikes(post.getLikes() != null ? post.getLikes() : 0);
        dto.setComments(post.getComments() != null ? post.getComments() : 0);
        dto.setFeatured(post.getFeatured() != null ? post.getFeatured() : false);
        dto.setPublished(post.getPublished() != null ? post.getPublished() : true);
        dto.setSlug(post.getSlug() != null ? post.getSlug() : "");
        dto.setTags(post.getTags());
        dto.setVideoUrl(post.getVideoUrl());
        dto.setCreatedAt(post.getCreatedAt());
        dto.setUpdatedAt(post.getUpdatedAt());
        return dto;
    }

    private BlogCommentDTO convertCommentToDTO(BlogComment comment) {
        BlogCommentDTO dto = new BlogCommentDTO();
        dto.setId(comment.getId());
        dto.setAuthor(comment.getAuthor());
        dto.setText(comment.getText());
        dto.setLikes(comment.getLikes());
        dto.setPostId(comment.getPost() != null ? comment.getPost().getId() : null);
        dto.setCreatedAt(comment.getCreatedAt());
        dto.setUpdatedAt(comment.getUpdatedAt());
        return dto;
    }
}
