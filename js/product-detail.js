/**
 * HVAC Equipment & Boiler Platform - Product Detail Page Controller (Redesigned)
 * Single Unit Focus, Capacity Sizing Selector, Parent-Child Accordions,
 * 3-Step Process Flow, and Sticky Conversion Call-To-Action.
 */

(function () {
  'use strict';

  // State
  let currentProduct = null;
  let isAddonActive = false;
  let activeSpecTab = '';
  let isDeliveryIncluded = true;
  let currentBasePrice = 3250;
  let currentBaseFinance = 59;
  let addonPriceAdd = 0;
  let addonFinanceAdd = 0;
  let selectedCapacityIndex = 0;

  function showToast(message, type = 'info') {
    let toast = document.getElementById('pdpToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'pdpToast';
      toast.className = 'pdp-toast';
      document.body.appendChild(toast);
    }

    const iconId = type === 'error' ? 'icon-alert' : type === 'success' ? 'icon-check-circle' : 'icon-shield';
    toast.className = `pdp-toast ${type === 'error' ? 'toast-error' : type === 'success' ? 'toast-success' : ''} active`;
    toast.innerHTML = `
      <svg class="svg-icon" style="width:18px;height:18px;flex-shrink:0;" aria-hidden="true"><use href="#${iconId}"></use></svg>
      <span>${message}</span>
    `;

    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove('active');
    }, 4500);
  }

  function initProductDetail() {
    if (window._pdpInitialized) return;
    window._pdpInitialized = true;

    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id') || 'durastar-two-stage-96';
    const products = window.BOILER_PRODUCTS || (typeof BOILER_PRODUCTS !== 'undefined' ? BOILER_PRODUCTS : []);

    currentProduct = products.find(p => p.id === productId) || products[0];
    if (!currentProduct) return;

    currentBasePrice = currentProduct.price_from || 3250;
    currentBaseFinance = currentProduct.monthly_financing || Math.max(12, Math.round(currentBasePrice / 60));

    // Page title and breadcrumbs
    document.title = `${currentProduct.name} | HVAC Specifications & Turnkey Install`;
    
    const breadcrumbCurrent = document.getElementById('pdpBreadcrumbCurrent');
    if (breadcrumbCurrent) breadcrumbCurrent.textContent = currentProduct.name;

    const titleEl = document.getElementById('pdpProductTitle');
    if (titleEl) titleEl.textContent = currentProduct.name;

    const ratingEl = document.getElementById('pdpRatingVal');
    if (ratingEl) ratingEl.textContent = (currentProduct.rating || 4.9).toFixed(1);

    const reviewsEl = document.getElementById('pdpReviewsCount');
    if (reviewsEl) reviewsEl.textContent = `(${currentProduct.reviewsCount || 287} reviews)`;

    const efficiencyTag = document.getElementById('pdpEfficiencyTag');
    if (efficiencyTag) {
      efficiencyTag.textContent = currentProduct.efficiency
        ? `${currentProduct.efficiency} High Efficiency`
        : 'Certified High Efficiency';
    }

    initGallery();
    initTrustBadges();
    initHeroSizingAndPricing();
    initProductOverview();
    initHardwareMatrix();
    initSpecTabs();
    initFulfillment();
    initStickyBar();
    initModal();
  }

  function initGallery() {
    const mainImg = document.getElementById('pdpMainImg');
    const strip = document.querySelector('.pdp-thumbnails-strip');
    if (!mainImg) return;

    mainImg.src = currentProduct.image || 'images/boiler-img-1.jpg';
    mainImg.alt = currentProduct.name;

    const galleryImages = currentProduct.gallery && currentProduct.gallery.length > 0
      ? currentProduct.gallery
      : [currentProduct.image];

    if (strip) {
      strip.innerHTML = galleryImages.map((imgSrc, idx) => `
        <button type="button" class="pdp-thumb-btn ${idx === 0 ? 'active' : ''}" data-img="${imgSrc}" aria-label="View photo ${idx + 1}">
          <img src="${imgSrc}" onerror="this.src='images/boiler-img-1.jpg'" alt="${currentProduct.name} Thumbnail ${idx + 1}">
        </button>
      `).join('');

      const thumbButtons = strip.querySelectorAll('.pdp-thumb-btn');
      thumbButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const targetSrc = btn.getAttribute('data-img');
          if (!targetSrc) return;

          thumbButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          mainImg.style.opacity = '0.3';
          setTimeout(() => {
            mainImg.src = targetSrc;
            mainImg.style.opacity = '1';
          }, 120);
        });
      });
    }
  }

  function initTrustBadges() {
    const container = document.querySelector('.pdp-trust-badges-grid');
    if (!container) return;

    const tag1 = currentProduct.warranty || "10-Yr Parts Warranty";
    const tag2 = currentProduct.a2lReady ? "A2L Low-GWP Ready" : "Eco Low-Emission";
    const tag3 = currentProduct.energyStar ? "Energy Star Certified" : "High Efficiency Rated";
    const certNumber = (currentProduct.specs && currentProduct.specs['AHRI Certified']) ? currentProduct.specs['AHRI Certified'] : "#20849102";

    container.innerHTML = `
      <div class="pdp-trust-badge-item">
        <svg class="svg-icon" style="color:var(--cyan);width:20px;height:20px;" aria-hidden="true"><use href="#icon-shield"></use></svg>
        <span class="pdp-trust-badge-label">${tag1}</span>
      </div>
      <div class="pdp-trust-badge-item">
        <svg class="svg-icon" style="color:var(--green);width:20px;height:20px;" aria-hidden="true"><use href="#icon-leaf"></use></svg>
        <span class="pdp-trust-badge-label">${tag2}</span>
      </div>
      <div class="pdp-trust-badge-item">
        <svg class="svg-icon" style="color:var(--cyan);width:20px;height:20px;" aria-hidden="true"><use href="#icon-award"></use></svg>
        <span class="pdp-trust-badge-label">${tag3}</span>
      </div>
      <div class="pdp-trust-badge-item">
        <svg class="svg-icon" style="color:var(--green);width:20px;height:20px;" aria-hidden="true"><use href="#icon-check-circle"></use></svg>
        <span class="pdp-trust-badge-label">AHRI Certified ${certNumber}</span>
      </div>
    `;
  }

  function initHeroSizingAndPricing() {
    // 1. Set Unit Type Pill (Single Unit vs Complete Bundle)
    const pill = document.getElementById('pdpUnitTypePill');
    if (pill) {
      if (currentProduct.isBundle) {
        pill.innerHTML = `<span style="color:#0284c7;">●</span> Complete Multi-Unit Matched System &bull; Furnace + Coil + AC Condenser`;
      } else {
        const defaultType = currentProduct.categoryName 
          ? `Single Standalone Unit • ${currentProduct.categoryName}` 
          : 'Single Standalone Equipment Unit';
        pill.innerHTML = `<span style="color:#10b981;">●</span> ${currentProduct.unitType || defaultType}`;
      }
    }

    // 2. Capacity Sizing Selector
    const capBlock = document.getElementById('pdpCapacityBlock');
    const capButtonsRow = document.getElementById('pdpCapacityButtons');
    const selectedBadge = document.getElementById('pdpSelectedModelBadge');

    if (currentProduct.capacities && currentProduct.capacities.length > 0) {
      if (capBlock) capBlock.style.display = 'block';
      if (capButtonsRow) {
        const defaultIdx = currentProduct.capacities.findIndex(c => c.isDefault);
        const activeIdx = defaultIdx >= 0 ? defaultIdx : 0;
        selectedCapacityIndex = activeIdx;

        capButtonsRow.innerHTML = currentProduct.capacities.map((c, idx) => `
          <button type="button" class="pdp-cap-btn ${idx === activeIdx ? 'active' : ''}" data-cap-idx="${idx}">
            ${c.btu}
          </button>
        `).join('');

        applyCapacity(selectedCapacityIndex);

        capButtonsRow.querySelectorAll('.pdp-cap-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const idx = parseInt(btn.getAttribute('data-cap-idx'), 10);
            capButtonsRow.querySelectorAll('.pdp-cap-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyCapacity(idx);
          });
        });
      }
    } else {
      if (capBlock) {
        if (currentProduct.btu) {
          capBlock.style.display = 'block';
          if (selectedBadge) selectedBadge.textContent = currentProduct.specs && currentProduct.specs.Model ? currentProduct.specs.Model : (currentProduct.model || currentProduct.id);
          if (capButtonsRow) {
            capButtonsRow.innerHTML = `<button type="button" class="pdp-cap-btn active" style="cursor:default;">${currentProduct.btu}</button>`;
          }
        } else {
          capBlock.style.display = 'none';
        }
      }
    }

    // 3. Hero Pricing Display
    updateHeroPricing();

    // 4. CTA Buttons
    const heroCtaBtn = document.getElementById('pdpHeroCtaBtn');
    if (heroCtaBtn) {
      heroCtaBtn.addEventListener('click', () => {
        openQuoteModal(`${currentProduct.name} (${getCurrentSelectedCapacityLabel()})`);
      });
    }
  }

  function getCurrentSelectedCapacityLabel() {
    if (currentProduct && currentProduct.capacities && currentProduct.capacities[selectedCapacityIndex]) {
      return currentProduct.capacities[selectedCapacityIndex].btu;
    }
    return currentProduct.btu || 'Standard Size';
  }

  function applyCapacity(index) {
    selectedCapacityIndex = index;
    if (!currentProduct.capacities || !currentProduct.capacities[index]) return;
    const item = currentProduct.capacities[index];

    currentBasePrice = item.price || currentProduct.price_from;
    currentBaseFinance = item.finance || currentProduct.monthly_financing;

    const selectedBadge = document.getElementById('pdpSelectedModelBadge');
    if (selectedBadge) selectedBadge.textContent = item.model;

    updateHeroPricing();
    updatePriceAndFinance();
    updateStickyBar();

    // Update specs in active accordion
    renderParentChildAccordion();
  }

  function updateHeroPricing() {
    const heroPriceEl = document.getElementById('pdpHeroPrice');
    const heroFinanceEl = document.getElementById('pdpHeroFinance');
    const heroRebateEl = document.getElementById('pdpHeroRebate');

    if (heroPriceEl) heroPriceEl.textContent = `$${currentBasePrice.toLocaleString()}`;
    if (heroFinanceEl) heroFinanceEl.textContent = `$${currentBaseFinance}/mo`;
    if (heroRebateEl) {
      heroRebateEl.textContent = currentProduct.rebateAmount 
        ? `Save $${currentProduct.rebateAmount} Instant Utility Rebate` 
        : 'Utility Rebate Eligible';
    }
  }

  function initProductOverview() {
    const descEl = document.getElementById('pdpProductDesc');
    if (descEl) {
      descEl.textContent = currentProduct.description || 'Full factory-engineered comfort equipment with advanced efficiency controls and certified local installation.';
    }

    const modelBadge = document.getElementById('pdpModelBadge');
    if (modelBadge) {
      modelBadge.textContent = currentProduct.brand ? `${currentProduct.brand} Series` : 'Factory Specifications';
    }

    const featuresList = document.getElementById('pdpFeaturesList');
    if (featuresList) {
      const features = currentProduct.features && currentProduct.features.length > 0
        ? currentProduct.features
        : [
            `${currentProduct.efficiency || 'High-Efficiency'} certified performance rating`,
            `${currentProduct.warranty || '10-Year Factory Warranty'} on major components`,
            'A2L low-GWP refrigerant and safety compliance ready',
            'Turnkey certified mechanical installation including municipal permits'
          ];

      featuresList.innerHTML = features.map(feat => `
        <li class="pdp-feature-item">
          <svg class="svg-icon pdp-feature-icon" aria-hidden="true"><use href="#icon-check-circle"></use></svg>
          <span class="pdp-feature-text">${feat}</span>
        </li>
      `).join('');
    }
  }

  function initHardwareMatrix() {
    const matrixCard = document.getElementById('pdpHardwareMatrixCard');
    if (!matrixCard) return;

    // KEY FIX: Only show multi-unit bundle matrix for real bundles!
    // For single standalone units (like Durastar Furnace), hide the confusing matrix so user knows they are looking at 1 product.
    if (!currentProduct.isBundle) {
      matrixCard.style.display = 'none';
      return;
    }

    matrixCard.style.display = 'flex';
    const titleSpan = matrixCard.querySelector('.pdp-card-title span');
    if (titleSpan) titleSpan.textContent = 'Matched System Hardware Matrix (Complete Bundle)';

    const matrixStack = document.querySelector('.pdp-matrix-stack');
    const addonsRow = document.querySelector('.pdp-addons-row');
    if (!matrixStack || !currentProduct.bundleMatrix) return;

    const matrix = currentProduct.bundleMatrix;
    const optionalKeys = ['waterHeater', 'feeder', 'indirectTank', 'gateway', 'actuators', 'remoteSensor', 'recircKit'];
    const baseItems = Object.entries(matrix).filter(([k]) => !optionalKeys.includes(k));
    const optionalEntry = Object.entries(matrix).find(([k]) => optionalKeys.includes(k));

    matrixStack.innerHTML = baseItems.map(([key, item]) => {
      const meta = getAvatarMeta(key, item.code);
      return `
        <div class="pdp-matrix-item" id="pdpRow_${key}">
          <div class="pdp-matrix-left">
            <div class="pdp-unit-avatar ${meta.bgClass}" title="${item.name}">
              <svg class="svg-icon" style="width:16px;height:16px;color:${meta.color};" aria-hidden="true"><use href="#${meta.icon}"></use></svg>
            </div>
            <div class="pdp-unit-meta">
              <div class="pdp-unit-header">
                <span class="pdp-unit-model">${item.model}</span>
                <span class="pdp-unit-name">${item.name}</span>
              </div>
              <p class="pdp-unit-desc">${item.specs}</p>
            </div>
          </div>
          <span class="pdp-matrix-badge ${item.badgeClass || 'pdp-chip-teal'}">${item.badge}</span>
        </div>
      `;
    }).join('');

    if (optionalEntry) {
      const [optKey, optItem] = optionalEntry;
      addonPriceAdd = optItem.priceAdd || 500;
      addonFinanceAdd = optItem.financeAdd || 9;

      const optMeta = getAvatarMeta(optKey, optItem.code);
      const optHtml = `
        <div class="pdp-matrix-item" id="pdpRowOptional" style="display: none;">
          <div class="pdp-matrix-left">
            <div class="pdp-unit-avatar ${optMeta.bgClass}" title="${optItem.name}">
              <svg class="svg-icon" style="width:16px;height:16px;color:${optMeta.color};" aria-hidden="true"><use href="#${optMeta.icon}"></use></svg>
            </div>
            <div class="pdp-unit-meta">
              <div class="pdp-unit-header">
                <span class="pdp-unit-model">${optItem.model}</span>
                <span class="pdp-unit-name">${optItem.name}</span>
              </div>
              <p class="pdp-unit-desc">${optItem.specs}</p>
            </div>
          </div>
          <span class="pdp-matrix-badge ${optItem.badgeClass || 'pdp-chip-teal'}">${optItem.badge}</span>
        </div>
      `;
      matrixStack.insertAdjacentHTML('beforeend', optHtml);

      const isFurnace = currentProduct.category === 'hvac-systems';
      if (addonsRow) {
        addonsRow.innerHTML = `
          <button type="button" id="pdpBtnToggleAddon" class="pdp-addon-btn">
            <div class="pdp-addon-left">
              <svg class="svg-icon" style="width:16px;height:16px;color:var(--cyan);"><use href="#icon-sparkles"></use></svg>
              <span>+ ${optItem.name} (+$${addonPriceAdd})</span>
            </div>
            <svg class="svg-icon" style="width:14px;height:14px;color:var(--text-muted);"><use href="#icon-plus"></use></svg>
          </button>
          <button type="button" id="pdpBtnForbidden" class="pdp-addon-btn" title="${isFurnace ? 'Forbidden combination: Never mix Furnace with Boiler' : 'Forbidden combination: Never mix Hydronic Boiler with Forced-Air Furnace'}">
            <div class="pdp-addon-left">
              <svg class="svg-icon" style="width:16px;height:16px;color:var(--coral);"><use href="#icon-alert"></use></svg>
              <span>+ ${isFurnace ? 'Hydronic Boiler' : 'Forced-Air Furnace'}</span>
            </div>
            <svg class="svg-icon" style="width:14px;height:14px;color:var(--coral);"><use href="#icon-close"></use></svg>
          </button>
        `;

        const btnToggle = document.getElementById('pdpBtnToggleAddon');
        if (btnToggle) {
          btnToggle.addEventListener('click', () => toggleAddon(optKey, optItem));
        }

        const btnForbidden = document.getElementById('pdpBtnForbidden');
        if (btnForbidden) {
          btnForbidden.addEventListener('click', (e) => {
            e.preventDefault();
            showToast(
              isFurnace
                ? 'Forbidden Combination: HVAC engineering standard strictly forbids combining a Forced-Air Furnace with a Hydronic Boiler in the same mechanical system.'
                : 'Forbidden Combination: Hydronic heating equipment operates on a closed hydronic water loop and cannot be coupled with a forced-air furnace.',
              'error'
            );
          });
        }
      }
    }

    updatePriceAndFinance();
  }

  function getAvatarMeta(key, code) {
    if (key === 'furnace') return { icon: 'icon-fire', color: 'var(--coral)', bgClass: 'pdp-avatar-furnace' };
    if (key === 'coil') return { icon: 'icon-snowflake', color: 'var(--cyan)', bgClass: 'pdp-avatar-coil' };
    if (key === 'condenser') return { icon: 'icon-fan', color: 'var(--green)', bgClass: 'pdp-avatar-condenser' };
    if (key === 'boiler') return { icon: 'icon-fire', color: 'var(--coral)', bgClass: 'pdp-avatar-furnace' };
    if (key === 'circulator' || key === 'pump') return { icon: 'icon-fan', color: 'var(--cyan)', bgClass: 'pdp-avatar-coil' };
    if (key === 'manifold' || key === 'mixing') return { icon: 'icon-tools', color: 'var(--cyan)', bgClass: 'pdp-avatar-coil' };
    if (key === 'control') return { icon: 'icon-cpu', color: 'var(--yellow)', bgClass: 'pdp-avatar-boiler' };
    if (key === 'trim' || key === 'neutralizer') return { icon: 'icon-tools', color: 'var(--green)', bgClass: 'pdp-avatar-water' };
    if (key === 'lwco' || key === 'sensor') return { icon: 'icon-shield', color: 'var(--cyan)', bgClass: 'pdp-avatar-coil' };
    return { icon: 'icon-check-circle', color: 'var(--green)', bgClass: 'pdp-avatar-water' };
  }

  function toggleAddon(optKey, optItem) {
    isAddonActive = !isAddonActive;
    const btnToggle = document.getElementById('pdpBtnToggleAddon');
    const optRow = document.getElementById('pdpRowOptional');

    if (isAddonActive) {
      if (btnToggle) {
        btnToggle.classList.add('active');
        btnToggle.innerHTML = `
          <div class="pdp-addon-left">
            <svg class="svg-icon" style="width:16px;height:16px;color:var(--green);" aria-hidden="true"><use href="#icon-check-circle"></use></svg>
            <span>${optItem.name} Added</span>
          </div>
          <svg class="svg-icon" style="width:14px;height:14px;color:var(--cyan);" aria-hidden="true"><use href="#icon-close"></use></svg>
        `;
      }
      if (optRow) optRow.style.display = 'flex';
      showToast(`Added ${optItem.name} to system configuration.`, 'success');
    } else {
      if (btnToggle) {
        btnToggle.classList.remove('active');
        btnToggle.innerHTML = `
          <div class="pdp-addon-left">
            <svg class="svg-icon" style="width:16px;height:16px;color:var(--cyan);"><use href="#icon-sparkles"></use></svg>
            <span>+ ${optItem.name} (+$${addonPriceAdd})</span>
          </div>
          <svg class="svg-icon" style="width:14px;height:14px;color:var(--text-muted);"><use href="#icon-plus"></use></svg>
        `;
      }
      if (optRow) optRow.style.display = 'none';
      showToast(`Removed ${optItem.name} from system configuration.`, 'info');
    }

    updatePriceAndFinance();
  }

  function updatePriceAndFinance() {
    const totalPrice = isAddonActive ? (currentBasePrice + addonPriceAdd) : currentBasePrice;
    const totalFinance = isAddonActive ? (currentBaseFinance + addonFinanceAdd) : currentBaseFinance;

    const totalPriceEl = document.getElementById('pdpTotalPrice');
    const financePriceEl = document.getElementById('pdpFinancePrice');
    const modalSummaryPrice = document.getElementById('pdpModalPrice');

    if (totalPriceEl) totalPriceEl.textContent = `$${totalPrice.toLocaleString()}`;
    if (financePriceEl) financePriceEl.textContent = `$${totalFinance}/mo`;
    if (modalSummaryPrice) modalSummaryPrice.textContent = `$${totalPrice.toLocaleString()}`;
  }

  function getTabIcon(tabKey) {
    if (tabKey === 'furnace' || tabKey === 'boiler') return 'icon-fire';
    if (tabKey === 'coil') return 'icon-snowflake';
    if (tabKey === 'condenser') return 'icon-fan';
    if (tabKey === 'waterHeater' || tabKey === 'hydronics') return 'icon-droplet';
    if (tabKey === 'circulator' || tabKey === 'pump') return 'icon-fan';
    if (tabKey === 'trim' || tabKey === 'manifold') return 'icon-tools';
    if (tabKey === 'control') return 'icon-cpu';
    return 'icon-sliders';
  }

  function initSpecTabs() {
    const scroller = document.getElementById('pdpSpecTabsScroller') || document.querySelector('.pdp-tabs-scroller');
    if (!currentProduct.componentSpecs) return;

    const tabKeys = Object.keys(currentProduct.componentSpecs);
    if (tabKeys.length === 0) return;

    activeSpecTab = tabKeys[0];

    // If standalone unit, hide multi-component scroller tabs unless there are multiple real components
    if (!currentProduct.isBundle && tabKeys.length <= 1) {
      if (scroller) scroller.style.display = 'none';
    } else if (scroller) {
      scroller.style.display = 'flex';
      scroller.innerHTML = tabKeys.map((key, idx) => {
        const spec = currentProduct.componentSpecs[key];
        const icon = getTabIcon(key);
        return `
          <button type="button" class="pdp-spec-tab ${idx === 0 ? 'active' : ''}" data-tab="${key}" role="tab" aria-selected="${idx === 0 ? 'true' : 'false'}">
            <svg class="svg-icon" style="width:14px;height:14px;margin-right:6px;" aria-hidden="true"><use href="#${icon}"></use></svg>
            <span>${spec.title || key}</span>
          </button>
        `;
      }).join('');

      const tabs = scroller.querySelectorAll('.pdp-spec-tab');
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const target = tab.getAttribute('data-tab');
          if (target) switchSpecTab(target);
        });
      });
    }

    renderSpecsContent(activeSpecTab);
  }

  function switchSpecTab(tabKey) {
    activeSpecTab = tabKey;
    const tabs = document.querySelectorAll('.pdp-spec-tab');
    tabs.forEach(t => {
      if (t.getAttribute('data-tab') === tabKey) {
        t.classList.add('active');
        t.setAttribute('aria-selected', 'true');
      } else {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      }
    });

    renderSpecsContent(tabKey);
  }

  function renderSpecsContent(tabKey) {
    if (!currentProduct || !currentProduct.componentSpecs) return;
    const specData = currentProduct.componentSpecs[tabKey] || Object.values(currentProduct.componentSpecs)[0];
    if (!specData) return;

    // 1. Render 2x2 Bento Tiles
    const bentoContainer = document.getElementById('pdpBentoGrid');
    if (bentoContainer && specData.bento) {
      bentoContainer.innerHTML = specData.bento.map(item => `
        <div class="pdp-bento-tile">
          <div class="pdp-bento-top">
            <span class="pdp-bento-label">${item.label}</span>
            ${item.icon ? `<svg class="svg-icon pdp-bento-icon" aria-hidden="true"><use href="#${item.icon}"></use></svg>` : ''}
          </div>
          <div class="pdp-bento-value" style="color: ${item.color || 'var(--cyan)'};">${item.value}</div>
          <span class="pdp-bento-sub">${item.sub}</span>
        </div>
      `).join('');
    }

    // 2. Render PARENT - CHILD ACCORDION MENU
    renderParentChildAccordion();
  }

  function renderParentChildAccordion() {
    const accordionContainer = document.getElementById('pdpParentChildAccordion');
    if (!accordionContainer || !currentProduct || !currentProduct.componentSpecs) return;

    const specData = currentProduct.componentSpecs[activeSpecTab] || Object.values(currentProduct.componentSpecs)[0];
    if (!specData || !specData.techSpecs) return;

    const techSpecs = specData.techSpecs.map(s => ({ ...s }));

    // If capacity selected, update relevant specs
    if (currentProduct.capacities && currentProduct.capacities[selectedCapacityIndex]) {
      const cap = currentProduct.capacities[selectedCapacityIndex];
      const modelRow = techSpecs.find(r => r.label === 'Model Number');
      if (modelRow) modelRow.val = cap.model;

      const inputRow = techSpecs.find(r => r.label.includes('Input') || r.label.includes('Heating Input'));
      if (inputRow) inputRow.val = `${cap.btu} Input`;

      const dimRow = techSpecs.find(r => r.label.includes('Dimensions'));
      if (dimRow && cap.cabinet) dimRow.val = cap.cabinet;
    }

    // Group specs into 5 Parent Categories
    const groups = [
      {
        id: 'group-perf',
        title: 'Capacity, Output & Energy Efficiency',
        subtitle: 'AFUE Rating, BTU Sizing & Utility Rebate Criteria',
        icon: 'icon-fire',
        badge: currentProduct.efficiency || '96.0% AFUE',
        filter: lbl => lbl.includes('afue') || lbl.includes('seer') || lbl.includes('btu') || lbl.includes('efficiency') || lbl.includes('capacity') || lbl.includes('stage') || lbl.includes('energy star') || lbl.includes('factor') || lbl.includes('model') || lbl.includes('brand') || lbl.includes('input') || lbl.includes('output')
      },
      {
        id: 'group-motor',
        title: 'Motor, Airflow Dynamics & Speeds',
        subtitle: 'ECM Blower Technology, Drive & Acoustic Sound',
        icon: 'icon-fan',
        badge: 'Constant Torque ECM',
        filter: lbl => lbl.includes('motor') || lbl.includes('blower') || lbl.includes('airflow') || lbl.includes('fan') || lbl.includes('speed') || lbl.includes('cfm') || lbl.includes('compressor') || lbl.includes('drive') || lbl.includes('sound')
      },
      {
        id: 'group-chassis',
        title: 'Chassis Dimensions & Physical Build',
        subtitle: 'Cabinet Dimensions, Weight & Multi-Position Fit',
        icon: 'icon-package',
        badge: 'Multi-Position',
        filter: lbl => lbl.includes('dimension') || lbl.includes('weight') || lbl.includes('height') || lbl.includes('width') || lbl.includes('depth') || lbl.includes('cabinet') || lbl.includes('location') || lbl.includes('position') || lbl.includes('casing') || lbl.includes('exchanger')
      },
      {
        id: 'group-elec',
        title: 'Electrical Power & Ignition Systems',
        subtitle: 'Line Voltage, Direct Spark & Fuel Compatibility',
        icon: 'icon-bolt',
        badge: '115V / 60 Hz',
        filter: lbl => lbl.includes('electric') || lbl.includes('volt') || lbl.includes('phase') || lbl.includes('breaker') || lbl.includes('ignition') || lbl.includes('power') || lbl.includes('fuel') || lbl.includes('supply')
      },
      {
        id: 'group-safety',
        title: 'Compliance, Venting & AHRI Standards',
        subtitle: 'A2L Low-GWP Readiness, Flue PVC Pipe & Directory ID',
        icon: 'icon-shield',
        badge: 'AHRI Certified',
        filter: lbl => lbl.includes('a2l') || lbl.includes('refrigerant') || lbl.includes('vent') || lbl.includes('ahri') || lbl.includes('drain') || lbl.includes('sensor') || lbl.includes('cert') || lbl.includes('compliant')
      }
    ];

    const matchedSet = new Set();
    const renderedGroups = groups.map((g, idx) => {
      const items = techSpecs.filter(spec => g.filter((spec.label || '').toLowerCase()));
      items.forEach(s => matchedSet.add(s.label));
      if (items.length === 0) return '';

      const isOpen = idx === 0 ? 'open' : '';

      return `
        <details class="pdp-parent-group" ${isOpen} id="${g.id}">
          <summary class="pdp-parent-summary">
            <div class="pdp-parent-title-wrap">
              <div class="pdp-parent-icon-box">
                <svg class="svg-icon pdp-parent-icon" aria-hidden="true"><use href="#${g.icon}"></use></svg>
              </div>
              <div>
                <h4 class="pdp-parent-heading">${g.title}</h4>
                <span class="pdp-parent-subtitle">${g.subtitle}</span>
              </div>
            </div>
            <div class="pdp-parent-meta">
              <span class="pdp-parent-badge">${g.badge}</span>
              <svg class="svg-icon pdp-parent-chevron" aria-hidden="true"><use href="#icon-chevron-down"></use></svg>
            </div>
          </summary>
          <div class="pdp-child-specs-body">
            <div class="pdp-child-specs-grid">
              ${items.map(item => `
                <div class="pdp-child-spec-item">
                  <div class="pdp-child-spec-label">
                    <svg class="svg-icon pdp-child-check-icon" aria-hidden="true"><use href="#icon-check"></use></svg>
                    <span>${item.label}</span>
                  </div>
                  <div class="pdp-child-spec-val" style="${item.highlight ? `color:${item.highlight};` : ''}">${item.val}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </details>
      `;
    }).filter(Boolean);

    // Collect any remaining specs not caught by groups
    const unassigned = techSpecs.filter(s => !matchedSet.has(s.label));
    if (unassigned.length > 0) {
      renderedGroups.push(`
        <details class="pdp-parent-group" id="group-other">
          <summary class="pdp-parent-summary">
            <div class="pdp-parent-title-wrap">
              <div class="pdp-parent-icon-box">
                <svg class="svg-icon pdp-parent-icon" aria-hidden="true"><use href="#icon-tools"></use></svg>
              </div>
              <div>
                <h4 class="pdp-parent-heading">Additional Mechanical Specifications</h4>
                <span class="pdp-parent-subtitle">Standard Factory Equipment Tolerances</span>
              </div>
            </div>
            <div class="pdp-parent-meta">
              <span class="pdp-parent-badge">Factory Verified</span>
              <svg class="svg-icon pdp-parent-chevron" aria-hidden="true"><use href="#icon-chevron-down"></use></svg>
            </div>
          </summary>
          <div class="pdp-child-specs-body">
            <div class="pdp-child-specs-grid">
              ${unassigned.map(item => `
                <div class="pdp-child-spec-item">
                  <div class="pdp-child-spec-label">
                    <svg class="svg-icon pdp-child-check-icon" aria-hidden="true"><use href="#icon-check"></use></svg>
                    <span>${item.label}</span>
                  </div>
                  <div class="pdp-child-spec-val" style="${item.highlight ? `color:${item.highlight};` : ''}">${item.val}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </details>
      `);
    }

    accordionContainer.innerHTML = renderedGroups.join('');

    // Toggle All Accordions button
    const toggleBtn = document.getElementById('pdpToggleAllAccordions');
    if (toggleBtn) {
      toggleBtn.onclick = () => {
        const details = accordionContainer.querySelectorAll('.pdp-parent-group');
        const anyClosed = Array.from(details).some(d => !d.open);
        details.forEach(d => { d.open = anyClosed; });
        toggleBtn.textContent = anyClosed ? 'Collapse All' : 'Expand All';
      };
    }
  }

  function initStickyBar() {
    const stickyBar = document.getElementById('pdpStickyBar');
    if (!stickyBar) return;

    updateStickyBar();

    const ctaBtn = document.getElementById('pdpStickyCtaBtn');
    if (ctaBtn) {
      ctaBtn.onclick = () => {
        openQuoteModal(`${currentProduct.name} (${getCurrentSelectedCapacityLabel()})`);
      };
    }

    // Scroll listener to show/hide sticky bar
    window.addEventListener('scroll', () => {
      if (window.scrollY > 320) {
        stickyBar.classList.add('visible');
      } else {
        stickyBar.classList.remove('visible');
      }
    });
  }

  function updateStickyBar() {
    const thumb = document.getElementById('pdpStickyThumb');
    const name = document.getElementById('pdpStickyName');
    const sub = document.getElementById('pdpStickySub');
    const price = document.getElementById('pdpStickyPrice');
    const finance = document.getElementById('pdpStickyFinance');

    if (thumb) thumb.src = currentProduct.image || 'images/boiler-img-1.jpg';
    if (name) name.textContent = currentProduct.name;
    if (sub) {
      sub.innerHTML = `${getCurrentSelectedCapacityLabel()} &bull; ${currentProduct.efficiency || 'High Efficiency'}`;
    }
    if (price) price.textContent = `$${currentBasePrice.toLocaleString()}`;
    if (finance) finance.textContent = `$${currentBaseFinance}/mo`;
  }

  function initFulfillment() {
    const vendor = currentProduct.vendor || {
      name: "Best Comfort Heating & Cooling",
      subtitle: "Premier Factory Authorized Mechanical Dealer",
      rating: 4.9,
      reviews: 312,
      status: "Local Delivery Included",
      earliestInstall: "Thursday, Oct 19",
      phone: "(773) 249-4733",
      district: "Chicagoland Mechanical Service Area",
      logo: "images/best-comfort-logo.svg",
      scope: "Includes municipal mechanical permits, certified install, old equipment haul-away & 1-year labor guarantee."
    };

    const nameEl = document.querySelector('.pdp-dealer-name span');
    if (nameEl) nameEl.textContent = vendor.name;

    const subEl = document.querySelector('.pdp-dealer-badge-sub');
    if (subEl) subEl.textContent = vendor.subtitle;

    const logoEl = document.querySelector('.pdp-dealer-logo-box img');
    if (logoEl && vendor.logo) logoEl.src = vendor.logo;

    const vendorRatingEl = document.querySelector('.pdp-partner-top-row .pdp-rating-stars span');
    if (vendorRatingEl) vendorRatingEl.textContent = (vendor.rating || 4.9).toFixed(1);

    const vendorReviewsEl = document.querySelector('.pdp-partner-top-row .pdp-rating-stars .pdp-mono');
    if (vendorReviewsEl) vendorReviewsEl.textContent = `(${vendor.reviews || 312} installs)`;

    const chips = document.querySelectorAll('.pdp-fulfillment-chips .pdp-status-pill');
    if (chips.length >= 2) {
      const installChipSpan = chips[1].querySelector('span');
      if (installChipSpan) installChipSpan.textContent = `Earliest Install: ${vendor.earliestInstall}`;
    }

    const dispatchLinks = document.querySelectorAll('.pdp-dispatch-link');
    dispatchLinks.forEach(link => {
      link.href = `tel:${(vendor.phone || '(773) 249-4733').replace(/[^0-9]/g, '')}`;
      const phoneStrong = link.querySelector('strong');
      if (phoneStrong) phoneStrong.textContent = vendor.phone || '(773) 249-4733';
    });

    const guaranteeEl = document.getElementById('pdpScopeGuarantee');
    if (guaranteeEl) {
      guaranteeEl.textContent = `1-Year ${vendor.name} craftsmanship & emergency labor guarantee`;
    }

    const protocolDesc = document.getElementById('pdpProtocolVendorDesc');
    if (protocolDesc) {
      protocolDesc.textContent = `Every system installed by ${vendor.name} includes municipal permits, factory commissioning, and comprehensive warranties.`;
    }

    const modalDistrict = document.getElementById('pdpModalVendorDistrict');
    if (modalDistrict) {
      modalDistrict.textContent = `${vendor.name} • ${vendor.subtitle || 'Greater Chicago Mechanical District'}`;
    }

    const deliveryPill = document.getElementById('pdpDeliveryPill');
    if (deliveryPill) {
      deliveryPill.addEventListener('click', () => {
        isDeliveryIncluded = !isDeliveryIncluded;
        if (isDeliveryIncluded) {
          deliveryPill.innerHTML = `
            <svg class="svg-icon" style="width:14px;height:14px;color:var(--green);" aria-hidden="true"><use href="#icon-truck"></use></svg>
            <span>Local Delivery Included</span>
          `;
          showToast('Updated: Local White-Glove Equipment Delivery Included', 'success');
        } else {
          deliveryPill.innerHTML = `
            <svg class="svg-icon" style="width:14px;height:14px;color:var(--cyan);" aria-hidden="true"><use href="#icon-building"></use></svg>
            <span>Warehouse Pickup Only (Will County Hub)</span>
          `;
          showToast('Updated: Warehouse Pickup Selected at Will County Hub', 'info');
        }
      });
    }
  }

  function initModal() {
    const openBtn = document.getElementById('pdpBtnOpenModal');
    const headerCta = document.getElementById('pdpHeaderCta');
    const modalOverlay = document.getElementById('pdpBookingModal');
    const closeBtn = document.getElementById('pdpBtnCloseModal');
    const bookingForm = document.getElementById('pdpBookingForm');

    window.openQuoteModal = function (productName) {
      if (modalOverlay) {
        modalOverlay.classList.add('active');
        document.body.classList.add('pdp-modal-open');
        document.body.style.overflow = 'hidden';

        const modalTitle = document.getElementById('modalTitle');
        if (modalTitle && productName) {
          modalTitle.textContent = `Schedule Visit: ${productName}`;
        }
      }
    };

    function openModal(e) {
      if (e) e.preventDefault();
      window.openQuoteModal(currentProduct ? `${currentProduct.name} (${getCurrentSelectedCapacityLabel()})` : '');
    }

    if (openBtn) openBtn.addEventListener('click', openModal);
    if (headerCta) headerCta.addEventListener('click', openModal);

    function closeModal() {
      if (modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.classList.remove('pdp-modal-open');
        document.body.style.overflow = '';
      }
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
        closeModal();
      }
    });

    if (bookingForm) {
      bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const dateVal = document.getElementById('pdpInputDate')?.value || 'Thursday, Oct 19';
        const phoneVal = document.getElementById('pdpInputPhone')?.value || '(773) 249-4733';
        const vendorName = currentProduct.vendor ? currentProduct.vendor.name : 'Best Comfort Heating & Cooling';

        closeModal();
        showToast(
          `Confirmed! ${vendorName} dispatch has reserved your visit for ${dateVal}. Confirmation sent to ${phoneVal}.`,
          'success'
        );
      });
    }
  }

  // Auto-initialize
  if (typeof window !== 'undefined') {
    window.initProductDetail = initProductDetail;
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initProductDetail);
    } else {
      initProductDetail();
    }
  }
})();
