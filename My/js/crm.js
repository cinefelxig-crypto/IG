/* ═══════════════════════════════════════════════════════════
   SWASTIK – Executive Deal Pipeline & Revenue CRM
   Kanban stages: Discovered -> Dispatched -> Opened -> Replied -> Won
   ═══════════════════════════════════════════════════════════ */

class DealPipelineCRM {
  constructor() {
    this.deals = JSON.parse(localStorage.getItem('swastik_deals') || '[]');
  }

  save() {
    localStorage.setItem('swastik_deals', JSON.stringify(this.deals));
  }

  /* ────────────────────────────────────────────────────────
     ADD DEAL OR SYNC FROM DRAFT
  ──────────────────────────────────────────────────────── */
  syncDealFromDraft(draft, stage = 'dispatched') {
    const existing = this.deals.find(d => d.id === draft.id);
    const baseUSD = {
      cafe: 800, restaurant: 1500, gym: 1800, salon: 1200,
      spa: 1400, dentist: 2500, hotel: 3500, bar: 1600,
      bakery: 900, pharmacy: 1200, retail: 1400, lawyer: 2800
    };

    const type = draft.business?.type || 'cafe';
    const rate = draft.business?.currencyRate || 83;
    const symbol = draft.business?.currencySymbol || '₹';
    const code = draft.business?.currencyCode || 'INR';
    const baseVal = baseUSD[type] || 1500;
    const estimatedValue = Math.round(baseVal * (rate === 1 ? 1 : rate));

    if (!existing) {
      const deal = {
        id: draft.id,
        name: draft.business.name,
        type: draft.business.type,
        city: draft.business.city || 'City',
        country: draft.business.country || '',
        currencySymbol: symbol,
        currencyCode: code,
        email: draft.business.email,
        phone: draft.business.phone,
        stage, // 'discovered', 'dispatched', 'opened', 'replied', 'won', 'lost'
        value: estimatedValue,
        sender: draft.sentFrom || draft.assignedSender,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      this.deals.unshift(deal);
      this.save();
      return deal;
    } else {
      existing.stage = stage;
      existing.updatedAt = Date.now();
      if (!existing.currencySymbol && symbol) existing.currencySymbol = symbol;
      this.save();
      return existing;
    }
  }

  /* ────────────────────────────────────────────────────────
     MOVE DEAL TO STAGE
  ──────────────────────────────────────────────────────── */
  moveDeal(dealId, newStage) {
    const deal = this.deals.find(d => d.id === dealId);
    if (deal) {
      deal.stage = newStage;
      deal.updatedAt = Date.now();
      this.save();

      if (newStage === 'won') {
        const symbol = deal.currencySymbol || '₹';
        const dealText = `🎉 *NEW DEAL CLOSED!*
─────────────────────
🏢 *Client:* ${deal.name}
💰 *Deal Value:* ${symbol}${deal.value.toLocaleString()}
📍 *Location:* ${deal.city}${deal.country ? ', ' + deal.country : ''}
🕒 *Time:* ${new Date().toLocaleTimeString()}

Outstanding work, Swastik! Website project locked in!`;

        if (window.swastikTelegram) {
          window.swastikTelegram.notifyDealWon({
            bizName: deal.name,
            amount: deal.value.toLocaleString(),
            currency: symbol,
            contact: deal.phone || deal.email || `${deal.city}`
          });
        }
        if (window.swastikWhatsApp) {
          window.swastikWhatsApp.sendAlert('SYSTEM_ALERT', {
            message: dealText
          });
        }
      }
    }
    return deal;
  }

  getPipelineMetrics() {
    let totalPipelineValue = 0;
    let wonValue = 0;
    const stageCounts = {
      discovered: 0,
      dispatched: 0,
      opened: 0,
      replied: 0,
      won: 0,
      lost: 0
    };

    this.deals.forEach(d => {
      const stage = d.stage || 'dispatched';
      if (stageCounts[stage] !== undefined) stageCounts[stage]++;
      totalPipelineValue += (d.value || 0);
      if (stage === 'won') wonValue += (d.value || 0);
    });

    return {
      totalDeals: this.deals.length,
      stageCounts,
      totalPipelineValue,
      wonValue
    };
  }

  getAllDeals() {
    return this.deals;
  }
}

// Global instance
window.swastikCRM = new DealPipelineCRM();

