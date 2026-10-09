const fs = require('fs');

['index.html', 'about.html', 'services.html', 'products.html', 'contact.html', 'product-detail.html'].forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const links = [...content.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)].map(m => m[1]);
  console.log(f, ':', links.join(', '));
});
