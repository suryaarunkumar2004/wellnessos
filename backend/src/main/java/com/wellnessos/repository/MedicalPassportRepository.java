package com.wellnessos.repository;

import com.wellnessos.entity.MedicalPassport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface MedicalPassportRepository extends JpaRepository<MedicalPassport, Long> {
    
    /**
     * Find medical passport by user ID
     */
    Optional<MedicalPassport> findByUserId(Long userId);
    
    /**
     * Check if a user has a medical passport
     */
    boolean existsByUserId(Long userId);
    
    /**
     * Delete medical passport by user ID
     */
    @Modifying
    @Transactional
    @Query("DELETE FROM MedicalPassport m WHERE m.userId = :userId")
    void deleteByUserId(@Param("userId") Long userId);
    
    /**
     * Get organ donor status for a user
     */
    @Query("SELECT m.organDonor FROM MedicalPassport m WHERE m.userId = :userId")
    Boolean getOrganDonorStatus(@Param("userId") Long userId);
    
    /**
     * Count total organ donors
     */
    @Query("SELECT COUNT(m) FROM MedicalPassport m WHERE m.organDonor = true")
    Long countOrganDonors();
}
