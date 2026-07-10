#!/bin/bash
echo "=========================================================="
echo "   FIXING REMAINING JSX ERRORS"
echo "=========================================================="
echo ""

# Fix NotificationCenter.jsx - remove extra )
echo "Fixing NotificationCenter.jsx line 38..."
sed -i '' '38s/)}/}/' src/pages/Notifications/NotificationCenter.jsx
echo "  ✅ Fixed"

# Fix DosageGuide.jsx line 413
echo "Fixing DosageGuide.jsx line 413..."
sed -i '' '413s/}/)}/' src/pages/DosageGuide/DosageGuide.jsx
echo "  ✅ Fixed"

# Now let's check Navbar.jsx around the ternary operator
echo ""
echo "Checking Navbar.jsx ternary operator at line 261..."
sed -n '258,330p' src/components/Navbar/Navbar.jsx | head -20

echo ""
echo "Checking More.jsx ternary operator at line 323..."
sed -n '320,340p' src/pages/More/More.jsx

echo ""
echo "=========================================================="
echo "   RUNNING FINAL VERIFICATION"
echo "=========================================================="
echo ""
echo "NotificationCenter line 38: $(sed -n '38p' src/pages/Notifications/NotificationCenter.jsx)"
echo "DosageGuide line 413: $(sed -n '413p' src/pages/DosageGuide/DosageGuide.jsx)"

