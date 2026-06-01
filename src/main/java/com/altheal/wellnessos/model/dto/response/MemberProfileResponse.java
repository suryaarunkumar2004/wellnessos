package com.altheal.wellnessos.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberProfileResponse {
    private Long id;
    private String fullName;
    private String email;
    private String clientTrackingToken;
    private String coachName;
    private int baselineBurnoutIndex;
    private String primaryHealthGoal;
    private Set<String> roles;
    private LocalDateTime createdAt;
}
