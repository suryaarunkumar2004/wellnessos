package com.wellnessos.repository;

import com.wellnessos.entity.UserInteraction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserInteractionRepository extends JpaRepository<UserInteraction, Long> {
    Optional<UserInteraction> findByUserIdAndPostIdAndInteractionType(Long userId, Long postId, String interactionType);
    
    List<UserInteraction> findByUserIdAndInteractionType(Long userId, String interactionType);
    
    @Query("SELECT COUNT(u) FROM UserInteraction u WHERE u.postId = :postId AND u.interactionType = :type")
    Integer countByPostIdAndInteractionType(@Param("postId") Long postId, @Param("type") String type);
    
    @Transactional
    void deleteByUserIdAndPostIdAndInteractionType(Long userId, Long postId, String interactionType);
}
