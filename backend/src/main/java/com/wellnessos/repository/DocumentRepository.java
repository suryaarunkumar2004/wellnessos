package com.wellnessos.repository;

import com.wellnessos.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    
    /**
     * Get all documents for a user
     */
    List<Document> findByUserId(Long userId);
    
    /**
     * Get all documents for a user, ordered by upload date descending
     */
    @Query("SELECT d FROM Document d WHERE d.userId = :userId ORDER BY d.uploadedAt DESC")
    List<Document> findByUserIdOrderByUploadedAtDesc(@Param("userId") Long userId);
    
    /**
     * Get documents by category
     */
    List<Document> findByUserIdAndCategory(Long userId, String category);
    
    /**
     * Get documents by name (partial match)
     */
    @Query("SELECT d FROM Document d WHERE d.userId = :userId AND LOWER(d.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Document> findByNameContaining(@Param("userId") Long userId, @Param("name") String name);
    
    /**
     * Get document by user ID and document ID
     */
    Optional<Document> findByUserIdAndId(Long userId, Long id);
    
    /**
     * Delete all documents for a user
     */
    @Modifying
    @Transactional
    @Query("DELETE FROM Document d WHERE d.userId = :userId")
    void deleteByUserId(@Param("userId") Long userId);
    
    /**
     * Count documents for a user
     */
    long countByUserId(Long userId);
    
    /**
     * Get distinct categories for a user
     */
    @Query("SELECT DISTINCT d.category FROM Document d WHERE d.userId = :userId")
    List<String> findDistinctCategoriesByUserId(@Param("userId") Long userId);
    
    /**
     * Get total file size for a user (approximate)
     */
    @Query("SELECT SUM(CAST(REPLACE(REPLACE(d.fileSize, ' KB', ''), ' MB', '') AS double)) FROM Document d WHERE d.userId = :userId")
    Double getTotalFileSize(@Param("userId") Long userId);
}
