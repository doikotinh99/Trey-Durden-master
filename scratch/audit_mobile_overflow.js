const fs = require('fs');

const cssContent = fs.readFileSync('css/homepage.css', 'utf8') + '\n' + fs.readFileSync('css/style.css', 'utf8') + '\n' + fs.readFileSync('css/components.css', 'utf8') + '\n' + fs.readFileSync('css/header-footer.css', 'utf8');

// Find all fixed widths in homepage.css
const lines = fs.readFileSync('css/homepage.css', 'utf8').split('\n');
console.log('--- Fixed widths in homepage.css ---');
lines.forEach((line, idx) => {
  if (/(?:width|min-width|max-width)\s*:\s*\d+px/.test(line)) {
    const match = line.match(/(?:width|min-width|max-width)\s*:\s*(\d+)px/);
    if (match && parseInt(match[1]) > 350) {
      console.log(`Line ${idx + 1}: ${line.trim()}`);
    }
  }
});
