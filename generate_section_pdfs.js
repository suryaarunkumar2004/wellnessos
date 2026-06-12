const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

// Directory where the PDFs for each top‑level section will be stored
const outDir = path.join(__dirname, 'generated_pdfs');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir);
}

// Root of the project (one level up from this script)
const rootDir = path.resolve(__dirname, '.');

// Helper to create a PDF for a given directory
function createPdfForSection(sectionPath, sectionName) {
  const pdfPath = path.join(outDir, `${sectionName}.pdf`);
  const doc = new PDFDocument({ autoFirstPage: false, margin: 30 });
  const stream = fs.createWriteStream(pdfPath);
  doc.pipe(stream);

  function addPage() { doc.addPage(); doc.fontSize(14).font('Helvetica-Bold'); }
  function writeHeader(text) { doc.moveDown(0.5).fontSize(16).font('Helvetica-Bold').text(text, { underline: true }).moveDown(0.3).fontSize(12).font('Helvetica'); }
  function writeFileContent(relPath, content) { writeHeader(relPath); doc.fontSize(9).font('Courier').text(content, { lineGap: 2 }).moveDown(0.5); }

  addPage();
  writeHeader(`Section: ${sectionName}`);
  writeHeader(`Generated on ${new Date().toISOString()}`);
  doc.moveDown(1);

  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    entries.forEach(entry => {
      const fullPath = path.join(dir, entry.name);
      const relPath = path.relative(sectionPath, fullPath).replace(/\\\\/g, '/');
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile()) {
        const binaryExts = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.mp4', '.webm'];
        const ext = path.extname(entry.name).toLowerCase();
        if (binaryExts.includes(ext)) {
          writeHeader(`File: ${relPath} (binary – omitted)`);
          return;
        }
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          writeFileContent(relPath, content);
        } catch (e) {
          writeHeader(`File: ${relPath} (unreadable)`);
        }
      }
    });
  }

  walk(sectionPath);
  doc.end();
  return new Promise(resolve => stream.on('finish', resolve));
}

// Main: create a PDF for each top‑level folder in the project root
async function main() {
  const entries = fs.readdirSync(rootDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const sectionPath = path.join(rootDir, entry.name);
      // Skip the generated_pdfs folder itself
      if (entry.name === 'generated_pdfs') continue;
      console.log(`Generating PDF for section: ${entry.name}`);
      await createPdfForSection(sectionPath, entry.name);
    }
  }
  console.log('All section PDFs generated in', outDir);
}

main();
