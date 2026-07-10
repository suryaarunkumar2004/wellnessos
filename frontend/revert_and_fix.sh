#!/bin/bash

echo "========================================="
echo "  REVERTING + PROPERLY FIXING BORDERS"
echo "========================================="
echo ""

# STEP 1: Revert all borderBottom back to border (undo the damage)
echo "📁 Reverting borderBottom back to border..."
find ./src -name "*.jsx" -type f -exec sed -i '' 's/borderBottom: '\''1px solid #e5e7eb'\'',/border: '\''1px solid #e5e7eb'\'',/g' {} \;
find ./src -name "*.jsx" -type f -exec sed -i '' 's/borderBottom: '\''1px solid #f3f4f6'\'',/border: '\''1px solid #f3f4f6'\'',/g' {} \;
find ./src -name "*.jsx" -type f -exec sed -i '' 's/borderBottom: '\''1px solid #cbd5e1'\'',/border: '\''1px solid #cbd5e1'\'',/g' {} \;
find ./src -name "*.jsx" -type f -exec sed -i '' 's/borderBottom: '\''1px solid #d1d5db'\'',/border: '\''1px solid #d1d5db'\'',/g' {} \;
find ./src -name "*.jsx" -type f -exec sed -i '' 's/borderBottom: '\''2px solid #e5e7eb'\'',/border: '\''2px solid #e5e7eb'\'',/g' {} \;
find ./src -name "*.jsx" -type f -exec sed -i '' 's/borderBottom: '\''none'\'',/border: '\''none'\'',/g' {} \;

# STEP 2: Fix ONLY the Navbar hover issue (the actual problem)
echo "🔧 Fixing Navbar hover styles..."
sed -i '' 's/e\.target\.style\.borderBottomColor = emeraldDark;/e.currentTarget.style.border = `2px solid ${emeraldDark}`;/g' ./src/components/Navbar/Navbar.jsx
sed -i '' 's/e\.target\.style\.borderBottomColor = '\''transparent'\'';/e.currentTarget.style.border = '\''2px solid transparent'\'';/g' ./src/components/Navbar/Navbar.jsx

# STEP 3: Fix the Link style to use border (not borderBottom)
echo "🔧 Fixing Navbar Link styles..."
sed -i '' 's/borderBottom: '\''2px solid transparent'\'',/border: '\''2px solid transparent'\'',/g' ./src/components/Navbar/Navbar.jsx
sed -i '' 's/borderBottom: isMoreOpen ? `2px solid ${emeraldDark}` : `2px solid transparent`,/border: isMoreOpen ? `2px solid ${emeraldDark}` : `2px solid transparent`,/g' ./src/components/Navbar/Navbar.jsx

echo ""
echo "========================================="
echo "  ✅ FIX COMPLETE!"
echo "========================================="
echo ""
echo "  What was fixed:"
echo "  1. All borders restored to normal (full border, not just bottom)"
echo "  2. Navbar hover now uses 'border' instead of 'borderBottomColor'"
echo "  3. All card borders are back to normal"
echo ""
echo "  Now restart your dev server:"
echo "  npm run dev"
echo ""
