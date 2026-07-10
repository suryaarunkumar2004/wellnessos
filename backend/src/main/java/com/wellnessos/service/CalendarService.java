package com.wellnessos.service;

import com.wellnessos.entity.CalendarEvent;
import com.wellnessos.repository.CalendarEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CalendarService {

    @Autowired
    private CalendarEventRepository calendarEventRepository;

    // ===== BASIC CRUD =====
    public List<CalendarEvent> getAllEvents() {
        return calendarEventRepository.findAll();
    }

    public List<CalendarEvent> getEventsByUser(Long userId) {
        return calendarEventRepository.findByUserId(userId);
    }

    public Optional<CalendarEvent> getEventById(Long id) {
        return calendarEventRepository.findById(id);
    }

    public CalendarEvent createEvent(CalendarEvent event) {
        if (event.getCreatedAt() == null) {
            event.setCreatedAt(LocalDateTime.now());
        }
        event.setUpdatedAt(LocalDateTime.now());
        if (event.getStatus() == null) event.setStatus("scheduled");
        if (event.getPriority() == null) event.setPriority("medium");
        return calendarEventRepository.save(event);
    }

    public CalendarEvent updateEvent(Long id, CalendarEvent event) {
        event.setId(id);
        event.setUpdatedAt(LocalDateTime.now());
        return calendarEventRepository.save(event);
    }

    public void deleteEvent(Long id) {
        calendarEventRepository.deleteById(id);
    }

    // ===== DATE-BASED QUERIES =====
    public List<CalendarEvent> getEventsByDate(Long userId, LocalDate date) {
        return calendarEventRepository.findByUserIdAndEventDate(userId, date);
    }

    public List<CalendarEvent> getEventsByDateRange(Long userId, LocalDate startDate, LocalDate endDate) {
        return calendarEventRepository.findByUserIdAndEventDateBetween(userId, startDate, endDate);
    }

    public List<CalendarEvent> getEventsByMonth(Long userId, int year, int month) {
        return calendarEventRepository.findEventsByMonth(userId, year, month);
    }

    public List<CalendarEvent> getEventsByWeek(Long userId, LocalDate weekStart) {
        LocalDate weekEnd = weekStart.plusDays(6);
        return calendarEventRepository.findByUserIdAndEventDateBetween(userId, weekStart, weekEnd);
    }

    public List<CalendarEvent> getTodayEvents(Long userId) {
        return calendarEventRepository.findByUserIdAndEventDate(userId, LocalDate.now());
    }

    public List<CalendarEvent> getTomorrowEvents(Long userId) {
        return calendarEventRepository.findByUserIdAndEventDate(userId, LocalDate.now().plusDays(1));
    }

    public List<CalendarEvent> getYesterdayEvents(Long userId) {
        return calendarEventRepository.findByUserIdAndEventDate(userId, LocalDate.now().minusDays(1));
    }

    // ===== STATUS-BASED QUERIES =====
    public List<CalendarEvent> getUpcomingEvents(Long userId, int days) {
        LocalDate startDate = LocalDate.now();
        LocalDate endDate = LocalDate.now().plusDays(days);
        return calendarEventRepository.findByUserIdAndEventDateBetweenAndStatusNot(userId, startDate, endDate, "completed");
    }

    public List<CalendarEvent> getEventsByStatus(Long userId, String status) {
        return calendarEventRepository.findByUserIdAndStatus(userId, status);
    }

    public List<CalendarEvent> getCompletedEvents(Long userId) {
        return calendarEventRepository.findByUserIdAndStatus(userId, "completed");
    }

    public List<CalendarEvent> getCancelledEvents(Long userId) {
        return calendarEventRepository.findByUserIdAndStatus(userId, "cancelled");
    }

    // ===== TYPE & CATEGORY QUERIES =====
    public List<CalendarEvent> getEventsByType(Long userId, String eventType) {
        return calendarEventRepository.findByUserIdAndEventType(userId, eventType);
    }

    public List<CalendarEvent> getEventsByCategory(Long userId, String category) {
        return calendarEventRepository.findByUserIdAndCategory(userId, category);
    }

    public List<CalendarEvent> getEventsByPriority(Long userId, String priority) {
        return calendarEventRepository.findByUserIdAndPriority(userId, priority);
    }

    public List<String> getCategories(Long userId) {
        return calendarEventRepository.findDistinctCategoriesByUserId(userId);
    }

    public List<String> getEventTypes(Long userId) {
        return calendarEventRepository.findDistinctEventTypesByUserId(userId);
    }

    // ===== STATISTICS =====
    public Map<String, Object> getEventStats(Long userId) {
        List<CalendarEvent> events = calendarEventRepository.findByUserId(userId);
        Map<String, Object> stats = new HashMap<>();
        
        stats.put("total", events.size());
        stats.put("upcoming", events.stream().filter(e -> !"completed".equals(e.getStatus()) && !"cancelled".equals(e.getStatus())).count());
        stats.put("completed", events.stream().filter(e -> "completed".equals(e.getStatus())).count());
        stats.put("cancelled", events.stream().filter(e -> "cancelled".equals(e.getStatus())).count());
        
        Map<String, Long> byCategory = events.stream()
                .collect(Collectors.groupingBy(CalendarEvent::getCategory, Collectors.counting()));
        stats.put("byCategory", byCategory);
        
        Map<String, Long> byType = events.stream()
                .collect(Collectors.groupingBy(CalendarEvent::getEventType, Collectors.counting()));
        stats.put("byType", byType);
        
        Map<String, Long> byPriority = events.stream()
                .collect(Collectors.groupingBy(CalendarEvent::getPriority, Collectors.counting()));
        stats.put("byPriority", byPriority);
        
        // This week stats
        LocalDate weekStart = LocalDate.now().minusDays(LocalDate.now().getDayOfWeek().getValue() - 1);
        LocalDate weekEnd = weekStart.plusDays(6);
        stats.put("thisWeek", events.stream()
                .filter(e -> e.getEventDate().isAfter(weekStart.minusDays(1)) && e.getEventDate().isBefore(weekEnd.plusDays(1)))
                .count());
        
        // This month stats
        YearMonth thisMonth = YearMonth.now();
        LocalDate monthStart = thisMonth.atDay(1);
        LocalDate monthEnd = thisMonth.atEndOfMonth();
        stats.put("thisMonth", events.stream()
                .filter(e -> e.getEventDate().isAfter(monthStart.minusDays(1)) && e.getEventDate().isBefore(monthEnd.plusDays(1)))
                .count());
        
        return stats;
    }

    public long countEventsByDate(Long userId, LocalDate date) {
        return calendarEventRepository.countEventsByDate(userId, date);
    }

    // ===== RECURRING EVENTS =====
    public List<CalendarEvent> getRecurringEvents(Long userId) {
        return calendarEventRepository.findByUserIdAndIsRecurring(userId, true);
    }

    public CalendarEvent updateRecurringPattern(Long id, String pattern, LocalDate endDate) {
        CalendarEvent event = calendarEventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        event.setIsRecurring(true);
        event.setRecurringPattern(pattern);
        event.setRecurringEndDate(endDate);
        event.setUpdatedAt(LocalDateTime.now());
        return calendarEventRepository.save(event);
    }

    // ===== SEARCH & FILTER =====
    public List<CalendarEvent> searchEvents(Long userId, String keyword) {
        return calendarEventRepository.searchEventsByKeyword(userId, keyword);
    }

    public List<CalendarEvent> filterEvents(Long userId, String category, String type, String priority, String status) {
        return calendarEventRepository.filterEvents(userId, category, type, priority, status);
    }

    // ===== BULK OPERATIONS =====
    public void bulkDelete(List<Long> ids) {
        calendarEventRepository.deleteAllById(ids);
    }

    public void bulkUpdateStatus(List<Long> ids, String status) {
        for (Long id : ids) {
            CalendarEvent event = calendarEventRepository.findById(id).orElse(null);
            if (event != null) {
                event.setStatus(status);
                event.setUpdatedAt(LocalDateTime.now());
                calendarEventRepository.save(event);
            }
        }
    }

    // ===== REMINDERS =====
    public List<CalendarEvent> getEventsNeedingReminder(Long userId) {
        return calendarEventRepository.findEventsNeedingReminder(userId);
    }

    // ===== EXPORT =====
    public List<CalendarEvent> exportEvents(Long userId, LocalDate startDate, LocalDate endDate) {
        return calendarEventRepository.findByUserIdAndEventDateBetween(userId, startDate, endDate);
    }

    // ===== SMART SUGGESTIONS =====
    public List<CalendarEvent> getSmartSuggestions(Long userId) {
        LocalDate monthAgo = LocalDate.now().minusMonths(1);
        List<CalendarEvent> pastEvents = calendarEventRepository.findByUserIdAndEventDateAfter(userId, monthAgo);
        return pastEvents.stream()
                .filter(e -> e.getIsRecurring() != null && e.getIsRecurring())
                .collect(Collectors.toList());
    }
}
