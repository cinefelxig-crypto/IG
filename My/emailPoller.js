/**
 * SWASTIK – 24/7 Email Inbox Poller (No NPM required)
 * Uses raw TLS + IMAP commands to check Gmail inbox every 5 minutes.
 * Saves replies to data/emails.json and fires Telegram notifications for Boss.
 *
 * SETUP: Set these in config.json OR environment variables:
 *   emailUser  = "ig.swastik0@gmail.com"
 *   emailPass  = "xxxx xxxx xxxx xxxx"   ← 16-char Gmail App Password (NOT your real password)
 *   teleBotToken, teleChatId              ← already in config.json
 *
 * HOW TO GET GMAIL APP PASSWORD:
 *   1. Go to https://myaccount.google.com/security
 *   2. Enable 2-Step Verification
 *   3. Search "App Passwords" → create one for "Mail"
 *   4. Paste the 16-char password into config.json as "emailPass"
 */

'use strict';

const tls    = require('tls');
const fs     = require('fs');
const path   = require('path');
const https  = require('https');

const DATA_DIR   = path.join(__dirname, 'data');
const EMAILS_FILE = path.join(DATA_DIR, 'emails.json');
const SENT_FILE   = path.join(DATA_DIR, 'sent-replies.json');
const CFG_FILE    = path.join(__dirname, 'config.json');

// ── ensure data dir exists ──────────────────────────────────────────────
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(EMAILS_FILE)) fs.writeFileSync(EMAILS_FILE, '[]', 'utf8');
if (!fs.existsSync(SENT_FILE))   fs.writeFileSync(SENT_FILE,   '[]', 'utf8');

// ── helpers ─────────────────────────────────────────────────────────────
function loadConfig() {
  let raw = {};
  try {
    if (fs.existsSync(CFG_FILE)) {
      raw = JSON.parse(fs.readFileSync(CFG_FILE, 'utf8'));
    }
  } catch(e) {}

  return {
    accounts: [
      { user: process.env.EMAIL_USER  || raw.emailUser  || 'gagann33nn@gmail.com', pass: (process.env.EMAIL_PASS  || raw.emailPass  || 'fnnlufnxwyllstva').replace(/\s+/g,'') },
      { user: process.env.EMAIL_USER2 || raw.emailUser2 || 'ig.swastik0@gmail.com', pass: (process.env.EMAIL_PASS2 || raw.emailPass2 || 'vtkezacyjrbhzixy').replace(/\s+/g,'') },
      { user: process.env.EMAIL_USER3 || raw.emailUser3 || 'ig.swastik0.1@gmail.com', pass: (process.env.EMAIL_PASS3 || raw.emailPass3 || 'vrruohiaxmzxlqdk').replace(/\s+/g,'') },
      { user: process.env.EMAIL_USER4 || raw.emailUser4 || 'ig.swastik0.02@gmail.com', pass: (process.env.EMAIL_PASS4 || raw.emailPass4 || 'qzmsoitdjvmmxfhy').replace(/\s+/g,'') },
      { user: process.env.EMAIL_USER5 || raw.emailUser5 || 'dhalamma769@gmail.com', pass: (process.env.EMAIL_PASS5 || raw.emailPass5 || 'wbnkzlzxpyyhflky').replace(/\s+/g,'') },
    ].filter(a => a.user && a.pass),
    teleBotToken: process.env.TELEGRAM_BOT_TOKEN || raw.teleBotToken || '9037063156:AAFoWeteje_EKIcOH-sV09z25MXQHsP3IRY',
    teleChatId:   process.env.TELEGRAM_CHAT_ID   || raw.teleChatId   || '8877788139',
  };
}

function loadEmails() {
  try { return JSON.parse(fs.readFileSync(EMAILS_FILE, 'utf8')); } catch(e) { return []; }
}
function saveEmails(arr) {
  fs.writeFileSync(EMAILS_FILE, JSON.stringify(arr, null, 2), 'utf8');
}
function loadSent() {
  try { return JSON.parse(fs.readFileSync(SENT_FILE, 'utf8')); } catch(e) { return []; }
}
function saveSent(arr) {
  fs.writeFileSync(SENT_FILE, JSON.stringify(arr, null, 2), 'utf8');
}

function decodeMimeWords(str) {
  if (!str) return '';
  return str.replace(/=\?([^?]+)\?([BQbq])\?([^?]*)\?=/g, (_, charset, enc, data) => {
    try {
      if (enc.toUpperCase() === 'B') return Buffer.from(data, 'base64').toString('utf8');
      // Q-encoding
      return data.replace(/_/g, ' ').replace(/=([0-9A-Fa-f]{2})/g, (m, h) =>
        String.fromCharCode(parseInt(h, 16)));
    } catch(e) { return data; }
  });
}

function parseEmailHeaders(raw) {
  const lines = raw.split(/\r?\n/);
  const headers = {};
  let current = '';
  for (const line of lines) {
    if (/^\s/.test(line)) { headers[current] = (headers[current] || '') + ' ' + line.trim(); }
    else {
      const m = line.match(/^([^:]+):\s*(.*)/);
      if (m) { current = m[1].toLowerCase(); headers[current] = m[2]; }
    }
  }
  return headers;
}

// ── Telegram alert sender ───────────────────────────────────────────────
function sendTelegram(token, chatId, text) {
  if (!token || !chatId) return;
  const payload = JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' });
  const req = https.request('https://api.telegram.org', {
    path: `/bot${token}/sendMessage`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) }
  }, () => {});
  req.on('error', () => {});
  req.write(payload);
  req.end();
}

// ── Raw IMAP over TLS ───────────────────────────────────────────────────
function imapFetchUnseen(user, pass, callback) {
  if (!user || !pass) return callback(null, []);

  const socket = tls.connect({ host: 'imap.gmail.com', port: 993 }, () => {
    let buffer = '';
    let tag = 1;
    const cmd = (str) => { socket.write(`A${tag++} ${str}\r\n`); };
    const msgs = [];
    let phase = 'greeting';
    let fetchBuffer = '';
    let currentUid = null;

    socket.on('data', (chunk) => {
      buffer += chunk.toString();
      const lines = buffer.split('\r\n');
      buffer = lines.pop(); // keep incomplete line

      for (const line of lines) {
        // greeting
        if (phase === 'greeting' && line.startsWith('* OK')) {
          phase = 'login';
          cmd(`LOGIN "${user}" "${pass}"`);
        }
        // after LOGIN
        else if (phase === 'login' && /^A\d+ OK/.test(line)) {
          phase = 'select';
          cmd('SELECT INBOX');
        }
        // after SELECT
        else if (phase === 'select' && /^A\d+ OK/.test(line)) {
          phase = 'search';
          cmd('UID SEARCH UNSEEN');
        }
        // search results
        else if (phase === 'search' && line.startsWith('* SEARCH')) {
          const uids = line.replace('* SEARCH', '').trim().split(' ').filter(Boolean);
          if (uids.length === 0) {
            phase = 'logout';
            cmd('LOGOUT');
          } else {
            phase = 'fetch';
            // fetch last 10 unseen max
            const toFetch = uids.slice(-10);
            cmd(`UID FETCH ${toFetch.join(',')} (BODY.PEEK[HEADER.FIELDS (FROM SUBJECT DATE MESSAGE-ID)] BODY.PEEK[TEXT])`);
          }
        }
        // fetch response
        else if (phase === 'fetch') {
          if (line.startsWith('* ') && line.includes('FETCH')) {
            const uidMatch = line.match(/UID\s+(\d+)/i);
            currentUid = uidMatch ? uidMatch[1] : String(Date.now());
            fetchBuffer = '';
          } else if (line === ')') {
            // end of this fetch item — parse it
            if (fetchBuffer) {
              const headerEnd = fetchBuffer.indexOf('\r\n\r\n');
              let headerPart = fetchBuffer, bodyPart = '';
              if (headerEnd !== -1) {
                headerPart = fetchBuffer.substring(0, headerEnd);
                bodyPart   = fetchBuffer.substring(headerEnd + 4, headerEnd + 4 + 500);
              }
              const h = parseEmailHeaders(headerPart);
              msgs.push({
                uid:     currentUid,
                from:    decodeMimeWords(h['from'] || ''),
                subject: decodeMimeWords(h['subject'] || '(no subject)'),
                date:    h['date'] || new Date().toUTCString(),
                snippet: bodyPart.replace(/=\r?\n/g, '').replace(/[\r\n]+/g, ' ').substring(0, 300),
                account: user
              });
            }
            fetchBuffer = '';
            currentUid = null;
          } else if (/^A\d+ OK/.test(line)) {
            phase = 'logout';
            cmd('LOGOUT');
          } else {
            if (currentUid !== null) fetchBuffer += line + '\r\n';
          }
        }
        // logout done
        else if (phase === 'logout') {
          socket.destroy();
          callback(null, msgs);
          return;
        }
      }
    });

    socket.on('error', (e) => callback(e, []));
    socket.on('close', () => { if (phase !== 'logout') callback(null, msgs); });
  });

  socket.on('error', (e) => callback(e, []));
  setTimeout(() => { try { socket.destroy(); } catch(e){} callback(null, []); }, 30000);
}

// ── Mark emails as seen (so we don't re-notify) ──────────────────────────
function imapMarkSeen(user, pass, uids) {
  if (!user || !pass || !uids.length) return;
  const socket = tls.connect({ host: 'imap.gmail.com', port: 993 }, () => {
    let tag = 1;
    const cmd = (str) => socket.write(`A${tag++} ${str}\r\n`);
    let buffer = '';
    let phase = 'greeting';

    socket.on('data', (chunk) => {
      buffer += chunk.toString();
      const lines = buffer.split('\r\n');
      buffer = lines.pop();

      for (const line of lines) {
        if (phase === 'greeting' && line.startsWith('* OK')) {
          phase = 'login'; cmd(`LOGIN "${user}" "${pass}"`);
        } else if (phase === 'login' && /^A\d+ OK/.test(line)) {
          phase = 'select'; cmd('SELECT INBOX');
        } else if (phase === 'select' && /^A\d+ OK/.test(line)) {
          phase = 'store'; cmd(`UID STORE ${uids.join(',')} +FLAGS (\\Seen)`);
        } else if (phase === 'store' && /^A\d+ OK/.test(line)) {
          phase = 'logout'; cmd('LOGOUT');
        } else if (phase === 'logout') {
          socket.destroy();
        }
      }
    });
    socket.on('error', () => {});
    socket.on('close', () => {});
  });
  socket.on('error', () => {});
  setTimeout(() => { try { socket.destroy(); } catch(e){} }, 20000);
}

// ── Main poll function ───────────────────────────────────────────────────
function pollInbox(user, pass, cfg) {
  if (!user || !pass) {
    return;
  }
  console.log(`[EMAIL POLLER] Checking inbox for ${user}...`);
  imapFetchUnseen(user, pass, (err, newMsgs) => {
    if (err) {
      console.error('[EMAIL POLLER] IMAP error:', err.message || err);
      return;
    }
    if (!newMsgs.length) {
      console.log(`[EMAIL POLLER] No new messages for ${user}.`);
      return;
    }

    const existing = loadEmails();
    const existingUids = new Set(existing.map(e => `${e.account}:${e.uid}`));
    const brand_new = newMsgs.filter(m => !existingUids.has(`${m.account}:${m.uid}`));

    if (!brand_new.length) {
      console.log(`[EMAIL POLLER] All messages already recorded for ${user}.`);
      return;
    }

    // Add unique id, status, timestamp
    const enriched = brand_new.map(m => ({
      ...m,
      id: `email_${m.uid}_${Date.now()}`,
      status: 'inbox',          // 'inbox' | 'replied'
      receivedAt: Date.now()
    }));

    // Save to disk
    const updated = [...enriched, ...existing];
    saveEmails(updated);

    // Mark seen in Gmail
    const newUids = brand_new.map(m => m.uid);
    imapMarkSeen(user, pass, newUids);

    // Telegram notification for EACH new mail
    enriched.forEach(m => {
      const smartReply = generateSmartReply(extractName(m.from), m.snippet);
      const text =
        `📨 <b>NEW CLIENT REPLY!</b>\n` +
        `──────────────────────\n` +
        `📬 <b>Account:</b> ${user}\n` +
        `📧 <b>From:</b> ${m.from}\n` +
        `📝 <b>Subject:</b> ${m.subject}\n` +
        `💬 <b>Snippet:</b>\n<i>"${m.snippet.substring(0,200)}"</i>\n\n` +
        `🤖 <b>Suggested Reply:</b>\n<i>${smartReply.substring(0,300)}...</i>\n\n` +
        `📱 Open Inbox tab in dashboard to reply with 1 tap.`;
      sendTelegram(cfg.teleBotToken, cfg.teleChatId, text);
      console.log(`[EMAIL POLLER] ✅ Boss notified: reply from ${m.from} → ${user}`);
    });
  });
}

function extractName(fromHeader) {
  const m = fromHeader.match(/^"?([^"<]+)"?\s*</);
  return m ? m[1].trim() : fromHeader.split('@')[0];
}

function generateSmartReply(name, snippet) {
  const msg = (snippet || '').toLowerCase();
  if (msg.includes('cost') || msg.includes('price') || msg.includes('how much') || msg.includes('charge') || msg.includes('quote')) {
    return `Hi ${name},\n\nThank you for getting back! Our complete website builds start from ₹12,500 with zero hidden fees. Includes mobile design, Google SEO, WhatsApp booking & 1-year hosting.\n\nLet's connect on WhatsApp: +91 9511347627\n\nBest,\nSwastik Agency`;
  }
  if (msg.includes('time') || msg.includes('how long') || msg.includes('days')) {
    return `Hi ${name},\n\nGreat question! We deliver in just 5-7 business days from concept to launch.\n\nLet's connect on WhatsApp: +91 9511347627\n\nBest,\nSwastik Agency`;
  }
  return `Hi ${name},\n\nThank you for responding! We'd love to build a high-converting website for you — delivery in 5-7 days, starting ₹12,500.\n\nLet's chat on WhatsApp: +91 9511347627\n\nBest,\nSwastik Agency`;
}

// ── Start poller ──────────────────────────────────────────────────────────
const POLL_INTERVAL_MS = 5 * 60 * 1000; // every 5 minutes

function startEmailPoller() {
  const cfg = loadConfig();

  if (!cfg.accounts || cfg.accounts.length === 0) {
    console.log('[EMAIL POLLER] ⚠️  No email accounts configured – polling disabled.');
    console.log('[EMAIL POLLER]    Add emailUser/emailPass entries to config.json to enable.');
    return;
  }

  console.log(`[EMAIL POLLER] 🚀 24/7 Email Inbox Poller started for ${cfg.accounts.length} account(s)!`);
  cfg.accounts.forEach(a => console.log(`[EMAIL POLLER]    📬 ${a.user}`));

  // Stagger polls 12s apart so Gmail doesn't block simultaneous connections
  const runAll = () => {
    cfg.accounts.forEach((acct, i) => {
      setTimeout(() => pollInbox(acct.user, acct.pass, cfg), i * 12000);
    });
  };

  runAll(); // immediate on start
  setInterval(runAll, POLL_INTERVAL_MS);
}

module.exports = { startEmailPoller, loadEmails, loadSent, saveSent, saveEmails, generateSmartReply };

