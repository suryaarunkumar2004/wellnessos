package com.altheal.wellnessos.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "health_histories")
@Getter
@Setter
@NoArgsConstructor
public class HealthHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "initial_burnout_index", nullable = false)
    private int initialBurnoutIndex;

    @Column(name = "primary_health_goal", nullable = false, length = 250)
    private String primaryHealthGoal;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToOne
    @JoinColumn(name = "member_id", referencedColumnName = "id", nullable = false)
    private Member member;
}
