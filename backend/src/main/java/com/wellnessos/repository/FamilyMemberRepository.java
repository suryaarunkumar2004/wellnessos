package com.wellnessos.repository;

import com.wellnessos.entity.FamilyMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface FamilyMemberRepository extends JpaRepository<FamilyMember, Long> {
    
    /**
     * Get all family members for a user
     */
    List<FamilyMember> findByUserId(Long userId);
    
    /**
     * Get all family members for a user, ordered by relation and name
     */
    @Query("SELECT f FROM FamilyMember f WHERE f.userId = :userId ORDER BY f.relation, f.name")
    List<FamilyMember> findByUserIdOrdered(@Param("userId") Long userId);
    
    /**
     * Get family members by relation type
     */
    List<FamilyMember> findByUserIdAndRelation(Long userId, String relation);
    
    /**
     * Get family member by user ID and name
     */
    Optional<FamilyMember> findByUserIdAndName(Long userId, String name);
    
    /**
     * Delete all family members for a user
     */
    @Modifying
    @Transactional
    @Query("DELETE FROM FamilyMember f WHERE f.userId = :userId")
    void deleteByUserId(@Param("userId") Long userId);
    
    /**
     * Count family members for a user
     */
    long countByUserId(Long userId);
    
    /**
     * Get distinct relation types for a user
     */
    @Query("SELECT DISTINCT f.relation FROM FamilyMember f WHERE f.userId = :userId")
    List<String> findDistinctRelationsByUserId(@Param("userId") Long userId);
}
