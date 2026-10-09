const fs = require('fs');

const files = ['index.html', 'about.html', 'services.html', 'products.html', 'contact.html', 'product-detail.html'];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/href="css\/style\.css(?:\?v=[\d\.]+)?/g, 'href="css/style.css?v=10.3');
  content = content.replace(/href="css\/homepage\.css(?:\?v=[\d\.]+)?/g, 'href="css/homepage.css?v=10.3');
  content = content.replace(/href="css\/product-detail\.css(?:\?v=[\d\.]+)?/g, 'href="css/product-detail.css?v=10.3');
  content = content.replace(/src="js\/products\.js(?:\?v=[\d\.]+)?/g, 'src="js/products.js?v=10.3');
  content = content.replace(/src="js\/homepage-exact\.js(?:\?v=[\d\.]+)?/g, 'src="js/homepage-exact.js?v=10.3');
  fs.writeFileSync(f, content, 'utf8');
  console.log(`Updated cache buster in ${f}`);
});
