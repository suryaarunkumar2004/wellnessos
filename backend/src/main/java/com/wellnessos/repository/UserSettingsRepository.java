package com.wellnessos.repository;

import com.wellnessos.entity.UserSettings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface UserSettingsRepository extends JpaRepository<UserSettings, Long> {
    
    Optional<UserSettings> findByUserId(Long userId);
    
    boolean existsByUserId(Long userId);
    
    @Modifying
    @Transactional
    @Query("DELETE FROM UserSettings u WHERE u.userId = :userId")
    void deleteByUserId(@Param("userId") Long userId);
    
    @Query("SELECT u.twoFactorEnabled FROM UserSettings u WHERE u.userId = :userId")
    Boolean getTwoFactorStatus(@Param("userId") Long userId);
}
