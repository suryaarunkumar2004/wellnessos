package com.altheal.wellnessos.integration;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("dev")
class MemberControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("Should halt API request and return HTTP 422 if client submits a completely blank name on onboarding path")
    void onboardNewMember_ValidationFailure_ReturnsHttp422() throws Exception {
        String malformedJsonRequest = """
                {
                    "fullName": "",
                    "email": "invalid-email-format",
                    "password": "short",
                    "clientTrackingToken": "BAD-TOKEN-FORMAT"
                }
                """;

        mockMvc.perform(post("/api/v1/members/onboard")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(malformedJsonRequest))

                .andExpect(status().is(422))

                .andExpect(jsonPath("$.errorCode").value("ALTH-PAYLOAD-VALIDATION-FAILED"))
                .andExpect(jsonPath("$.message").exists());
    }
}
