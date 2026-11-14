/* ═══════════════════════════════════════════════════════════
   SWASTIK – Real-Time Tracking & WhatsApp AI Auto-Closing Agent
   Detects email opens, clicks, and AI generates WhatsApp objection responses
   ═══════════════════════════════════════════════════════════ */

class TrackingAndCloserEngine {
  constructor() {
    this.events = JSON.parse(localStorage.getItem('swastik_track_events') || '[]');
  }

  save() {
    localStorage.setItem('swastik_track_events', JSON.stringify(this.events));
  }

  /* ────────────────────────────────────────────────────────
     SIMULATE / RECORD EMAIL OPEN OR CLICK EVENT
  ──────────────────────────────────────────────────────── */
  recordEvent(type, bizName, email) {
    const event = {
      id: 'evt_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      type, // 'email_opened', 'link_clicked', 'mockup_viewed'
      bizName,
      email,
      timestamp: Date.now()
    };

    this.events.unshift(event);
    if (this.events.length > 50) this.events.length = 50;
    this.save();

    // Trigger immediate Alert (Telegram Free + WhatsApp)
    const icon = type === 'mockup_viewed' ? '🎨' : (type === 'link_clicked' ? '🔗' : '👁️');
    const actionName = type === 'mockup_viewed' ? 'viewed your live website mockup' :
                       (type === 'link_clicked' ? 'clicked your portfolio link' : 'opened your cold email');

    const alertMessage = `${icon} *PROSPECT ENGAGEMENT DETECTED!*
─────────────────────
🏢 *Business:* ${bizName}
📩 *Email:* ${email}
⚡ *Action:* Prospect just ${actionName}!
🕒 *Time:* ${new Date().toLocaleTimeString()}

👉 *Pro Tip:* Call or message them now while their interest is at peak!`;

    if (window.swastikTelegram) {
      if (type === 'mockup_viewed') {
        window.swastikTelegram.notifyMockupViewed({ bizName, email });
      } else if (type === 'email_opened') {
        window.swastikTelegram.notifyEmailOpened({ bizName, email });
      } else {
        window.swastikTelegram.sendAlert(`${icon} Prospect Engagement: ${bizName}`, alertMessage);
      }
    }

    if (window.swastikWhatsApp) {
      window.swastikWhatsApp.sendAlert('SYSTEM_ALERT', {
        message: alertMessage
      });
    }

    if (window.showToast) {
      window.showToast(`👁️ Prospect Engagement: "${bizName}" just viewed your pitch!`, 'success');
    }

    return event;
  }

  /* ────────────────────────────────────────────────────────
     AI WHATSAPP AUTO-CLOSING BOT: Formulates closing responses
  ──────────────────────────────────────────────────────── */
  generateClosingResponse(inquiryType, clientDetails = {}) {
    const s = (window.getSettingsFromUI ? window.getSettingsFromUI() : {}) || {};
    const yourName = s.yourName || 'Swastik';
    const yourPhone = s.yourPhone || '9511347627';
    const biz = clientDetails.name || 'your business';

    const responses = {
      pricing: `Hi! Thanks for asking. For ${biz}, our complete mobile-first website package includes:
1. Fast mobile layout + custom branding
2. 1-Click WhatsApp table/appointment booking
3. Google Maps SEO setup & review showcase
4. Turnaround: 5 to 7 business days

Packages start at a flat, no-hidden-cost investment of ₹12,500 ($149). Would you like me to send you the custom mockup link for ${biz}?`,

      timeline: `We specialize in rapid deployment! We can build, test, and launch the full custom website for ${biz} in just 5 to 7 business days with zero downtime for your existing customers.`,

      portfolio: `You can check out some of our recent live client builds here: https://swastik.dev/portfolio. We have specific designs tailored for ${clientDetails.type || 'local businesses'}!`,

      objection_not_interested: `Completely understand! If you ever decide you'd like 20–30% more walk-in inquiries or want to modernize your booking system in the future, you have my number right here on WhatsApp. Wishing ${biz} massive success!`,

      book_call: `Awesome! Let's do a quick 5-minute WhatsApp call so I can show you how the automated booking works for ${biz}. Are you free this afternoon around 4 PM, or does tomorrow morning work better?`
    };

    return responses[inquiryType] || responses.pricing;
  }

  getRecentEvents() {
    return this.events.slice(0, 15);
  }
}

// Global instance
window.swastikTracker = new TrackingAndCloserEngine();

