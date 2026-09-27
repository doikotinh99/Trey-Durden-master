/**
 * Trey Durden - Thermal Applications Engineer & HVAC Specialist
 * Interactive Vanilla JS
 */

document.addEventListener('DOMContentLoaded', () => {
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
        mobileNavToggle.textContent = '☰';
      }
    };

    const openMenu = () => {
      navMenu.classList.add('show');
      document.body.style.overflow = 'hidden';
      if (mobileNavToggle) {
        mobileNavToggle.setAttribute('aria-expanded', 'true');
        mobileNavToggle.textContent = '✕';
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

  // 2. Interactive Heat Mode 🔥 vs Cool Mode ❄️ Climate Switcher (Hero Section)
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
        heroDynamicTitle.innerHTML = '<span class="trey-hero-brand">Trey Durden</span> <span class="hero-title-sub">Heating, Cooling, Brokerage &amp; Boiler Services</span>';
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
        heroDynamicTitle.innerHTML = '<span class="trey-hero-brand">Trey Durden</span> <span class="hero-title-sub">Cooling Engineering &amp; Precision Climate Systems</span>';
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
      alert(`🎉 Thank you, ${name}! Your consultation request for "${service}" has been received. Trey Durden will review your thermal specs and follow up within 24 hours.`);
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
});
