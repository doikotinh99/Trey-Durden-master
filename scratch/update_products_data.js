const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'js', 'products-data.js');
let content = fs.readFileSync(dataPath, 'utf8');

// Replace Blue Flame vendor
content = content.replace(
  /"name": "Blue Flame Heating & Cooling"/g,
  '"name": "Best Comfort Heating & Cooling"'
);
content = content.replace(
  /"logo": "images\/logos\/blue_frame\.jpg"/g,
  '"logo": "images/best-comfort-logo.svg"'
);

// Replace Trey Durden vendor names in products data
content = content.replace(
  /"name": "Trey Durden HVAC • Plumbing"/g,
  '"name": "Best Comfort Heating & Cooling"'
);
content = content.replace(
  /"logo": "images\/logos\/td\.jpg"/g,
  '"logo": "images/best-comfort-logo.svg"'
);

fs.writeFileSync(dataPath, content, 'utf8');
console.log('Successfully updated js/products-data.js');
