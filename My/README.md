# SWASTIK Enterprise Outreach & 24/7 Telegram Command Center

Automated client acquisition, email outreach load-balancer, and 24/7 interactive Telegram bot with **Boss Mode**.

---

## 🚀 Quick Start

### 1. Run Locally (Web Dashboard + 24/7 Telegram Bot)
Double-click `start-server.bat` or run in terminal:
```bash
npm run dev
```
* **Web Dashboard:** Open `http://localhost:3000` (or open `index.html` directly in browser)
* **24/7 Telegram Bot:** Automatically active in the background, listening for your phone commands.

### 2. Run Bot Invisibly in Background (Windows)
Double-click:
```text
start-bot-hidden.vbs
```
This runs the Telegram bot silently in the Windows background with zero command windows open.

---

## 👑 Telegram 24/7 Boss Mode Commands

Send any of these commands to your Telegram Bot directly from your phone:

| Command | Action |
| :--- | :--- |
| `hlo` / `hi` / `hello` / `boss` | Bot responds: **`👑 Hello Boss! How can I help you?`** |
| `status` / `/status` | View live system health, quotas & 3,248+ sent count |
| `send` / `send all` | 1-Click Safe Send queued outreach drafts |
| `batch` / `scrape` | Launch 500-business lead sweep & AI pitch generation |
| `replies` | View client inquiries & proposals (0 pending in Reply Send Email, 5 in Reply Sended) |
| `quota` / `limits` | Check multi-sender Gmail limits (450 per sender) |
| `report` | Generate full executive daily performance report |
| `pulse` | Ping server heartbeat |

---

## ⚙️ Configuration (`config.json`)

```json
{
  "phone": "9511347627",
  "geminiKey": "YOUR_GEMINI_KEY",
  "teleBotToken": "YOUR_TELEGRAM_BOT_TOKEN",
  "teleChatId": "YOUR_TELEGRAM_CHAT_ID",
  "sender1": "ig.swastik0@gmail.com",
  "sender2": "ig.swastik0.1@gmail.com",
  "dailyLimitPerAccount": 250
}
```

---

## 📁 Project Structure

* `index.html` — Main outreach command center dashboard (with critical CSS inlined)
* `server.js` — Standalone Node.js server (serves web UI + runs 24/7 Telegram bot)
* `runner.js` — Cloud crawler & two-way interactive Telegram Boss bot
* `css/` — Stylesheets (`styles.css`, `dock-bar.css`)
* `js/` — Modular JavaScript components (CRM, Mailer, AI, Telegram, Database)
* `cloud-crawler/` — Autonomous midnight scheduler and lead engine

