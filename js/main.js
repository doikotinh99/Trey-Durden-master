/**
 * Trey Durden - Thermal Applications Engineer & HVAC Specialist
 * Interactive Vanilla JS
 */

document.addEventListener('DOMContentLoaded', () => {
  // Best Comfort Mobile Drawer & Global Handlers
  const bcMobileToggle = document.getElementById('bcMobileToggle');
  const bcMobileDrawer = document.getElementById('bcMobileDrawer');
  const bcMobileClose = document.getElementById('bcMobileClose');
  const bcScrollTop = document.getElementById('bcScrollTop') || document.getElementById('scrollTopBtn');

  if (bcMobileToggle && bcMobileDrawer) {
    bcMobileToggle.addEventListener('click', () => {
      bcMobileDrawer.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    });
  }
  if (bcMobileClose && bcMobileDrawer) {
    bcMobileClose.addEventListener('click', () => {
      bcMobileDrawer.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  }
  if (bcMobileDrawer) {
    bcMobileDrawer.addEventListener('click', (e) => {
      if (e.target === bcMobileDrawer) {
        bcMobileDrawer.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  }
  if (bcScrollTop) {
    bcScrollTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Best Comfort Accordions
  document.querySelectorAll('.bc-acc-header').forEach(header => {
    header.addEventListener('click', function() {
      const card = this.closest('.bc-acc-card');
      if (card) {
        const group = card.closest('.bc-accordion-group, .bc-why-accordions, .bc-faq-accordions');
        const isOpen = card.classList.contains('is-open');
        if (group) {
          group.querySelectorAll('.bc-acc-card').forEach(c => {
            c.classList.remove('is-open');
            const t = c.querySelector('.bc-acc-toggle-icon');
            if (t) t.textContent = '+';
          });
        }
        if (!isOpen) {
          card.classList.add('is-open');
          const t = card.querySelector('.bc-acc-toggle-icon');
          if (t) t.textContent = '−';
        }
      }
    });
  });

  // 1. Mobile Navigation Toggle (Full-Screen 100vw / 100vh Modal Popup)
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const mobileNavClose = document.getElementById('mobileNavClose');
  const navMenu = document.getElementById('navMenu');

  if (navMenu) {
    const closeMenu = () => {
      navMenu.classList.remove('show');
      document.body.style.overflow = '';
      if (mobileNavToggle) {
        mobileNavToggle.setAttribute('aria-expanded', 'false');
        mobileNavToggle.innerHTML = '<svg class="svg-icon" style="width:20px;height:20px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
      }
    };

    const openMenu = () => {
      navMenu.classList.add('show');
      document.body.style.overflow = 'hidden';
      if (mobileNavToggle) {
        mobileNavToggle.setAttribute('aria-expanded', 'true');
        mobileNavToggle.innerHTML = '<svg class="svg-icon" style="width:20px;height:20px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
      }
    };

    if (mobileNavToggle) {
      mobileNavToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (navMenu.classList.contains('show')) {
          closeMenu();
        } else {
          openMenu();
        }
      });
    }

    if (mobileNavClose) {
      mobileNavClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closeMenu();
      });
    }

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('show')) {
        if (!navMenu.contains(e.target) && (!mobileNavToggle || !mobileNavToggle.contains(e.target))) {
          closeMenu();
        }
      }
    });

    // Close when clicking any nav links (terminal links only)
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
          closeMenu();
        }
      });
    });

    // Mobile Hamburger Multi-Level Accordion Handlers
    const navAccordionBtn = navMenu.querySelector('.nav-accordion-btn');
    if (navAccordionBtn) {
      navAccordionBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const dropdown = navAccordionBtn.closest('.nav-item-dropdown');
        if (dropdown) {
          dropdown.classList.toggle('is-open');
          navAccordionBtn.classList.toggle('is-active');
        }
      });
    }

    // Mobile Hamburger Categories Toggle
    const menuCatButtons = navMenu.querySelectorAll('.menu-cat-btn');
    menuCatButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const block = btn.closest('.menu-cat-block');
        if (block) {
          const isOpen = block.classList.contains('is-open');
          // Close sibling blocks in mobile drawer for smooth single-accordion
          const siblings = block.parentElement.querySelectorAll('.menu-cat-block');
          siblings.forEach(s => {
            if (s !== block) s.classList.remove('is-open');
          });
          block.classList.toggle('is-open', !isOpen);
          btn.setAttribute('aria-expanded', String(!isOpen));
        }
      });
    });

    const navGroupHeaders = navMenu.querySelectorAll('.nav-group-header');
    navGroupHeaders.forEach(header => {
      header.addEventListener('click', (e) => {
        e.stopPropagation();
        const parentGroup = header.closest('.nav-service-group');
        if (parentGroup) {
          const wasOpen = parentGroup.classList.contains('is-open');
          if (window.innerWidth <= 992) {
            const siblingGroups = parentGroup.parentElement.querySelectorAll('.nav-service-group');
            siblingGroups.forEach(g => {
              if (g !== parentGroup) g.classList.remove('is-open');
            });
          }
          parentGroup.classList.toggle('is-open', !wasOpen);
        }
      });
    });
  }

  // 1.1 Desktop 3-Level Cascade Dropdown Controller
  // Fixes: "lỗi khi đưa chuột ra bị mất box k kịp chọn"
  // Features:
  // - Diagonal traversal protection: switching between pillars is debounced by 140ms so diagonal moves don't flicker.
  // - Dropdown close grace buffer: 350ms grace period on mouseleave prevents accidental closing.
  // - Flyout persistent hover: while inside .cascade-flyout, the flyout and its parent pillar stay 100% active.
  // - Click-to-Pin: on desktop, clicking a pillar header toggles/pins its flyout open for relaxed browsing.
  const servicesDropdown = document.getElementById('servicesDropdown');
  if (servicesDropdown) {
    const cascadeItems = servicesDropdown.querySelectorAll('.cascade-item');
    let closeTimer = null;
    let switchTimer = null;
    let activeItem = null;

    function openFlyout(item) {
      if (!item) return;
      cascadeItems.forEach(ci => {
        if (ci !== item) ci.classList.remove('is-flyout-open');
      });
      item.classList.add('is-flyout-open');
      activeItem = item;
    }

    function closeAllFlyouts() {
      cascadeItems.forEach(ci => ci.classList.remove('is-flyout-open'));
      activeItem = null;
    }

    // Keep entire dropdown open on enter
    servicesDropdown.addEventListener('mouseenter', () => {
      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }
      servicesDropdown.classList.add('is-open');
    });

    servicesDropdown.addEventListener('mouseleave', () => {
      if (switchTimer) {
        clearTimeout(switchTimer);
        switchTimer = null;
      }
      // 350ms grace period before closing dropdown
      closeTimer = setTimeout(() => {
        servicesDropdown.classList.remove('is-open');
        closeAllFlyouts();
      }, 350);
    });

    cascadeItems.forEach(item => {
      const flyout = item.querySelector('.cascade-flyout');
      const link = item.querySelector('.cascade-link');

      item.addEventListener('mouseenter', () => {
        if (closeTimer) {
          clearTimeout(closeTimer);
          closeTimer = null;
        }

        // If another item is already open, wait 140ms before switching.
        // This allows user to move diagonally from pillar to flyout without triggering sibling items!
        if (activeItem && activeItem !== item) {
          if (switchTimer) clearTimeout(switchTimer);
          switchTimer = setTimeout(() => {
            openFlyout(item);
          }, 140);
        } else {
          openFlyout(item);
        }
      });

      item.addEventListener('mouseleave', () => {
        if (switchTimer) {
          clearTimeout(switchTimer);
          switchTimer = null;
        }
      });

      if (flyout) {
        // Entering the flyout instantly cancels any switch or close timer
        flyout.addEventListener('mouseenter', () => {
          if (switchTimer) {
            clearTimeout(switchTimer);
            switchTimer = null;
          }
          if (closeTimer) {
            clearTimeout(closeTimer);
            closeTimer = null;
          }
          openFlyout(item);
        });
      }

      // Desktop & Touch: Click to Pin / Explore
      if (link) {
        link.addEventListener('click', (e) => {
          if (window.innerWidth >= 993) {
            // If this flyout is not already open, open it and don't navigate immediately
            if (activeItem !== item || !item.classList.contains('is-flyout-open')) {
              e.preventDefault();
              openFlyout(item);
            }
          }
        });
      }
    });

    // Close on click outside or Escape
    document.addEventListener('click', (e) => {
      if (!servicesDropdown.contains(e.target)) {
        servicesDropdown.classList.remove('is-open');
        closeAllFlyouts();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        servicesDropdown.classList.remove('is-open');
        closeAllFlyouts();
      }
    });
  }

  // 2. Interactive Heat Mode vs Cool Mode Climate Switcher (Hero Section)
  const heatModeBtn = document.getElementById('heatModeBtn');
  const coolModeBtn = document.getElementById('coolModeBtn');
  const heroDynamicTitle = document.getElementById('heroDynamicTitle');
  const heroDynamicDesc = document.getElementById('heroDynamicDesc');
  const heroTempGauge = document.getElementById('heroTempGauge');

  if (heatModeBtn && coolModeBtn) {
    heatModeBtn.addEventListener('click', () => {
      heatModeBtn.classList.add('active', 'heat');
      coolModeBtn.classList.remove('active', 'cool');
      
      if (heroDynamicTitle) {
        heroDynamicTitle.innerHTML = '<span class="trey-hero-brand">Trey Durden</span> <span class="text-gradient hero-title-sub">Heating, Cooling, Brokerage &amp; Boiler Services</span>';
      }
      if (heroDynamicDesc) {
        heroDynamicDesc.textContent = 'Direct manufacturer HVAC equipment brokerage, master thermodynamic engineering, and certified 24/7 emergency boiler service and repair.';
      }
      if (heroTempGauge) {
        heroTempGauge.textContent = '24/7';
        heroTempGauge.style.borderColor = 'var(--color-salmon)';
        heroTempGauge.style.color = '#ffffff';
      }
    });

    coolModeBtn.addEventListener('click', () => {
      coolModeBtn.classList.add('active', 'cool');
      heatModeBtn.classList.remove('active', 'heat');

      if (heroDynamicTitle) {
        heroDynamicTitle.innerHTML = '<span class="trey-hero-brand">Trey Durden</span> <span class="text-gradient-cyan hero-title-sub">Cooling Engineering &amp; Precision Climate Systems</span>';
      }
      if (heroDynamicDesc) {
        heroDynamicDesc.textContent = 'Direct manufacturer AC equipment sourcing, high-SEER2 multi-zone cooling engineering, and 24/7 emergency air conditioning repair.';
      }
      if (heroTempGauge) {
        heroTempGauge.textContent = '68°F';
        heroTempGauge.style.borderColor = 'var(--color-cyan)';
        heroTempGauge.style.color = 'var(--color-cyan)';
      }
    });
  }

  // 3. Accordion Multi-Group Toggle
  const accordionHeaders = document.querySelectorAll('.accordion-header, .stat-accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const parentItem = header.parentElement;
      const isOpen = parentItem.classList.contains('active');

      const parentWrapper = header.closest('.accordion-wrapper, .accordion-stats-wrapper');
      if (parentWrapper) {
        const siblingItems = parentWrapper.querySelectorAll('.accordion-item, .stat-accordion-item');
        siblingItems.forEach(item => {
          if (item !== parentItem) {
            item.classList.remove('active');
          }
        });
      }

      if (isOpen) {
        parentItem.classList.remove('active');
      } else {
        parentItem.classList.add('active');
      }
    });
  });

  // 4. Hash Link & Deep-Link Accordion Auto-Open
  function handleAccordionHash() {
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      try {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          const parentAccordion = targetElement.classList.contains('accordion-item') 
            ? targetElement 
            : targetElement.closest('.accordion-item');
          if (parentAccordion) {
            const parentWrapper = parentAccordion.closest('.accordion-wrapper');
            if (parentWrapper) {
              parentWrapper.querySelectorAll('.accordion-item').forEach(item => item.classList.remove('active'));
            }
            parentAccordion.classList.add('active');
          }
          setTimeout(() => {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 150);
        }
      } catch (err) {
        // graceful fallback
      }
    }
  }

  handleAccordionHash();
  window.addEventListener('hashchange', handleAccordionHash);

  // 5. Service Filter Pills (Services Page)
  const filterPills = document.querySelectorAll('.service-filter-pill[data-target]');
  if (filterPills.length > 0) {
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const target = pill.getAttribute('data-target');

        const allAccordions = document.querySelectorAll('.accordion-wrapper .accordion-item');
        if (target === 'all') {
          allAccordions.forEach(item => {
            item.style.display = 'block';
          });
          if (allAccordions[0]) allAccordions[0].classList.add('active');
        } else {
          allAccordions.forEach(item => {
            if (item.id === target) {
              item.style.display = 'block';
              item.classList.add('active');
              item.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
              item.classList.remove('active');
            }
          });
        }
      });
    });
  }

  // 6. Product Filter Pills (Products Page)
  const productFilterPills = document.querySelectorAll('.service-filter-pill[data-filter]');
  const productCards = document.querySelectorAll('.feature-bento-card[data-category]');

  if (productFilterPills.length > 0 && productCards.length > 0) {
    productFilterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        productFilterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const filterVal = pill.getAttribute('data-filter');

        productCards.forEach(card => {
          if (filterVal === 'all' || card.getAttribute('data-category') === filterVal) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 7. Form Handlers
  const heroQuoteForm = document.getElementById('heroQuoteForm');
  if (heroQuoteForm) {
    heroQuoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('quoteName') ? document.getElementById('quoteName').value : 'Client';
      const service = document.getElementById('quoteService') ? document.getElementById('quoteService').value : 'Engineering Consultation';
      alert(`Thank you, ${name}! Your consultation request for "${service}" has been received. Trey Durden will review your thermal specs and follow up within 24 hours.`);
      heroQuoteForm.reset();
    });
  }

  // 8. Interactive Hardware Studio Stage (4 Thumbnails Switcher)
  const thumbnailItems = document.querySelectorAll('.thumbnail-bento-item');
  const primaryProductImg = document.getElementById('primaryProductImg');
  const stageBadge = document.getElementById('stageBadge');

  if (thumbnailItems.length > 0 && primaryProductImg) {
    thumbnailItems.forEach(item => {
      item.addEventListener('click', () => {
        thumbnailItems.forEach(t => t.classList.remove('active'));
        item.classList.add('active');

        const newImg = item.getAttribute('data-img');
        const newTitle = item.getAttribute('data-title');

        if (newImg) {
          primaryProductImg.style.opacity = '0.2';
          primaryProductImg.style.transform = 'scale(0.95)';
          setTimeout(() => {
            primaryProductImg.src = newImg;
            primaryProductImg.style.opacity = '1';
            primaryProductImg.style.transform = 'scale(1)';
          }, 150);
        }

        if (stageBadge && newTitle) {
          stageBadge.textContent = newTitle;
        }
      });
    });
  }

  // 9. RockAuto-Style Service Directory Tree Accordion Handler (Single-Open Mode)
  const treeNodeButtons = document.querySelectorAll('.tree-node-btn');
  treeNodeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
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

  // 10. Wireframe Homepage Diagnostic Triage Selector
  const diagButtons = document.querySelectorAll('.ex-diag-acc-btn');
  const diagActiveTitle = document.getElementById('diagActiveTitle');
  const diagActiveLink = document.getElementById('diagActiveLink');

  const diagData = {
    cooling: {
      title: 'Air conditioning diagnostic triage: We inspect refrigerant charge, coils, compressor staging, and duct balance for peak summer reliability.',
      url: 'services.html#air-conditioning',
      text: 'Go to cooling services'
    },
    maintenance: {
      title: 'Preventive seasonal care: Comprehensive system check, electrical testing, and burner tuning before extreme weather hits Chicagoland.',
      url: 'services.html#boiler-services',
      text: 'Schedule seasonal care'
    },
    comfort: {
      title: 'Indoor air quality & humidity engineering: Whole-home humidifiers, HEPA filtration, UV purifiers, and multi-zone climate control.',
      url: 'services.html#thermal-dynamic',
      text: 'Explore indoor comfort options'
    }
  };

  diagButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const parentItem = btn.closest('.ex-diag-accordion-item');
      if (!parentItem) return;

      const isAlreadyOpen = parentItem.classList.contains('is-open');
      const allDiagItems = document.querySelectorAll('.ex-diag-accordion-item');
      allDiagItems.forEach(item => {
        item.classList.remove('is-open');
        const indicator = item.querySelector('.ex-diag-acc-indicator');
        if (indicator) indicator.textContent = '+';
      });

      if (!isAlreadyOpen) {
        parentItem.classList.add('is-open');
        const indicator = parentItem.querySelector('.ex-diag-acc-indicator');
        if (indicator) indicator.textContent = '×';

        const diagType = btn.getAttribute('data-diag');
        if (diagType && diagData[diagType] && diagActiveTitle && diagActiveLink) {
          diagActiveTitle.textContent = diagData[diagType].title;
          diagActiveLink.setAttribute('href', diagData[diagType].url);
          diagActiveLink.innerHTML = `<span>${diagData[diagType].text}</span> <span>&rarr;</span>`;
        }
      }
    });
  });

  // 11. Wireframe Homepage Generic Accordions ("Why Trey Durden" & FAQ)
  const exAccButtons = document.querySelectorAll('.ex-acc-header-btn');
  exAccButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.ex-accordion-card');
      if (!card) return;
      const wasOpen = card.classList.contains('is-open');
      const parentGroup = card.parentElement;

      if (parentGroup) {
        parentGroup.querySelectorAll('.ex-accordion-card').forEach(c => {
          c.classList.remove('is-open');
          const ind = c.querySelector('.ex-acc-toggle-indicator');
          if (ind) ind.textContent = '+';
        });
      }

      if (!wasOpen) {
        card.classList.add('is-open');
        const ind = card.querySelector('.ex-acc-toggle-indicator');
        if (ind) ind.textContent = '×';
      }
    });
  });
});

