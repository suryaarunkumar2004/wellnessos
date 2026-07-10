package com.wellnessos.repository;

import com.wellnessos.entity.CalendarEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CalendarEventRepository extends JpaRepository<CalendarEvent, Long> {
    
    // Basic queries
    List<CalendarEvent> findByUserId(Long userId);
    List<CalendarEvent> findByUserIdAndEventDate(Long userId, LocalDate eventDate);
    List<CalendarEvent> findByUserIdAndEventDateBetween(Long userId, LocalDate startDate, LocalDate endDate);
    List<CalendarEvent> findByEventDateBetween(LocalDate startDate, LocalDate endDate);
    List<CalendarEvent> findByUserIdAndStatus(Long userId, String status);
    List<CalendarEvent> findByUserIdAndEventType(Long userId, String eventType);
    List<CalendarEvent> findByUserIdAndCategory(Long userId, String category);
    List<CalendarEvent> findByUserIdAndPriority(Long userId, String priority);
    List<CalendarEvent> findByUserIdAndIsRecurring(Long userId, Boolean isRecurring);
    List<CalendarEvent> findByUserIdAndEventDateAfter(Long userId, LocalDate date);
    
    // Complex queries with @Query
    @Query("SELECT e FROM CalendarEvent e WHERE e.userId = :userId AND e.eventDate BETWEEN :startDate AND :endDate ORDER BY e.eventDate ASC, e.startTime ASC")
    List<CalendarEvent> findEventsInRange(@Param("userId") Long userId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    @Query("SELECT e FROM CalendarEvent e WHERE e.userId = :userId AND YEAR(e.eventDate) = :year AND MONTH(e.eventDate) = :month ORDER BY e.eventDate ASC, e.startTime ASC")
    List<CalendarEvent> findEventsByMonth(@Param("userId") Long userId, @Param("year") int year, @Param("month") int month);
    
    @Query("SELECT e FROM CalendarEvent e WHERE e.userId = :userId AND e.eventDate BETWEEN :startDate AND :endDate AND e.status != :status ORDER BY e.eventDate ASC")
    List<CalendarEvent> findByUserIdAndEventDateBetweenAndStatusNot(@Param("userId") Long userId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate, @Param("status") String status);
    
    @Query("SELECT COUNT(e) FROM CalendarEvent e WHERE e.userId = :userId AND e.eventDate = :date")
    long countEventsByDate(@Param("userId") Long userId, @Param("date") LocalDate date);
    
    @Query("SELECT DISTINCT e.category FROM CalendarEvent e WHERE e.userId = :userId")
    List<String> findDistinctCategoriesByUserId(@Param("userId") Long userId);
    
    @Query("SELECT DISTINCT e.eventType FROM CalendarEvent e WHERE e.userId = :userId")
    List<String> findDistinctEventTypesByUserId(@Param("userId") Long userId);
    
    @Query("SELECT e FROM CalendarEvent e WHERE e.userId = :userId AND (LOWER(e.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(e.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(e.category) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<CalendarEvent> searchEventsByKeyword(@Param("userId") Long userId, @Param("keyword") String keyword);
    
    @Query("SELECT e FROM CalendarEvent e WHERE e.userId = :userId " +
           "AND (:category IS NULL OR e.category = :category) " +
           "AND (:type IS NULL OR e.eventType = :type) " +
           "AND (:priority IS NULL OR e.priority = :priority) " +
           "AND (:status IS NULL OR e.status = :status)")
    List<CalendarEvent> filterEvents(@Param("userId") Long userId,
                                     @Param("category") String category,
                                     @Param("type") String type,
                                     @Param("priority") String priority,
                                     @Param("status") String status);
    
    @Query("SELECT e FROM CalendarEvent e WHERE e.userId = :userId AND e.reminderMinutes > 0 AND e.reminderSent = false AND e.eventDate = CURRENT_DATE AND e.startTime <= CURRENT_TIME")
    List<CalendarEvent> findEventsNeedingReminder(@Param("userId") Long userId);
}
