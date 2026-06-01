package com.altheal.wellnessos.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "coaches")
@Getter
@Setter
@NoArgsConstructor
public class Coach {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @Column(unique = true, nullable = false, length = 100)
    private String email;

    @Column(nullable = false, length = 50)
    private String specialization;

    @OneToMany(mappedBy = "assignedCoach", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Member> managedMembers = new ArrayList<>();
}
