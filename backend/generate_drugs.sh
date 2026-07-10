#!/bin/bash

cat > ../backend/src/main/resources/data-drugs.sql << 'SQL_END'
-- Delete existing drugs
DELETE FROM drugs;

-- Insert 1000+ drugs
INSERT INTO drugs (name, category, description, dosage, side_effects, rating, price, availability, is_active, created_at, updated_at) VALUES
SQL_END

# Generate 1000+ drugs using bash
for i in {1..1000}; do
  # Generate random drug names
  DRUG_NAMES=("Medi"$i "Health"$i "Care"$i "Wellness"$i "Pharma"$i "Vital"$i "Core"$i "Pure"$i "Prime"$i "Elite"$i)
  DRUG_CATEGORIES=("Pain Relief" "Antibiotics" "Cardiovascular" "Diabetes" "Gastrointestinal" "Nervous System" "Respiratory" "Allergy & Immunology" "Endocrine" "Dermatology" "Ophthalmology" "Psychiatry" "Oncology" "Hematology" "Immunology" "Metabolic" "Musculoskeletal" "Neurology" "Pulmonology" "Rheumatology")
  CATEGORY=${DRUG_CATEGORIES[$((RANDOM % ${#DRUG_CATEGORIES[@]}))]}
  NAME=${DRUG_NAMES[$((RANDOM % ${#DRUG_NAMES[@]}))]}$i
  RATING=$(echo "scale=1; 3.5 + $((RANDOM % 15)) / 10" | bc)
  PRICE_OPTIONS=("$" "$$" "$$$" "$$$$" "$$$$$")
  PRICE=${PRICE_OPTIONS[$((RANDOM % ${#PRICE_OPTIONS[@]}))]}
  AVAIL_OPTIONS=("Over-the-counter" "Prescription only")
  AVAIL=${AVAIL_OPTIONS[$((RANDOM % ${#AVAIL_OPTIONS[@]}))]}
  
  echo "('$NAME', '$CATEGORY', 'Description for $NAME - a comprehensive medication for $CATEGORY conditions.', 'Dosage varies - consult your healthcare provider.', 'Common side effects: nausea, headache, dizziness, or none.', $RATING, '$PRICE', '$AVAIL', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)," >> ../backend/src/main/resources/data-drugs.sql
done

# Remove last comma and add semicolon
sed -i '' '$ s/,$/;/' ../backend/src/main/resources/data-drugs.sql

echo "Generated 1000+ drugs successfully!"
