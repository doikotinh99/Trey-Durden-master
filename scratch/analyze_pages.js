const fs = require('fs');

const pages = ['about.html', 'contact.html', 'services.html', 'products.html', 'product-detail.html'];

pages.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  console.log(`\n=================== ${file} (${content.length} bytes) ===================`);
  
  // Find main headings
  const headings = [...content.matchAll(/<h([1-3])[^>]*>(.*?)<\/h\1>/gi)].map(m => m[2].replace(/<[^>]+>/g, '').trim());
  console.log('Headings:', headings.slice(0, 8));

  // Find sections
  const sectionMatches = [...content.matchAll(/<section([^>]*)>/gi)].map(m => m[1]);
  console.log('Sections count:', sectionMatches.length);
});
