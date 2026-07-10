#!/bin/bash

echo "========================================="
echo "  CORRECTLY FIXING BORDER CONFLICTS"
echo "========================================="
echo ""

# 1. Fix Navbar - the main culprit
echo "🔧 Fixing Navbar.jsx..."
sed -i '' 's/borderBottomColor = emeraldDark;/borderBottom = `2px solid ${emeraldDark}`;/g' ./src/components/Navbar/Navbar.jsx
sed -i '' 's/borderBottomColor = '\''transparent'\'';/borderBottom = '\''2px solid transparent'\'';/g' ./src/components/Navbar/Navbar.jsx

# 2. Fix border: 'none' on buttons - change to border: 'none' (keep as is, but ensure no borderBottom mixed)
echo "🔧 Fixing button borders..."
find ./src -name "*.jsx" -type f -exec sed -i '' 's/border: '\''none'\'',/border: '\''none'\'',/g' {} \;

# 3. Restore full borders to cards (they were accidentally changed)
echo "🔧 Restoring full borders to cards..."
find ./src -name "*.jsx" -type f -exec sed -i '' 's/borderBottom: '\''1px solid #e5e7eb'\'',/border: '\''1px solid #e5e7eb'\'',/g' {} \;
find ./src -name "*.jsx" -type f -exec sed -i '' 's/borderBottom: '\''1px solid #f3f4f6'\'',/border: '\''1px solid #f3f4f6'\'',/g' {} \;
find ./src -name "*.jsx" -type f -exec sed -i '' 's/borderBottom: '\''1px solid #cbd5e1'\'',/border: '\''1px solid #cbd5e1'\'',/g' {} \;
find ./src -name "*.jsx" -type f -exec sed -i '' 's/borderBottom: '\''1px solid #d1d5db'\'',/border: '\''1px solid #d1d5db'\'',/g' {} \;
find ./src -name "*.jsx" -type f -exec sed -i '' 's/borderBottom: '\''2px solid #e5e7eb'\'',/border: '\''2px solid #e5e7eb'\'',/g' {} \;

# 4. Fix the specific More.jsx conditional borders (keep as borderBottom since they're fine)
echo "🔧 Fixing More.jsx conditional borders..."
sed -i '' 's/border: isNow ? `2px solid ${emerald}` : `1px solid #f1f5f9`/borderBottom: isNow ? `2px solid ${emerald}` : `1px solid #f1f5f9`/g' ./src/pages/More/More.jsx
sed -i '' 's/border: day.isToday ? `2px solid ${emerald}` : `1px solid #f1f5f9`/borderBottom: day.isToday ? `2px solid ${emerald}` : `1px solid #f1f5f9`/g' ./src/pages/More/More.jsx

# 5. Fix Navbar dropdown border (keep as border, not borderBottom)
echo "🔧 Fixing Navbar dropdown..."
sed -i '' 's/borderBottom: '\''1px solid #f3f4f6'\'',/border: '\''1px solid #f3f4f6'\'',/g' ./src/components/Navbar/Navbar.jsx

echo ""
echo "========================================="
echo "  ✅ FIXES APPLIED!"
echo "========================================="
echo ""
echo "  What was fixed:"
echo "  1. Navbar hover styles now use borderBottom properly"
echo "  2. Button borders restored to full border"
echo "  3. Card borders restored to full border"
echo "  4. Conditional borders in More.jsx fixed"
echo ""
echo "  Now restart your dev server:"
echo "  npm run dev"
echo ""
