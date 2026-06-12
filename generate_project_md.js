const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '.');
const outputPath = path.join(rootDir, 'project_documentation.md');

function getLanguage(ext) {
  switch (ext) {
    case '.js':
    case '.jsx':
      return 'javascript';
    case '.css':
      return 'css';
    case '.json':
      return 'json';
    case '.html':
      return 'html';
    case '.md':
      return 'markdown';
    default:
      return '';
  }
}

function escapeBackticks(content) {
  // Escape any triple backticks inside code blocks
  return content.replace(/```/g, '\\`\\`\\`');
}

let md = '';
md += '# WellnessOS Project Documentation\n\n';
md += 'Generated on ' + new Date().toISOString() + '\n\n';

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  entries.forEach(entry => {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(rootDir, fullPath).replace(/\\/g, '/');
    if (entry.isDirectory()) {
      md += `## Directory: ${relPath}\n\n`;
      walk(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      const lang = getLanguage(ext);
      const content = fs.readFileSync(fullPath, 'utf8');
      md += `### File: ${relPath}\n\n`;
      if (lang) {
        md += "```" + lang + "\n";
        md += escapeBackticks(content);
        md += "\n```\n\n";
      } else if (['.png', '.jpg', '.jpeg', '.gif', '.svg'].includes(ext)) {
        const data = fs.readFileSync(fullPath).toString('base64');
        const mime = ext === '.svg' ? 'image/svg+xml' : `image/${ext.slice(1)}`;
        md += `![${entry.name}](data:${mime};base64,${data})\n\n`;
      } else {
        md += "```\n" + escapeBackticks(content) + "\n```\n\n";
      }
    }
  });
}

walk(rootDir);

fs.writeFileSync(outputPath, md, 'utf8');
console.log('Documentation generated at', outputPath);
