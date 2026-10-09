const fs = require('fs');

const sprite = fs.readFileSync('js/icons.js', 'utf8');
const files = ['index.html', 'about.html', 'services.html', 'products.html', 'contact.html', 'product-detail.html'];

let allGood = true;

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const uses = [...content.matchAll(/#icon-([a-zA-Z0-9-]+)/g)].map(m => 'icon-' + m[1]);
  const unique = [...new Set(uses)];
  const missing = unique.filter(id => !sprite.includes(`id="${id}"`));
  if (missing.length) {
    console.log(`[${f}] MISSING:`, missing);
    allGood = false;
  } else {
    console.log(`[${f}] All ${unique.length} icons OK.`);
  }
});

if (allGood) console.log('\n>>> ALL ICONS IN ALL PAGES RESOLVE SUCCESSFULLY! <<<');
