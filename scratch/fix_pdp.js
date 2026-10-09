const fs = require('fs');
const path = require('path');

const pdpPath = path.join(__dirname, '..', 'product-detail.html');
let html = fs.readFileSync(pdpPath, 'utf8');

// 1. Dealer logo & name
html = html.replace(
  /<div class="pdp-dealer-logo-box">\s*<img src="images\/logos\/td\.jpg" alt="Trey Durden HVAC Logo">\s*<\/div>\s*<div class="pdp-dealer-info">\s*<div class="pdp-dealer-name">\s*<span>Trey Durden HVAC &amp; Plumbing<\/span>/,
  `<div class="pdp-dealer-logo-box">
              <img src="images/best-comfort-logo.svg" alt="Best Comfort Heating &amp; Cooling Logo">
            </div>
            <div class="pdp-dealer-info">
              <div class="pdp-dealer-name">
                <span>Best Comfort Heating &amp; Cooling</span>`
);

html = html.replace(
  '<span class="pdp-dealer-badge-sub">National HVAC Consulting &amp; Brokerage</span>',
  '<span class="pdp-dealer-badge-sub">Premier Factory Authorized Carrier Dealer</span>'
);

// 2. Dispatch link
html = html.replace(
  /<a href="tel:6303617434" class="pdp-dispatch-link">[\s\S]*?Have questions\? Call Trey Durden:[\s\S]*?\(630\) 361-7434[\s\S]*?<\/a>/,
  `<a href="tel:7732494733" class="pdp-dispatch-link">
            <svg class="svg-icon" style="width:15px;height:15px;color:var(--cyan);" aria-hidden="true"><use href="#icon-phone"></use></svg>
            <span>Have questions? Call Best Comfort: <strong class="pdp-mono" style="color:var(--text-white);">(773) 249-4733</strong></span>
          </a>`
);

// 3. Turnkey section header
html = html.replace(
  /<div class="kicker" style="color:var\(--cyan\);">Standard Installation Protocol<\/div>\s*<h2 style="color:var\(--text-white\);"><span class="heading-phrase">What's Included in<\/span> <span class="heading-phrase nowrap-phrase">Every Turnkey HVAC Installation<\/span><\/h2>\s*<p id="pdpProtocolVendorDesc" style="color:var\(--text-muted\);">Every system installed by Trey Durden includes municipal permits, factory commissioning, and comprehensive warranties\.<\/p>/,
  `<div class="kicker" style="color:var(--bc-coral, #d82d4b); font-weight:800; text-transform:uppercase; letter-spacing:0.08em; font-size:0.85rem; margin-bottom:0.5rem;">Standard Installation Protocol</div>
        <h2 style="color:#0b1a2d; font-weight:850; font-size:2.1rem; letter-spacing:-0.02em;"><span class="heading-phrase">What's Included in</span> <span class="heading-phrase nowrap-phrase">Every Turnkey HVAC Installation</span></h2>
        <p id="pdpProtocolVendorDesc" style="color:#64748b; font-size:1rem; max-width:680px; margin:0.75rem auto 0; line-height:1.6;">Every system installed by Best Comfort Heating &amp; Cooling includes municipal permits, factory commissioning, and comprehensive warranties.</p>`
);

// 4. Card h4 elements - replace white color
html = html.replace(
  /<h4 style="margin-bottom:0\.5rem; color:var\(--text-white\);">Custom Sheet Metal Transit<\/h4>/g,
  '<h4 style="margin-bottom:0.5rem; color:#0b1a2d; font-weight:800; font-size:1.05rem;">Custom Sheet Metal Transit</h4>'
);

html = html.replace(
  /<h4 style="margin-bottom:0\.5rem; color:var\(--text-white\);">Nitrogen Purge Line Set<\/h4>/g,
  '<h4 style="margin-bottom:0.5rem; color:#0b1a2d; font-weight:800; font-size:1.05rem;">Nitrogen Purge Line Set</h4>'
);

html = html.replace(
  /<h4 style="margin-bottom:0\.5rem; color:var\(--text-white\);">A2L Leak Detection Interlock<\/h4>/g,
  '<h4 style="margin-bottom:0.5rem; color:#0b1a2d; font-weight:800; font-size:1.05rem;">A2L Leak Detection Interlock</h4>'
);

html = html.replace(
  /<h4 style="margin-bottom:0\.5rem; color:var\(--text-white\);">Combustion Calibration<\/h4>/g,
  '<h4 style="margin-bottom:0.5rem; color:#0b1a2d; font-weight:800; font-size:1.05rem;">Combustion Calibration</h4>'
);

// 5. Modal descriptions
html = html.replace(
  /Trey Durden HVAC &amp; Plumbing &bull; National Consulting District/g,
  'Best Comfort Heating &amp; Cooling &bull; Greater Chicago Mechanical District'
);

html = html.replace(
  /Trey Durden Brokerage System/g,
  'Best Comfort Dispatch System'
);

html = html.replace(
  /Contact Trey Durden for cascading boiler configurations/g,
  'Contact Best Comfort for cascading boiler configurations'
);

fs.writeFileSync(pdpPath, html, 'utf8');
console.log('Fixed product-detail.html successfully');
