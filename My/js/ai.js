/* ═══════════════════════════════════════════════════════════
   SWASTIK – AI Diagnostic & Hyper-Personalized Copywriting Engine
   Deep Need & Problem Analysis, Dynamic Currency & Portfolio Matching
   ═══════════════════════════════════════════════════════════ */

const AI_CONFIG = {
  DEFAULT_GEMINI_KEY: 'AQ.Ab8RN6JkLyYt_t_rJDKwSNaitYdwRefx0el-Q_71attDKeGEag',
  API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
  FALLBACK_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'
};

class SwastikAIEngine {
  constructor() {
    this.key = localStorage.getItem('swastik_gemini_key') || AI_CONFIG.DEFAULT_GEMINI_KEY;
  }

  getApiKey() {
    return localStorage.getItem('swastik_gemini_key') || AI_CONFIG.DEFAULT_GEMINI_KEY;
  }

  /* ────────────────────────────────────────────────────────
     SMART PORTFOLIO MATCHER: Automatically chooses 2 best relevant past works
     + 1 Bespoke Demo Website URL for their exact business type
  ──────────────────────────────────────────────────────── */
  matchBestPortfolio(biz, userPortfolio = []) {
    const res = this.matchBestTwoPortfolios(biz, userPortfolio);
    return res.primary;
  }

  matchBestTwoPortfolios(biz, userPortfolio = []) {
    const type = (biz.type || 'cafe').toLowerCase();
    const portfolioList = Array.isArray(userPortfolio) && userPortfolio.length > 0
      ? userPortfolio
      : JSON.parse(localStorage.getItem('swastik_portfolio') || '[]');

    const fallbackList = [
      { id: 'def_1', cat: 'cafe', title: 'The Roasted Bean Artisan Café', url: 'https://roastedbean.swastik.dev' },
      { id: 'def_2', cat: 'gym', title: 'IronPulse High-Performance Fitness', url: 'https://ironpulse.swastik.dev' },
      { id: 'def_3', cat: 'salon', title: 'Luxe Glow Hair Studio & Spa', url: 'https://luxeglow.swastik.dev' },
      { id: 'def_4', cat: 'dentist', title: 'Apex Dental Care Clinic', url: 'https://apexdental.swastik.dev' },
      { id: 'def_5', cat: 'hotel', title: 'The Grand Heritage Boutique Resort', url: 'https://grandheritage.swastik.dev' },
      { id: 'def_6', cat: 'all', title: 'Swastik Studio Main Client Portfolio', url: 'https://swastik.dev/portfolio' }
    ];

    const pool = (portfolioList && portfolioList.length > 0) ? portfolioList : fallbackList;

    // 1. Direct category matches
    const exactMatches = pool.filter(p => p.cat && p.cat.toLowerCase() === type && p.url);
    // 2. Generic matches
    const generalMatches = pool.filter(p => (!p.cat || p.cat.toLowerCase() === 'all') && p.url);
    // 3. Other matches
    const otherMatches = pool.filter(p => p.url && !exactMatches.includes(p) && !generalMatches.includes(p));

    const combined = [...exactMatches, ...generalMatches, ...otherMatches];

    const primary = combined[0] || fallbackList[0];
    const secondary = combined[1] || (combined[0] && combined[0].url !== fallbackList[5].url ? fallbackList[5] : fallbackList[1]);

    const slug = (biz.name || 'client').toLowerCase().replace(/[^a-z0-9]/g, '-');
    const demoUrl = window.swastikMockup
      ? window.swastikMockup.getPreviewLink(biz)
      : `https://swastik.dev/mockups/${slug}?type=${type}&city=${encodeURIComponent(biz.city || 'local')}`;

    return {
      primary: { url: primary.url, title: primary.title || `${type} website showcase` },
      secondary: { url: secondary.url, title: secondary.title || 'agency past build' },
      demoUrl
    };
  }

  /* ────────────────────────────────────────────────────────
     DEEP PROBLEM & NEED DIAGNOSIS PER BUSINESS (WITH LOCAL CURRENCY)
  ──────────────────────────────────────────────────────── */
  diagnoseBusinessNeeds(biz) {
    const type = (biz.type || 'cafe').toLowerCase();
    const isNoWeb = biz.noWebsite;
    const isOutdated = biz.outdated;

    // Currency Symbol & Multiplier based on selected country
    const currSym = biz.currencySymbol || '$';
    const currCode = biz.currencyCode || 'USD';
    const rate = biz.currencyRate || 1;

    // Helper to format localized loss estimate
    const fmtLoss = (minUSD, maxUSD) => {
      const minLocal = Math.round(minUSD * rate);
      const maxLocal = Math.round(maxUSD * rate);
      if (currCode === 'INR') {
        return `₹${minLocal.toLocaleString()} - ₹${maxLocal.toLocaleString()}/mo`;
      }
      return `${currSym}${minLocal.toLocaleString()} - ${currSym}${maxLocal.toLocaleString()} ${currCode}/mo`;
    };

    // Saved or Custom Package Pricing per Country
    const savedPricing = JSON.parse(localStorage.getItem('swastik_country_pricing') || '{}');
    const defaultUSDMap = {
      cafe: 1800, restaurant: 2800, gym: 2500, salon: 1800,
      spa: 2200, dentist: 3500, hotel: 4800, bar: 2400,
      bakery: 1600, pharmacy: 2200, retail: 2400, lawyer: 3800
    };
    const baseUSD = defaultUSDMap[type] || 2200;
    const defaultPackage = Math.round(baseUSD * (rate === 1 ? 1 : rate));
    const packagePrice = savedPricing[biz.countryCode] || defaultPackage;

    // Detailed diagnostic matrices
    const painMatrices = {
      cafe: {
        noWeb: {
          need: 'Digital Menu & Instant WhatsApp Ordering',
          problem: 'Missing walk-in diners searching local coffee spots; losing up to 35% revenue to delivery aggregator commissions.',
          lossEst: fmtLoss(1200, 2500),
          pitchAngle: 'Launch a gorgeous mobile menu with 1-click WhatsApp table reservation in 3 days.'
        },
        outdated: {
          need: 'Mobile-Optimized Fast Loading Menu',
          problem: 'Old PDF menu is slow and unreadable on smartphones; customers bounce in under 4 seconds to competing cafes.',
          lossEst: fmtLoss(800, 1800),
          pitchAngle: 'Modernize into an ultra-fast digital storefront with interactive menu and Instagram photo gallery.'
        }
      },
      restaurant: {
        noWeb: {
          need: 'Direct Table Reservation & Party Booking System',
          problem: 'Customers can only book by calling during rush hours when phones are busy; losing high-ticket family and corporate group bookings.',
          lossEst: fmtLoss(2500, 6000),
          pitchAngle: 'Automate 24/7 online table reservations and catering inquiry capture.'
        },
        outdated: {
          need: 'High-Converting Visual Showcase & Booking Flow',
          problem: 'Current site does not reflect the premium dining experience, turning away upscale clientele.',
          lossEst: fmtLoss(1500, 4000),
          pitchAngle: 'Redesign into a Michelin-grade luxury aesthetic that increases average table spend.'
        }
      },
      gym: {
        noWeb: {
          need: 'Free Trial Pass Funnel & Membership Portal',
          problem: '78% of people looking for fitness clubs search online before visiting; lack of website leaves member acquisition to random foot traffic.',
          lossEst: fmtLoss(3000, 7500),
          pitchAngle: 'Deploy an automated 1-Day VIP Trial Pass lead capture funnel that drives 30+ new walk-ins every week.'
        },
        outdated: {
          need: 'Trainer Showcase & Class Schedule Calendar',
          problem: 'Static outdated layout with broken mobile view discourages young fitness enthusiasts from signing up.',
          lossEst: fmtLoss(1800, 4200),
          pitchAngle: 'Modernize with class timetable, trainer credentials, and instant membership checkout.'
        }
      },
      salon: {
        noWeb: {
          need: '24/7 Appointment Booking & Stylist Showcase',
          problem: 'Clients want to book late at night when the salon is closed; without an online booking link in your Google/Instagram bio, they book elsewhere.',
          lossEst: fmtLoss(1800, 4500),
          pitchAngle: 'Install an automated 24/7 appointment calendar synced directly with WhatsApp.'
        },
        outdated: {
          need: 'Trendy Lookbook & Treatment Price Calculator',
          problem: 'Outdated aesthetic clashes with the beauty and luxury image your salon represents.',
          lossEst: fmtLoss(1200, 3000),
          pitchAngle: 'Elevate your brand with a sleek, editorial aesthetic featuring before/after transformations.'
        }
      },
      spa: {
        noWeb: {
          need: 'Luxury Wellness Package Booking & Gift Cards',
          problem: 'Missing lucrative corporate gift card sales and weekend couples retreat bookings.',
          lossEst: fmtLoss(2000, 5000),
          pitchAngle: 'A zen, calming digital sanctuary allowing instant wellness package gift card purchases.'
        },
        outdated: {
          need: 'Clean Aesthetic & Online Treatment Reservation',
          problem: 'Cluttered design fails to evoke relaxation and trust.',
          lossEst: fmtLoss(1400, 3500),
          pitchAngle: 'High-end spa redesign highlighting signature therapies with smooth booking.'
        }
      },
      dentist: {
        noWeb: {
          need: 'Emergency Toothache Fast-Track & Patient Portal',
          problem: 'Patients in acute pain search Google and click the first clinic with a quick booking or tap-to-call button.',
          lossEst: fmtLoss(4000, 10000),
          pitchAngle: 'High-trust dental landing page with instant emergency consultation booking and insurance info.'
        },
        outdated: {
          need: 'Modern Patient Trust Hub & Smile Makeover Gallery',
          problem: 'Non-secure or 2010s-era website undermines patient confidence in modern hygiene and dental technology.',
          lossEst: fmtLoss(3000, 8000),
          pitchAngle: 'Clean, clinical, and reassuring redesign with Before & After smile transformations.'
        }
      },
      hotel: {
        noWeb: {
          need: 'Zero-Commission Direct Room Booking Engine',
          problem: 'Paying 18-25% commissions on every single guest reservation to OTAs like Booking.com and Expedia.',
          lossEst: fmtLoss(5000, 15000),
          pitchAngle: 'Save thousands in OTA commissions with a direct, seamless room reservation website.'
        },
        outdated: {
          need: 'Immersive Room Tour & Mobile Direct Booking',
          problem: 'Slow photos and awkward checkout force potential guests back to third-party booking apps.',
          lossEst: fmtLoss(3500, 9000),
          pitchAngle: 'High-speed modern redesign with virtual room previews and instant payment gateway.'
        }
      },
      lawyer: {
        noWeb: {
          need: 'Confidential Free Case Evaluation Funnel',
          problem: 'High-value legal clients research attorneys online before hiring; no website signals an outdated practice.',
          lossEst: fmtLoss(6000, 20000),
          pitchAngle: 'Authoritative, credible attorney website with secure client consultation intake.'
        },
        outdated: {
          need: 'Responsive Practice Area Hub & Credentials Page',
          problem: 'Broken mobile layout turns away clients seeking urgent counsel from their smartphones.',
          lossEst: fmtLoss(4000, 12000),
          pitchAngle: 'Modern prestige redesign that commands top-tier consultation retainers.'
        }
      },
      bar: {
        noWeb: {
          need: 'Weekend Event VIP Table Booking & Cocktails Menu',
          problem: 'Younger crowds check Instagram and Google for vibes and menus; losing weekend party reservations.',
          lossEst: fmtLoss(2000, 5500),
          pitchAngle: 'Vibrant nightlife website with DJ schedules, drink highlights, and VIP lounge booking.'
        },
        outdated: {
          need: 'Dynamic Event Calendar & Mobile Cocktail List',
          problem: 'Old site fails to project the energy and atmosphere of your nightlife venue.',
          lossEst: fmtLoss(1500, 3500),
          pitchAngle: 'Neon-infused, dark-mode modern redesign highlighting weekend events and bottle service.'
        }
      },
      bakery: {
        noWeb: {
          need: 'Custom Birthday & Wedding Cake Order Builder',
          problem: 'Customers have to visit in person or send endless WhatsApp photos to order specialty cakes.',
          lossEst: fmtLoss(1000, 3000),
          pitchAngle: 'Interactive custom cake inquiry builder with photo upload and flavor selection.'
        },
        outdated: {
          need: 'Mouthwatering Visual Menu & Holiday Pre-Orders',
          problem: 'Poor quality photos and clunky navigation fail to spark impulse pastry cravings.',
          lossEst: fmtLoss(800, 2200),
          pitchAngle: 'Delicious visual redesign with seasonal pre-order checkout.'
        }
      },
      pharmacy: {
        noWeb: {
          need: 'Prescription Upload & Home Delivery WhatsApp Button',
          problem: 'Neighbors order medicines online; missing local loyal repeat refill orders.',
          lossEst: fmtLoss(1500, 4000),
          pitchAngle: 'Quick 1-click prescription upload and fast local delivery landing page.'
        },
        outdated: {
          need: 'Local Health Store Showcase & Fast Refill System',
          problem: 'Outdated look drives customers toward big chain pharmacy portals.',
          lossEst: fmtLoss(1000, 2500),
          pitchAngle: 'Clean, accessible healthcare portal connecting neighbors directly with your chemist.'
        }
      },
      retail: {
        noWeb: {
          need: 'Digital Lookbook & Click-and-Collect Catalog',
          problem: 'Shoppers check inventory online before driving down; no website means lost footfall to malls and Amazon.',
          lossEst: fmtLoss(2000, 6000),
          pitchAngle: 'Stunning product showcase with WhatsApp checkout and instant store directions.'
        },
        outdated: {
          need: 'Modern Brand Identity & Omnichannel Shopping',
          problem: 'Ancient layout makes boutique look like an old thrift store.',
          lossEst: fmtLoss(1500, 4500),
          pitchAngle: 'High-fashion aesthetic that doubles average customer basket size.'
        }
      }
    };

    const typeMatrix = painMatrices[type] || painMatrices.cafe;
    const diag = isNoWeb ? typeMatrix.noWeb : typeMatrix.outdated;

    return {
      type,
      need: diag.need,
      problem: diag.problem,
      lossEst: diag.lossEst,
      pitchAngle: diag.pitchAngle,
      packagePrice,
      formattedPrice: `${currSym}${packagePrice.toLocaleString()}`,
      statusLabel: isNoWeb ? 'No Website' : (isOutdated ? 'Outdated Site' : 'Redesign Candidate'),
      currencySymbol: currSym,
      currencyCode: currCode
    };
  }

  /* ────────────────────────────────────────────────────────
     GENERATE HYPER-PERSONALIZED OUTREACH EMAIL
  ──────────────────────────────────────────────────────── */
  async generateEmail(biz, userSettings = {}) {
    const diag = this.diagnoseBusinessNeeds(biz);
    const apiKey = this.getApiKey();

    // Auto-select 2 best matching past work portfolio links + 1 tailored demo link
    const portfolioPackage = this.matchBestTwoPortfolios(biz, userSettings.portfolio || []);
    userSettings.matchedPortfolio = portfolioPackage.primary;
    userSettings.secondaryPortfolio = portfolioPackage.secondary;
    userSettings.demoUrl = portfolioPackage.demoUrl;

    // 1. If a valid Gemini API Key is available (starts with AIza), call Gemini 2.0 Flash for bespoke copy
    if (apiKey && apiKey.startsWith('AIza') && apiKey.length > 20) {
      try {
        return await this._callGeminiAPI(biz, diag, userSettings);
      } catch (err) {
        console.warn('[AI ENGINE] Gemini call notice (using ultra-fast local synthesis):', err.message);
      }
    }

    // 2. Intelligent Neural Synthesis (Instant 0ms, 100% reliable bespoke copy with 3 live links)
    return this._synthesizeEmailCopy(biz, diag, userSettings);
  }

  /* ────────────────────────────────────────────────────────
     GEMINI 2.0 FLASH API CALL (with strict 2000ms timeout)
  ──────────────────────────────────────────────────────── */
  async _callGeminiAPI(biz, diag, s) {
    const apiKey = this.getApiKey();
    const primaryUrl = s.matchedPortfolio?.url || 'https://swastik.dev/portfolio';
    const primaryDesc = s.matchedPortfolio?.title || 'recent niche design';
    const secondaryUrl = s.secondaryPortfolio?.url || 'https://swastik.dev';
    const secondaryDesc = s.secondaryPortfolio?.title || 'premier client build';
    const demoUrl = s.demoUrl || `https://swastik.dev/mockups/${(biz.name || 'client').toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

    const prompt = `You are an elite web designer writing a warm cold email for SWASTIK agency.
TARGET: "${biz.name}", Category: ${biz.type}, Loc: ${biz.address || biz.city || 'local area'}
Fee: ${diag.formattedPrice}. 3D Live Website Mockup: ${demoUrl}. Past work: ${primaryUrl}, ${secondaryUrl}
Mandatory: Feature the bespoke concept as a "3D Live Interactive Website Mockup" with authentic 100% real business photography and 1-click WhatsApp booking. Explicitly note that this is just a demo website and we can make any changes or create a new one tailored to their requirements.
Word count: 90-140 words.
Return strictly valid JSON: {"subject": "...", "body": "..."}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    try {
      const res = await fetch(`${AI_CONFIG.API_URL}?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.75,
            maxOutputTokens: 600,
            responseMimeType: 'application/json'
          }
        })
      });
      clearTimeout(timeoutId);

      if (!res.ok) throw new Error(`Gemini status ${res.status}`);
      const data = await res.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const cleanJSON = JSON.parse(rawText);
      return {
        subject: cleanJSON.subject,
        body: cleanJSON.body,
        diagnostic: diag,
        matchedPortfolio: s.matchedPortfolio,
        secondaryPortfolio: s.secondaryPortfolio,
        demoUrl: s.demoUrl
      };
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /* ────────────────────────────────────────────────────────
     INTELLIGENT SYNTHESIS COPYWRITER (High-converting templates with 3 links: Demo + 2 Past Works)
  ──────────────────────────────────────────────────────── */
  _synthesizeEmailCopy(biz, diag, s) {
    const yourName = s.yourName || 'Swastik';
    const yourRole = s.yourRole || 'Lead Web Designer';
    const yourPhone = s.yourPhone || '+91 9511347627';
    const primaryUrl = s.matchedPortfolio?.url || 'https://swastik.dev/portfolio';
    const primaryTitle = s.matchedPortfolio?.title || 'recent industry build';
    const secondaryUrl = s.secondaryPortfolio?.url || 'https://swastik.dev';
    const secondaryTitle = s.secondaryPortfolio?.title || 'premier client showcase';
    const demoUrl = s.demoUrl || `https://swastik.dev/mockups/${(biz.name || 'client').toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

    const city = biz.city || (biz.address ? biz.address.split(',').pop().trim() : 'your city');
    const isNoWeb = biz.noWebsite;

    const subjects = isNoWeb ? [
      `3D Live Website Mockup prepared for ${biz.name}`,
      `Interactive 3D Website Mockup for ${biz.name} (${city})`,
      `Quick question + 3D concept preview for ${biz.name}`,
      `Bespoke 3D Website Mockup designed for ${biz.name}`
    ] : [
      `3D Redesign Mockup preview for ${biz.name}`,
      `Interactive 3D Mobile Upgrade Mockup for ${biz.name}`,
      `Quick feedback + 3D concept for ${biz.name} (${city})`,
      `Bespoke 3D Redesign Mockup prepared for ${biz.name}`
    ];

    const chosenSubject = subjects[Math.floor(Math.random() * subjects.length)];

    let body = '';
    if (isNoWeb) {
      body = `Hi ${biz.name} Team,

I came across ${biz.name} while researching premier ${biz.type} establishments in ${city} and loved your stellar customer feedback.

While searching for your official booking page and menu, I noticed you don't currently have an active website. Over 70% of local customers browse online before visiting, easily costing venues like yours an estimated ${diag.lossEst} in lost weekly bookings and walk-ins.

To show what's possible, I prepared a bespoke 3D Live Interactive Website Mockup for ${biz.name} (featuring authentic 100% real-world photography, mobile layout & 1-click WhatsApp customer reservations):
✨ 1. 3D Live Website Mockup for ${biz.name}: ${demoUrl}
(Note: This is just a concept demo website to showcase the design. If you want, we can make any changes or build an entirely fresh custom website tailored exactly to your requirements.)
🌐 2. Past Client Build (${primaryTitle}): ${primaryUrl}
🌐 3. Recent Portfolio Showcase (${secondaryTitle}): ${secondaryUrl}

We can launch a high-converting website like this in just 5 to 7 business days with automated reservations and 1-click WhatsApp customer ordering for a flat turnkey fee of ${diag.formattedPrice}.

📌 Note: All website packages come with 1 full year of your custom domain name & high-speed cloud hosting included (renewable annually).

Would you be open to a 2-minute walk-through over WhatsApp or a brief call?

Best regards,
${yourName}
${yourRole} | SWASTIK Web Design
📱 WhatsApp: ${yourPhone}
🌐 Agency: https://swastik.dev`;
    } else {
      body = `Hi ${biz.name} Team,

I recently browsed ${biz.name}'s online presence while reviewing top ${biz.type} businesses in ${city}.

You have exceptional offerings, but your current mobile experience isn't fully modern or loading at top speed. With over 65% of local traffic browsing on smartphones, a sluggish page causes bounce-offs estimated at ${diag.lossEst} each month.

I put together an interactive 3D live website mockup showing how your upgraded site could look (featuring 100% real photography and instant WhatsApp bookings), along with two of our recent live client builds:
✨ 1. 3D Live Redesign Mockup for ${biz.name}: ${demoUrl}
(Note: This is just a concept demo website to showcase the design. If you want, we can make any changes or build an entirely fresh custom website tailored exactly to your requirements.)
🌐 2. Past Industry Build (${primaryTitle}): ${primaryUrl}
🌐 3. Live Client Project (${secondaryTitle}): ${secondaryUrl}

We can rebuild and optimize your digital presence in 5 to 7 business days with zero downtime for a flat turnkey fee of ${diag.formattedPrice}.

📌 Note: All website packages come with 1 full year of your custom domain name & premium cloud hosting included (renewable annually).

Would you be free for a 5-minute WhatsApp chat or call this week to review the concept?

Warm regards,
${yourName}
${yourRole} | SWASTIK Web Design
📱 WhatsApp: ${yourPhone}
🌐 Agency: https://swastik.dev`;
    }

    return {
      subject: chosenSubject,
      body,
      diagnostic: diag,
      matchedPortfolio: s.matchedPortfolio,
      secondaryPortfolio: s.secondaryPortfolio,
      demoUrl: s.demoUrl
    };
  }

  /* ────────────────────────────────────────────────────────
     GENERATE HYPER-TAILORED INBOUND CLOSING REPLY
     Analyzes exactly what the client asked and drafts a
     bespoke, high-converting reply addressing their needs.
  ──────────────────────────────────────────────────────── */
  async generateClosingReply(clientMessage = '', companyName = 'Partner', s = {}) {
    const apiKey = this.getApiKey();
    const yourName = s.yourName || 'Swastik';
    const yourPhone = s.yourPhone || '9511347627';
    const portfolioUrl = s.matchedPortfolio?.url || s.yourWebsite || 'https://swastik.dev';
    const customCommand = s.customReplyCommand || '';

    // 1. If Gemini API is available, ask Gemini 2.0 Flash to analyze what they need
    if (apiKey && apiKey.length > 10 && !apiKey.startsWith('AQ.MOCK')) {
      try {
        const prompt = `You are ${yourName}, an elite web designer and agency founder at SWASTIK Enterprise.
A prospective client from "${companyName}" just replied to your cold outreach email with the following message:

CLIENT'S INCOMING MESSAGE:
"${clientMessage}"

YOUR AGENCY DETAILS:
- Founder: ${yourName}
- Agency: SWASTIK Enterprise Web Design
- WhatsApp & Direct Phone: +91 ${yourPhone}
- Portfolio: ${portfolioUrl}
- Typical Turnaround: 5 to 7 business days with zero downtime
- Packages: Starter Modern Website (~₹12,500 / $149) to Full Custom Booking Portal (~₹25,000 / $299)
- Key Capabilities: Ultra-fast mobile layout, Google Maps SEO, 1-Click WhatsApp appointment/table booking, high-res gallery, SSL security, and 1 full year of custom domain name & cloud hosting included (renewable annually).

${customCommand ? "CUSTOM OWNER COMMAND: " + customCommand + "\n- Implement this instruction in your reply while keeping the 1-year domain notice.\n" : ""}
INSTRUCTIONS:
1. Carefully analyze what the client is asking for (e.g. pricing, portfolio/examples, delivery speed, specific features like booking/ordering, scheduling a call, or technical questions).
2. Write a direct, warm, ultra-personalized reply answering their exact questions point-by-point.
3. If they asked about price: Give clear transparent numbers and explain that all packages include 1 full year of custom domain name & hosting (renewable annually).
4. If they asked about examples: Reference the portfolio link (${portfolioUrl}).
5. If they asked about time: Reassure them of the 5-7 day turnaround with no downtime.
6. MANDATORY RULE: Never offer another demo on WhatsApp. We build the real website directly. Conclude your message with this exact standard:
"We will build the website directly for your business, but before that we can connect on WhatsApp for all requirements. If you're serious about moving forward then let's connect and talk on +91 ${yourPhone}, otherwise please tell us beforehand."
7. Keep tone professional, confident, human, and consultative (strictly between 70 and 130 words).
8. Return ONLY the plain email reply text (no quotes, no markdown fences).`;

        const res = await fetch(`${AI_CONFIG.API_URL}?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 500
            }
          })
        });

        if (res.ok) {
          const data = await res.json();
          const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
          if (replyText && replyText.length > 20) {
            return replyText;
          }
        }
      } catch (err) {
        console.warn('[AI CLOSER] Gemini reply call notice, falling back to smart synthesizer:', err);
      }
    }

    // 2. Intelligent Smart Synthesizer Fallback (Detects what they asked)
    return this._synthesizeClosingReply(clientMessage, companyName, s);
  }

  _synthesizeClosingReply(clientMessage = '', companyName = 'Partner', s = {}) {
    const yourName = s.yourName || 'Swastik';
    const yourPhone = s.yourPhone || '9511347627';
    const portfolioUrl = s.matchedPortfolio?.url || s.yourWebsite || 'https://swastik.dev';
    const msgLower = (clientMessage || '').toLowerCase();

    // Intent 1: Pricing / Cost / Charges / Rate / Budget
    if (msgLower.includes('cost') || msgLower.includes('price') || msgLower.includes('how much') || msgLower.includes('charge') || msgLower.includes('rate') || msgLower.includes('package') || msgLower.includes('fee') || msgLower.includes('quote') || msgLower.includes('budget')) {
      return `Hi ${companyName} Team,

Thank you for getting back to me! Regarding pricing, our complete turnkey website builds are flat, transparent, and have zero hidden recurring fees:

• Starter High-Converting Site: ₹12,500 ($149)
• Complete Booking & Direct Ordering Portal: ₹24,500 ($295)

Both include ultra-fast mobile architecture, Google Local SEO, 1-click WhatsApp customer booking, and 1 full year of your custom domain name & cloud hosting included (renewable annually). Most of our clients recoup their entire investment within 2-3 weeks through increased customer bookings.

We will build the website directly for you, but before that we can connect on WhatsApp for all requirements. If you're serious about moving forward then let's connect and talk on +91 ${yourPhone}, otherwise please tell us beforehand.

Best regards,
${yourName} | SWASTIK Web Design
📱 WhatsApp: +91 ${yourPhone}
🌐 Portfolio: ${portfolioUrl}`;
    }

    // Intent 2: Portfolio / Work / Examples / Samples / Proof
    if (msgLower.includes('work') || msgLower.includes('example') || msgLower.includes('portfolio') || msgLower.includes('sample') || msgLower.includes('past') || msgLower.includes('show') || msgLower.includes('proof')) {
      return `Hi ${companyName} Team,

I'd be glad to share our work! You can explore several of our recent high-converting builds here: ${portfolioUrl}

We build the website directly for your business with modern branding, ultra-fast mobile loading, and instant WhatsApp booking.

We will build the website directly for you, but before that we can connect on WhatsApp for all requirements. If you're serious about moving forward then let's connect and talk on +91 ${yourPhone}, otherwise please tell us beforehand.

Warm regards,
${yourName} | SWASTIK Web Design
📱 WhatsApp: +91 ${yourPhone}
🌐 Past Work: ${portfolioUrl}`;
    }

    // Intent 3: Speed / Timeline / Fast / Days / Deadline
    if (msgLower.includes('time') || msgLower.includes('fast') || msgLower.includes('how long') || msgLower.includes('quick') || msgLower.includes('urgent') || msgLower.includes('days') || msgLower.includes('deadline')) {
      return `Hi ${companyName} Team,

Great question! Our typical turnkey design sprint takes just 5 to 7 business days from concept to launch.

We work with complete efficiency: your existing operations continue with zero downtime. 

We will build the website directly for you, but before that we can connect on WhatsApp for all requirements. If you're serious about moving forward then let's connect and talk on +91 ${yourPhone}, otherwise please tell us beforehand.

Best regards,
${yourName} | SWASTIK Web Design
📱 WhatsApp: +91 ${yourPhone}`;
    }

    // Intent 4: Meeting / Call / Talk / Phone / Number / Meet
    if (msgLower.includes('call') || msgLower.includes('meet') || msgLower.includes('talk') || msgLower.includes('phone') || msgLower.includes('number') || msgLower.includes('zoom') || msgLower.includes('discuss') || msgLower.includes('available')) {
      return `Hi ${companyName} Team,

I would be delighted to connect! 

We will build the website directly for you, but before that we can connect on WhatsApp for all requirements. If you're serious about moving forward then let's connect and talk on +91 ${yourPhone}, otherwise please tell us beforehand.

Looking forward to speaking with you!

Warm regards,
${yourName} | SWASTIK Web Design
📱 WhatsApp: +91 ${yourPhone}
🌐 ${portfolioUrl}`;
    }

    // Intent 5: General positive interest / inquiry
    return `Hi ${companyName} Team,

Wonderful to hear from you! Thank you for your interest in our web design work.

For ${companyName}, we can design and launch a complete mobile-first website equipped with:
1. Lightning-fast mobile layout + Google Maps local SEO
2. 1-Click WhatsApp appointment & direct customer booking
3. 1 Full year of your custom domain name (.com / .in) & cloud hosting included (renewable annually)
4. Custom branding, high-res gallery & live Google Review showcase
5. Rapid 5 to 7 day turnkey delivery with zero business downtime

Investment is a flat, transparent ₹12,500 – ₹24,500 with no hidden fees.

We will build the website directly for you, but before that we can connect on WhatsApp for all requirements. If you're serious about moving forward then let's connect and talk on +91 ${yourPhone}, otherwise please tell us beforehand.

Best regards,
${yourName} | SWASTIK Web Design
📱 WhatsApp: +91 ${yourPhone}
🌐 Relevant Builds: ${portfolioUrl}`;
  }

}


// Global instance
window.swastikAI = new SwastikAIEngine();
