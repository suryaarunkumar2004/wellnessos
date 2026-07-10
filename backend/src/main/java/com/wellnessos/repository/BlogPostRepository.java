package com.wellnessos.repository;

import com.wellnessos.entity.BlogPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {
    List<BlogPost> findByPublishedTrueOrderByDateDesc();
    List<BlogPost> findByFeaturedTrueAndPublishedTrueOrderByDateDesc();
    List<BlogPost> findByCategory(String category);
    List<BlogPost> findByAuthor(String author);
    Optional<BlogPost> findBySlug(String slug);
    
    @Query("SELECT b FROM BlogPost b WHERE b.published = true AND (LOWER(b.title) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(b.excerpt) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(b.author) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(b.category) LIKE LOWER(CONCAT('%', :search, '%'))) ORDER BY b.date DESC")
    List<BlogPost> searchPosts(@Param("search") String search);
    
    @Query("SELECT DISTINCT b.category FROM BlogPost b WHERE b.published = true")
    List<String> findAllCategories();
    
    @Query("SELECT b FROM BlogPost b WHERE b.published = true ORDER BY b.views DESC LIMIT 5")
    List<BlogPost> findMostViewed();
    
    @Query("SELECT b FROM BlogPost b WHERE b.published = true ORDER BY b.likes DESC LIMIT 5")
    List<BlogPost> findMostLiked();
    
    @Query("SELECT b FROM BlogPost b WHERE b.published = true ORDER BY b.comments DESC LIMIT 5")
    List<BlogPost> findMostCommented();
}
