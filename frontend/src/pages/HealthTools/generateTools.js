// This script generates all 52 health tool pages
// Each page has unique content, calculations, and features

const fs = require('fs');
const path = require('path');

const toolConfigs = [
  {
    id: 1,
    name: 'BMI Calculator',
    component: 'BmiCalculator',
    icon: 'FaWeight',
    path: '/health-tools/bmi',
    description: 'Calculate your Body Mass Index based on height and weight',
    fields: [
      { name: 'height', label: 'Height', unit: 'cm', placeholder: '175', required: true },
      { name: 'weight', label: 'Weight', unit: 'kg', placeholder: '70', required: true }
    ],
    calculation: `const h = data.height / 100; const w = data.weight; const bmi = w / (h * h); let category = ''; if (bmi < 18.5) category = 'Underweight'; else if (bmi < 25) category = 'Normal'; else if (bmi < 30) category = 'Overweight'; else category = 'Obese'; return { bmi: bmi.toFixed(1), category };`
  },
  // ... I'll add all 52 tools
];

// Generate each tool page
toolConfigs.forEach(tool => {
  const content = generateToolPage(tool);
  fs.writeFileSync(
    path.join(__dirname, `${tool.component}.jsx`),
    content
  );
});
