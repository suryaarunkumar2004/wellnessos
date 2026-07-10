package com.wellnessos.controller;

import com.wellnessos.entity.Document;
import com.wellnessos.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin(origins = "*")
public class DocumentController {

    @Autowired
    private DocumentRepository documentRepository;

    // ============================================================
    // 1. GET ALL DOCUMENTS FOR A USER
    // ============================================================
    @GetMapping("/{userId}")
    public ResponseEntity<?> getDocuments(@PathVariable Long userId) {
        try {
            List<Document> documents = documentRepository.findByUserIdOrderByUploadedAtDesc(userId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", documents);
            response.put("count", documents.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // ============================================================
    // 2. GET DOCUMENTS BY CATEGORY
    // ============================================================
    @GetMapping("/{userId}/category/{category}")
    public ResponseEntity<?> getDocumentsByCategory(
            @PathVariable Long userId,
            @PathVariable String category) {
        try {
            List<Document> documents = documentRepository.findByUserIdAndCategory(userId, category);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", documents);
            response.put("count", documents.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // ============================================================
    // 3. SEARCH DOCUMENTS BY NAME
    // ============================================================
    @GetMapping("/{userId}/search")
    public ResponseEntity<?> searchDocuments(
            @PathVariable Long userId,
            @RequestParam String name) {
        try {
            List<Document> documents = documentRepository.findByNameContaining(userId, name);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", documents);
            response.put("count", documents.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // ============================================================
    // 4. GET SINGLE DOCUMENT
    // ============================================================
    @GetMapping("/{userId}/{docId}")
    public ResponseEntity<?> getDocument(
            @PathVariable Long userId,
            @PathVariable Long docId) {
        try {
            Document document = documentRepository.findByUserIdAndId(userId, docId)
                .orElse(null);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", document);
            response.put("exists", document != null);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // ============================================================
    // 5. ADD DOCUMENT
    // ============================================================
    @PostMapping("/{userId}")
    public ResponseEntity<?> addDocument(
            @PathVariable Long userId,
            @RequestBody Map<String, Object> request) {
        try {
            // Validate required fields
            if (!request.containsKey("name") || request.get("name") == null) {
                Map<String, Object> error = new HashMap<>();
                error.put("success", false);
                error.put("error", "Document name is required");
                return ResponseEntity.badRequest().body(error);
            }
            
            Document document = new Document();
            document.setUserId(userId);
            document.setName((String) request.get("name"));
            
            if (request.containsKey("category")) {
                document.setCategory((String) request.get("category"));
            }
            if (request.containsKey("fileSize")) {
                document.setFileSize((String) request.get("fileSize"));
            }
            if (request.containsKey("fileUrl")) {
                document.setFileUrl((String) request.get("fileUrl"));
            }
            
            Document saved = documentRepository.save(document);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Document added successfully");
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
    // 6. UPDATE DOCUMENT
    // ============================================================
    @PutMapping("/{id}")
    public ResponseEntity<?> updateDocument(
            @PathVariable Long id,
            @RequestBody Map<String, Object> request) {
        try {
            Document document = documentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Document not found"));
            
            if (request.containsKey("name")) {
                document.setName((String) request.get("name"));
            }
            if (request.containsKey("category")) {
                document.setCategory((String) request.get("category"));
            }
            if (request.containsKey("fileSize")) {
                document.setFileSize((String) request.get("fileSize"));
            }
            if (request.containsKey("fileUrl")) {
                document.setFileUrl((String) request.get("fileUrl"));
            }
            
            Document saved = documentRepository.save(document);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Document updated successfully");
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
    // 7. DELETE DOCUMENT
    // ============================================================
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDocument(@PathVariable Long id) {
        try {
            if (!documentRepository.existsById(id)) {
                Map<String, Object> error = new HashMap<>();
                error.put("success", false);
                error.put("error", "Document not found");
                return ResponseEntity.badRequest().body(error);
            }
            
            documentRepository.deleteById(id);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Document deleted successfully");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // ============================================================
    // 8. DELETE ALL DOCUMENTS FOR A USER
    // ============================================================
    @DeleteMapping("/user/{userId}")
    public ResponseEntity<?> deleteAllDocuments(@PathVariable Long userId) {
        try {
            documentRepository.deleteByUserId(userId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "All documents deleted successfully");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // ============================================================
    // 9. GET DISTINCT CATEGORIES
    // ============================================================
    @GetMapping("/{userId}/categories")
    public ResponseEntity<?> getDistinctCategories(@PathVariable Long userId) {
        try {
            List<String> categories = documentRepository.findDistinctCategoriesByUserId(userId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", categories);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // ============================================================
    // 10. GET DOCUMENT COUNT
    // ============================================================
    @GetMapping("/{userId}/count")
    public ResponseEntity<?> getDocumentCount(@PathVariable Long userId) {
        try {
            long count = documentRepository.countByUserId(userId);
            
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

    // ============================================================
    // 11. GET TOTAL FILE SIZE (APPROXIMATE)
    // ============================================================
    @GetMapping("/{userId}/total-size")
    public ResponseEntity<?> getTotalFileSize(@PathVariable Long userId) {
        try {
            Double totalSize = documentRepository.getTotalFileSize(userId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("totalSizeKB", totalSize != null ? Math.round(totalSize) : 0);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
