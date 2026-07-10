package com.wellnessos.controller;

import com.wellnessos.dto.BookingDTO;
import com.wellnessos.entity.Booking;
import com.wellnessos.repository.BookingRepository;
import com.wellnessos.service.EmailService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/bookings")
@Tag(name = "Bookings", description = "Service booking management APIs")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private EmailService emailService;

    @Operation(summary = "Create a new booking", description = "Creates a new service booking and sends confirmation email")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Booking created successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid booking data")
    })
    @PostMapping
    public ResponseEntity<BookingDTO> createBooking(@RequestBody BookingDTO dto) {
        Booking booking = convertToEntity(dto);
        String bookingId = "BK" + System.currentTimeMillis() + String.format("%03d", (int)(Math.random() * 1000));
        booking.setBookingId(bookingId);
        booking.setStatus("confirmed");
        Booking saved = bookingRepository.save(booking);
        // emailService.sendBookingConfirmation(saved);
        return ResponseEntity.ok(convertToDTO(saved));
    }

    @Operation(summary = "Get bookings by email", description = "Retrieves all bookings for a specific email")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Bookings retrieved successfully")
    })
    @GetMapping("/email/{email}")
    public ResponseEntity<List<BookingDTO>> getBookingsByEmail(@PathVariable String email) {
        List<Booking> bookings = bookingRepository.findByPatientEmail(email);
        return ResponseEntity.ok(bookings.stream().map(this::convertToDTO).collect(Collectors.toList()));
    }

    private BookingDTO convertToDTO(Booking booking) {
        BookingDTO dto = new BookingDTO();
        dto.setId(booking.getId());
        dto.setBookingId(booking.getBookingId());
        dto.setServiceName(booking.getServiceName());
        dto.setServiceCategory(booking.getServiceCategory());
        dto.setPatientName(booking.getPatientName());
        dto.setPatientEmail(booking.getPatientEmail());
        dto.setPatientPhone(booking.getPatientPhone());
        dto.setBookingDate(booking.getBookingDate());
        dto.setBookingTime(booking.getBookingTime());
        dto.setMessage(booking.getMessage());
        dto.setStatus(booking.getStatus());
        return dto;
    }

    private Booking convertToEntity(BookingDTO dto) {
        Booking booking = new Booking();
        booking.setServiceName(dto.getServiceName());
        booking.setServiceCategory(dto.getServiceCategory());
        booking.setPatientName(dto.getPatientName());
        booking.setPatientEmail(dto.getPatientEmail());
        booking.setPatientPhone(dto.getPatientPhone());
        booking.setBookingDate(dto.getBookingDate() != null ? dto.getBookingDate() : LocalDate.now());
        booking.setBookingTime(dto.getBookingTime());
        booking.setMessage(dto.getMessage());
        booking.setStatus(dto.getStatus() != null ? dto.getStatus() : "pending");
        return booking;
    }
}
