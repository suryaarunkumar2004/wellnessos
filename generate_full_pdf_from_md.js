const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const readline = require('readline');

const markdownPath = path.join(__dirname, 'project_documentation.md');
const outputPdf = path.join(__dirname, 'wellnessos_full.pdf');

const doc = new PDFDocument({ autoFirstPage: false, margin: 30 });
const stream = fs.createWriteStream(outputPdf);

doc.pipe(stream);

doc.addPage();

doc.fontSize(14).font('Helvetica-Bold');

doc.text('WellnessOS Project Documentation', { align: 'center' });

doc.moveDown(1);

doc.fontSize(10).font('Courier');

const rl = readline.createInterface({
  input: fs.createReadStream(markdownPath, { encoding: 'utf8' })
});

let lineCount = 0;
rl.on('line', line => {
  lineCount++;
  // Add a new page if near bottom
  if (doc.y > doc.page.height - 40) {
    doc.addPage();
  }
  // Write line number for reference (optional)
  doc.text(`${lineCount}: ${line}`);
});

rl.on('close', () => {
  doc.end();
  console.log('PDF generation completed. Total lines:', lineCount);
});
