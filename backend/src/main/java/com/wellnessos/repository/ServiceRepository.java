package com.wellnessos.repository;

import com.wellnessos.entity.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {
    List<Service> findByIsActiveTrue();
    List<Service> findByCategory(String category);
    List<Service> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String name, String description);
    
    @Query("SELECT DISTINCT s.category FROM Service s WHERE s.isActive = true")
    List<String> findAllCategories();
    
    @Query("SELECT s FROM Service s WHERE s.isActive = true AND (LOWER(s.name) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(s.description) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<Service> searchServices(@Param("search") String search);
}
