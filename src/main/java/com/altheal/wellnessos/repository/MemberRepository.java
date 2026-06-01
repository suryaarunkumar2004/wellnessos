package com.altheal.wellnessos.repository;

import com.altheal.wellnessos.model.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmail(String email);

    boolean existsByClientTrackingToken(String token);

    @Query("SELECT m FROM Member m WHERE m.assignedCoach.id = :coachId")
    Page<Member> findByAssignedCoachId(@Param("coachId") Long coachId, Pageable pageable);
}
