package com.altheal.wellnessos.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CoachResponse {

    private Long id;
    private String fullName;
    private String email;
    private String specialization;
    private int memberCount;
}
