const fs = require('fs');
const path = require('path');

const pdpPath = path.join(__dirname, '..', 'product-detail.html');
let content = fs.readFileSync(pdpPath, 'utf8');

const headerReplacement = `  <!-- =========================================================================
       1. TOP ANNOUNCEMENT / EMERGENCY BAR (Coral Red Banner)
       ========================================================================= -->
  <div class="bc-top-bar">
    <div class="container">
      <span class="bc-top-bar-content">
        24/7 Emergency HVAC Service &bull; Chicago <a href="tel:7732494733" class="bc-top-phone-link">(773) 249-4733</a>
      </span>
    </div>
  </div>

  <!-- =========================================================================
       2. HEADER / NAVIGATION (Crisp Pure White)
       ========================================================================= -->
  <header class="bc-header">
    <div class="container bc-header-container">
      
      <!-- Brand Logo -->
      <a href="index.html" class="bc-brand-logo" aria-label="Best Comfort Heating &amp; Cooling Home">
        <img src="images/best-comfort-logo.svg" alt="Best Comfort Heating &amp; Cooling Logo" width="52" height="52">
      </a>

      <!-- Desktop Nav Menu -->
      <nav class="bc-nav-menu">
        <a href="index.html" class="bc-nav-link">Home</a>
        <a href="services.html" class="bc-nav-link">Services</a>
        <a href="products.html" class="bc-nav-link active">Comfort Options</a>
        <a href="about.html" class="bc-nav-link">About</a>
        <a href="services.html#service-areas" class="bc-nav-link">Service Areas</a>
        <a href="about.html#faq" class="bc-nav-link">FAQ</a>
        <a href="contact.html" class="bc-nav-link">Contact</a>
      </nav>

      <!-- Header Actions -->
      <div class="bc-header-actions">
        <a href="tel:7732494733" class="bc-header-phone">
          <svg class="bc-header-phone-icon" viewBox="0 0 24 24"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.21 2.2z"/></svg>
          <span>Call (773) 249-4733</span>
        </a>
        <a href="contact.html" class="bc-btn-schedule">Schedule Service</a>
        <button class="bc-mobile-toggle" id="bcMobileToggle" aria-label="Toggle Navigation">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
      </div>

    </div>
  </header>

  <!-- Mobile Drawer Menu -->
  <div class="bc-mobile-drawer" id="bcMobileDrawer">
    <div class="bc-drawer-content">
      <div class="bc-drawer-header">
        <img src="images/best-comfort-logo.svg" alt="Best Comfort Heating &amp; Cooling" height="42">
        <button class="bc-drawer-close" id="bcMobileClose">&times;</button>
      </div>
      <div class="bc-drawer-links">
        <a href="index.html">Home</a>
        <a href="services.html">Services</a>
        <a href="products.html" class="active">Comfort Options</a>
        <a href="about.html">About</a>
        <a href="services.html#service-areas">Service Areas</a>
        <a href="about.html#faq">FAQ</a>
        <a href="contact.html">Contact</a>
      </div>
      <div style="margin-top:auto; display:flex; flex-direction:column; gap:12px;">
        <a href="tel:7732494733" class="bc-btn-outline" style="text-align:center;">Call (773) 249-4733</a>
        <a href="contact.html" class="bc-btn-schedule" style="text-align:center;">Schedule Service</a>
      </div>
    </div>
  </div>`;

const footerReplacement = `  <!-- =========================================================================
       FOOTER
       ========================================================================= -->
  <footer class="bc-footer">
    <div class="container">
      <div class="bc-footer-grid">
        
        <!-- Brand & Mission Column -->
        <div class="bc-footer-logo-wrap">
          <img src="images/best-comfort-logo.svg" alt="Best Comfort Heating &amp; Cooling Logo" width="64" height="64">
          <p class="bc-footer-desc">
            Heating, cooling, boiler, indoor air comfort, maintenance and equipment support for homes and businesses across Chicagoland.
          </p>
          <a href="contact.html" class="bc-btn-schedule" style="font-size:0.88rem; padding:9px 20px;">Schedule Service</a>
          
          <div class="bc-footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noopener" class="bc-social-btn" aria-label="Facebook">
              <svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener" class="bc-social-btn" aria-label="Instagram">
              <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="6" r="1.5"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener" class="bc-social-btn" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener" class="bc-social-btn" aria-label="YouTube">
              <svg viewBox="0 0 24 24"><path d="M21.58 7.19a2.5 2.5 0 00-1.76-1.77C18.26 5 12 5 12 5s-6.26 0-7.82.42A2.5 2.5 0 002.42 7.2 26.54 26.54 0 002 12a26.54 26.54 0 00.42 4.81 2.5 2.5 0 001.76 1.77C5.74 19 12 19 12 19s6.26 0 7.82-.42a2.5 2.5 0 001.76-1.77A26.54 26.54 0 0022 12a26.54 26.54 0 00-.42-4.81zM10 15V9l5.2 3L10 15z"/></svg>
            </a>
          </div>
        </div>

        <!-- Column 2: Services -->
        <div>
          <h4 class="bc-footer-heading">Services</h4>
          <ul class="bc-footer-links">
            <li><a href="services.html#heating">Heating Services</a></li>
            <li><a href="services.html#cooling">Cooling Services</a></li>
            <li><a href="services.html#indoor-air-quality">Indoor Air Quality</a></li>
            <li><a href="tel:7732494733">24/7 Emergency</a></li>
            <li><a href="services.html#maintenance">Maintenance</a></li>
          </ul>
        </div>

        <!-- Column 3: Company -->
        <div>
          <h4 class="bc-footer-heading">Company</h4>
          <ul class="bc-footer-links">
            <li><a href="about.html">About Us</a></li>
            <li><a href="products.html">Products</a></li>
            <li><a href="contact.html">Financing</a></li>
            <li><a href="services.html#service-areas">Service Areas</a></li>
            <li><a href="about.html#faq">FAQs</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>

        <!-- Column 4: Contact -->
        <div>
          <h4 class="bc-footer-heading">Contact</h4>
          <p class="bc-footer-contact-item">
            Phone: <a href="tel:7732494733"><strong>(773) 249-4733</strong></a>
          </p>
          <p class="bc-footer-contact-item">
            Email: <a href="mailto:support@bestcomforthvac.com">support@bestcomforthvac.com</a>
          </p>
          <p class="bc-footer-contact-item">
            8729 S Commercial Ave, Chicago, IL 60617
          </p>
          <p class="bc-footer-contact-item" style="color:var(--bc-coral); font-weight:750; margin-top:14px;">
            Emergency service: 24 hours / 7 days
          </p>
        </div>

      </div>

      <!-- Bottom Copyright Bar -->
      <div class="bc-footer-bottom">
        <div>&copy; 2026 Best Comfort HVAC. All rights reserved.</div>
        <div>Residential &bull; Commercial &bull; Industrial HVAC service</div>
      </div>
    </div>
  </footer>

  <!-- =========================================================================
       FLOATING WIDGETS (Need Help? & Scroll to Top)
       ========================================================================= -->
  <div class="bc-floating-widgets">
    <a href="tel:7732494733" class="bc-floating-help-btn" title="Need Help? Call (773) 249-4733">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>
      <span>Need Help?</span>
    </a>
    <button class="bc-scroll-top-btn" id="bcScrollTop" title="Scroll to top">&uarr;</button>
  </div>

  <script src="js/icons.js"></script>
  <script src="js/main.js"></script>`;

// Match header: from <!-- Top Announcement Bar --> to </header>
const headerRegex = /<!-- Top Announcement Bar -->[\s\S]*?<\/header>/;
if (headerRegex.test(content)) {
  content = content.replace(headerRegex, headerReplacement.trim());
  console.log('Header successfully replaced in product-detail.html');
} else {
  console.error('Header regex did not match in product-detail.html');
}

// Match footer: from <!-- Footer --> to <script src="js/main.js.*?><\/script>
const footerRegex = /<!-- Footer -->[\s\S]*?<script src="js\/main\.js[^"]*"><\/script>/;
if (footerRegex.test(content)) {
  content = content.replace(footerRegex, footerReplacement.trim());
  console.log('Footer successfully replaced in product-detail.html');
} else {
  console.error('Footer regex did not match in product-detail.html');
}

fs.writeFileSync(pdpPath, content, 'utf8');
console.log('product-detail.html saved successfully.');
