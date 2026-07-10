package com.wellnessos.controller;

import com.wellnessos.entity.FamilyMember;
import com.wellnessos.repository.FamilyMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/family")
@CrossOrigin(origins = "*")
public class FamilyMemberController {

    @Autowired
    private FamilyMemberRepository familyMemberRepository;

    // ============================================================
    // 1. GET ALL FAMILY MEMBERS
    // ============================================================
    @GetMapping("/{userId}")
    public ResponseEntity<?> getFamilyMembers(@PathVariable Long userId) {
        try {
            List<FamilyMember> members = familyMemberRepository.findByUserIdOrdered(userId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", members);
            response.put("count", members.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // ============================================================
    // 2. GET FAMILY MEMBERS BY RELATION
    // ============================================================
    @GetMapping("/{userId}/relation/{relation}")
    public ResponseEntity<?> getFamilyMembersByRelation(
            @PathVariable Long userId,
            @PathVariable String relation) {
        try {
            List<FamilyMember> members = familyMemberRepository.findByUserIdAndRelation(userId, relation);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", members);
            response.put("count", members.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // ============================================================
    // 3. ADD FAMILY MEMBER
    // ============================================================
    @PostMapping("/{userId}")
    public ResponseEntity<?> addFamilyMember(
            @PathVariable Long userId,
            @RequestBody Map<String, Object> request) {
        try {
            FamilyMember member = new FamilyMember();
            member.setUserId(userId);
            
            // Required fields
            if (!request.containsKey("name") || request.get("name") == null) {
                Map<String, Object> error = new HashMap<>();
                error.put("success", false);
                error.put("error", "Name is required");
                return ResponseEntity.badRequest().body(error);
            }
            if (!request.containsKey("relation") || request.get("relation") == null) {
                Map<String, Object> error = new HashMap<>();
                error.put("success", false);
                error.put("error", "Relation is required");
                return ResponseEntity.badRequest().body(error);
            }
            
            member.setName((String) request.get("name"));
            member.setRelation((String) request.get("relation"));
            
            // Optional fields
            if (request.containsKey("age")) {
                member.setAge((Integer) request.get("age"));
            }
            if (request.containsKey("bloodGroup")) {
                member.setBloodGroup((String) request.get("bloodGroup"));
            }
            
            FamilyMember saved = familyMemberRepository.save(member);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Family member added successfully");
            response.put("data", saved);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // ============================================================
    // 4. UPDATE FAMILY MEMBER
    // ============================================================
    @PutMapping("/{id}")
    public ResponseEntity<?> updateFamilyMember(
            @PathVariable Long id,
            @RequestBody Map<String, Object> request) {
        try {
            FamilyMember member = familyMemberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Family member not found"));
            
            if (request.containsKey("name")) {
                member.setName((String) request.get("name"));
            }
            if (request.containsKey("relation")) {
                member.setRelation((String) request.get("relation"));
            }
            if (request.containsKey("age")) {
                member.setAge((Integer) request.get("age"));
            }
            if (request.containsKey("bloodGroup")) {
                member.setBloodGroup((String) request.get("bloodGroup"));
            }
            
            FamilyMember saved = familyMemberRepository.save(member);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Family member updated successfully");
            response.put("data", saved);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // ============================================================
    // 5. DELETE FAMILY MEMBER
    // ============================================================
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFamilyMember(@PathVariable Long id) {
        try {
            if (!familyMemberRepository.existsById(id)) {
                Map<String, Object> error = new HashMap<>();
                error.put("success", false);
                error.put("error", "Family member not found");
                return ResponseEntity.badRequest().body(error);
            }
            
            familyMemberRepository.deleteById(id);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Family member deleted successfully");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // ============================================================
    // 6. DELETE ALL FAMILY MEMBERS FOR A USER
    // ============================================================
    @DeleteMapping("/user/{userId}")
    public ResponseEntity<?> deleteAllFamilyMembers(@PathVariable Long userId) {
        try {
            familyMemberRepository.deleteByUserId(userId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "All family members deleted successfully");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // ============================================================
    // 7. GET DISTINCT RELATIONS
    // ============================================================
    @GetMapping("/{userId}/relations")
    public ResponseEntity<?> getDistinctRelations(@PathVariable Long userId) {
        try {
            List<String> relations = familyMemberRepository.findDistinctRelationsByUserId(userId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", relations);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // ============================================================
    // 8. GET FAMILY MEMBER BY NAME
    // ============================================================
    @GetMapping("/{userId}/search")
    public ResponseEntity<?> searchFamilyMemberByName(
            @PathVariable Long userId,
            @RequestParam String name) {
        try {
            java.util.Optional<FamilyMember> member = familyMemberRepository.findByUserIdAndName(userId, name);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", member.orElse(null));
            response.put("found", member.isPresent());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // ============================================================
    // 9. GET FAMILY MEMBER COUNT
    // ============================================================
    @GetMapping("/{userId}/count")
    public ResponseEntity<?> getFamilyMemberCount(@PathVariable Long userId) {
        try {
            long count = familyMemberRepository.countByUserId(userId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("count", count);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
