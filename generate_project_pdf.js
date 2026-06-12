const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const rootDir = path.resolve(__dirname, '.');
const outputPath = path.join(rootDir, 'wellnessos_full.pdf');

const doc = new PDFDocument({ autoFirstPage: false, margin: 30 });
const stream = fs.createWriteStream(outputPath);

doc.pipe(stream);

function addPage() {
  doc.addPage();
  doc.fontSize(14).font('Helvetica-Bold');
}

function writeHeader(text) {
  doc.moveDown(0.5);
  doc.fontSize(16).font('Helvetica-Bold').text(text, { underline: true });
  doc.moveDown(0.3);
  doc.fontSize(12).font('Helvetica');
}

function writeFileContent(relPath, content) {
  writeHeader(relPath);
  doc.fontSize(9).font('Courier').text(content, { lineGap: 2 });
  doc.moveDown(0.5);
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  entries.forEach(entry => {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(rootDir, fullPath).replace(/\\/g, '/');
    if (entry.isDirectory()) {
      // start a new page for each top‑level folder for readability
      if (relPath.split('/').length === 1) {
        addPage();
        writeHeader('Directory: ' + relPath);
      }
      walk(fullPath);
    } else if (entry.isFile()) {
      // Read only text based files; skip binary large files (e.g., .png, .jpg, .pdf, .mp4)
      const binaryExts = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.mp4', '.webm'];
      const ext = path.extname(entry.name).toLowerCase();
      if (binaryExts.includes(ext)) {
        // Mention binary file existence
        writeHeader('File: ' + relPath + ' (binary – omitted)');
        return;
      }
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        writeFileContent(relPath, content);
      } catch (e) {
        writeHeader('File: ' + relPath + ' (unreadable)');
      }
    }
  });
}

addPage();
writeHeader('WellnessOS Project Documentation');
writeHeader('Generated on: ' + new Date().toISOString());

doc.moveDown(1);
walk(rootDir);

doc.end();

stream.on('finish', () => {
  console.log('PDF generated at', outputPath);
});
