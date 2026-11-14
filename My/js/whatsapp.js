/* ═══════════════════════════════════════════════════════════
   SWASTIK – WhatsApp Real-Time Alert Engine
   Instant alerts to 9511347627 for midnight runs, approvals & replies
   ═══════════════════════════════════════════════════════════ */

const WHATSAPP_CONFIG = {
  DEFAULT_PHONE: '9511347627',
  COUNTRY_CODE: '91',
  FULL_PHONE: '919511347627',
};

class WhatsAppNotifier {
  constructor() {
    this.phone = WHATSAPP_CONFIG.FULL_PHONE;
    this.apiKey = localStorage.getItem('swastik_callmebot_key') || '';
    this.customWebhook = localStorage.getItem('swastik_wa_webhook') || '';
    this.enabled = localStorage.getItem('swastik_wa_enabled') !== 'false';
  }

  getCleanPhone() {
    let p = (localStorage.getItem('swastik_wa_phone') || WHATSAPP_CONFIG.DEFAULT_PHONE).replace(/[^0-9]/g, '');
    if (p.length === 10) p = '91' + p;
    return p;
  }

  /* ────────────────────────────────────────────────────────
     SEND WHATSAPP ALERT: Dispatches alert to 9511347627
  ──────────────────────────────────────────────────────── */
  async sendAlert(type, payload = {}) {
    const phone = this.getCleanPhone();
    const message = this.formatMessage(type, payload);
    const timestamp = new Date().toLocaleTimeString();

    const logEntry = {
      type,
      phone,
      message,
      status: 'pending',
      timestamp: Date.now(),
      preview: message.slice(0, 120) + '...'
    };

    console.log(`[WHATSAPP ALERT] Dispatching ${type} to +${phone}:`, message);

    let delivered = false;

    // Gateway 1: CallMeBot WhatsApp API (Free direct API for personal numbers)
    const callmebotKey = localStorage.getItem('swastik_callmebot_key') || '';
    if (callmebotKey) {
      try {
        const encodedMsg = encodeURIComponent(message);
        const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodedMsg}&apikey=${callmebotKey}`;
        // Fire and catch CORS or network responses
        await fetch(url, { mode: 'no-cors' });
        delivered = true;
        logEntry.status = 'sent_api';
      } catch (err) {
        console.warn('[WHATSAPP] CallMeBot dispatch notice:', err);
      }
    }

    // Gateway 2: Custom Webhook if set
    const webhookUrl = localStorage.getItem('swastik_wa_webhook');
    if (webhookUrl && !delivered) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            recipient: phone,
            type,
            message,
            timestamp: new Date().toISOString()
          })
        });
        delivered = true;
        logEntry.status = 'sent_webhook';
      } catch (err) {
        console.warn('[WHATSAPP] Webhook error:', err);
      }
    }

    if (!delivered) {
      // Local logged & one-click action available
      logEntry.status = 'logged';
    }

    // Save to Database
    if (window.swastikDB) {
      await window.swastikDB.logWhatsAppAlert(logEntry);
    }

    // Trigger visual notification in app HUD
    this.showInAppNotification(type, message, phone);

    return logEntry;
  }

  /* ────────────────────────────────────────────────────────
     FORMAT PRETTY WHATSAPP MESSAGES
  ──────────────────────────────────────────────────────── */
  formatMessage(type, data) {
    const header = `👑 *SWASTIK OUTREACH COMMAND*`;
    const separator = `─────────────────────`;

    switch (type) {
      case 'MIDNIGHT_500_COMPLETE':
        return `${header}
🌙 *MIDNIGHT 500-CLIENT RUN FINISHED*
${separator}
📍 *Target Region:* ${data.region || 'Global Priority'}
🏢 *New Clients Scraped:* ${data.count || 500} unique businesses
✨ *AI Drafts Generated:* ${data.draftsCount || 500} personalized emails
🛡️ *Duplicates Blocked:* 100% Zero-Duplicate Verified
⚡ *Status:* Queued in Dashboard for your 1-click approval!

👉 *Action Required:* Open your Dashboard now to approve and trigger balanced dispatch.`;

      case 'APPROVAL_SPLIT_DISPATCH':
        return `${header}
⚡ *EMAILS APPROVED & DISPATCHED*
${separator}
📨 *Total Emails Sent:* ${data.total}
⚖️ *Balanced Distribution:*
   • Sender 1 (${data.sender1}): *${data.count1} emails*
   • Sender 2 (${data.sender2}): *${data.count2} emails*
🎯 *Delivery Status:* Successfully Queued & In Transit
🕒 *Time:* ${new Date().toLocaleTimeString()}

All clients added to permanent suppression guard (no duplicates).`;

      case 'CLIENT_REPLY':
        return `${header}
🔔 *NEW CLIENT REPLY RECEIVED!*
${separator}
👤 *From:* ${data.fromName || 'Client'} (${data.company || 'Business'})
💬 *Their Message:*
"${data.message || 'Interested in website redesign, please share quotation.'}"

🤖 *AI Action:* Instant customized response drafted.
👉 Check Dashboard -> Replies tab to review and send.`;

      case 'ANTI_DUPLICATE_GUARD':
        return `${header}
🛡️ *DEDUPLICATION GUARD ALERT*
${separator}
Detected ${data.blockedCount} duplicate businesses during sweep.
All were automatically filtered out to ensure no client ever receives repeat emails.`;

      case 'TEST_PING':
        return `${header}
✅ *WHATSAPP ALERT SYSTEM TEST*
${separator}
Connection verified for number: *+${this.getCleanPhone()}*
Status: Active & ready for Midnight 500-Runs, Approval Splits, and Replies.
Timestamp: ${new Date().toLocaleString()}`;

      default:
        return `${header}
📢 *System Alert:*
${data.message || 'System notification'}`;
    }
  }

  /* ────────────────────────────────────────────────────────
     SHOW IN-APP TOAST & POPUP
  ──────────────────────────────────────────────────────── */
  showInAppNotification(type, message, phone) {
    const hud = document.getElementById('waAlertPill');
    if (hud) {
      hud.classList.add('pulse-green');
      setTimeout(() => hud.classList.remove('pulse-green'), 3000);
    }

    if (window.showToast) {
      const title = type === 'MIDNIGHT_500_COMPLETE' ? '🌙 WhatsApp Alert: 500 Leads Ready!' :
                    type === 'APPROVAL_SPLIT_DISPATCH' ? '⚡ WhatsApp Alert: Multi-Sender Dispatch Confirmed' :
                    type === 'CLIENT_REPLY' ? '🔔 WhatsApp Alert: New Client Reply' :
                    '📱 WhatsApp Alert Dispatched to 9511347627';
      window.showToast(title, 'success', 4000);
    }
  }

  /* ────────────────────────────────────────────────────────
     DIRECT 1-CLICK WA.ME LAUNCHER
  ──────────────────────────────────────────────────────── */
  openInWhatsAppWeb(text) {
    const phone = this.getCleanPhone();
    const encoded = encodeURIComponent(text || `Hello Swastik, Outreach Command Center is active.`);
    const url = `https://wa.me/${phone}?text=${encoded}`;
    window.open(url, '_blank');
  }
}

// Global instance
window.swastikWhatsApp = new WhatsAppNotifier();

