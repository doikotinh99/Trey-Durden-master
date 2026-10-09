const fs = require('fs');

['about.html', 'services.html', 'products.html', 'contact.html', 'product-detail.html'].forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  console.log(`\n=================== ${file} ===================`);
  
  // Extract all main elements inside <main> or body
  const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) return;
  const body = bodyMatch[1];
  
  // Look for section tags or main divisions
  const matches = [...body.matchAll(/<(section|div)[^>]+class=[\"']([^\"']*(?:hero|section|grid|about|service|product|contact|form)[^\"']*)[\"'][^>]*>/gi)];
  matches.slice(0, 10).forEach(m => {
    console.log(`Tag: <${m[1]} class="${m[2]}">`);
  });
});
