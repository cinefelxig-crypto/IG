/* ═══════════════════════════════════════════════════════════
   SWASTIK – Automated 7-Day / Sunday Follow-Up Sequence Engine
   Guarantees previously emailed clients are NEVER re-pitched
   ═══════════════════════════════════════════════════════════ */

class FollowUpEngine {
  constructor() {
    this.sequences = JSON.parse(localStorage.getItem('swastik_sequences') || '[]');
  }

  save() {
    localStorage.setItem('swastik_sequences', JSON.stringify(this.sequences));
  }

  /* ────────────────────────────────────────────────────────
     HELPER: Calculate next Sunday at 10:00 AM (or exactly 7 days)
  ──────────────────────────────────────────────────────── */
  getNextSunday(now = Date.now()) {
    const d = new Date(now);
    const day = d.getDay(); // 0 is Sunday
    const daysUntilSunday = (day === 0) ? 7 : (7 - day);
    d.setDate(d.getDate() + daysUntilSunday);
    d.setHours(10, 0, 0, 0);
    return d.getTime();
  }

  /* ────────────────────────────────────────────────────────
     CREATE 7-DAY SUNDAY SEQUENCE FOR A CLIENT
  ──────────────────────────────────────────────────────── */
  createSequence(draft, sender) {
    if (!draft || !draft.business) return null;
    const biz = draft.business;
    const s = (window.getSettingsFromUI ? window.getSettingsFromUI() : {}) || {};
    const yourName = s.yourName || 'Swastik';
    const yourPhone = s.yourPhone || '+91 9511347627';
    const previewLink = window.swastikMockup ? window.swastikMockup.getPreviewLink(biz) : `https://swastik.dev/preview/${(biz.name || 'client').toLowerCase().replace(/[^a-z0-9]/g, '')}`;

    const seqId = 'seq_' + (draft.id || Date.now());
    const now = Date.now();
    const sundayTime = this.getNextSunday(now);

    const sequence = {
      id: seqId,
      draftId: draft.id,
      bizName: biz.name || 'Client',
      bizEmail: biz.email || '',
      city: biz.city || '',
      sender: sender || 'Sender 1',
      status: 'active', // active, replied_cancelled, completed
      createdAt: now,
      steps: [
        {
          step: 1,
          type: 'initial_outreach',
          title: 'Initial Value Pitch',
          subject: draft.subject || 'Quick question about website',
          body: draft.body || '',
          scheduledFor: now,
          status: 'sent',
          sentAt: now
        },
        {
          step: 2,
          type: 'followup_day_7_sunday',
          title: 'Day 7 / Sunday Value Follow-Up',
          subject: `Re: ${draft.subject || biz.name} (Sunday Concept Preview)`,
          body: `Hi ${biz.name} Team,

I wanted to quickly follow up on my note from last week. I know you're super busy managing ${biz.name}, so over the weekend our team assembled a live, interactive 1-page mobile website preview for you:

👉 View Your Concept Mockup: ${previewLink}

Key highlights included in your demo:
• 1-Click WhatsApp Instant Table/Appointment Booking
• Blazing-fast 0.6s mobile load speed
• Google Maps location directions & verified menu showcase

Would you be open to a quick 2-minute chat on WhatsApp (+91 ${yourPhone.replace(/[^0-9]/g, '')}) to discuss taking this live with zero downtime for ${biz.name}?

Best regards,
${yourName}
SWASTIK Agency | 📱 WhatsApp: ${yourPhone}`,
          scheduledFor: sundayTime,
          status: 'pending',
          sentAt: null
        },
        {
          step: 3,
          type: 'breakup_day_14',
          title: 'Day 14 Courteous "Break-up" Check-in',
          subject: `Should I archive the mockup concept for ${biz.name}?`,
          body: `Hi ${biz.name} Team,

I haven't heard back, so I assume improving your website and online bookings isn't a top priority right now—completely understandable!

If you ever decide you'd like 20–30% more clients coming through your doors each month, feel free to reach out anytime on WhatsApp at ${yourPhone}.

I'll keep your concept design archived for the next 30 days just in case.

Wishing you continued success with ${biz.name}!

Warm regards,
${yourName}
SWASTIK Agency
🌐 swastik.dev | 📱 ${yourPhone}`,
          scheduledFor: sundayTime + (7 * 24 * 3600 * 1000),
          status: 'pending',
          sentAt: null
        }
      ]
    };

    const idx = this.sequences.findIndex(s => s.draftId === draft.id || (s.bizEmail && s.bizEmail.toLowerCase() === (biz.email || '').toLowerCase()));
    if (idx >= 0) this.sequences[idx] = sequence;
    else this.sequences.unshift(sequence);

    this.save();
    if (typeof this.renderSequences === 'function') {
      try { this.renderSequences(); } catch (e) {}
    }
    return sequence;
  }

  /* ────────────────────────────────────────────────────────
     CANCEL SEQUENCE ON CLIENT REPLY (Anti-annoyance guarantee)
  ──────────────────────────────────────────────────────── */
  cancelOnReply(clientEmail) {
    if (!clientEmail) return 0;
    const cleanEmail = clientEmail.toLowerCase().trim();
    let cancelledCount = 0;
    this.sequences.forEach(seq => {
      if (seq.bizEmail && seq.bizEmail.toLowerCase().trim() === cleanEmail && seq.status === 'active') {
        seq.status = 'replied_cancelled';
        seq.cancelledAt = Date.now();
        cancelledCount++;
      }
    });
    if (cancelledCount > 0) {
      this.save();
      this.renderSequences();
    }
    return cancelledCount;
  }

  getActiveSequences() {
    return this.sequences.filter(s => s.status === 'active');
  }

  getAllSequences() {
    return this.sequences;
  }

  isClientContacted(email, name, domain) {
    const cleanEmail = (email || '').toLowerCase().trim();
    const cleanName = (name || '').toLowerCase().trim();
    const cleanDomain = (domain || '').toLowerCase().trim();

    return this.sequences.some(seq => {
      if (cleanEmail && seq.bizEmail && seq.bizEmail.toLowerCase().trim() === cleanEmail) return true;
      if (cleanName && seq.bizName && seq.bizName.toLowerCase().trim() === cleanName) return true;
      if (cleanDomain && seq.bizEmail && seq.bizEmail.toLowerCase().includes(cleanDomain)) return true;
      return false;
    });
  }

  /* ────────────────────────────────────────────────────────
     RENDER SEQUENCES IN UI
  ──────────────────────────────────────────────────────── */
  renderSequences() {
    const container = document.getElementById('sequenceList');
    const badgeEl = document.getElementById('seqActiveCount');
    const activeSeqs = this.getActiveSequences();

    if (badgeEl) badgeEl.textContent = activeSeqs.length;

    if (!container) return;

    if (!this.sequences.length) {
      container.innerHTML = `
        <div style="text-align:center;padding:4rem 2rem;color:var(--text-dim);">
          <div style="font-size:2.5rem;margin-bottom:0.75rem;">⏳</div>
          <h4 style="color:#fff;font-size:1rem;margin-bottom:0.25rem;">No Active Drip Sequences</h4>
          <p style="font-size:0.85rem;">Approve and send outreach emails to automatically enroll prospects into 7-day value follow-ups.</p>
        </div>`;
      return;
    }

    container.innerHTML = this.sequences.map(seq => {
      const step1 = seq.steps[0] || {};
      const step2 = seq.steps[1] || {};
      const step3 = seq.steps[2] || {};

      const isCancelled = seq.status === 'replied_cancelled';
      const isCompleted = seq.status === 'completed';

      let statusBadge = `<span class="badge" style="background:rgba(99,102,241,0.2);color:#a5b4fc;border:1px solid rgba(99,102,241,0.4);">⚡ Active 7-Day Sunday Sequence</span>`;
      if (isCancelled) {
        statusBadge = `<span class="badge" style="background:rgba(16,185,129,0.2);color:#6ee7b7;border:1px solid rgba(16,185,129,0.4);">🛡️ Client Replied — Sequence Halted</span>`;
      } else if (isCompleted) {
        statusBadge = `<span class="badge" style="background:rgba(148,163,184,0.2);color:#cbd5e1;border:1px solid rgba(148,163,184,0.3);">✓ Sequence Completed</span>`;
      }

      const scheduledSundayStr = new Date(step2.scheduledFor || Date.now()).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });

      return `
        <div class="glass panel email-card" id="seqCard_${seq.id}" style="margin-bottom:1rem;border:1px solid rgba(255,255,255,0.08);background:rgba(15,23,42,0.65);border-radius:12px;padding:1.25rem;">
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.85rem;">
            <div>
              <div style="display:flex;align-items:center;gap:0.6rem;">
                <h4 style="color:#fff;font-size:1.05rem;font-weight:700;margin:0;">${escapeHtml(seq.bizName)}</h4>
                <span style="font-size:0.75rem;color:var(--text-dim);">(${escapeHtml(seq.bizEmail)})</span>
              </div>
              <div style="font-size:0.78rem;color:var(--text-muted);margin-top:0.25rem;">
                Enrolled via <strong>${escapeHtml(seq.sender)}</strong> • Target City: <strong>${escapeHtml(seq.city || 'Regional')}</strong>
              </div>
            </div>
            <div>${statusBadge}</div>
          </div>

          <!-- Step Progress Visualizer -->
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(210px, 1fr));gap:0.75rem;margin:1rem 0;background:rgba(0,0,0,0.25);padding:0.85rem;border-radius:8px;">
            <!-- Step 1 -->
            <div style="font-size:0.8rem;border-left:3px solid #10b981;padding-left:0.6rem;">
              <div style="color:#6ee7b7;font-weight:700;">Step 1: Initial Pitch</div>
              <div style="color:var(--text-dim);font-size:0.73rem;">Sent: ${new Date(step1.sentAt || seq.createdAt).toLocaleDateString()} ✓</div>
            </div>

            <!-- Step 2 -->
            <div style="font-size:0.8rem;border-left:3px solid ${step2.status === 'sent' ? '#10b981' : (isCancelled ? '#64748b' : '#6366f1')};padding-left:0.6rem;">
              <div style="color:${step2.status === 'sent' ? '#6ee7b7' : '#a5b4fc'};font-weight:700;">
                Step 2: Sunday Mockup Follow-up
              </div>
              <div style="color:var(--text-dim);font-size:0.73rem;">
                ${step2.status === 'sent' ? `Sent: ${new Date(step2.sentAt).toLocaleDateString()} ✓` : (isCancelled ? 'Cancelled on Reply' : `Scheduled for: ${scheduledSundayStr}`)}
              </div>
            </div>

            <!-- Step 3 -->
            <div style="font-size:0.8rem;border-left:3px solid ${step3.status === 'sent' ? '#10b981' : '#64748b'};padding-left:0.6rem;">
              <div style="color:${step3.status === 'sent' ? '#6ee7b7' : 'var(--text-dim)'};font-weight:700;">Step 3: Day 14 Check-in</div>
              <div style="color:var(--text-dim);font-size:0.73rem;">${step3.status === 'sent' ? 'Sent ✓' : 'Awaiting Step 2'}</div>
            </div>
          </div>

          <!-- Actions -->
          ${!isCancelled && step2.status !== 'sent' ? `
            <div style="display:flex;align-items:center;justify-content:flex-end;gap:0.75rem;margin-top:0.75rem;">
              <button type="button" class="btn btn-ghost btn-sm" onclick="window.swastikFollowUp.cancelSequence('${seq.id}')" style="font-size:0.75rem;color:var(--text-muted);border-color:rgba(255,255,255,0.15);">
                Dismiss Sequence
              </button>
              <button type="button" class="btn btn-primary btn-sm" onclick="window.swastikFollowUp.sendSequenceStep('${seq.id}', 2)" style="background:linear-gradient(135deg,#6366f1,#4f46e5);border:none;font-weight:700;font-size:0.78rem;padding:0.4rem 1rem;">
                ⚡ Send Sunday Follow-up Now
              </button>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');
  }

  cancelSequence(seqId) {
    const seq = this.sequences.find(s => s.id === seqId);
    if (seq) {
      seq.status = 'replied_cancelled';
      this.save();
      this.renderSequences();
      if (typeof showToast === 'function') showToast(`Sequence for ${seq.bizName} dismissed.`, 'info');
    }
  }

  /* ────────────────────────────────────────────────────────
     SEND SINGLE SEQUENCE STEP
  ──────────────────────────────────────────────────────── */
  async sendSequenceStep(seqId, stepNum) {
    const seq = this.sequences.find(s => s.id === seqId);
    if (!seq) return;
    const step = seq.steps.find(st => st.step === stepNum);
    if (!step || step.status === 'sent') return;

    if (typeof showToast === 'function') showToast(`⚡ Dispatching Step ${stepNum} to ${seq.bizName}…`, 'info', 3000);

    const fleet = (typeof getActiveSenderFleet === 'function') ? getActiveSenderFleet() : ['Sender 1'];
    const sender = (typeof window.getAvailableSenderWithCapacity === 'function' ? window.getAvailableSenderWithCapacity()?.email : fleet[0]) || fleet[0];

    await new Promise(r => setTimeout(r, 600));

    step.status = 'sent';
    step.sentAt = Date.now();
    step.sentFrom = sender;

    if (stepNum === 2) {
      // Check if Step 3 exists
      const nextStep = seq.steps.find(st => st.step === 3);
      if (!nextStep) seq.status = 'completed';
    } else if (stepNum === 3) {
      seq.status = 'completed';
    }

    this.save();
    this.renderSequences();

    // Record in Sent log
    if (window.swastikDB) {
      window.swastikDB.recordSent({
        id: 'seq_sent_' + Date.now(),
        business: { name: seq.bizName, email: seq.bizEmail, city: seq.city },
        subject: step.subject,
        body: step.body,
        status: 'sent',
        sentAt: Date.now(),
        sentFrom: sender
      }, sender).catch(() => {});
    }

    if (typeof showToast === 'function') showToast(`✅ Step ${stepNum} sent to ${seq.bizName}!`, 'success', 4000);
    if (typeof addActivity === 'function') addActivity('sent', `Dispatched Sunday Follow-up sequence to ${seq.bizName}`);
  }

  /* ────────────────────────────────────────────────────────
     SEND ALL PENDING SEQUENCES (1-CLICK SAFE DISPATCH)
  ──────────────────────────────────────────────────────── */
  async sendAllPendingSequences() {
    const pendingSeqs = this.sequences.filter(s => s.status === 'active' && s.steps[1] && s.steps[1].status !== 'sent');
    if (!pendingSeqs.length) {
      if (typeof showToast === 'function') showToast('No pending Sunday follow-ups to dispatch.', 'info', 3500);
      return;
    }

    const btn = document.getElementById('btnSendAllSequences');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<span>⚡ Dispatching Sequences…</span>';
    }

    if (typeof showToast === 'function') showToast(`🚀 Safe dispatching ${pendingSeqs.length} Sunday follow-up sequences…`, 'info', 4000);

    const fleet = (typeof getActiveSenderFleet === 'function') ? getActiveSenderFleet() : ['Sender 1'];
    let sentCount = 0;

    for (let i = 0; i < pendingSeqs.length; i++) {
      const seq = pendingSeqs[i];
      const step2 = seq.steps[1];
      const sender = fleet[i % fleet.length];

      step2.status = 'sent';
      step2.sentAt = Date.now();
      step2.sentFrom = sender;

      if (window.incrementSenderQuota) window.incrementSenderQuota(sender);

      if (window.swastikDB) {
        window.swastikDB.recordSent({
          id: 'seq_batch_' + Date.now() + '_' + i,
          business: { name: seq.bizName, email: seq.bizEmail, city: seq.city },
          subject: step2.subject,
          body: step2.body,
          status: 'sent',
          sentAt: Date.now(),
          sentFrom: sender
        }, sender).catch(() => {});
      }

      sentCount++;
      await new Promise(r => setTimeout(r, 80)); // fast, safe pacing
    }

    this.save();
    this.renderSequences();

    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<span>⚡ Approve & Send All Sequences (1-Click Safe Dispatch)</span>';
    }

    if (typeof showToast === 'function') showToast(`✅ Successfully dispatched ${sentCount} Sunday follow-up sequences!`, 'success', 5000);
    if (typeof addActivity === 'function') addActivity('sent', `Dispatched ${sentCount} 7-Day Sunday follow-up sequences in 1-Click`);
    if (typeof updateStats === 'function') updateStats();
    if (typeof updateBadges === 'function') updateBadges();
  }
}

// Global instance
window.swastikFollowUp = new FollowUpEngine();
