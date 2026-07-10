package com.wellnessos.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GeocodingService {

    private final RestTemplate restTemplate = new RestTemplate();

    // FREE: OpenStreetMap Nominatim - No API key needed, unlimited
    private static final String NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

    public Map<String, Object> geocodeLocation(String location) {
        String url = UriComponentsBuilder.fromHttpUrl(NOMINATIM_URL)
                .queryParam("q", location)
                .queryParam("format", "json")
                .queryParam("limit", "1")
                .build()
                .toUriString();

        try {
            List<Map> response = restTemplate.getForObject(url, List.class);
            
            Map<String, Object> result = new HashMap<>();
            if (response != null && !response.isEmpty()) {
                Map first = response.get(0);
                result.put("success", true);
                result.put("lat", first.get("lat"));
                result.put("lon", first.get("lon"));
                result.put("display_name", first.get("display_name"));
                result.put("data", first);
            } else {
                result.put("success", false);
                result.put("error", "Location not found");
            }
            return result;
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", "Geocoding failed: " + e.getMessage());
            return error;
        }
    }
}
