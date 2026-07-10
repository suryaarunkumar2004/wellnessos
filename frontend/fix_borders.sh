#!/bin/bash

echo "========================================="
echo "  FIXING BORDER STYLE CONFLICTS"
echo "========================================="
echo ""

# Fix Navbar.jsx
echo "🔧 Fixing Navbar.jsx..."
sed -i '' 's/borderBottomColor = emeraldDark;/borderBottom = `2px solid ${emeraldDark}`;/g' ./src/components/Navbar/Navbar.jsx
sed -i '' 's/borderBottomColor = '\''transparent'\'';/borderBottom = '\''2px solid transparent'\'';/g' ./src/components/Navbar/Navbar.jsx
sed -i '' 's/border: '\''none'\'',/borderBottom: '\''none'\'',/g' ./src/components/Navbar/Navbar.jsx
sed -i '' 's/border: '\''1px solid #f3f4f6'\'',/borderBottom: '\''1px solid #f3f4f6'\'',/g' ./src/components/Navbar/Navbar.jsx
sed -i '' 's/border: isMoreOpen ? `2px solid ${emeraldDark}` : `2px solid transparent`,/borderBottom: isMoreOpen ? `2px solid ${emeraldDark}` : `2px solid transparent`,/g' ./src/components/Navbar/Navbar.jsx

# Fix More.jsx
echo "🔧 Fixing More.jsx..."
sed -i '' 's/border: '\''none'\'',/borderBottom: '\''none'\'',/g' ./src/pages/More/More.jsx
sed -i '' 's/border: '\''1px solid #f3f4f6'\'',/borderBottom: '\''1px solid #f3f4f6'\'',/g' ./src/pages/More/More.jsx
sed -i '' 's/border: '\''1px solid rgba(255,255,255,0.2)'\'',/borderBottom: '\''1px solid rgba(255,255,255,0.2)'\'',/g' ./src/pages/More/More.jsx
sed -i '' 's/border: '\''2px solid #e5e7eb'\'',/borderBottom: '\''2px solid #e5e7eb'\'',/g' ./src/pages/More/More.jsx
sed -i '' 's/border: isNow ? `2px solid ${emerald}` : `1px solid #f1f5f9`/borderBottom: isNow ? `2px solid ${emerald}` : `1px solid #f1f5f9`/g' ./src/pages/More/More.jsx
sed -i '' 's/border: day.isToday ? `2px solid ${emerald}` : `1px solid #f1f5f9`/borderBottom: day.isToday ? `2px solid ${emerald}` : `1px solid #f1f5f9`/g' ./src/pages/More/More.jsx

# Fix Cart.jsx
echo "🔧 Fixing Cart.jsx..."
sed -i '' 's/border: '\''none'\'',/borderBottom: '\''none'\'',/g' ./src/pages/Cart/Cart.jsx
sed -i '' 's/border: '\''1px solid #d1d5db'\'',/borderBottom: '\''1px solid #d1d5db'\'',/g' ./src/pages/Cart/Cart.jsx
sed -i '' 's/border: paymentMethod === '\''card'\'' ? `2px solid #059669` : `1px solid #d1d5db`,/borderBottom: paymentMethod === '\''card'\'' ? `2px solid #059669` : `1px solid #d1d5db`,/g' ./src/pages/Cart/Cart.jsx
sed -i '' 's/border: paymentMethod === '\''paypal'\'' ? `2px solid #059669` : `1px solid #d1d5db`,/borderBottom: paymentMethod === '\''paypal'\'' ? `2px solid #059669` : `1px solid #d1d5db`,/g' ./src/pages/Cart/Cart.jsx
sed -i '' 's/border: paymentMethod === '\''google'\'' ? `2px solid #059669` : `1px solid #d1d5db`,/borderBottom: paymentMethod === '\''google'\'' ? `2px solid #059669` : `1px solid #d1d5db`,/g' ./src/pages/Cart/Cart.jsx

# Fix ServiceDetail.jsx
echo "🔧 Fixing ServiceDetail.jsx..."
sed -i '' 's/border: '\''none'\'',/borderBottom: '\''none'\'',/g' ./src/pages/ServiceDetail/ServiceDetail.jsx
sed -i '' 's/border: '\''1px solid #cbd5e1'\'',/borderBottom: '\''1px solid #cbd5e1'\'',/g' ./src/pages/ServiceDetail/ServiceDetail.jsx
sed -i '' 's/border: '\''1px solid #e5e7eb'\'',/borderBottom: '\''1px solid #e5e7eb'\'',/g' ./src/pages/ServiceDetail/ServiceDetail.jsx

# Fix DebugDrugData.jsx
echo "🔧 Fixing DebugDrugData.jsx..."
sed -i '' 's/border: '\''1px solid #d1d5db'\'',/borderBottom: '\''1px solid #d1d5db'\'',/g' ./src/pages/DosageGuide/DebugDrugData.jsx
sed -i '' 's/border: '\''none'\'',/borderBottom: '\''none'\'',/g' ./src/pages/DosageGuide/DebugDrugData.jsx
sed -i '' 's/border: result\.success ? `1px solid #e5e7eb` : `1px solid #fca5a5`/borderBottom: result.success ? `1px solid #e5e7eb` : `1px solid #fca5a5`/g' ./src/pages/DosageGuide/DebugDrugData.jsx

# Fix all other JSX files
echo "🔧 Fixing all other JSX files..."
find ./src -name "*.jsx" -type f -exec sed -i '' 's/border: '\''none'\'',/borderBottom: '\''none'\'',/g' {} \;
find ./src -name "*.jsx" -type f -exec sed -i '' 's/border: '\''1px solid #e5e7eb'\'',/borderBottom: '\''1px solid #e5e7eb'\'',/g' {} \;
find ./src -name "*.jsx" -type f -exec sed -i '' 's/border: '\''1px solid #f3f4f6'\'',/borderBottom: '\''1px solid #f3f4f6'\'',/g' {} \;

echo ""
echo "========================================="
echo "  ✅ ALL FIXES APPLIED!"
echo "========================================="
echo ""
echo "Now restart your dev server:"
echo "  npm run dev"
echo ""
