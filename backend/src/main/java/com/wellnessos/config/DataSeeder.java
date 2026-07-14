package com.wellnessos.config;

import com.wellnessos.entity.Drug;
import com.wellnessos.entity.Service;
import com.wellnessos.repository.DrugRepository;
import com.wellnessos.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private DrugRepository drugRepository;

    @Override
    public void run(String... args) throws Exception {
        // Seed Services if empty
        if (serviceRepository.count() == 0) {
            List<Service> services = Arrays.asList(
                createService("Cardiology", "Advanced heart health and cardiovascular diseases", "Cardiology", "45-60 min", "299", "FaHeartbeat"),
                createService("Pharmacy", "Comprehensive prescription and medication services", "Pharmacy", "15-30 min", "199", "FaPills"),
                createService("General Medicine", "Primary care and wellness checkups", "General Medicine", "30-45 min", "249", "FaStethoscope"),
                createService("Emergency Care", "Round-the-clock emergency medical services", "Emergency", "Varies", "499", "FaAmbulance"),
                createService("Lab Testing", "Complete diagnostic laboratory services", "Lab Testing", "15-30 min", "149", "FaUserMd"),
                createService("Dentistry", "Comprehensive dental care including cleaning, surgery, orthodontics", "Dentistry", "30-60 min", "349", "FaTooth"),
                createService("Neurology", "Expert diagnosis and treatment for brain disorders", "Neurology", "45-60 min", "399", "FaBrain"),
                createService("Pulmonology", "Specialized care for respiratory health and lung disease", "Pulmonology", "30-60 min", "329", "FaLungs"),
                createService("Ophthalmology", "Comprehensive eye care and vision services", "Ophthalmology", "30-45 min", "379", "FaEye"),
                createService("Pediatrics", "Child healthcare from infancy to adolescence", "Pediatrics", "30-45 min", "279", "FaChild"),
                createService("Orthopedics", "Bone and joint health services", "Orthopedics", "45-60 min", "359", "FaBone"),
                createService("Gynecology", "Women's health and reproductive care", "Gynecology", "45-60 min", "389", "FaFemale"),
                createService("Urology", "Urinary tract and male reproductive health", "Urology", "30-60 min", "369", "FaMale"),
                createService("Wellness", "Holistic health and wellness programs", "Wellness", "30-45 min", "199", "FaHeartbeat"),
                createService("Nutrition", "Diet and nutrition counseling", "Nutrition", "30-45 min", "229", "FaUserMd")
            );
            serviceRepository.saveAll(services);
            System.out.println("✅ Seeded " + services.size() + " services");
        }

        // Seed Drugs if empty
        if (drugRepository.count() == 0) {
            List<Drug> drugs = Arrays.asList(
                createDrug("Paracetamol", "Pain relief and fever reducer", "Pain Relief", "325-650mg every 4-6 hours", "4.99", "💊"),
                createDrug("Ibuprofen", "Anti-inflammatory pain relief", "Pain Relief", "200-400mg every 4-6 hours", "8.50", "💊"),
                createDrug("Amoxicillin", "Antibiotic for bacterial infections", "Antibiotics", "250-500mg every 8 hours", "12.00", "💊"),
                createDrug("Atorvastatin", "Cholesterol-lowering medication", "Cardiovascular", "10-40mg once daily", "15.00", "❤️"),
                createDrug("Metformin", "Type 2 diabetes management", "Diabetes", "500-1000mg twice daily", "8.00", "🩸"),
                createDrug("Albuterol", "Asthma and COPD bronchodilator", "Respiratory", "2 puffs every 4-6 hours", "65.00", "🫁"),
                createDrug("Omeprazole", "GERD and acid reflux treatment", "Gastrointestinal", "20mg once daily", "12.00", "🧪"),
                createDrug("Sertraline", "Depression and anxiety treatment", "Psychiatry", "50mg once daily", "25.00", "🧠"),
                createDrug("Cetirizine", "Allergy and antihistamine", "Antihistamine", "10mg once daily", "9.00", "🤧"),
                createDrug("Levothyroxine", "Thyroid hormone replacement", "Hormones", "25-200mcg once daily", "16.00", "🧬")
            );
            drugRepository.saveAll(drugs);
            System.out.println("✅ Seeded " + drugs.size() + " drugs");
        }
    }

    private Service createService(String name, String description, String category, String duration, String price, String icon) {
        Service service = new Service();
        service.setName(name);
        service.setDescription(description);
        service.setCategory(category);
        service.setDuration(duration);
        service.setPrice(price);
        service.setIcon(icon);
        service.setRating(4.8);
        service.setReviews(100);
        service.setIsActive(true);
        return service;
    }

    private Drug createDrug(String name, String description, String category, String dosage, String price, String imageUrl) {
        Drug drug = new Drug();
        drug.setName(name);
        drug.setDescription(description);
        drug.setCategory(category);
        drug.setDosage(dosage);
        drug.setPrice(price);
        drug.setImageUrl(imageUrl);
        drug.setRating(4.5);
        drug.setIsActive(true);
        return drug;
    }
}
