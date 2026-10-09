const fs = require('fs');

const html = fs.readFileSync('contact.html', 'utf8');
const sprite = fs.readFileSync('js/icons.js', 'utf8');

const uses = [...html.matchAll(/#icon-([a-zA-Z0-9-]+)/g)].map(m => 'icon-' + m[1]);
const unique = [...new Set(uses)];

console.log('--- ICONS IN contact.html ---');
unique.forEach(id => {
  const exists = sprite.includes(`id="${id}"`);
  console.log(id, ':', exists ? 'EXISTS' : '>>> MISSING <<<');
});
