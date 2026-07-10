import React, { useState, useEffect } from 'react';
import { useToast } from '../../contexts/ToastContext';
import {
  FaCalendarAlt, FaPlus, FaTrash, FaClock, FaMapMarkerAlt,
  FaFilter, FaSearch, FaFileExport, FaSync, FaChevronLeft,
  FaChevronRight, FaRegBell, FaExclamationTriangle, FaPen,
  FaCheckCircle, FaTimesCircle, FaCopy, FaShare, FaPrint,
  FaBolt, FaList, FaCalendarDay, FaCalendarWeek, FaTh,
  FaArrowRight, FaStar, FaTag, FaFlagCheckered, FaRedo,
  FaSpinner, FaTimes
} from 'react-icons/fa';
import CustomDropdown from '../../components/CustomDropdown';
const CATEGORY_META = {
  Appointment: { color: '#ef4444', bg: '#fef2f2', label: '🩺 Appointment' },
  Medication: { color: '#8b5cf6', bg: '#f5f3ff', label: '💊 Medication' },
  'Lab Test': { color: '#3b82f6', bg: '#eff6ff', label: '🧪 Lab Test' },
  Vaccine: { color: '#14b8a6', bg: '#f0fdfa', label: '💉 Vaccine' },
  Wellness: { color: '#059669', bg: '#ecfdf5', label: '🧘 Wellness' },
  Surgery: { color: '#dc2626', bg: '#fef2f2', label: '🏥 Surgery' },
  'Follow-Up': { color: '#f59e0b', bg: '#fffbeb', label: '📋 Follow-Up' },
};

const STATUS_META = {
  Confirmed: { color: '#059669', bg: '#ecfdf5' },
  Pending: { color: '#f59e0b', bg: '#fffbeb' },
  Cancelled: { color: '#ef4444', bg: '#fef2f2' },
};

// Generate unique events for all months
const getMonthlyEvents = (year, month) => {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthName = monthNames[month];
  
  const eventTemplates = {
    0: [
      { title: 'New Year Health Check-up', category: 'Appointment', location: 'WellNest Medical Center', notes: 'Comprehensive annual physical exam' },
      { title: 'Flu Vaccine Booster Shot', category: 'Vaccine', location: 'CVS Pharmacy', notes: 'Seasonal flu prevention' },
      { title: 'Winter Wellness Workshop', category: 'Wellness', location: 'Community Center', notes: 'Tips for staying healthy in winter' },
      { title: 'Blood Pressure Monitoring Test', category: 'Lab Test', location: 'Quest Diagnostics', notes: 'Fasting not required' },
      { title: 'Metformin 500mg Refill', category: 'Medication', location: 'CVS Pharmacy', notes: 'Take with breakfast and dinner' },
      { title: 'Cardiology Follow-up - Dr. Carter', category: 'Appointment', location: 'Heart Institute', notes: 'Bring ECG reports' },
      { title: 'Thyroid Panel Test', category: 'Lab Test', location: 'LabCorp', notes: 'Fasting for 12 hours required' },
      { title: 'Vitamin D3 2000IU Refill', category: 'Medication', location: 'Walgreens', notes: 'Take with breakfast for bone health' },
      { title: 'Pneumonia Vaccine', category: 'Vaccine', location: 'WellNest Immunization Center', notes: 'Recommended for seniors' },
      { title: 'Nutrition Counseling Session', category: 'Wellness', location: 'Wellness Center', notes: 'Winter diet planning' },
      { title: 'Lisinopril 10mg Refill', category: 'Medication', location: 'Rite Aid', notes: 'For blood pressure control' },
      { title: 'Dermatology Check-up - Dr. Lee', category: 'Appointment', location: 'Skin Clinic', notes: 'Winter skin care' },
      { title: 'Complete Blood Count Test', category: 'Lab Test', location: 'Quest Diagnostics', notes: 'No fasting required' },
      { title: 'Atorvastatin 20mg Refill', category: 'Medication', location: 'CVS Pharmacy', notes: 'Take with dinner for cholesterol' },
      { title: 'Stress Management Session', category: 'Wellness', location: 'Community Center', notes: 'New Year stress relief' },
    ],
    1: [
      { title: 'Heart Health Screening', category: 'Appointment', location: 'Cardiology Center', notes: 'American Heart Month screening' },
      { title: 'Aspirin 81mg Refill', category: 'Medication', location: 'Walgreens', notes: 'Take with dinner for heart health' },
      { title: 'Lipid Profile Test', category: 'Lab Test', location: 'LabCorp', notes: 'Fasting for 12 hours required' },
      { title: 'CPR Training Session', category: 'Wellness', location: 'Community Center', notes: 'Learn life-saving skills' },
      { title: 'Omega-3 Fish Oil Refill', category: 'Medication', location: 'CVS Pharmacy', notes: 'Take with meals for heart health' },
      { title: 'Cardiology Consultation - Dr. Chen', category: 'Appointment', location: 'Heart Institute', notes: 'Discuss heart health' },
      { title: 'Blood Glucose Test', category: 'Lab Test', location: 'Quest Diagnostics', notes: 'Fasting for 8 hours required' },
      { title: 'Shingles Vaccine', category: 'Vaccine', location: 'Walgreens', notes: 'Prevents shingles' },
      { title: 'Metoprolol 25mg Refill', category: 'Medication', location: 'Rite Aid', notes: 'Take with breakfast and dinner' },
      { title: 'Heart Health Workshop', category: 'Wellness', location: 'Community Center', notes: 'Heart healthy lifestyle tips' },
      { title: 'ECG Test Appointment', category: 'Appointment', location: 'Cardiology Center', notes: 'Electrocardiogram test' },
      { title: 'Cholesterol Test', category: 'Lab Test', location: 'LabCorp', notes: 'Fasting for 10 hours required' },
      { title: 'Aspirin Refill', category: 'Medication', location: 'CVS Pharmacy', notes: 'Low dose aspirin for heart' },
      { title: 'Cardiac Rehabilitation Session', category: 'Wellness', location: 'Heart Institute', notes: 'Post-heart attack recovery' },
      { title: 'Heart Healthy Cooking Class', category: 'Wellness', location: 'Wellness Center', notes: 'Learn heart-healthy recipes' },
    ],
    2: [
      { title: 'Spring Allergy Check-up', category: 'Appointment', location: 'Allergy Center', notes: 'Seasonal allergy testing' },
      { title: 'Allergy Medication Refill', category: 'Medication', location: 'CVS Pharmacy', notes: 'Take daily for allergies' },
      { title: 'Vitamin C Test', category: 'Lab Test', location: 'Quest Diagnostics', notes: 'Check vitamin levels' },
      { title: 'Spring Detox Workshop', category: 'Wellness', location: 'Wellness Center', notes: 'Spring cleanse and detox' },
      { title: 'Cetirizine 10mg Refill', category: 'Medication', location: 'Walgreens', notes: 'For seasonal allergies' },
      { title: 'Dermatology Follow-up - Dr. Lee', category: 'Appointment', location: 'Skin Clinic', notes: 'Spring skin care' },
      { title: 'Iron & Ferritin Test', category: 'Lab Test', location: 'LabCorp', notes: 'Check iron levels' },
      { title: 'Gardasil-9 HPV Vaccine', category: 'Vaccine', location: 'WellNest Immunization Center', notes: 'HPV prevention' },
      { title: 'Fexofenadine 180mg Refill', category: 'Medication', location: 'Rite Aid', notes: 'For seasonal allergies' },
      { title: 'Yoga & Meditation Retreat', category: 'Wellness', location: 'Yoga Studio', notes: 'Spring renewal' },
      { title: 'Optometry Check-up - Dr. Wong', category: 'Appointment', location: 'Eye Care Center', notes: 'Spring eye exam' },
      { title: 'Allergy Skin Test', category: 'Lab Test', location: 'Allergy Center', notes: 'Identify spring allergens' },
      { title: 'Montelukast 10mg Refill', category: 'Medication', location: 'CVS Pharmacy', notes: 'For asthma and allergies' },
      { title: 'Spring Fitness Challenge', category: 'Wellness', location: 'Community Center', notes: 'Get fit for spring' },
      { title: 'Gastroenterology Check-up', category: 'Appointment', location: 'GI Center', notes: 'Spring digestive health' },
    ],
    3: [
      { title: 'Mental Health Screening', category: 'Appointment', location: 'Mental Health Center', notes: 'Stress and anxiety assessment' },
      { title: 'Sertraline 50mg Refill', category: 'Medication', location: 'CVS Pharmacy', notes: 'Take daily for anxiety' },
      { title: 'Vitamin B12 Test', category: 'Lab Test', location: 'Quest Diagnostics', notes: 'Check B12 levels' },
      { title: 'Mindfulness Meditation Class', category: 'Wellness', location: 'Wellness Studio', notes: 'Learn mindfulness techniques' },
      { title: 'Escitalopram 10mg Refill', category: 'Medication', location: 'Walgreens', notes: 'For depression and anxiety' },
      { title: 'Psychiatry Consultation - Dr. Adams', category: 'Appointment', location: 'Mental Health Center', notes: 'Medication review' },
      { title: 'Cortisol Level Test', category: 'Lab Test', location: 'LabCorp', notes: 'Stress hormone test' },
      { title: 'Journaling Workshop', category: 'Wellness', location: 'Community Center', notes: 'Therapeutic journaling' },
      { title: 'Bupropion 150mg Refill', category: 'Medication', location: 'Rite Aid', notes: 'For depression and smoking cessation' },
      { title: 'Art Therapy Session', category: 'Wellness', location: 'Art Studio', notes: 'Creative expression for mental health' },
      { title: 'Neurology Consultation - Dr. Chen', category: 'Appointment', location: 'Neuro Center', notes: 'Migraine management' },
      { title: 'Vitamin D Test', category: 'Lab Test', location: 'Quest Diagnostics', notes: 'Check vitamin D levels' },
      { title: 'Trazodone 50mg Refill', category: 'Medication', location: 'CVS Pharmacy', notes: 'Take at bedtime for sleep' },
      { title: 'Stress Relief Workshop', category: 'Wellness', location: 'Community Center', notes: 'Coping strategies' },
      { title: 'Sleep Study Consultation', category: 'Appointment', location: 'Sleep Center', notes: 'Sleep apnea evaluation' },
    ],
    4: [
      { title: 'Physical Fitness Assessment', category: 'Appointment', location: 'Fitness Center', notes: 'Annual fitness evaluation' },
      { title: 'Workout Plan Review', category: 'Wellness', location: 'Gym', notes: 'Personalized workout plan' },
      { title: 'Vitamin D3 1000IU Refill', category: 'Medication', location: 'CVS Pharmacy', notes: 'Take with breakfast' },
      { title: 'Sports Physical Examination', category: 'Appointment', location: 'WellNest Medical Center', notes: 'For sports participation' },
      { title: 'Creatinine Test', category: 'Lab Test', location: 'Quest Diagnostics', notes: 'Kidney function test' },
      { title: 'Calcium Supplement Refill', category: 'Medication', location: 'Walgreens', notes: 'For bone health' },
      { title: 'Fitness Nutrition Workshop', category: 'Wellness', location: 'Community Center', notes: 'Nutrition for fitness' },
      { title: 'Vitamin B Complex Refill', category: 'Medication', location: 'Rite Aid', notes: 'For energy and metabolism' },
      { title: 'Orthopedic Consultation - Dr. Wilson', category: 'Appointment', location: 'OrthoCare', notes: 'Joint health assessment' },
      { title: 'Muscle Mass Test', category: 'Lab Test', location: 'LabCorp', notes: 'Body composition analysis' },
      { title: 'Weight Training Program', category: 'Wellness', location: 'Gym', notes: 'Strength building program' },
      { title: 'Magnesium Supplement Refill', category: 'Medication', location: 'CVS Pharmacy', notes: 'For muscle recovery' },
      { title: 'Physical Therapy Session', category: 'Appointment', location: 'Physical Therapy Center', notes: 'Injury recovery' },
      { title: 'Fitness Challenge Kickoff', category: 'Wellness', location: 'Community Center', notes: 'Summer fitness challenge' },
      { title: 'Sports Medicine Check-up', category: 'Appointment', location: 'Sports Medicine Center', notes: 'Sports injury prevention' },
    ],
    5: [
      { title: 'Summer Health Check-up', category: 'Appointment', location: 'WellNest Medical Center', notes: 'Summer wellness exam' },
      { title: 'Sun Protection Workshop', category: 'Wellness', location: 'Community Center', notes: 'Skin cancer prevention' },
      { title: 'Vitamin E Supplement Refill', category: 'Medication', location: 'CVS Pharmacy', notes: 'For skin health' },
      { title: 'Dermatology Skin Check - Dr. Lee', category: 'Appointment', location: 'Skin Clinic', notes: 'Skin cancer screening' },
      { title: 'Electrolyte Panel Test', category: 'Lab Test', location: 'Quest Diagnostics', notes: 'Check hydration levels' },
      { title: 'Sunscreen SPF 50 Recommendation', category: 'Wellness', location: 'Skin Clinic', notes: 'Best sun protection' },
      { title: 'Heat Exhaustion Prevention Guide', category: 'Wellness', location: 'Community Center', notes: 'Stay safe in summer' },
      { title: 'Meningococcal Vaccine', category: 'Vaccine', location: 'WellNest Immunization Center', notes: 'College students' },
      { title: 'Antihistamine Refill', category: 'Medication', location: 'Walgreens', notes: 'For summer allergies' },
      { title: 'Swim Safety Workshop', category: 'Wellness', location: 'Community Center', notes: 'Water safety tips' },
      { title: 'Travel Health Consultation', category: 'Appointment', location: 'Travel Health Clinic', notes: 'Summer travel vaccines' },
      { title: 'Magnesium Refill', category: 'Medication', location: 'Rite Aid', notes: 'For muscle cramps' },
      { title: 'Summer Nutrition Counseling', category: 'Wellness', location: 'Wellness Center', notes: 'Healthy summer eating' },
      { title: 'Eye Exam - Dr. Wong', category: 'Appointment', location: 'Eye Care Center', notes: 'Summer eye protection' },
      { title: 'Hydration Workshop', category: 'Wellness', location: 'Community Center', notes: 'Stay hydrated in summer' },
    ],
    6: [
      { title: 'Health Independence Check-up', category: 'Appointment', location: 'WellNest Medical Center', notes: 'Take control of your health' },
      { title: 'Blood Pressure Monitor Review', category: 'Wellness', location: 'Community Center', notes: 'Home BP monitoring' },
      { title: 'Probiotic Supplement Refill', category: 'Medication', location: 'CVS Pharmacy', notes: 'For gut health' },
      { title: 'Colon Cancer Screening', category: 'Appointment', location: 'GI Center', notes: 'Colonoscopy preparation' },
      { title: 'Lipid Panel Test', category: 'Lab Test', location: 'Quest Diagnostics', notes: 'Fasting for 12 hours' },
      { title: 'Healthy Eating Seminar', category: 'Wellness', location: 'Community Center', notes: 'Nutrition independence' },
      { title: 'Fiber Supplement Refill', category: 'Medication', location: 'Walgreens', notes: 'For digestive health' },
      { title: 'Neurology Follow-up - Dr. Chen', category: 'Appointment', location: 'Neuro Center', notes: 'Migraine review' },
      { title: 'Hepatitis A Vaccine', category: 'Vaccine', location: 'WellNest Immunization Center', notes: 'Travel vaccine' },
      { title: 'Stress Management Techniques', category: 'Wellness', location: 'Wellness Studio', notes: 'Stress relief strategies' },
      { title: 'Physiotherapy Session', category: 'Appointment', location: 'Physical Therapy Center', notes: 'Back pain treatment' },
      { title: 'Zinc Supplement Refill', category: 'Medication', location: 'Rite Aid', notes: 'For immune health' },
      { title: 'Health Independence Workshop', category: 'Wellness', location: 'Community Center', notes: 'Take charge of your health' },
      { title: 'Skin Cancer Screening', category: 'Appointment', location: 'Skin Clinic', notes: 'Mole and spot check' },
      { title: 'Nutrition Tracking App Training', category: 'Wellness', location: 'Wellness Center', notes: 'Track your nutrition' },
    ],
    7: [
      { title: 'Back to School Health Check', category: 'Appointment', location: 'WellNest Medical Center', notes: 'School physical exam' },
      { title: 'Omega-3 Supplement Refill', category: 'Medication', location: 'CVS Pharmacy', notes: 'For brain health' },
      { title: 'Allergy Testing Panel', category: 'Lab Test', location: 'Allergy Center', notes: 'Identify allergens' },
      { title: 'Family Health Planning Session', category: 'Wellness', location: 'Community Center', notes: 'Family health goals' },
      { title: 'Multivitamin Refill', category: 'Medication', location: 'Walgreens', notes: 'Daily multivitamin' },
      { title: 'Pediatric Check-up - Dr. Garcia', category: 'Appointment', location: "Children's Hospital", notes: 'School physical for kids' },
      { title: 'Hepatitis B Vaccine', category: 'Vaccine', location: 'WellNest Immunization Center', notes: 'For school children' },
      { title: 'Eye Exam for Kids', category: 'Appointment', location: 'Eye Care Center', notes: 'Vision screening' },
      { title: 'Calcium Refill', category: 'Medication', location: 'Rite Aid', notes: 'For growing children' },
      { title: 'Family Wellness Workshop', category: 'Wellness', location: 'Community Center', notes: 'Healthy family habits' },
      { title: 'Dental Check-up - Dr. Smith', category: 'Appointment', location: 'Smile Dental', notes: 'Family dental exam' },
      { title: 'Iron Supplement Refill', category: 'Medication', location: 'CVS Pharmacy', notes: 'For growing kids' },
      { title: 'Sports Physical Clinic', category: 'Wellness', location: 'Community Center', notes: 'School sports physicals' },
      { title: 'Asthma Action Plan Review', category: 'Appointment', location: 'Pulmonary Center', notes: 'School asthma plan' },
      { title: 'Stress Management for Students', category: 'Wellness', location: 'Community Center', notes: 'Back to school stress' },
    ],
    8: [
      { title: 'Fall Wellness Check-up', category: 'Appointment', location: 'WellNest Medical Center', notes: 'Seasonal health assessment' },
      { title: 'Vitamin C Refill', category: 'Medication', location: 'CVS Pharmacy', notes: 'For immune support' },
      { title: 'Cholesterol Test', category: 'Lab Test', location: 'Quest Diagnostics', notes: 'Fasting for 10 hours' },
      { title: 'Fall Allergy Management Workshop', category: 'Wellness', location: 'Community Center', notes: 'Ragweed allergy tips' },
      { title: 'Echinacea Supplement Refill', category: 'Medication', location: 'Walgreens', notes: 'Natural immune support' },
      { title: 'Pulmonology Check-up - Dr. Adams', category: 'Appointment', location: 'Lung Center', notes: 'Lung function test' },
      { title: 'Flu Shot Appointment', category: 'Vaccine', location: 'CVS Pharmacy', notes: 'Annual flu prevention' },
      { title: 'Nutrition for Immunity Workshop', category: 'Wellness', location: 'Wellness Center', notes: 'Boost your immune system' },
      { title: 'Zinc Supplement Refill', category: 'Medication', location: 'Rite Aid', notes: 'For immune health' },
      { title: 'Respiratory Check-up', category: 'Appointment', location: 'Pulmonary Center', notes: 'Breathing assessment' },
      { title: 'Vitamin B12 Test', category: 'Lab Test', location: 'LabCorp', notes: 'Check vitamin levels' },
      { title: 'Stress Reduction Techniques', category: 'Wellness', location: 'Community Center', notes: 'Fall stress relief' },
      { title: 'Elderberry Syrup Refill', category: 'Medication', location: 'CVS Pharmacy', notes: 'Natural immune booster' },
      { title: 'Fall Health Seminar', category: 'Wellness', location: 'Community Center', notes: 'Stay healthy this fall' },
      { title: 'Rheumatology Consultation', category: 'Appointment', location: 'Rheumatology Center', notes: 'Joint pain assessment' },
    ],
    9: [
      { title: 'Mammogram Screening', category: 'Appointment', location: "Women's Health Center", notes: 'Breast cancer screening' },
      { title: 'Vitamin B6 Refill', category: 'Medication', location: 'CVS Pharmacy', notes: 'For hormonal balance' },
      { title: 'Pap Smear Test', category: 'Lab Test', location: "Women's Health Center", notes: 'Cervical cancer screening' },
      { title: 'Breast Cancer Awareness Workshop', category: 'Wellness', location: 'Community Center', notes: 'Know the signs' },
      { title: 'Calcium with Vitamin D Refill', category: 'Medication', location: 'Walgreens', notes: 'For bone health' },
      { title: 'OB-GYN Check-up - Dr. Sharma', category: 'Appointment', location: "Women's Health Center", notes: 'Annual gynecology exam' },
      { title: 'HPV DNA Test', category: 'Lab Test', location: 'LabCorp', notes: 'High-risk HPV screening' },
      { title: "Women's Health Seminar", category: 'Wellness', location: 'Community Center', notes: "Comprehensive women's health" },
      { title: 'Iodine Supplement Refill', category: 'Medication', location: 'Rite Aid', notes: 'For thyroid health' },
      { title: 'Osteoporosis Screening', category: 'Appointment', location: 'Bone Health Center', notes: 'Bone density scan' },
      { title: 'Thyroid Function Test', category: 'Lab Test', location: 'Quest Diagnostics', notes: 'TSH, T3, T4 test' },
      { title: "Women's Wellness Retreat", category: 'Wellness', location: 'Wellness Center', notes: 'Pamper and rejuvenate' },
      { title: 'Folic Acid Supplement Refill', category: 'Medication', location: 'CVS Pharmacy', notes: "For women's health" },
      { title: 'Pelvic Floor Therapy Session', category: 'Appointment', location: 'Physical Therapy Center', notes: 'Pelvic health' },
      { title: 'Self-Care Sunday Workshop', category: 'Wellness', location: 'Community Center', notes: 'Mental health for women' },
    ],
    10: [
      { title: 'Prostate Cancer Screening', category: 'Appointment', location: 'Urology Center', notes: 'PSA test' },
      { title: 'Diabetes Management Review', category: 'Appointment', location: 'Endocrine Center', notes: 'Blood sugar control' },
      { title: 'Testosterone Level Test', category: 'Lab Test', location: 'Quest Diagnostics', notes: 'Check T levels' },
      { title: "Men's Health Seminar", category: 'Wellness', location: 'Community Center', notes: "Comprehensive men's health" },
      { title: 'A1C Test', category: 'Lab Test', location: 'LabCorp', notes: 'Diabetes monitoring' },
      { title: 'Urology Check-up - Dr. Kim', category: 'Appointment', location: 'Urology Center', notes: 'Urinary health' },
      { title: 'Zinc with Selenium Refill', category: 'Medication', location: 'CVS Pharmacy', notes: 'For prostate health' },
      { title: 'Mental Health for Men Workshop', category: 'Wellness', location: 'Community Center', notes: 'Breaking the stigma' },
      { title: 'Testosterone Booster Refill', category: 'Medication', location: 'Walgreens', notes: 'Hormonal balance' },
      { title: 'Heart Health Check-up', category: 'Appointment', location: 'Cardiology Center', notes: "Men's heart health" },
      { title: 'Lipoprotein A Test', category: 'Lab Test', location: 'Quest Diagnostics', notes: 'Heart disease risk' },
      { title: 'Nutrition for Men Workshop', category: 'Wellness', location: 'Wellness Center', notes: 'Healthy eating for men' },
      { title: 'Magnesium Citrate Refill', category: 'Medication', location: 'Rite Aid', notes: 'For muscle and nerve health' },
      { title: 'Sleep Apnea Test', category: 'Appointment', location: 'Sleep Center', notes: 'Sleep study' },
      { title: 'Stress Management for Men', category: 'Wellness', location: 'Community Center', notes: 'Coping strategies' },
    ],
    11: [
      { title: 'Holiday Health Check-up', category: 'Appointment', location: 'WellNest Medical Center', notes: 'Year-end health assessment' },
      { title: 'Vitamin D3 5000IU Refill', category: 'Medication', location: 'CVS Pharmacy', notes: 'Winter dose' },
      { title: 'Holiday Stress Management Workshop', category: 'Wellness', location: 'Community Center', notes: 'Coping with holiday stress' },
      { title: 'Flu Vaccine', category: 'Vaccine', location: 'Walgreens', notes: 'Late season flu protection' },
      { title: 'Melatonin 5mg Refill', category: 'Medication', location: 'Rite Aid', notes: 'For winter sleep' },
      { title: 'Endocrinology Check-up - Dr. Adams', category: 'Appointment', location: 'Endocrine Center', notes: 'Year-end hormone check' },
      { title: 'Complete Metabolic Panel', category: 'Lab Test', location: 'Quest Diagnostics', notes: 'Fasting for 12 hours' },
      { title: 'Holiday Nutrition Workshop', category: 'Wellness', location: 'Wellness Center', notes: 'Healthy holiday eating' },
      { title: 'Multivitamin Refill', category: 'Medication', location: 'CVS Pharmacy', notes: 'Daily essential vitamins' },
      { title: 'Winter Wellness Check-up', category: 'Appointment', location: 'WellNest Medical Center', notes: 'Seasonal health' },
      { title: 'Vitamin A Test', category: 'Lab Test', location: 'LabCorp', notes: 'Check vitamin A levels' },
      { title: 'New Year Health Goals Workshop', category: 'Wellness', location: 'Community Center', notes: 'Plan for next year' },
      { title: 'CoQ10 Supplement Refill', category: 'Medication', location: 'Walgreens', notes: 'For heart health' },
      { title: 'Orthopedic Year-end Review - Dr. Wilson', category: 'Appointment', location: 'OrthoCare', notes: 'Annual joint check' },
      { title: 'Winter Fitness Challenge Kickoff', category: 'Wellness', location: 'Community Center', notes: 'Stay active this winter' },
    ]
  };

  const templates = eventTemplates[month] || eventTemplates[0];
  const events = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const usedDays = new Set();
  
  const shuffled = [...templates].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 15);
  
  selected.forEach((template, index) => {
    let day;
    let attempts = 0;
    do {
      day = 1 + Math.floor(Math.random() * daysInMonth);
      attempts++;
    } while (usedDays.has(day) && attempts < 50);
    usedDays.add(day);
    
    const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const hour = 8 + Math.floor(Math.random() * 10);
    const minute = Math.random() > 0.5 ? '00' : '30';
    const time = `${String(hour).padStart(2, '0')}:${minute}`;
    
    const statuses = ['Confirmed', 'Confirmed', 'Confirmed', 'Pending'];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const priority = ['High', 'High', 'Medium', 'Medium', 'Low'][Math.floor(Math.random() * 5)];
    const recurring = Math.random() > 0.7;
    
    events.push({
      id: index + 1,
      title: template.title,
      date: date,
      time: time,
      category: template.category,
      priority: priority,
      location: template.location,
      notes: template.notes,
      status: status,
      recurring: recurring
    });
  });

  return events;
};

export default function CalendarTab() {
  const { addToast: showToast } = useToast();
  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';

  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [agendaPage, setAgendaPage] = useState(1);
  
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '10:00',
    category: 'Appointment',
    priority: 'Medium',
    location: '',
    notes: '',
    status: 'Confirmed',
    recurring: false
  });

  useEffect(() => {
    const saved = localStorage.getItem('wellnest_events');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.length > 0) {
          setEvents(parsed);
          setFilteredEvents(parsed);
          setLoading(false);
          return;
        }
      } catch (e) {
        console.error("Error loading events from localStorage", e);
      }
    }

    const loadEventsForAllMonths = () => {
      const today = new Date();
      const year = today.getFullYear();
      const allEvents = [];
      let eventId = 1;
      
      for (let month = 0; month < 12; month++) {
        const monthEvents = getMonthlyEvents(year, month);
        monthEvents.forEach(ev => {
          allEvents.push({
            ...ev,
            id: eventId++
          });
        });
      }
      
      return allEvents;
    };

    const allEvents = loadEventsForAllMonths();
    setEvents(allEvents);
    setFilteredEvents(allEvents);
    localStorage.setItem('wellnest_events', JSON.stringify(allEvents));
    setLoading(false);
  }, []);

  // Apply filters whenever search term or filters change
  useEffect(() => {
    let filtered = events;
    
    // Search filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(ev => {
        const title = (ev.title || '').toLowerCase();
        const notes = (ev.notes || '').toLowerCase();
        const location = (ev.location || '').toLowerCase();
        const category = (ev.category || '').toLowerCase();
        const doctor = (ev.doctor || '').toLowerCase();
        return title.includes(q) || notes.includes(q) || location.includes(q) || category.includes(q);
      });
    }
    
    // Category filter
    if (filterCategory !== 'All') {
      filtered = filtered.filter(ev => ev.category === filterCategory);
    }
    
    // Priority filter
    if (filterPriority !== 'All') {
      filtered = filtered.filter(ev => ev.priority === filterPriority);
    }
    
    // Status filter
    if (filterStatus !== 'All') {
      filtered = filtered.filter(ev => ev.status === filterStatus);
    }
    
    setFilteredEvents(filtered);
    setAgendaPage(1);
  }, [searchTerm, filterCategory, filterPriority, filterStatus, events]);

  const syncLocal = updated => {
    setEvents(updated);
    localStorage.setItem('wellnest_events', JSON.stringify(updated));
  };

  const deleteEvent = id => {
    if (window.confirm('Delete this event?')) {
      const updated = events.filter(e => e.id !== id);
      syncLocal(updated);
      showToast('🗑 Event removed', 'info');
    }
  };

  const openEditForm = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title || '',
      date: event.date || '',
      time: event.time || '10:00',
      category: event.category || 'Appointment',
      priority: event.priority || 'Medium',
      location: event.location || '',
      notes: event.notes || '',
      status: event.status || 'Confirmed',
      recurring: event.recurring || false
    });
    setShowForm(true);
  };

  const openNewForm = (date = '') => {
    setEditingEvent(null);
    const today = new Date().toISOString().split('T')[0];
    setFormData({
      title: '',
      date: date || today,
      time: '10:00',
      category: 'Appointment',
      priority: 'Medium',
      location: '',
      notes: '',
      status: 'Confirmed',
      recurring: false
    });
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      showToast('Please enter a title', 'warning');
      return;
    }
    if (!formData.date) {
      showToast('Please select a date', 'warning');
      return;
    }

    if (editingEvent) {
      const updated = events.map(ev => 
        ev.id === editingEvent.id ? { ...ev, ...formData } : ev
      );
      syncLocal(updated);
      showToast('✅ Event updated successfully!', 'success');
    } else {
      const newEvent = {
        id: Date.now(),
        ...formData
      };
      syncLocal([...events, newEvent]);
      showToast('✅ Event added successfully!', 'success');
    }
    
    setShowForm(false);
    setEditingEvent(null);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingEvent(null);
  };

  const today = new Date().toISOString().split('T')[0];
  const getDaysInMonth = d => new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  const getFirstDay = d => new Date(d.getFullYear(), d.getMonth(), 1).getDay();
  const navDate = (dir) => {
    if (view === 'day') {
      const d = new Date(currentDate);
      d.setDate(currentDate.getDate() + dir);
      setCurrentDate(d);
    } else if (view === 'week') {
      const d = new Date(currentDate);
      d.setDate(currentDate.getDate() + (dir * 7));
      setCurrentDate(d);
    } else {
      const d = new Date(currentDate.getFullYear(), currentDate.getMonth() + dir, 1);
      setCurrentDate(d);
    }
  };
  const goToday = () => { setCurrentDate(new Date()); setView('month'); };

  // ===================== MONTH VIEW =====================
  const renderMonth = () => {
    const days = getDaysInMonth(currentDate);
    const first = getFirstDay(currentDate);
    const yr = currentDate.getFullYear();
    const mo = String(currentDate.getMonth() + 1).padStart(2, '0');

    return (
      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
          {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
            <div key={d} style={{ padding: '10px 0', textAlign: 'center', fontSize: '0.75rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>{d}</div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)' }}>
          {Array(first).fill(null).map((_, i) => (
            <div key={`b${i}`} style={{ minHeight: '90px', borderRight: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', background: '#fafafa' }} />
          ))}
          {Array.from({ length: days }, (_, i) => i + 1).map(day => {
            const ds = `${yr}-${mo}-${String(day).padStart(2,'0')}`;
            const dayEvs = filteredEvents.filter(e => e.date === ds);
            const isToday = ds === today;
            const isSelected = selectedDay === ds;
            return (
              <div key={day}
                onClick={() => { setSelectedDay(isSelected ? null : ds); }}
                style={{
                  minHeight: '90px', borderRight: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9',
                  padding: '6px', cursor: 'pointer', background: isSelected ? '#ecfdf5' : isToday ? '#f0fdf4' : 'white',
                  transition: 'background 0.15s'
                }}
                onMouseEnter={e => { if (!isSelected && !isToday) e.currentTarget.style.background = '#f8fafc'; }}
                onMouseLeave={e => { if (!isSelected && !isToday) e.currentTarget.style.background = 'white'; }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: '26px', height: '26px', borderRadius: '50%',
                  background: isToday ? emerald : 'transparent',
                  color: isToday ? 'white' : '#1e293b',
                  fontSize: '0.82rem', fontWeight: isToday ? '800' : '600', marginBottom: '4px'
                }}>{day}</div>
                {dayEvs.slice(0, 2).map(ev => {
                  const cm = CATEGORY_META[ev.category] || { color: '#64748b', bg: '#f1f5f9' };
                  return (
                    <div key={ev.id} onClick={e => { e.stopPropagation(); openEditForm(ev); }}
                      style={{
                        fontSize: '0.55rem', padding: '2px 4px', borderRadius: '4px', marginBottom: '2px',
                        background: cm.bg, color: cm.color, borderLeft: `2px solid ${cm.color}`,
                        fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: 'pointer'
                      }}>
                      {ev.time} {ev.title.substring(0, 20)}...
                    </div>
                  );
                })}
                {dayEvs.length > 2 && (
                  <div style={{ fontSize: '0.55rem', color: emerald, fontWeight: '700', marginTop: '2px' }}>+{dayEvs.length - 2} more</div>
                )}
                {isSelected && (
                  <button onClick={e => { e.stopPropagation(); openNewForm(ds); }}
                    style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: '3px', background: emerald, color: 'white', border: 'none', borderRadius: '6px', padding: '2px 6px', fontSize: '0.58rem', fontWeight: '700', cursor: 'pointer', width: '100%' }}>
                    <FaPlus size={7} /> Add Event
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ===================== WEEK VIEW =====================
  const renderWeek = () => {
    const weekStart = new Date(currentDate);
    weekStart.setDate(currentDate.getDate() - currentDate.getDay());
    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(weekStart);
      d.setDate(weekStart.getDate() + i);
      return d;
    });

    return (
      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)' }}>
          {weekDays.map((d, i) => {
            const ds = d.toISOString().split('T')[0];
            const dayEvs = filteredEvents.filter(e => e.date === ds);
            const isToday = ds === today;
            return (
              <div key={i} style={{ borderRight: i < 6 ? '1px solid #f1f5f9' : 'none', minHeight: '260px' }}>
                <div style={{
                  padding: '10px 8px', textAlign: 'center', borderBottom: '1px solid #f1f5f9',
                  background: isToday ? emeraldLight : '#f8fafc'
                }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: '700', color: isToday ? emerald : '#64748b', textTransform: 'uppercase' }}>
                    {d.toLocaleDateString('en',{weekday:'short'})}
                  </div>
                  <div style={{
                    width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '4px auto 0',
                    background: isToday ? emerald : 'transparent', color: isToday ? 'white' : '#1e293b',
                    fontSize: '0.9rem', fontWeight: '800'
                  }}>{d.getDate()}</div>
                </div>
                <div style={{ padding: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {dayEvs.map(ev => {
                    const cm = CATEGORY_META[ev.category] || { color: '#64748b', bg: '#f1f5f9' };
                    return (
                      <div key={ev.id} onClick={() => openEditForm(ev)}
                        style={{ fontSize: '0.65rem', padding: '4px 6px', borderRadius: '6px', background: cm.bg, color: cm.color, borderLeft: `3px solid ${cm.color}`, fontWeight: '600', cursor: 'pointer' }}>
                        <div>{ev.time}</div>
                        <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ev.title}</div>
                      </div>
                    );
                  })}
                  {dayEvs.length === 0 && <div style={{ fontSize: '0.6rem', color: '#cbd5e1', textAlign: 'center', paddingTop: '8px' }}>No events</div>}
                  <button onClick={() => openNewForm(ds)}
                    style={{ fontSize: '0.6rem', padding: '4px', background: emerald, color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', marginTop: '4px' }}>
                    + Add
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ===================== DAY VIEW =====================
  const renderDay = () => {
    const ds = currentDate.toISOString().split('T')[0];
    const dayEvs = filteredEvents.filter(e => e.date === ds).sort((a, b) => a.time.localeCompare(b.time));
    const hours = Array.from({ length: 14 }, (_, i) => i + 6);

    return (
      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: '800', fontSize: '1.1rem', color: '#1e293b' }}>
              {currentDate.toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{dayEvs.length} event{dayEvs.length !== 1 ? 's' : ''} scheduled</div>
          </div>
          <button onClick={() => openNewForm(ds)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', background: emerald, color: 'white', border: 'none', borderRadius: '10px', padding: '8px 14px', fontWeight: '700', fontSize: '0.82rem', cursor: 'pointer' }}>
            <FaPlus size={10} /> Add Event
          </button>
        </div>
        <div>
          {hours.map(h => {
            const hStr = String(h).padStart(2, '0') + ':';
            const slotEvs = dayEvs.filter(e => (e.time || '').startsWith(hStr));
            return (
              <div key={h} style={{ display: 'flex', borderBottom: '1px solid #f1f5f9', minHeight: '52px' }}>
                <div style={{ width: '60px', padding: '8px 12px', fontSize: '0.7rem', fontWeight: '600', color: '#94a3b8', flexShrink: 0, borderRight: '1px solid #f1f5f9' }}>
                  {h % 12 === 0 ? 12 : h % 12}{h < 12 ? ' AM' : ' PM'}
                </div>
                <div style={{ flex: 1, padding: '4px 12px', display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'flex-start' }}>
                  {slotEvs.map(ev => {
                    const cm = CATEGORY_META[ev.category] || { color: '#64748b', bg: '#f1f5f9' };
                    return (
                      <div key={ev.id} onClick={() => openEditForm(ev)}
                        style={{ fontSize: '0.75rem', padding: '5px 10px', borderRadius: '8px', background: cm.bg, color: cm.color, borderLeft: `3px solid ${cm.color}`, fontWeight: '600', cursor: 'pointer', maxWidth: '260px' }}>
                        <strong>{ev.time}</strong> — {ev.title}
                      </div>
                    );
                  })}
                  {slotEvs.length === 0 && (
                    <div style={{ fontSize: '0.65rem', color: '#cbd5e1', padding: '4px 8px' }}>—</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ===================== AGENDA VIEW =====================
  const renderAgenda = () => {
    const sorted = [...filteredEvents].sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
    const totalPages = Math.ceil(sorted.length / 10);
    const startIndex = (agendaPage - 1) * 10;
    const paginatedEvents = sorted.slice(startIndex, startIndex + 10);

    const grouped = paginatedEvents.reduce((acc, ev) => {
      (acc[ev.date] = acc[ev.date] || []).push(ev);
      return acc;
    }, {});

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {Object.entries(grouped).map(([date, evs]) => {
          const d = new Date(date + 'T00:00:00');
          const isToday = date === today;
          return (
            <div key={date}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: isToday ? emerald : '#f1f5f9', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '0.6rem', fontWeight: '700', color: isToday ? 'rgba(255,255,255,0.8)' : '#64748b', textTransform: 'uppercase' }}>{d.toLocaleDateString('en',{month:'short'})}</span>
                  <span style={{ fontSize: '1rem', fontWeight: '800', color: isToday ? 'white' : '#1e293b', lineHeight: 1 }}>{d.getDate()}</span>
                </div>
                <div>
                  <div style={{ fontWeight: '800', fontSize: '0.9rem', color: isToday ? emerald : '#1e293b' }}>
                    {isToday ? 'Today' : d.toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{evs.length} event{evs.length > 1 ? 's' : ''}</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '54px' }}>
                {evs.map(ev => {
                  const cm = CATEGORY_META[ev.category] || { color: '#64748b', bg: '#f1f5f9' };
                  const sm = STATUS_META[ev.status] || { color: '#94a3b8', bg: '#f1f5f9' };
                  return (
                    <div key={ev.id} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      background: 'white', borderRadius: '14px', padding: '14px 18px',
                      border: '1px solid #e2e8f0', borderLeft: `4px solid ${cm.color}`,
                      boxShadow: '0 2px 10px rgba(0,0,0,0.03)', transition: 'all 0.2s'
                    }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.06)'; e.currentTarget.style.borderColor = cm.color; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.03)'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
                    >
                      <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flex: 1, minWidth: 0 }}>
                        <div style={{ textAlign: 'center', minWidth: '50px', paddingRight: '14px', borderRight: '1px solid #f1f5f9' }}>
                          <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#1e293b' }}>{ev.time || '--'}</div>
                          <div style={{ fontSize: '0.6rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '600' }}>
                            {ev.time && parseInt(ev.time) < 12 ? 'AM' : 'PM'}
                          </div>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                            <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: '800', color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ev.title}</h4>
                            {ev.recurring && <span style={{ fontSize: '0.58rem', background: '#eff6ff', color: '#3b82f6', padding: '1px 6px', borderRadius: '20px', fontWeight: '700' }}><FaRedo size={7} /> Recurring</span>}
                          </div>
                          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', fontSize: '0.7rem', color: '#64748b' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FaTag size={9} style={{ color: cm.color }} />{ev.category}</span>
                            {ev.location && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FaMapMarkerAlt size={9} style={{ color: emerald }} />{ev.location}</span>}
                            <span style={{ background: ev.priority === 'High' ? '#fef2f2' : ev.priority === 'Medium' ? '#fffbeb' : '#f1f5f9', color: ev.priority === 'High' ? '#ef4444' : ev.priority === 'Medium' ? '#f59e0b' : '#64748b', padding: '1px 7px', borderRadius: '20px', fontWeight: '700', fontSize: '0.6rem' }}>{ev.priority}</span>
                            <span style={{ background: sm.bg, color: sm.color, padding: '1px 7px', borderRadius: '20px', fontWeight: '700', fontSize: '0.6rem' }}>{ev.status}</span>
                          </div>
                          {ev.notes && <p style={{ margin: '6px 0 0', fontSize: '0.7rem', color: '#94a3b8', lineHeight: 1.4 }}>{ev.notes}</p>}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '6px', flexShrink: 0, marginLeft: '12px' }}>
                        <button onClick={() => openEditForm(ev)} title="Edit" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '6px 8px', cursor: 'pointer', color: emerald, transition: 'all 0.15s', fontSize: '0.8rem' }}><FaPen size={11} /></button>
                        <button onClick={() => deleteEvent(ev.id)} title="Delete" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '6px 8px', cursor: 'pointer', color: '#ef4444', transition: 'all 0.15s', fontSize: '0.8rem' }}><FaTrash size={11} /></button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        {filteredEvents.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
            <FaCalendarAlt size={40} style={{ marginBottom: '12px', opacity: 0.3 }} />
            <p style={{ fontSize: '1rem', fontWeight: '600' }}>No events found matching your search or filters.</p>
          </div>
        )}
        {sorted.length > 10 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '24px' }}>
            <button 
              disabled={agendaPage === 1}
              onClick={() => setAgendaPage(prev => Math.max(prev - 1, 1))}
              style={{
                padding: '8px 16px',
                borderRadius: '10px',
                border: '1.5px solid #e2e8f0',
                background: agendaPage === 1 ? '#f8fafc' : 'white',
                color: agendaPage === 1 ? '#cbd5e1' : '#475569',
                fontWeight: '600',
                cursor: agendaPage === 1 ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                fontSize: '0.8rem'
              }}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setAgendaPage(page)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  border: agendaPage === page ? 'none' : '1.5px solid #e2e8f0',
                  background: agendaPage === page ? emerald : 'white',
                  color: agendaPage === page ? 'white' : '#475569',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontSize: '0.8rem'
                }}
              >
                {page}
              </button>
            ))}
            <button 
              disabled={agendaPage === totalPages || totalPages === 0}
              onClick={() => setAgendaPage(prev => Math.min(prev + 1, totalPages))}
              style={{
                padding: '8px 16px',
                borderRadius: '10px',
                border: '1.5px solid #e2e8f0',
                background: (agendaPage === totalPages || totalPages === 0) ? '#f8fafc' : 'white',
                color: (agendaPage === totalPages || totalPages === 0) ? '#cbd5e1' : '#475569',
                fontWeight: '600',
                cursor: (agendaPage === totalPages || totalPages === 0) ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                fontSize: '0.8rem'
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  };

  // ===================== FORM MODAL =====================
  const renderForm = () => (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(8px)',
      zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px'
    }}>
      <div style={{
        background: 'white', borderRadius: '24px', padding: '32px',
        maxWidth: '560px', width: '100%', maxHeight: '90vh',
        overflowY: 'auto', boxShadow: '0 25px 60px rgba(0,0,0,0.15)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800', color: '#1e293b' }}>
            {editingEvent ? '✏️ Edit Event' : '📅 Add New Event'}
          </h3>
          <button onClick={closeForm} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#94a3b8' }}>✕</button>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div style={{ display: 'grid', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '4px' }}>Event Title *</label>
              <input
                type="text"
                placeholder="e.g., Cardiology Checkup"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '4px' }}>Date *</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                  required
                />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '4px' }}>Time</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={e => setFormData({...formData, time: e.target.value})}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '18px' }}>
              <div>
                <label style={{ fontSize: '0.7rem', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '4px' }}>Category</label>
                <CustomDropdown
                  options={Object.keys(CATEGORY_META)}
                  value={formData.category}
                  onChange={val => setFormData({...formData, category: val})}
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.7rem', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '4px' }}>Priority</label>
                <CustomDropdown
                  options={['High', 'Medium', 'Low']}
                  value={formData.priority}
                  onChange={val => setFormData({...formData, priority: val})}
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.7rem', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '4px' }}>Status</label>
                <CustomDropdown
                  options={['Confirmed', 'Pending', 'Cancelled']}
                  value={formData.status}
                  onChange={val => setFormData({...formData, status: val})}
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '4px' }}>Location</label>
              <input
                type="text"
                placeholder="e.g., WellNest Medical Center"
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '4px' }}>Notes</label>
              <textarea
                placeholder="Add any notes..."
                value={formData.notes}
                onChange={e => setFormData({...formData, notes: e.target.value})}
                rows="2"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '0.9rem', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="checkbox"
                id="recurring"
                checked={formData.recurring}
                onChange={e => setFormData({...formData, recurring: e.target.checked})}
                style={{ width: '16px', height: '16px', accentColor: emerald }}
              />
              <label htmlFor="recurring" style={{ fontSize: '0.85rem', fontWeight: '600', color: '#475569' }}>
                Recurring Event
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button type="submit" style={{
              flex: 1, padding: '12px', background: emerald, color: 'white',
              border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '0.9rem',
              cursor: 'pointer', transition: 'all 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#047857'}
            onMouseLeave={e => e.currentTarget.style.background = emerald}>
              {editingEvent ? 'Update Event' : 'Add Event'}
            </button>
            <button type="button" onClick={closeForm} style={{
              padding: '12px 20px', background: '#f1f5f9', color: '#475569',
              border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer'
            }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>
        <div style={{ width: '40px', height: '40px', border: `4px solid ${emeraldLight}`, borderTop: `4px solid ${emerald}`, borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 12px' }} />
        Loading calendar...
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {showForm && renderForm()}

      {/* Hero Header */}
      <div style={{
        background: `linear-gradient(135deg, ${emerald} 0%, #047857 50%, #065f46 100%)`,
        borderRadius: '24px', padding: '40px 36px', marginBottom: '32px',
        position: 'relative', overflow: 'hidden', color: 'white'
      }}>
        <div style={{ position: 'absolute', top: '-80px', right: '-60px', width: '260px', height: '260px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-100px', left: '-60px', width: '320px', height: '320px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
            <div style={{ background: 'rgba(255,255,255,0.15)', padding: '14px', borderRadius: '14px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <FaCalendarAlt style={{ fontSize: '2rem' }} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.9rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Medical Calendar</h2>
              <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>
                Schedule appointments, medications, lab tests and wellness routines
              </p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px', marginTop: '16px' }}>
            {[
              { label: 'Total Events', value: events.length },
              { label: 'Upcoming', value: events.filter(e => e.date >= today && e.status !== 'Cancelled').length },
              { label: 'Today', value: events.filter(e => e.date === today).length },
              { label: 'High Priority', value: events.filter(e => e.priority === 'High' && e.status !== 'Cancelled').length },
            ].map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px 16px', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.transform = 'none'; }}>
                <div style={{ fontSize: '1.3rem', fontWeight: '800' }}>{s.value}</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.8, marginTop: '2px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '6px', background: '#f1f5f9', borderRadius: '12px', padding: '4px' }}>
          {[
            { key: 'month', icon: FaTh, label: 'Month' },
            { key: 'week', icon: FaCalendarWeek, label: 'Week' },
            { key: 'day', icon: FaCalendarDay, label: 'Day' },
            { key: 'agenda', icon: FaList, label: 'Agenda' },
          ].map(v => (
            <button key={v.key} onClick={() => setView(v.key)}
              style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '7px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '700', fontSize: '0.78rem', transition: 'all 0.15s', background: view === v.key ? emerald : 'transparent', color: view === v.key ? 'white' : '#64748b' }}>
              <v.icon size={11} />{v.label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          {view !== 'agenda' && (
            <>
              <button onClick={() => navDate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '7px 10px', border: '1.5px solid #e2e8f0', borderRadius: '10px', background: 'white', cursor: 'pointer', color: '#475569', transition: 'all 0.15s', fontSize: '0.8rem' }}><FaChevronLeft size={11} /></button>
              <span style={{ fontSize: '0.9rem', fontWeight: '800', color: '#1e293b', minWidth: '130px', textAlign: 'center' }}>
                {view === 'day'
                  ? currentDate.toLocaleDateString('en', { month: 'long', day: 'numeric', year: 'numeric' })
                  : view === 'week'
                  ? 'Week of ' + currentDate.toLocaleDateString('en', { month: 'short', day: 'numeric' })
                  : currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </span>
              <button onClick={() => navDate(1)} style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '7px 10px', border: '1.5px solid #e2e8f0', borderRadius: '10px', background: 'white', cursor: 'pointer', color: '#475569', transition: 'all 0.15s', fontSize: '0.8rem' }}><FaChevronRight size={11} /></button>
            </>
          )}
          <button onClick={goToday} style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '7px 14px', border: '1.5px solid #e2e8f0', borderRadius: '10px', background: 'white', cursor: 'pointer', color: emerald, transition: 'all 0.15s', fontSize: '0.8rem', fontWeight: '700' }}>
            <FaBolt size={10} /> Today
          </button>
          <button onClick={() => openNewForm(today)} style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '7px 14px', background: emerald, color: 'white', border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer', boxShadow: '0 4px 12px rgba(5,150,105,0.25)' }}>
            <FaPlus size={10} /> Add Event
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: '200px', display: 'flex', alignItems: 'center', gap: '8px', background: 'white', borderRadius: '12px', padding: '0 14px', border: '1.5px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <FaSearch style={{ color: '#94a3b8', fontSize: '0.85rem' }} />
          <input 
            type="text" 
            placeholder="Search events by title, location, category..." 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)}
            style={{ border: 'none', outline: 'none', padding: '10px 0', width: '100%', fontSize: '0.88rem', background: 'transparent' }} 
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '4px' }}
            >
              <FaTimes size={14} />
            </button>
          )}
        </div>
        {[
          { value: filterCategory, set: setFilterCategory, options: ['All', ...Object.keys(CATEGORY_META)], label: 'Category' },
          { value: filterPriority, set: setFilterPriority, options: ['All', 'High', 'Medium', 'Low'], label: 'Priority' },
          { value: filterStatus, set: setFilterStatus, options: ['All', 'Confirmed', 'Pending', 'Cancelled'], label: 'Status' },
        ].map((f, i) => (
          <CustomDropdown
            key={i}
            options={f.options}
            value={f.value}
            onChange={f.set}
            labelMap={f.options.reduce((acc, o) => { acc[o] = o === 'All' ? `All ${f.label}` : o; return acc; }, {})}
          />
        ))}
        <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: '600' }}>
          <span style={{ color: emerald, fontWeight: '800' }}>{filteredEvents.length}</span> events found
        </span>
      </div>

      {/* Color Legend */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {Object.entries(CATEGORY_META).map(([key, meta]) => (
          <button key={key} onClick={() => setFilterCategory(filterCategory === key ? 'All' : key)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '20px', border: `1px solid ${meta.color}30`, background: filterCategory === key ? meta.bg : 'white', color: meta.color, fontSize: '0.7rem', fontWeight: '700', cursor: 'pointer', transition: 'all 0.15s' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: meta.color }} />
            {key}
          </button>
        ))}
      </div>

      {/* Calendar Body */}
      {view === 'month' && renderMonth()}
      {view === 'week' && renderWeek()}
      {view === 'day' && renderDay()}
      {view === 'agenda' && renderAgenda()}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
