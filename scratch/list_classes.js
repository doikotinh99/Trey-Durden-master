const fs = require('fs');

const files = ['about.html', 'contact.html', 'services.html', 'products.html', 'product-detail.html'];
const allClasses = new Set();
const fileClasses = {};

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  fileClasses[f] = new Set();
  const matches = content.matchAll(/class=[\"']([^\"']+)[\"']/g);
  for (const m of matches) {
    const list = m[1].split(/\s+/).filter(Boolean);
    list.forEach(c => {
      allClasses.add(c);
      fileClasses[f].add(c);
    });
  }
});

console.log('Total unique classes in other pages:', allClasses.size);
console.log('Class list:');
console.log([...allClasses].sort().join(', '));
