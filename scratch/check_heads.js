const fs = require('fs');
['about.html', 'services.html', 'products.html', 'contact.html', 'product-detail.html', 'index.html'].forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const headMatch = content.match(/<head[\s\S]*?<\/head>/i);
  if (!headMatch) return;
  const links = headMatch[0].match(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi) || [];
  console.log(file + ':');
  links.forEach(l => console.log('  ' + l));
});
