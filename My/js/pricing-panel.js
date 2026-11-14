/* ═══════════════════════════════════════════════════════════
   SWASTIK — SLIDING COUNTRY PRICING PANEL (Setup Tab)
   Stores prices per country, auto-fills Approve & Reply tabs
   ═══════════════════════════════════════════════════════════ */

// Load saved pricing into Setup inputs on init
window.loadSetupPricingInputs = function() {
  const pricing = state.countryPricing || {};
  const countryMap = {
    IN: 'setupPrice_IN', US: 'setupPrice_US', GB: 'setupPrice_GB',
    AE: 'setupPrice_AE', AU: 'setupPrice_AU', CA: 'setupPrice_CA',
    SG: 'setupPrice_SG', EU: 'setupPrice_EU'
  };
  Object.entries(countryMap).forEach(([code, elId]) => {
    const inp = document.getElementById(elId);
    if (inp && pricing[code]) inp.value = pricing[code];
  });
};

// Toggle open/close the pricing panel
window.togglePricingPanel = function() {
  const panel = document.getElementById('pricingPanelContent');
  const arrow = document.getElementById('pricingPanelArrow');
  if (!panel) return;
  const isOpen = panel.style.maxHeight && panel.style.maxHeight !== '0px' && panel.style.maxHeight !== '0';
  if (isOpen) {
    panel.style.maxHeight = '0';
    if (arrow) { arrow.textContent = '▼'; arrow.style.transform = 'rotate(0deg)'; }
  } else {
    panel.style.maxHeight = '1200px';
    if (arrow) { arrow.textContent = '▲'; arrow.style.transform = 'rotate(0deg)'; }
    window.loadSetupPricingInputs();
  }
};

// Save price for a country code and immediately update all drafts & replies
window.saveSetupPrice = function(countryCode, symbol, currCode, rawValue) {
  const price = parseInt(rawValue, 10);
  if (!price || price <= 0) return;

  if (!state.countryPricing) state.countryPricing = {};
  state.countryPricing[countryCode] = price;
  localStorage.setItem('swastik_country_pricing', JSON.stringify(state.countryPricing));

  // Update matching drafts
  let draftCount = 0;
  (state.drafts || []).forEach(d => {
    if (d.business && (d.business.countryCode === countryCode || (countryCode === 'EU' && ['DE','FR','ES','IT','NL'].includes(d.business.countryCode)))) {
      if (!d.diagnostic) d.diagnostic = {};
      d.diagnostic.packagePrice = price;
      d.diagnostic.formattedPrice = `${symbol}${price.toLocaleString()}`;
      const priceRegex = /(flat (turnkey )?(investment|fee|package) of\s*)([^\s,.\n]+)/gi;
      d.body = d.body.replace(priceRegex, `$1${symbol}${price.toLocaleString()}`);
      if (window.swastikDB) window.swastikDB.saveDraft(d);
      draftCount++;
    }
  });

  // Update matching reply drafts (only if client asked about pricing)
  const priceKeywords = ['cost','price','how much','charge','rate','package','fee','quote','budget','investment'];
  let replyCount = 0;
  (state.replies || []).forEach(rep => {
    const msgLower = (rep.message || '').toLowerCase();
    const isPriceQuery = priceKeywords.some(k => msgLower.includes(k));
    const countryMatch = rep.countryCode === countryCode || (!rep.countryCode && countryCode === 'IN');
    if (isPriceQuery && countryMatch) {
      const formattedPrice = `${symbol}${price.toLocaleString()} (${currCode})`;
      let draft = rep.draftReply || '';
      draft = draft.replace(/Investment is a flat, transparent [^\n]+/gi, `Investment is a flat, transparent ${formattedPrice} with no hidden fees.`);
      draft = draft.replace(/Our full agency package is [^\n]+/gi, `Our full agency package is ${formattedPrice} with rapid 5 to 7 business days delivery.`);
      draft = draft.replace(/• Starter High-Converting Site: [^\n]+/gi, `• Starter High-Converting Site: ${symbol}${price.toLocaleString()}`);
      rep.draftReply = draft;
      replyCount++;
    }
  });

  if (state.replies && state.replies.length) {
    localStorage.setItem('swastik_replies', JSON.stringify(state.replies));
  }
  saveLocal();

  // Re-render if on approve tab
  if (draftCount > 0 && typeof renderApproveList === 'function') {
    renderApproveList();
  }

  if (draftCount > 0 || replyCount > 0) {
    showToast(`💰 ${symbol}${price.toLocaleString()} saved for ${countryCode}! Updated ${draftCount} drafts & ${replyCount} replies.`, 'success', 4000);
  }
};

// Load pricing from localStorage on startup (with authentic defaults)
window.initCountryPricing = function() {
  const defaultPricing = {
    IN: 25000,
    US: 299,
    GB: 249,
    AE: 1100,
    AU: 449,
    CA: 399,
    SG: 399,
    EU: 279
  };
  try {
    const saved = localStorage.getItem('swastik_country_pricing');
    const parsed = saved ? JSON.parse(saved) : {};
    state.countryPricing = Object.assign({}, defaultPricing, parsed);
  } catch (e) {
    state.countryPricing = Object.assign({}, defaultPricing);
  }
  if (!localStorage.getItem('swastik_country_pricing')) {
    localStorage.setItem('swastik_country_pricing', JSON.stringify(state.countryPricing));
  }
};

