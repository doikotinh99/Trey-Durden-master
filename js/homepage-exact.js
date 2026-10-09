// ==========================================================================
// BEST COMFORT HEATING & COOLING - HOMEPAGE INTERACTIONS
// Interactive Diagnostic Triage, Accordions, Smooth Scroll & Navigation
// ==========================================================================

document.addEventListener('DOMContentLoaded', function () {
  // 1. Interactive Diagnostic Triage Switching
  const diagData = {
    heating: {
      text: "Start with furnace, boiler or heat-pump diagnostics. We service gas and electric heating systems.",
      linkText: "Go to heating services →",
      linkHref: "services.html#heating"
    },
    cooling: {
      text: "Diagnose central AC or heat-pump cooling issues: lukewarm airflow, frozen coils, or compressor failures.",
      linkText: "Go to cooling services →",
      linkHref: "services.html#cooling"
    },
    maintenance: {
      text: "Pre-season clean-and-check tune-ups to ensure maximum equipment efficiency and reliability before peak weather.",
      linkText: "Explore seasonal maintenance →",
      linkHref: "services.html#maintenance"
    },
    comfort: {
      text: "Address dry winter air, summer humidity, dust, and uneven room temperatures with whole-home IAQ systems.",
      linkText: "Explore indoor air comfort →",
      linkHref: "services.html#indoor-air-quality"
    }
  };

  const diagCardText = document.getElementById('diagActiveText');
  const diagCardLink = document.getElementById('diagActiveLink');
  const diagButtons = document.querySelectorAll('.bc-diag-btn-item');

  if (diagButtons.length && diagCardText && diagCardLink) {
    diagButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        const type = this.getAttribute('data-diag');
        if (diagData[type]) {
          diagCardText.textContent = diagData[type].text;
          diagCardLink.textContent = diagData[type].linkText;
          diagCardLink.setAttribute('href', diagData[type].linkHref);

          // Update indicator styles
          diagButtons.forEach(b => {
            const plus = b.querySelector('.bc-diag-btn-plus');
            if (plus) plus.textContent = '+';
          });
          const activePlus = this.querySelector('.bc-diag-btn-plus');
          if (activePlus) activePlus.textContent = '✓';
        }
      });
    });
  }

  // 2. "Why Best Comfort" Accordions
  const whyCards = document.querySelectorAll('.bc-why-accordions .bc-acc-card');
  whyCards.forEach(card => {
    const header = card.querySelector('.bc-acc-header');
    if (header) {
      header.addEventListener('click', function () {
        const isOpen = card.classList.contains('is-open');
        // Close all
        whyCards.forEach(c => {
          c.classList.remove('is-open');
          const toggle = c.querySelector('.bc-acc-toggle-icon');
          if (toggle) toggle.textContent = '+';
        });

        // If wasn't open, open this one
        if (!isOpen) {
          card.classList.add('is-open');
          const toggle = card.querySelector('.bc-acc-toggle-icon');
          if (toggle) toggle.textContent = '−';
        }
      });
    }
  });

  // 3. FAQ Accordions
  const faqCards = document.querySelectorAll('.bc-faq-accordions .bc-acc-card');
  faqCards.forEach(card => {
    const header = card.querySelector('.bc-acc-header');
    if (header) {
      header.addEventListener('click', function () {
        const isOpen = card.classList.contains('is-open');
        faqCards.forEach(c => {
          c.classList.remove('is-open');
          const toggle = c.querySelector('.bc-acc-toggle-icon');
          if (toggle) toggle.textContent = '+';
        });

        if (!isOpen) {
          card.classList.add('is-open');
          const toggle = card.querySelector('.bc-acc-toggle-icon');
          if (toggle) toggle.textContent = '−';
        }
      });
    }
  });

  // 4. Scroll to Top Button
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 5. Mobile Navigation Drawer Toggle
  const mobileToggle = document.getElementById('bcMobileToggle');
  const mobileDrawer = document.getElementById('bcMobileDrawer');
  const mobileClose = document.getElementById('bcMobileClose');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', function () {
      mobileDrawer.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (mobileClose && mobileDrawer) {
    mobileClose.addEventListener('click', function () {
      mobileDrawer.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  }
});
