package com.wellnessos.repository;

import com.wellnessos.entity.BlogComment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogCommentRepository extends JpaRepository<BlogComment, Long> {
    // Paginated comments for a post
    Page<BlogComment> findByPostId(Long postId, Pageable pageable);
    
    // Count comments for a post
    long countByPostId(Long postId);
    
    // Get all comments for a post (for total count)
    List<BlogComment> findByPostId(Long postId);
}
