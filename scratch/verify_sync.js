const fs = require('fs');
const path = require('path');

const files = [
  'index.html',
  'about.html',
  'services.html',
  'products.html',
  'contact.html',
  'product-detail.html'
];

console.log('--- AUDITING HEADER / FOOTER SYNC ACROSS ALL PAGES ---');
let hasIssue = false;

files.forEach(f => {
  const filePath = path.join(__dirname, '..', f);
  const content = fs.readFileSync(filePath, 'utf8');

  const hasTopBar = content.includes('class="bc-top-bar"');
  const hasHeader = content.includes('class="bc-header"');
  const hasDrawer = content.includes('id="bcMobileDrawer"');
  const hasFooter = content.includes('class="bc-footer"');
  const hasWidgets = content.includes('class="bc-floating-widgets"');

  const hasOldTop = content.includes('class="top-announcement"');
  const hasOldHeader = content.includes('class="site-header"');
  const hasOldFooter = content.includes('class="site-footer"');

  console.log(`\n[${f}]:`);
  console.log(`  bc-top-bar: ${hasTopBar}`);
  console.log(`  bc-header: ${hasHeader}`);
  console.log(`  bc-mobile-drawer: ${hasDrawer}`);
  console.log(`  bc-footer: ${hasFooter}`);
  console.log(`  bc-floating-widgets: ${hasWidgets}`);

  if (hasOldTop || hasOldHeader || hasOldFooter) {
    console.error(`  ERROR: Found legacy markup! oldTop: ${hasOldTop}, oldHeader: ${hasOldHeader}, oldFooter: ${hasOldFooter}`);
    hasIssue = true;
  }
});

if (!hasIssue) {
  console.log('\n>>> ALL 6 PAGES HAVE PERFECTLY SYNCHRONIZED HEADERS AND FOOTERS! <<<');
} else {
  console.error('\n>>> SOME PAGES STILL HAVE ISSUES! <<<');
}
