#!/bin/bash

echo "========================================="
echo "   WELLNESSOS - COMPLETE TEST SCRIPT"
echo "========================================="
echo ""

echo "🔍 TEST 1: BACKEND STATUS"
echo "--------------------------"
curl -s -o /dev/null -w "Backend API: %{http_code}\n" http://localhost:8080/api/health/records/1

echo ""
echo "🔍 TEST 2: FRONTEND STATUS"
echo "--------------------------"
curl -s -o /dev/null -w "Frontend: %{http_code}\n" http://localhost:5173

echo ""
echo "🔍 TEST 3: HEALTH RECORD API"
echo "--------------------------"
curl -s -X POST http://localhost:8080/api/health/record \
  -H "Content-Type: application/json" \
  -d '{"userId":1,"recordDate":"2026-07-03","steps":5000,"water":2.0,"sleep":7.5,"heartRate":72}' \
  | jq '.' 2>/dev/null || echo "Response: Check manually"

echo ""
echo "🔍 TEST 4: NOTIFICATIONS API"
echo "--------------------------"
curl -s http://localhost:8080/api/notifications | jq '.[0:3]' 2>/dev/null || echo "Response: Check manually"

echo ""
echo "🔍 TEST 5: BLOG POSTS API"
echo "--------------------------"
curl -s "http://localhost:8080/api/blog/posts?page=0&size=3" | jq '.content[0].title' 2>/dev/null || echo "Response: Check manually"

echo ""
echo "🔍 TEST 6: DRUGS API"
echo "--------------------------"
curl -s "http://localhost:8080/api/drugs?page=0&size=3" | jq '.drugs[0].name' 2>/dev/null || echo "Response: Check manually"

echo ""
echo "🔍 TEST 7: DATABASE TABLES"
echo "--------------------------"
mysql -u root -pRoot@12345 -e "USE wellnessos; SHOW TABLES;" 2>/dev/null | wc -l | xargs echo "Number of tables:"

echo ""
echo "�� TEST 8: FRONTEND ROUTES"
echo "--------------------------"
ROUTES=(
  "/"
  "/doctors"
  "/health-tracker"
  "/services"
  "/dosage-guide"
  "/blog"
  "/cart"
  "/favorites"
  "/my-bookmarks"
  "/profile"
  "/medical-history"
  "/appointments"
  "/more?tab=dashboard"
  "/more?tab=calendar"
  "/more?tab=notifications"
  "/more?tab=tools"
)

for route in "${ROUTES[@]}"; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:5173${route}")
  if [ "$STATUS" -eq 200 ]; then
    echo "✅ $route - OK"
  else
    echo "❌ $route - FAILED ($STATUS)"
  fi
done

echo ""
echo "========================================="
echo "   TEST COMPLETE"
echo "========================================="
