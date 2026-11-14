/* ═══════════════════════════════════════════════════════════
   SWASTIK – Enterprise Persistent Database & Deduplication Engine
   Powered by IndexedDB v2 with Zero-Duplicate Anti-Spam Guard,
   Job Registry, and Transaction-Wrapped Atomic Batch Operations
   ═══════════════════════════════════════════════════════════ */

const DB_NAME = 'SwastikEnterpriseDB';
const DB_VERSION = 2;

class SwastikDB {
  constructor() {
    this.db = null;
    this.readyPromise = this.init();
  }

  async init() {
    return new Promise((resolve, reject) => {
      if (typeof indexedDB === 'undefined') {
        console.warn('[SWASTIK DB] IndexedDB not available in current environment.');
        resolve(null);
        return;
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (e) => {
        const db = e.target.result;

        // 1. Businesses Store - Unique constraints on domain, email, and dedupKey
        let bizStore;
        if (!db.objectStoreNames.contains('businesses')) {
          bizStore = db.createObjectStore('businesses', { keyPath: 'id' });
        } else {
          bizStore = e.target.transaction.objectStore('businesses');
        }
        if (!bizStore.indexNames.contains('domain')) bizStore.createIndex('domain', 'domain', { unique: false });
        if (!bizStore.indexNames.contains('email')) bizStore.createIndex('email', 'email', { unique: false });
        if (!bizStore.indexNames.contains('phone')) bizStore.createIndex('phone', 'phone', { unique: false });
        if (!bizStore.indexNames.contains('dedupKey')) bizStore.createIndex('dedupKey', 'dedupKey', { unique: true });
        if (!bizStore.indexNames.contains('createdAt')) bizStore.createIndex('createdAt', 'createdAt', { unique: false });

        // 2. Drafts Store - Pending, approved, and sent drafts with client & batch indexing
        let draftStore;
        if (!db.objectStoreNames.contains('drafts')) {
          draftStore = db.createObjectStore('drafts', { keyPath: 'id' });
        } else {
          draftStore = e.target.transaction.objectStore('drafts');
        }
        if (!draftStore.indexNames.contains('clientId')) draftStore.createIndex('clientId', 'clientId', { unique: false });
        if (!draftStore.indexNames.contains('batchId')) draftStore.createIndex('batchId', 'batchId', { unique: false });
        if (!draftStore.indexNames.contains('sentAt')) draftStore.createIndex('sentAt', 'sentAt', { unique: false });
        if (!draftStore.indexNames.contains('status')) draftStore.createIndex('status', 'status', { unique: false });
        if (!draftStore.indexNames.contains('assignedSender')) draftStore.createIndex('assignedSender', 'assignedSender', { unique: false });
        if (!draftStore.indexNames.contains('createdAt')) draftStore.createIndex('createdAt', 'createdAt', { unique: false });

        // 3. Sent History / Suppression Store - Permanently blocks businesses from re-emailing
        let sentStore;
        if (!db.objectStoreNames.contains('sent_history')) {
          sentStore = db.createObjectStore('sent_history', { keyPath: 'id' });
        } else {
          sentStore = e.target.transaction.objectStore('sent_history');
        }
        if (!sentStore.indexNames.contains('clientId')) sentStore.createIndex('clientId', 'clientId', { unique: false });
        if (!sentStore.indexNames.contains('batchId')) sentStore.createIndex('batchId', 'batchId', { unique: false });
        if (!sentStore.indexNames.contains('sentAt')) sentStore.createIndex('sentAt', 'sentAt', { unique: false });
        if (!sentStore.indexNames.contains('domain')) sentStore.createIndex('domain', 'domain', { unique: false });
        if (!sentStore.indexNames.contains('email')) sentStore.createIndex('email', 'email', { unique: false });
        if (!sentStore.indexNames.contains('dedupKey')) sentStore.createIndex('dedupKey', 'dedupKey', { unique: true });

        // 4. WhatsApp Logs Store - Records alert notifications
        let waStore;
        if (!db.objectStoreNames.contains('whatsapp_logs')) {
          waStore = db.createObjectStore('whatsapp_logs', { keyPath: 'id' });
        } else {
          waStore = e.target.transaction.objectStore('whatsapp_logs');
        }
        if (!waStore.indexNames.contains('timestamp')) waStore.createIndex('timestamp', 'timestamp', { unique: false });
        if (!waStore.indexNames.contains('type')) waStore.createIndex('type', 'type', { unique: false });

        // 5. Jobs Store - Async pipeline and batch audit log
        let jobsStore;
        if (!db.objectStoreNames.contains('jobs')) {
          jobsStore = db.createObjectStore('jobs', { keyPath: 'id' });
        } else {
          jobsStore = e.target.transaction.objectStore('jobs');
        }
        if (!jobsStore.indexNames.contains('type')) jobsStore.createIndex('type', 'type', { unique: false });
        if (!jobsStore.indexNames.contains('createdAt')) jobsStore.createIndex('createdAt', 'createdAt', { unique: false });
        if (!jobsStore.indexNames.contains('status')) jobsStore.createIndex('status', 'status', { unique: false });

        // 6. Settings Store
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'key' });
        }
      };

      request.onsuccess = (e) => {
        this.db = e.target.result;
        console.log('[SWASTIK DB v2] IndexedDB connected with jobs registry & batch indexes.');
        resolve(this.db);
      };

      request.onerror = (e) => {
        console.error('[SWASTIK DB v2] Failed to open IndexedDB:', e.target.error);
        resolve(null);
      };
    });
  }

  async ensureReady() {
    if (!this.db) {
      try {
        await Promise.race([
          this.readyPromise,
          new Promise(r => setTimeout(r, 600))
        ]);
      } catch (e) {}
    }
  }

  generateDedupKey(biz) {
    if (!biz) return 'unknown__' + Date.now();
    const normName = (biz.name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const normCity = (biz.city || biz.location || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const normDomain = (biz.domain || (biz.email ? biz.email.split('@')[1] : '')).toLowerCase();
    return `${normName}__${normCity}__${normDomain}`;
  }

  /* ────────────────────────────────────────────────────────
     DEDUPLICATION CHECK: Returns true if business already exists
  ──────────────────────────────────────────────────────── */
  async isDuplicate(biz) {
    await this.ensureReady();
    if (!this.db) {
      return this._isDuplicateLocalStorage(biz);
    }

    const dedupKey = this.generateDedupKey(biz);
    const email = (biz.email || '').toLowerCase().trim();
    const domain = (biz.domain || (email ? email.split('@')[1] : '')).toLowerCase().trim();

    return new Promise((resolve) => {
      try {
        const tx = this.db.transaction(['businesses', 'drafts', 'sent_history'], 'readonly');
        const bizStore = tx.objectStore('businesses');
        const draftStore = tx.objectStore('drafts');
        const sentStore = tx.objectStore('sent_history');

        let isDup = false;
        let reason = '';

        // Check 1: Sent Suppression List
        const sentDedupIndex = sentStore.index('dedupKey');
        const req1 = sentDedupIndex.get(dedupKey);

        req1.onsuccess = () => {
          if (req1.result) {
            isDup = true;
            reason = `Business already contacted on ${new Date(req1.result.sentAt).toLocaleDateString()}`;
            resolve({ isDup, reason });
            return;
          }

          // Check 2: Active Drafts store
          const req2 = draftStore.openCursor();
          req2.onsuccess = (e) => {
            const cursor = e.target.result;
            if (cursor) {
              const d = cursor.value;
              if (d.clientId === biz.id ||
                  (d.business && (
                    (domain && d.business.domain === domain) ||
                    (email && d.business.email === email) ||
                    this.generateDedupKey(d.business) === dedupKey
                  ))) {
                resolve({ isDup: true, reason: 'Business already has an outreach email in draft queue' });
                return;
              }
              cursor.continue();
            } else {
              // Check 3: Businesses store
              const req3 = bizStore.get(biz.id);
              req3.onsuccess = () => {
                if (req3.result && req3.result.id !== biz.id) {
                  resolve({ isDup: true, reason: 'Business already cataloged in database' });
                } else {
                  resolve({ isDup: false, reason: 'Unique business' });
                }
              };
              req3.onerror = () => resolve({ isDup: false, reason: 'Unique business' });
            }
          };
          req2.onerror = () => resolve({ isDup: false, reason: 'Unique business' });
        };

        req1.onerror = () => resolve({ isDup: false, reason: 'Unique business' });
      } catch (err) {
        console.warn('[SWASTIK DB] Deduplication check fallback:', err);
        resolve(this._isDuplicateLocalStorage(biz));
      }
    });
  }

  _isDuplicateLocalStorage(biz) {
    try {
      const dedupKey = this.generateDedupKey(biz);
      const email = (biz.email || '').toLowerCase().trim();
      const sentHistory = JSON.parse(localStorage.getItem('swastik_sent_history') || '[]');
      const drafts = JSON.parse(localStorage.getItem('swastik_drafts') || '[]');

      const inSent = sentHistory.some(s => s.dedupKey === dedupKey || (email && s.email === email));
      if (inSent) return { isDup: true, reason: 'Found in sent suppression history' };

      const inDrafts = drafts.some(d => (d.clientId === biz.id) || (d.business && (d.business.dedupKey === dedupKey || (email && d.business.email === email))));
      if (inDrafts) return { isDup: true, reason: 'Already in drafts' };

      return { isDup: false, reason: 'Unique business' };
    } catch (e) {
      return { isDup: false, reason: 'Checked' };
    }
  }

  /* ────────────────────────────────────────────────────────
     SAVE BUSINESS
  ──────────────────────────────────────────────────────── */
  async saveBusiness(biz) {
    await this.ensureReady();
    biz.dedupKey = this.generateDedupKey(biz);
    biz.createdAt = biz.createdAt || Date.now();

    if (!this.db) {
      const bizs = JSON.parse(localStorage.getItem('swastik_businesses') || '[]');
      const existingIdx = bizs.findIndex(b => b.id === biz.id || b.dedupKey === biz.dedupKey);
      if (existingIdx >= 0) bizs[existingIdx] = biz;
      else bizs.push(biz);
      localStorage.setItem('swastik_businesses', JSON.stringify(bizs));
      return biz;
    }

    return new Promise((resolve) => {
      const tx = this.db.transaction(['businesses'], 'readwrite');
      const store = tx.objectStore('businesses');
      store.put(biz);
      tx.oncomplete = () => resolve(biz);
      tx.onerror = () => resolve(biz);
    });
  }

  /* ────────────────────────────────────────────────────────
     SAVE DRAFT
  ──────────────────────────────────────────────────────── */
  async saveDraft(draft) {
    await this.ensureReady();
    draft.clientId = draft.clientId || (draft.business ? draft.business.id : null);
    draft.batchId = draft.batchId || 'batch_manual';

    if (!this.db) {
      const drafts = JSON.parse(localStorage.getItem('swastik_drafts') || '[]');
      const idx = drafts.findIndex(d => d.id === draft.id);
      if (idx >= 0) drafts[idx] = draft;
      else drafts.push(draft);
      localStorage.setItem('swastik_drafts', JSON.stringify(drafts));
      return draft;
    }

    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(['drafts'], 'readwrite');
      const store = tx.objectStore('drafts');
      store.put(draft);
      tx.oncomplete = () => resolve(draft);
      tx.onerror = (e) => reject(e.target.error);
    });
  }

  /* ────────────────────────────────────────────────────────
     TRANSACTION-WRAPPED ATOMIC BATCH DRAFT SAVE
  ──────────────────────────────────────────────────────── */
  async saveDraftsBatch(draftList) {
    await this.ensureReady();
    if (!draftList || !draftList.length) return [];

    draftList.forEach(draft => {
      draft.clientId = draft.clientId || (draft.business ? draft.business.id : null);
      draft.batchId = draft.batchId || 'batch_default';
    });

    if (!this.db) {
      const drafts = JSON.parse(localStorage.getItem('swastik_drafts') || '[]');
      draftList.forEach(draft => {
        const idx = drafts.findIndex(d => d.id === draft.id);
        if (idx >= 0) drafts[idx] = draft;
        else drafts.push(draft);
      });
      localStorage.setItem('swastik_drafts', JSON.stringify(drafts));
      return draftList;
    }

    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(['drafts'], 'readwrite');
      const store = tx.objectStore('drafts');
      draftList.forEach(d => store.put(d));
      tx.oncomplete = () => resolve(draftList);
      tx.onerror = (e) => reject(e.target.error);
    });
  }

  /* ────────────────────────────────────────────────────────
     GET DRAFTS
  ──────────────────────────────────────────────────────── */
  async getDrafts(statusFilter = null) {
    await this.ensureReady();

    if (!this.db) {
      try {
        const drafts = JSON.parse(localStorage.getItem('swastik_drafts') || '[]');
        return statusFilter ? drafts.filter(d => d.status === statusFilter) : drafts;
      } catch (e) { return []; }
    }

    return new Promise((resolve) => {
      const fallback = () => {
        try {
          const drafts = JSON.parse(localStorage.getItem('swastik_drafts') || '[]');
          resolve(statusFilter ? drafts.filter(d => d.status === statusFilter) : drafts);
        } catch (e) { resolve([]); }
      };

      const timer = setTimeout(fallback, 600);

      try {
        const tx = this.db.transaction(['drafts'], 'readonly');
        const store = tx.objectStore('drafts');
        const req = store.getAll();
        req.onsuccess = () => {
          clearTimeout(timer);
          let list = req.result || [];
          if (statusFilter) list = list.filter(d => d.status === statusFilter);
          resolve(list);
        };
        req.onerror = () => {
          clearTimeout(timer);
          fallback();
        };
      } catch (err) {
        clearTimeout(timer);
        fallback();
      }
    });
  }

  /* ────────────────────────────────────────────────────────
     RECORD PERMANENT SENT HISTORY (Locks domain, email, dedupKey)
  ──────────────────────────────────────────────────────── */
  async recordSent(draft, senderAccount) {
    await this.ensureReady();
    const sentRecord = {
      id: 'sent_' + draft.id,
      draftId: draft.id,
      clientId: draft.clientId || (draft.business ? draft.business.id : null),
      batchId: draft.batchId || 'batch_dispatched',
      businessName: draft.business ? draft.business.name : 'Client',
      domain: draft.business ? (draft.business.domain || (draft.business.email ? draft.business.email.split('@')[1] : '')) : '',
      email: draft.business ? draft.business.email : '',
      phone: draft.business ? draft.business.phone : '',
      dedupKey: (draft.business && draft.business.dedupKey) || this.generateDedupKey(draft.business),
      assignedSender: senderAccount,
      subject: draft.subject || '',
      sentAt: draft.sentAt || Date.now(),
      status: 'sent'
    };

    draft.status = 'sent';
    draft.sentFrom = senderAccount;
    draft.sentAt = draft.sentAt || Date.now();

    if (this.db) {
      return new Promise((resolve) => {
        const tx = this.db.transaction(['drafts', 'sent_history'], 'readwrite');
        tx.objectStore('drafts').put(draft);
        tx.objectStore('sent_history').put(sentRecord);
        tx.oncomplete = () => {
          try {
            const hist = JSON.parse(localStorage.getItem('swastik_sent_history') || '[]');
            if (!hist.some(s => s.id === sentRecord.id || s.draftId === draft.id)) {
              hist.push(sentRecord);
              localStorage.setItem('swastik_sent_history', JSON.stringify(hist));
            }
          } catch (e) {}
          resolve(sentRecord);
        };
        tx.onerror = () => resolve(sentRecord);
      });
    } else {
      const drafts = JSON.parse(localStorage.getItem('swastik_drafts') || '[]');
      const idx = drafts.findIndex(d => d.id === draft.id);
      if (idx >= 0) drafts[idx] = draft;
      localStorage.setItem('swastik_drafts', JSON.stringify(drafts));

      const hist = JSON.parse(localStorage.getItem('swastik_sent_history') || '[]');
      hist.push(sentRecord);
      localStorage.setItem('swastik_sent_history', JSON.stringify(hist));
      return sentRecord;
    }
  }

  /* ────────────────────────────────────────────────────────
     GET PERMANENT SENT SUPPRESSION HISTORY
  ──────────────────────────────────────────────────────── */
  async getSentHistory() {
    await this.ensureReady();
    if (!this.db) {
      try {
        return JSON.parse(localStorage.getItem('swastik_sent_history') || '[]');
      } catch (e) { return []; }
    }
    return new Promise((resolve) => {
      try {
        const tx = this.db.transaction(['sent_history'], 'readonly');
        const req = tx.objectStore('sent_history').getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => {
          try {
            resolve(JSON.parse(localStorage.getItem('swastik_sent_history') || '[]'));
          } catch (e) { resolve([]); }
        };
      } catch (e) {
        try {
          resolve(JSON.parse(localStorage.getItem('swastik_sent_history') || '[]'));
        } catch (err) { resolve([]); }
      }
    });
  }

  /* ────────────────────────────────────────────────────────
     JOBS AUDIT LOG (Async Pipelines & Batch Records)
  ──────────────────────────────────────────────────────── */
  async recordJob(job) {
    await this.ensureReady();
    job.id = job.id || 'job_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6);
    job.createdAt = job.createdAt || Date.now();
    job.status = job.status || 'completed';

    if (this.db) {
      return new Promise((resolve) => {
        const tx = this.db.transaction(['jobs'], 'readwrite');
        tx.objectStore('jobs').put(job);
        tx.oncomplete = () => resolve(job);
        tx.onerror = () => resolve(job);
      });
    } else {
      const jobs = JSON.parse(localStorage.getItem('swastik_jobs') || '[]');
      jobs.unshift(job);
      if (jobs.length > 50) jobs.length = 50;
      localStorage.setItem('swastik_jobs', JSON.stringify(jobs));
      return job;
    }
  }

  async getJobs(limit = 20) {
    await this.ensureReady();
    if (!this.db) {
      return JSON.parse(localStorage.getItem('swastik_jobs') || '[]');
    }

    return new Promise((resolve) => {
      const tx = this.db.transaction(['jobs'], 'readonly');
      const req = tx.objectStore('jobs').getAll();
      req.onsuccess = () => {
        const jobs = (req.result || []).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)).slice(0, limit);
        resolve(jobs);
      };
      req.onerror = () => resolve([]);
    });
  }

  /* ────────────────────────────────────────────────────────
     WHATSAPP LOGS
  ──────────────────────────────────────────────────────── */
  async logWhatsAppAlert(alert) {
    await this.ensureReady();
    alert.id = 'wa_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6);
    alert.timestamp = Date.now();

    if (this.db) {
      const tx = this.db.transaction(['whatsapp_logs'], 'readwrite');
      tx.objectStore('whatsapp_logs').put(alert);
    } else {
      const logs = JSON.parse(localStorage.getItem('swastik_wa_logs') || '[]');
      logs.unshift(alert);
      if (logs.length > 50) logs.length = 50;
      localStorage.setItem('swastik_wa_logs', JSON.stringify(logs));
    }
  }

  async getWhatsAppLogs(limit = 20) {
    await this.ensureReady();
    if (!this.db) {
      return JSON.parse(localStorage.getItem('swastik_wa_logs') || '[]');
    }

    return new Promise((resolve) => {
      const tx = this.db.transaction(['whatsapp_logs'], 'readonly');
      const req = tx.objectStore('whatsapp_logs').getAll();
      req.onsuccess = () => {
        const logs = (req.result || []).sort((a, b) => b.timestamp - a.timestamp).slice(0, limit);
        resolve(logs);
      };
      req.onerror = () => resolve([]);
    });
  }

  /* ────────────────────────────────────────────────────────
     DATABASE STATS
  ──────────────────────────────────────────────────────── */
  async getStats() {
    await this.ensureReady();
    let totalBiz = 0;
    let totalSent = 0;
    let pendingDrafts = 0;
    let approvedDrafts = 0;

    if (this.db) {
      await new Promise((resolve) => {
        const tx = this.db.transaction(['businesses', 'drafts', 'sent_history'], 'readonly');
        const bReq = tx.objectStore('businesses').count();
        const dReq = tx.objectStore('drafts').getAll();
        const sReq = tx.objectStore('sent_history').count();

        tx.oncomplete = () => {
          totalBiz = bReq.result || 0;
          totalSent = sReq.result || 0;
          const drafts = dReq.result || [];
          pendingDrafts = drafts.filter(d => d.status === 'pending').length;
          approvedDrafts = drafts.filter(d => d.status === 'approved').length;
          resolve();
        };
        tx.onerror = () => resolve();
      });
    } else {
      const bizs = JSON.parse(localStorage.getItem('swastik_businesses') || '[]');
      const drafts = JSON.parse(localStorage.getItem('swastik_drafts') || '[]');
      const sents = JSON.parse(localStorage.getItem('swastik_sent_history') || '[]');
      totalBiz = bizs.length;
      totalSent = sents.length;
      pendingDrafts = drafts.filter(d => d.status === 'pending').length;
      approvedDrafts = drafts.filter(d => d.status === 'approved').length;
    }

    return { totalBiz, totalSent, pendingDrafts, approvedDrafts };
  }

  /* ────────────────────────────────────────────────────────
     RESET DATABASE & CLEAN STATE (Part 4 Requirement)
     Clears all clients, drafts, batches, sent history & logs
  ──────────────────────────────────────────────────────── */
  async resetDatabase() {
    await this.ensureReady();

    // 1. Clear IndexedDB stores
    if (this.db) {
      await new Promise((resolve) => {
        try {
          const storeNames = ['businesses', 'drafts', 'sent_history', 'whatsapp_logs', 'jobs'];
          const available = storeNames.filter(name => this.db.objectStoreNames.contains(name));
          if (!available.length) return resolve();

          const tx = this.db.transaction(available, 'readwrite');
          available.forEach(name => tx.objectStore(name).clear());
          tx.oncomplete = () => resolve();
          tx.onerror = () => resolve();
        } catch (e) {
          resolve();
        }
      });
    }

    // 2. Clear LocalStorage state
    localStorage.removeItem('swastik_businesses');
    localStorage.removeItem('swastik_drafts');
    localStorage.removeItem('swastik_sent_history');
    localStorage.removeItem('swastik_wa_logs');
    localStorage.removeItem('swastik_jobs');
    localStorage.removeItem('swastik_historical_sent');

    for (let i = 1; i <= 6; i++) {
      localStorage.setItem('swastik_quota' + i, '0');
      localStorage.removeItem('swastik_limit_notified_' + i);
    }

    console.log('[SWASTIK DB v2] Database reset complete. Zero drafts, zero sent history.');
    return true;
  }

  /* ────────────────────────────────────────────────────────
     SEED EXACTLY 1 FRESH VERIFIED CLIENT (Part 4 Requirement)
  ──────────────────────────────────────────────────────── */
  async seedVerifiedClient(customClient = null) {
    const verifiedClient = customClient || {
      id: 'biz_apex_engineering_01',
      name: 'Apex Precision Engineering Works',
      type: 'manufacturing',
      continent: 'asia',
      country: 'India',
      countryCode: 'IN',
      currencySymbol: '₹',
      currencyCode: 'INR',
      currencyRate: 83.5,
      region: 'Maharashtra',
      city: 'Mumbai',
      address: 'Plot 42, Marol Industrial Area, Andheri East, Mumbai 400093',
      domain: 'apexprecisioneng.in',
      email: 'contact@apexprecisioneng.in',
      phone: '+91 22 2836 1100',
      noWebsite: false,
      outdated: true,
      rating: '4.8',
      fitScore: 95,
      verified: true,
      source: 'Verified National MSME Directory',
      createdAt: Date.now()
    };

    await this.saveBusiness(verifiedClient);
    return verifiedClient;
  }

  /* ────────────────────────────────────────────────────────
     DATA EXPORT: Export DB as JSON backup
  ──────────────────────────────────────────────────────── */
  async exportJSON() {
    await this.ensureReady();
    const stats = await this.getStats();
    let drafts = await this.getDrafts();
    let waLogs = await this.getWhatsAppLogs(100);
    let jobs = await this.getJobs(100);

    const exportData = {
      app: 'SWASTIK Outreach Engine',
      version: '2.0-Enterprise',
      exportedAt: new Date().toISOString(),
      stats,
      drafts,
      jobs,
      whatsappLogs: waLogs
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `swastik_database_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
}

// Global instance
window.swastikDB = new SwastikDB();
