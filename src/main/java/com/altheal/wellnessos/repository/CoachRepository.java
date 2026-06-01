package com.altheal.wellnessos.repository;

import com.altheal.wellnessos.model.entity.Coach;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CoachRepository extends JpaRepository<Coach, Long> {

    Optional<Coach> findByEmail(String email);

    boolean existsByEmail(String email);

    @Query("SELECT c FROM Coach c WHERE LOWER(c.specialization) LIKE LOWER(CONCAT('%', :specialty, '%'))")
    List<Coach> findPractitionersBySpecialtyPattern(@Param("specialty") String specialty);

    @Modifying
    @Query("UPDATE Coach c SET c.specialization = :newSpecialty WHERE c.id = :coachId")
    int updateCoachSpecializationDirect(@Param("coachId") Long coachId, @Param("newSpecialty") String newSpecialty);
}
