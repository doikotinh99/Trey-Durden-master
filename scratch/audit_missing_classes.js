const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const exactCss = fs.readFileSync('css/homepage-exact.css', 'utf8');
const currentCss = fs.readFileSync('css/variables.css', 'utf8') +
  fs.readFileSync('css/header-footer.css', 'utf8') +
  fs.readFileSync('css/components.css', 'utf8') +
  fs.readFileSync('css/homepage.css', 'utf8');

const classMatches = [...indexHtml.matchAll(/class="([^"]+)"/g)];
const classes = new Set();
classMatches.forEach(m => {
  m[1].split(/\s+/).forEach(c => {
    if (c) classes.add(c);
  });
});

console.log('Total unique classes in index.html:', classes.size);

const missingInCurrent = [];
const inExact = [];

classes.forEach(c => {
  const inCur = currentCss.includes('.' + c);
  const inEx = exactCss.includes('.' + c);
  if (!inCur && inEx) {
    missingInCurrent.push(c);
  }
});

console.log('Classes styled in homepage-exact.css but MISSING in current CSS loaded by index.html:');
console.log(missingInCurrent);
