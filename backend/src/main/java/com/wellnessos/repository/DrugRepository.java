package com.wellnessos.repository;

import com.wellnessos.entity.Drug;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DrugRepository extends JpaRepository<Drug, Long> {
    
    // Basic CRUD queries
    List<Drug> findByIsActiveTrue();
    Page<Drug> findByIsActiveTrue(Pageable pageable);
    long countByIsActiveTrue();
    long countByCategory(String category);
    Optional<Drug> findByName(String name);
    List<Drug> findByNameContainingIgnoreCase(String name);
    List<Drug> findByCategory(String category);
    List<Drug> findByCategoryIn(List<String> categories);
    List<Drug> findByAvailability(String availability);
    List<Drug> findByPrice(String price);
    List<Drug> findByRatingGreaterThanEqual(Double rating);
    List<Drug> findBySideEffectsContainingIgnoreCase(String sideEffect);
    
    // Advanced search queries
    @Query("SELECT d FROM Drug d WHERE d.isActive = true AND " +
           "(:q IS NULL OR LOWER(d.name) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
           "LOWER(d.category) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
           "LOWER(d.description) LIKE LOWER(CONCAT('%', :q, '%'))) AND " +
           "(:category IS NULL OR d.category = :category) AND " +
           "(:availability IS NULL OR d.availability = :availability) AND " +
           "(:minRating IS NULL OR d.rating >= :minRating) AND " +
           "(:maxRating IS NULL OR d.rating <= :maxRating) AND " +
           "(:price IS NULL OR d.price = :price)")
    List<Drug> searchDrugsAdvanced(@Param("q") String q,
                                   @Param("category") String category,
                                   @Param("availability") String availability,
                                   @Param("minRating") Double minRating,
                                   @Param("maxRating") Double maxRating,
                                   @Param("price") String price);
    
    @Query("SELECT DISTINCT d.category FROM Drug d WHERE d.isActive = true")
    List<String> findAllCategories();

    @Query("SELECT d.category, COUNT(d) FROM Drug d WHERE d.isActive = true GROUP BY d.category")
    List<Object[]> getCategoryDistribution();
    
    @Query("SELECT d FROM Drug d WHERE d.isActive = true ORDER BY d.rating DESC LIMIT :limit")
    List<Drug> findTopNRated(@Param("limit") int limit);
    
    @Query("SELECT d FROM Drug d WHERE d.isActive = true ORDER BY d.createdAt DESC LIMIT :limit")
    List<Drug> findRecentDrugs(@Param("limit") int limit);
    
    @Query("SELECT d FROM Drug d WHERE d.isActive = true AND d.price BETWEEN :minPrice AND :maxPrice")
    List<Drug> findByPriceRange(@Param("minPrice") String minPrice, @Param("maxPrice") String maxPrice);
    
    @Query("SELECT d FROM Drug d WHERE d.isActive = true AND d.rating BETWEEN :minRating AND :maxRating")
    List<Drug> findByRatingRange(@Param("minRating") Double minRating, @Param("maxRating") Double maxRating);
    
    @Query("SELECT AVG(d.rating) FROM Drug d WHERE d.isActive = true")
    Double getAverageRating();
    
    @Query("SELECT d.category FROM Drug d WHERE d.isActive = true GROUP BY d.category ORDER BY COUNT(d) DESC LIMIT 1")
    String findMostCommonCategory();
    
    @Query("SELECT d.availability, COUNT(d) FROM Drug d WHERE d.isActive = true GROUP BY d.availability")
    List<Object[]> countByAvailability();
    
    @Query("SELECT d.price, COUNT(d) FROM Drug d WHERE d.isActive = true GROUP BY d.price")
    List<Object[]> getPriceDistribution();
    
    @Query(value = "SELECT d.* FROM drugs d WHERE d.is_active = true ORDER BY d.rating DESC LIMIT :limit", nativeQuery = true)
    List<Drug> findPopularDrugs(@Param("limit") int limit);
    
    @Query("SELECT d FROM Drug d WHERE d.isActive = true AND d.category = :category AND d.rating BETWEEN :minRating AND :maxRating")
    List<Drug> findByCategoryAndRatingBetween(@Param("category") String category, 
                                              @Param("minRating") Double minRating, 
                                              @Param("maxRating") Double maxRating);
    
    @Query("SELECT d FROM Drug d WHERE d.isActive = true AND " +
           "(:name IS NULL OR LOWER(d.name) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
           "(:category IS NULL OR d.category = :category) AND " +
           "(:availability IS NULL OR d.availability = :availability) AND " +
           "(:minRating IS NULL OR d.rating >= :minRating) AND " +
           "(:priceRange IS NULL OR d.price = :priceRange)")
    List<Drug> advancedSearch(@Param("name") String name,
                              @Param("category") String category,
                              @Param("availability") String availability,
                              @Param("minRating") Double minRating,
                              @Param("priceRange") String priceRange);
}
