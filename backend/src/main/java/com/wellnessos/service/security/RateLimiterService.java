package com.wellnessos.service.security;

import io.github.bucket4j.Bucket;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Refill;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class RateLimiterService {

    private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();

    public boolean allowRequest(String key, int maxRequests, int durationSeconds) {
        Bucket bucket = buckets.computeIfAbsent(key, k -> {
            Bandwidth limit = Bandwidth.classic(maxRequests,
                Refill.greedy(maxRequests, Duration.ofSeconds(durationSeconds)));
            return Bucket.builder().addLimit(limit).build();
        });

        return bucket.tryConsume(1);
    }

    public boolean allowRequest(String key) {
        return allowRequest(key, 10, 60);
    }

    public void resetBucket(String key) {
        buckets.remove(key);
    }
}
