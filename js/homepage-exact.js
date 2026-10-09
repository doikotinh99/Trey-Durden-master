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
  const scrollTopBtn = document.getElementById('bcScrollTop') || document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 5. Mobile Navigation Drawer Toggle
  const mobileToggle = document.getElementById('bcMobileToggle') || document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('bcMobileDrawer') || document.getElementById('navMenu');
  const mobileClose = document.getElementById('bcMobileClose') || document.getElementById('mobileNavClose');

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

  // Close drawer when clicking backdrop outside drawer content
  if (mobileDrawer) {
    mobileDrawer.addEventListener('click', function (e) {
      if (e.target === mobileDrawer) {
        mobileDrawer.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  }

  // 6. RockAuto-Style Service Directory Tree Accordion Handler (Level 1: Main Category Accordions)
  const treeNodeButtons = document.querySelectorAll('.tree-node-btn');
  treeNodeButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const item = btn.closest('.tree-node-item');
      if (!item) return;
      const tree = item.closest('.directory-accordion-tree') || document;
      const wasOpen = item.classList.contains('is-open');

      // Close all accordion items in this tree
      const allItems = tree.querySelectorAll('.tree-node-item');
      allItems.forEach(otherItem => {
        otherItem.classList.remove('is-open');
        const otherBtn = otherItem.querySelector('.tree-node-btn');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });

      // If it wasn't open, open it now (only 1 open at a time)
      if (!wasOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 6b. Multi-Level Nested Sub-Accordion Handler (Level 2: Counties, Equipment & Brand Groups)
  const nestedGroupButtons = document.querySelectorAll('.nested-group-btn');
  nestedGroupButtons.forEach(subBtn => {
    subBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      const subItem = subBtn.closest('.nested-group-item');
      if (!subItem) return;
      const container = subItem.closest('.tree-nested-accordion') || subItem.parentElement;
      const wasOpen = subItem.classList.contains('is-open');

      if (wasOpen) {
        subItem.classList.remove('is-open');
        subBtn.setAttribute('aria-expanded', 'false');
      } else {
        // Close siblings within the same parent category for a neat, focused view
        const siblings = container.querySelectorAll('.nested-group-item');
        siblings.forEach(sib => {
          sib.classList.remove('is-open');
          const sibBtn = sib.querySelector('.nested-group-btn');
          if (sibBtn) sibBtn.setAttribute('aria-expanded', 'false');
        });
        subItem.classList.add('is-open');
        subBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 7. Hero Upper Section Action Hub Tab Switcher
  window.switchHeroTab = function (tab) {
    const btnServices = document.getElementById('tabBtnServices');
    const btnStatements = document.getElementById('tabBtnStatements');
    const panelServices = document.getElementById('panelServices');
    const panelStatements = document.getElementById('panelStatements');
    if (!btnServices || !btnStatements || !panelServices || !panelStatements) return;

    if (tab === 'services') {
      btnServices.classList.add('active');
      btnServices.setAttribute('aria-selected', 'true');
      btnStatements.classList.remove('active');
      btnStatements.setAttribute('aria-selected', 'false');
      panelServices.style.display = 'block';
      panelStatements.style.display = 'none';
    } else {
      btnStatements.classList.add('active');
      btnStatements.setAttribute('aria-selected', 'true');
      btnServices.classList.remove('active');
      btnServices.setAttribute('aria-selected', 'false');
      panelStatements.style.display = 'block';
      panelServices.style.display = 'none';
    }
  };
});
