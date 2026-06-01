package com.altheal.wellnessos.model.mapper;

import com.altheal.wellnessos.core.utility.DataSanitizer;
import com.altheal.wellnessos.model.dto.response.MemberProfileResponse;
import com.altheal.wellnessos.model.entity.Member;
import com.altheal.wellnessos.model.entity.Role;
import org.springframework.stereotype.Component;

import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class MemberMapper {

    private final DataSanitizer dataSanitizer;

    public MemberMapper(DataSanitizer dataSanitizer) {
        this.dataSanitizer = Objects.requireNonNull(dataSanitizer,
                "Data Sanitization utility cannot map to a null runtime node.");
    }

    public MemberProfileResponse toResponse(Member member) {
        if (member == null) {
            return null;
        }

        Set<String> flattenedRoleNames = member.getRoles() == null ? Set.of() :
                member.getRoles().stream()
                        .filter(Objects::nonNull)
                        .map(Role::getName)
                        .collect(Collectors.toSet());

        String computedCoachName = "Pending Assured Assignment";
        if (member.getAssignedCoach() != null && member.getAssignedCoach().getFullName() != null) {
            computedCoachName = member.getAssignedCoach().getFullName();
        }

        int extractedBurnoutScore = 0;
        String extractedGoalDescription = "Onboarding diagnostics initialization pending tracking routines.";

        if (member.getHealthHistory() != null) {
            extractedBurnoutScore = member.getHealthHistory().getInitialBurnoutIndex();
            if (member.getHealthHistory().getPrimaryHealthGoal() != null) {
                extractedGoalDescription = member.getHealthHistory().getPrimaryHealthGoal();
            }
        }

        return MemberProfileResponse.builder()
                .id(member.getId())
                .fullName(member.getFullName() != null ? member.getFullName().strip() : "Anonymous User Profile")
                .email(dataSanitizer.secureEmailString(member.getEmail()))
                .clientTrackingToken(member.getClientTrackingToken() != null
                        ? member.getClientTrackingToken().strip() : "ATH-UNASSIGNED")
                .coachName(computedCoachName)
                .baselineBurnoutIndex(extractedBurnoutScore)
                .primaryHealthGoal(extractedGoalDescription)
                .roles(flattenedRoleNames)
                .createdAt(member.getCreatedAt())
                .build();
    }
}
