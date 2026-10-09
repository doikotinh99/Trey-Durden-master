const fs = require('fs');
const exact = fs.readFileSync('css/homepage-exact.css', 'utf8');
const hp = fs.readFileSync('css/homepage.css', 'utf8');

function getCommentHeaders(str) {
  const matches = [...str.matchAll(/\/\* ─+\s*([\d\w\.\s\(\)\-\+]+)\s*─+\s*\*\//g)];
  return matches.map(m => m[1].trim());
}

console.log('--- HEADERS IN homepage-exact.css ---');
console.log(getCommentHeaders(exact));

console.log('\n--- HEADERS IN homepage.css ---');
console.log(getCommentHeaders(hp));
