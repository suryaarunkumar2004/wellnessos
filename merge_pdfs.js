const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');

const outDir = path.join(__dirname, 'generated_pdfs');
const finalPdfPath = path.join(__dirname, 'wellnessos_full.pdf');

async function mergePdfs() {
  const pdfDocs = [];
  const files = fs.readdirSync(outDir).filter(f => f.endsWith('.pdf'));
  for (const file of files) {
    const filePath = path.join(outDir, file);
    const data = fs.readFileSync(filePath);
    const doc = await PDFDocument.load(data);
    pdfDocs.push(doc);
  }

  if (pdfDocs.length === 0) {
    console.log('No section PDFs found to merge.');
    return;
  }

  const mergedPdf = await PDFDocument.create();
  for (const pdf of pdfDocs) {
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach(page => mergedPdf.addPage(page));
  }

  const mergedBytes = await mergedPdf.save();
  fs.writeFileSync(finalPdfPath, mergedBytes);
  console.log('Merged PDF created at', finalPdfPath);
}

mergePdfs();
