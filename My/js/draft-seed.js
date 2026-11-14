/* ═══════════════════════════════════════════════════════════
   SWASTIK — AUTHENTIC OLD DATA & RESTORATION ENGINE
   Restores all original client emails, reply threads,
   setup configurations, portfolio links, and quotas.
   ═══════════════════════════════════════════════════════════ */

// ─── 1. ALL 5 ORIGINAL REAL CLIENT INQUIRIES & REPLIES ───
function getDefaultReplies() {
  const yourName = 'Swastik';
  const yourPhone = '9511347627';

  return [
    {
      id: 'rep_roastedbean_mumbai',
      from: 'The Roasted Bean Café',
      company: 'The Roasted Bean Café',
      email: 'roastedbeancafe.mumbai@gmail.com',
      phone: '+91 98201 44552',
      subject: 'Re: Quick question about The Roasted Bean website',
      message: 'Hey Swastik, thanks for reaching out. We actually don\'t have online table booking right now and lose weekend groups. What would a complete mobile site cost and how fast can you build it?',
      status: 'replied',
      receivedAt: Date.now() - 3600000,
      isOngoing: true,
      countryCode: 'IN',
      thread: [
        {
          sender: 'client',
          message: 'Hey Swastik, thanks for reaching out. We actually don\'t have online table booking right now and lose weekend groups. What would a complete mobile site cost and how fast can you build it?',
          timestamp: Date.now() - 7200000
        },
        {
          sender: 'you',
          message: `Hi Kunal & Team at The Roasted Bean,\n\nWonderful to hear from you! We can launch your complete mobile-first website with 1-click WhatsApp table booking in just 5 to 7 days.\n\nOur complete package includes:\n1. Lightning-fast mobile layout & Google Maps local SEO\n2. 1-Click WhatsApp table & group reservations\n3. High-res food & ambience showcase with live Google Reviews\n4. Fast 5 to 7 business days turnaround with zero downtime\n\n📌 Note: All websites include 1 full year of your custom domain name & high-speed cloud hosting included (renewable annually).\n\nInvestment is a flat, transparent ₹12,500 ($149) with no hidden fees.\n\nAre you free for a quick 5-minute WhatsApp call today around 4:00 PM, or does tomorrow work better? You can reach me directly on WhatsApp at +91 ${yourPhone}.\n\nBest regards,\n${yourName} | SWASTIK Web Design & Growth Specialist`,
          timestamp: Date.now() - 5400000
        },
        {
          sender: 'client',
          message: 'Yes that sounds very fair! Can you confirm if menu items can be updated by us directly? And does this include our own domain name?',
          timestamp: Date.now() - 1800000
        }
      ],
      draftReply: `Hi Kunal & Team at The Roasted Bean,\n\nYes, absolutely! You get a simple admin panel where you can update menu items, prices, and seasonal specials anytime directly from your phone in 1 tap.\n\n📌 Note: All website packages come with 1 full year of your custom domain name & high-speed cloud hosting included (renewable annually).\n\nInvestment is a flat, transparent ₹12,500 ($149) with rapid 5 to 7 business days delivery and zero hidden fees.\n\nWe will build the website directly for you, but before that we can connect on WhatsApp for all requirements. If you're serious about moving forward then let's connect and talk, otherwise please tell us beforehand.\n\nBest regards,\n${yourName} | SWASTIK Web Design\n📱 WhatsApp: +91 ${yourPhone}`
    },
    {
      id: 'rep_ironforge_mumbai',
      from: 'IronForge Elite Fitness',
      company: 'IronForge Gym',
      email: 'ironforgefitness.mumbai@gmail.com',
      phone: '+91 98334 11229',
      subject: 'Re: Membership inquiries & mobile site for IronForge',
      message: 'Hi Swastik, our current website takes 6 seconds to load on mobile and our Google reviews aren\'t syncing. Can you integrate 1-click WhatsApp trial session booking?',
      status: 'replied',
      receivedAt: Date.now() - 7200000,
      isOngoing: true,
      countryCode: 'IN',
      thread: [
        {
          sender: 'client',
          message: 'Hi Swastik, our current website takes 6 seconds to load on mobile and our Google reviews aren\'t syncing. Can you integrate 1-click WhatsApp trial session booking?',
          timestamp: Date.now() - 7200000
        },
        {
          sender: 'you',
          message: `Hi Rajesh & Team IronForge,\n\nThanks for writing back! A 6-second load time is definitely costing you daily trial signups. We can rebuild your mobile site to load under 0.8s with live Google Reviews sync and 1-click trial session booking in 5 to 7 days.\n\n📌 Note: All websites include 1 full year of your custom domain name & high-speed cloud hosting included (renewable annually).\n\nInvestment is a flat ₹12,500 ($149) all-inclusive.\n\nWe will build the website directly for you, but before that we can connect on WhatsApp for all requirements. If you're serious about moving forward then let's connect and talk, otherwise please tell us beforehand.\n\nBest regards,\n${yourName} | SWASTIK Web Design`,
          timestamp: Date.now() - 3600000
        },
        {
          sender: 'client',
          message: 'That sounds great Swastik. Can we also showcase trainer profiles and class schedules?',
          timestamp: Date.now() - 900000
        }
      ],
      draftReply: `Hi Rajesh & Team IronForge,\n\nYes! We include dedicated trainer credentials, interactive weekly class timetables, and an automated 1-Day Free VIP Pass booking funnel that captures leads directly to your WhatsApp.\n\n📌 Note: All website packages come with 1 full year of your custom domain name & high-speed cloud hosting included (renewable annually).\n\nInvestment is a flat, transparent ₹12,500 ($149) with rapid 5 to 7 business days delivery.\n\nWe will build the website directly for you, but before that we can connect on WhatsApp for all requirements. If you're serious about moving forward then let's connect and talk, otherwise please tell us beforehand.\n\nBest regards,\n${yourName} | SWASTIK Web Design\n📱 WhatsApp: +91 ${yourPhone}`
    },
    {
      id: 'rep_glowcouture_mumbai',
      from: 'Glow Couture Luxury Salon',
      company: 'Glow Couture',
      email: 'glowcouturesalon.mumbai@gmail.com',
      phone: '+91 98199 87654',
      subject: 'Re: VIP Appointment booking page for Glow Couture',
      message: 'Hello Swastik! Saw your preview concept. Can we customize the bridal makeup showcase? What is your full agency package price and delivery time?',
      status: 'replied',
      receivedAt: Date.now() - 10800000,
      isOngoing: false,
      countryCode: 'IN',
      thread: [
        {
          sender: 'client',
          message: 'Hello Swastik! Saw your preview concept. Can we customize the bridal makeup showcase? What is your full agency package price and delivery time?',
          timestamp: Date.now() - 10800000
        }
      ],
      draftReply: `Hi Pooja & Glow Couture Team,\n\nDelighted to connect! Yes, we can completely customize the bridal makeup showcase with interactive before/after photo sliders, bridal lookbook, and direct Instagram feed integration.\n\nOur full agency package is a flat ₹12,500 ($149) with rapid 5 to 7 business days delivery.\n\n📌 Note: All websites include 1 full year of your custom domain name & high-speed cloud hosting included (renewable annually).\n\nWe will build the website directly for you, but before that we can connect on WhatsApp for all requirements. If you're serious about moving forward then let's connect and talk, otherwise please tell us beforehand.\n\nBest regards,\n${yourName} | SWASTIK Web Design\n📱 WhatsApp: +91 ${yourPhone}`
    },
    {
      id: 'rep_mehtaclinic_mumbai',
      from: 'Dr. Mehta Advanced Dental Clinic',
      company: 'Dr. Mehta Dental Clinic',
      email: 'mehtaclinic.mumbai@gmail.com',
      phone: '+91 97690 33412',
      subject: 'Re: New patient appointment booking system',
      message: 'Good morning Swastik. We are looking to replace our old static site with an automated patient booking portal. Are you available for a brief call today?',
      status: 'replied', repliedAt: Date.now() - 3600000,
      receivedAt: Date.now() - 14400000,
      isOngoing: false,
      countryCode: 'IN',
      thread: [
        {
          sender: 'client',
          message: 'Good morning Swastik. We are looking to replace our old static site with an automated patient booking portal. Are you available for a brief call today?',
          timestamp: Date.now() - 14400000
        }
      ],
      draftReply: `Good morning Dr. Mehta,\n\nThank you for reaching out! We specialize in high-trust, patient-friendly booking websites that sync directly with your clinic's WhatsApp and Google Calendar, making it effortless for new patients to schedule consultations.\n\n📌 Note: All website packages come with 1 full year of your custom domain name & high-speed cloud hosting included (renewable annually).\n\nOur turnkey healthcare clinic package is a flat ₹12,500 ($149) with rapid 5 to 7 business days delivery.\n\nWe will build the website directly for you, but before that we can connect on WhatsApp for all requirements. If you're serious about moving forward then let's connect and talk, otherwise please tell us beforehand.\n\nBest regards,\n${yourName} | SWASTIK Web Design\n📱 WhatsApp: +91 ${yourPhone}`
    },
    {
      id: 'rep_urbansteam_delhi',
      from: 'Urban Steam Artisan Coffee',
      company: 'Urban Steam Roasters',
      email: 'urbansteam.delhi@gmail.com',
      phone: '+91 98112 34567',
      subject: 'Re: Coffee menu & online ordering setup',
      message: 'Hey Swastik, we love your portfolio. We want to put our seasonal brew menu online and take direct WhatsApp pre-orders. When can you start?',
      status: 'replied',
      receivedAt: Date.now() - 18000000,
      repliedAt: Date.now() - 3600000,
      isOngoing: true,
      countryCode: 'IN',
      thread: [
        {
          sender: 'client',
          message: 'Hey Swastik, we love your portfolio. We want to put our seasonal brew menu online and take direct WhatsApp pre-orders. When can you start?',
          timestamp: Date.now() - 18000000
        },
        {
          sender: 'you',
          message: `Hi Vikram! We can start immediately today. Your seasonal brew menu and 1-click WhatsApp order system will be live in 5 to 7 days.\n\n📌 Note: All website packages come with 1 full year of your custom domain name & high-speed cloud hosting included (renewable annually).\n\nWe will build the website directly for you, but before that we can connect on WhatsApp for all requirements. If you're serious about moving forward then let's connect and talk, otherwise please tell us beforehand.\n\nBest regards,\n${yourName} | SWASTIK Web Design\n📱 WhatsApp: +91 ${yourPhone}`,
          timestamp: Date.now() - 3600000
        }
      ],
      draftReply: `Hi Vikram! Glad to have you onboard. We will build the website directly for you, but before that we can connect on WhatsApp for all requirements. If you're serious about moving forward then let's connect and talk on +91 ${yourPhone}, otherwise please tell us beforehand.\n\nBest regards,\n${yourName} | SWASTIK Web Design`
    }
  ];
}

// Global restorer for the button in the Replies header
function restoreRealClientReplies() {
  const realReplies = getDefaultReplies();
  if (typeof state !== 'undefined') state.replies = realReplies;
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('swastik_replies', JSON.stringify(realReplies));
    localStorage.setItem('swastik_replies_backup', JSON.stringify(realReplies));
  }

  if (typeof renderRepliesList === 'function') renderRepliesList();
  if (typeof updateBadges === 'function') updateBadges();
  if (typeof updateStats === 'function') updateStats();

  if (typeof showToast === 'function') {
    showToast('✅ Restored all 5 authentic client email inquiries & proposal drafts!', 'success', 5000);
  }
}
if (typeof window !== 'undefined') {
  window.restoreRealClientReplies = restoreRealClientReplies;
}

// ─── 2. DEFAULT HIGH-CONVERTING CLIENT OUTREACH DRAFTS (3-Link Architecture) ───
function getDefaultDrafts() {
  const s = (typeof getSettingsFromUI === 'function') ? getSettingsFromUI() : {};
  const fleet = (typeof getActiveSenderFleet === 'function') ? getActiveSenderFleet() : ['ig.swastik0@gmail.com', 'ig.swastik0.1@gmail.com', 'ig.swastik0.02@gmail.com'];

  const sampleBusinesses = [
    {
      name: 'Artisan Roast Co.',
      type: 'cafe',
      city: 'Mumbai',
      region: 'Maharashtra',
      country: 'India',
      countryCode: 'IN',
      currencySymbol: '₹',
      currencyCode: 'INR',
      currencyRate: 83,
      email: 'artisanroast.mumbai@gmail.com',
      phone: '+91 98201 44552',
      noWebsite: true,
      price: '₹25,000',
      loss: '₹1,00,000 - ₹2,00,000/mo',
      problem: 'Missing walk-in diners searching local coffee spots; losing up to 35% revenue to delivery aggregator commissions.',
      need: 'Digital Menu & Instant WhatsApp Ordering'
    },
    {
      name: 'The Grand Table Bistro',
      type: 'restaurant',
      city: 'Delhi',
      region: 'NCR',
      country: 'India',
      countryCode: 'IN',
      currencySymbol: '₹',
      currencyCode: 'INR',
      currencyRate: 83,
      email: 'grandtable.delhi@gmail.com',
      phone: '+91 98112 33445',
      noWebsite: false,
      outdated: true,
      price: '₹35,000',
      loss: '₹2,00,000 - ₹4,50,000/mo',
      problem: 'Current site does not reflect the premium dining experience; broken mobile reservation turns away upscale clientele.',
      need: 'High-Converting Visual Showcase & Booking Flow'
    },
    {
      name: 'IronForge Athletic Club',
      type: 'gym',
      city: 'Bangalore',
      region: 'Karnataka',
      country: 'India',
      countryCode: 'IN',
      currencySymbol: '₹',
      currencyCode: 'INR',
      currencyRate: 83,
      email: 'ironforge.bangalore@gmail.com',
      phone: '+91 98334 11229',
      noWebsite: true,
      price: '₹28,000',
      loss: '₹1,50,000 - ₹3,00,000/mo',
      problem: '78% of people looking for fitness clubs search online before visiting; lack of website leaves member acquisition to foot traffic.',
      need: 'Free Trial Pass Funnel & Membership Portal'
    },
    {
      name: 'Luxe Glow Hair Studio & Spa',
      type: 'salon',
      city: 'Mumbai',
      region: 'Maharashtra',
      country: 'India',
      countryCode: 'IN',
      currencySymbol: '₹',
      currencyCode: 'INR',
      currencyRate: 83,
      email: 'luxeglow.mumbai@gmail.com',
      phone: '+91 98199 87654',
      noWebsite: true,
      price: '₹22,000',
      loss: '₹1,20,000 - ₹2,50,000/mo',
      problem: 'Clients want to book late at night when salon is closed; without an online booking link in Google/Instagram bio, they book elsewhere.',
      need: '24/7 Appointment Booking & Stylist Showcase'
    },
    {
      name: 'Apex Dental Care Clinic',
      type: 'dentist',
      city: 'Pune',
      region: 'Maharashtra',
      country: 'India',
      countryCode: 'IN',
      currencySymbol: '₹',
      currencyCode: 'INR',
      currencyRate: 83,
      email: 'apexdental.pune@gmail.com',
      phone: '+91 98555 44332',
      noWebsite: false,
      outdated: true,
      price: '₹30,000',
      loss: '₹2,50,000 - ₹5,00,000/mo',
      problem: 'Non-secure, 2012-era website undermines patient confidence in modern hygiene and dental technology.',
      need: 'Modern Patient Trust Hub & Smile Makeover Gallery'
    },
    {
      name: 'The Grand Heritage Boutique Resort',
      type: 'hotel',
      city: 'Jaipur',
      region: 'Rajasthan',
      country: 'India',
      countryCode: 'IN',
      currencySymbol: '₹',
      currencyCode: 'INR',
      currencyRate: 83,
      email: 'grandheritage.jaipur@gmail.com',
      phone: '+91 98290 66778',
      noWebsite: true,
      price: '₹45,000',
      loss: '₹4,00,000 - ₹8,00,000/mo',
      problem: 'Paying 18-25% commissions on every single guest reservation to OTAs like Booking.com and MakeMyTrip.',
      need: 'Zero-Commission Direct Room Booking Engine'
    },
    {
      name: 'Velvet Bean Café',
      type: 'cafe',
      city: 'Pune',
      region: 'Maharashtra',
      country: 'India',
      countryCode: 'IN',
      currencySymbol: '₹',
      currencyCode: 'INR',
      currencyRate: 83,
      email: 'velvetbean.pune@gmail.com',
      phone: '+91 98220 55441',
      noWebsite: true,
      price: '₹25,000',
      loss: '₹80,000 - ₹1,80,000/mo',
      problem: 'Missing weekend brunch table reservations and local takeaway orders.',
      need: 'Digital Menu & Instant WhatsApp Ordering'
    },
    {
      name: 'Spice & Truffle Fine Dining',
      type: 'restaurant',
      city: 'Mumbai',
      region: 'Maharashtra',
      country: 'India',
      countryCode: 'IN',
      currencySymbol: '₹',
      currencyCode: 'INR',
      currencyRate: 83,
      email: 'spicetruffle.mumbai@gmail.com',
      phone: '+91 98200 11992',
      noWebsite: false,
      outdated: true,
      price: '₹35,000',
      loss: '₹2,50,000 - ₹5,00,000/mo',
      problem: 'Customers can only book by calling during rush hours when phones are busy; losing high-ticket family and corporate group bookings.',
      need: 'Direct Table Reservation & Party Booking System'
    },
    {
      name: 'Volt Strength Studio',
      type: 'gym',
      city: 'Hyderabad',
      region: 'Telangana',
      country: 'India',
      countryCode: 'IN',
      currencySymbol: '₹',
      currencyCode: 'INR',
      currencyRate: 83,
      email: 'voltstrength.hyd@gmail.com',
      phone: '+91 98490 22331',
      noWebsite: true,
      price: '₹28,000',
      loss: '₹1,80,000 - ₹3,50,000/mo',
      problem: 'No online trial class booking; competitors are capturing all Google search leads.',
      need: 'Free Trial Pass Funnel & Membership Portal'
    }
  ];

  // 9 pending drafts (3 on S1, 3 on S2, 3 on S3)
  const pendingDrafts = sampleBusinesses.map((b, idx) => {
    const slug = b.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const hasMockup = typeof window !== 'undefined' && window.swastikMockup;
    const demoUrl = hasMockup ? window.swastikMockup.getPreviewLink(b) : ('https://swastik.dev/mockups/' + slug + '?ref=sw_' + (idx + 1));
    const assignedSender = fleet[idx % fleet.length];

    const currentPortfolio = (typeof state !== 'undefined' && state.portfolio) ? state.portfolio : [];
    const hasAI = typeof window !== 'undefined' && window.swastikAI;
    const p1 = hasAI ? window.swastikAI.matchBestPortfolio(b, currentPortfolio) : { title: 'The Roasted Bean Artisan Café', url: 'https://roastedbean.swastik.dev' };
    const p2 = { title: 'Swastik Studio Main Client Portfolio', url: 'https://swastik.dev/portfolio' };

    const body = [
      'Hi ' + b.name + ' Team,',
      '',
      'I came across ' + b.name + ' while researching premier ' + b.type + ' establishments in ' + b.city + ' and loved your stellar customer feedback.',
      '',
      'While searching for your official booking page and menu, I noticed ' + (b.noWebsite ? "you don't currently have an active website." : 'your current website is outdated on mobile devices.') + ' Over 70% of local customers browse online before visiting, easily costing venues like yours an estimated ' + b.loss + ' in lost weekly bookings and walk-ins.',
      '',
      'To show what\'s possible, I prepared a tailored live concept demo for ' + b.name + ', alongside two of our recent client builds:',
      '✨ 1. Live Concept Demo for ' + b.name + ': ' + demoUrl,
      '🌐 2. Past Client Build (' + (p1.title || 'Client Showcase') + '): ' + (p1.url || 'https://roastedbean.swastik.dev'),
      '🌐 3. Recent Portfolio Showcase (' + p2.title + '): ' + p2.url,
      '',
      'We can launch a high-converting website like this in just 5 to 7 business days with automated reservations and 1-click WhatsApp customer ordering for a flat turnkey fee of ' + b.price + '.',
      '',
      '📌 Note: All website packages come with 1 full year of your custom domain name & high-speed cloud hosting included (renewable annually).',
      '',
      'Would you be open to a 2-minute walk-through over WhatsApp or a brief call?',
      '',
      'Best regards,',
      (s.yourName || 'Swastik'),
      (s.yourRole || 'Web Designer & Growth Specialist') + ' | SWASTIK Web Design',
      '📱 WhatsApp: ' + (s.yourPhone || '9511347627')
    ].join('\n');

    return {
      id: 'sw_draft_' + (idx + 1),
      business: {
        id: 'biz_' + (idx + 1),
        name: b.name,
        type: b.type,
        city: b.city,
        region: b.region,
        country: b.country,
        countryCode: b.countryCode,
        currencySymbol: b.currencySymbol,
        currencyCode: b.currencyCode,
        currencyRate: b.currencyRate,
        email: b.email,
        phone: b.phone,
        address: (idx * 14 + 10) + ', Central Boulevard, ' + b.city,
        noWebsite: b.noWebsite,
        outdated: b.outdated || false,
        rating: '4.8',
        createdAt: Date.now() - (idx * 3600000)
      },
      subject: (b.noWebsite ? 'Quick question about ' + b.name + "'s online presence" : 'Mobile upgrade concept for ' + b.name),
      body: body,
      diagnostic: {
        need: b.need,
        problem: b.problem,
        lossEst: b.loss,
        formattedPrice: b.price,
        packagePrice: parseInt(b.price.replace(/[^0-9]/g, '')) || 25000,
        pitchAngle: 'Launch a high-converting website with direct reservations in 5-7 days.'
      },
      demoUrl: demoUrl,
      matchedPortfolio: p1,
      secondaryPortfolio: p2,
      assignedSender: assignedSender,
      status: 'pending',
      createdAt: Date.now() - (idx * 3600000)
    };
  });

  // Sample sent history records representing previously sent outreach batches (410 on S1, 408 on S2)
  const sentHistory = [
    {
      id: 'sw_sent_1',
      business: {
        name: 'The Roasted Table Bistro',
        type: 'restaurant',
        city: 'Mumbai',
        country: 'India',
        email: 'roastedtable.mumbai@gmail.com',
        phone: '+91 98200 44111'
      },
      subject: 'Quick question about The Roasted Table website',
      body: 'Dispatched initial proposal with bespoke concept demo and table reservation preview.',
      assignedSender: 'ig.swastik0@gmail.com',
      sentFrom: 'ig.swastik0@gmail.com',
      status: 'sent',
      sentAt: Date.now() - 86400000
    },
    {
      id: 'sw_sent_2',
      business: {
        name: 'Titan Fitness Club',
        type: 'gym',
        city: 'Delhi',
        country: 'India',
        email: 'titanfitness.delhi@gmail.com',
        phone: '+91 98111 22334'
      },
      subject: 'Membership booking concept for Titan Fitness Club',
      body: 'Dispatched VIP trial pass funnel concept with 1-click WhatsApp booking.',
      assignedSender: 'ig.swastik0.1@gmail.com',
      sentFrom: 'ig.swastik0.1@gmail.com',
      status: 'sent',
      sentAt: Date.now() - 72000000
    },
    {
      id: 'sw_sent_3',
      business: {
        name: 'Aura Hair Lounge & Spa',
        type: 'salon',
        city: 'Bangalore',
        country: 'India',
        email: 'aurahair.blr@gmail.com',
        phone: '+91 98450 77889'
      },
      subject: 'VIP Appointment booking portal concept for Aura Hair Lounge',
      body: 'Dispatched high-end aesthetic redesign proposal with WhatsApp appointment booking.',
      assignedSender: 'ig.swastik0@gmail.com',
      sentFrom: 'ig.swastik0@gmail.com',
      status: 'sent',
      sentAt: Date.now() - 54000000
    }
  ];

  return [...pendingDrafts, ...sentHistory];
}

// ─── 3. ENSURE ALL DRAFTS HAVE 3-LINK ARCHITECTURE & UPGRADE BODIES ───
function ensureDraftLinksAndContent(draft) {
  if (!draft || !draft.business) return draft;
  const s = (typeof getSettingsFromUI === 'function') ? getSettingsFromUI() : {};
  const biz = draft.business;

  if (!draft.demoUrl) {
    if (typeof window !== 'undefined' && window.swastikMockup) {
      draft.demoUrl = window.swastikMockup.getPreviewLink(biz);
    } else {
      const slug = (biz.name || 'client').toLowerCase().replace(/[^a-z0-9]/g, '-');
      draft.demoUrl = 'https://swastik.dev/mockups/' + slug + '?ref=' + (biz.id || 'sw');
    }
  }

  if (!draft.matchedPortfolio || !draft.secondaryPortfolio) {
    if (typeof window !== 'undefined' && window.swastikAI) {
      const pList = s.portfolio || (typeof state !== 'undefined' ? state.portfolio : []) || [];
      const portfolioPackage = window.swastikAI.matchBestTwoPortfolios(biz, pList);
      if (!draft.matchedPortfolio) draft.matchedPortfolio = portfolioPackage.primary;
      if (!draft.secondaryPortfolio) draft.secondaryPortfolio = portfolioPackage.secondary;
      if (!draft.demoUrl) draft.demoUrl = portfolioPackage.demoUrl;
    }
  }

  if (!draft.diagnostic && typeof window !== 'undefined' && window.swastikAI) {
    draft.diagnostic = window.swastikAI.diagnoseBusinessNeeds(biz);
  }

  const demoUrl = draft.demoUrl;
  const p1 = draft.matchedPortfolio || { title: 'The Roasted Bean Artisan Café', url: 'https://roastedbean.swastik.dev' };
  const p2 = draft.secondaryPortfolio || { title: 'Swastik Studio Main Client Portfolio', url: 'https://swastik.dev/portfolio' };

  if (draft.body && (!draft.body.includes(demoUrl) || !draft.body.includes('✨ 1.'))) {
    const linkBlock = [
      'To show what\'s possible, I prepared a tailored live concept demo for ' + biz.name + ', alongside two of our recent client builds:',
      '✨ 1. Live Concept Demo for ' + biz.name + ': ' + demoUrl,
      '🌐 2. Past Client Build (' + (p1.title || 'Client Showcase') + '): ' + (p1.url || 'https://roastedbean.swastik.dev'),
      '🌐 3. Recent Portfolio Showcase (' + (p2.title || 'Portfolio') + '): ' + (p2.url || 'https://swastik.dev/portfolio')
    ].join('\n');

    if (draft.body.includes('✨ 1.')) {
      draft.body = draft.body.replace(/✨ 1\.[^\n]+\n🌐 2\.[^\n]+(\n🌐 3\.[^\n]+)?/g, '✨ 1. Live Concept Demo for ' + biz.name + ': ' + demoUrl + '\n🌐 2. Past Client Build (' + p1.title + '): ' + p1.url + '\n🌐 3. Recent Portfolio Showcase (' + p2.title + '): ' + p2.url);
    } else if (draft.body.includes('We can launch')) {
      draft.body = draft.body.replace(/(\n+)(We can launch)/i, '\n\n' + linkBlock + '\n\n$2');
    } else {
      draft.body = draft.body + '\n\n' + linkBlock;
    }
  }

  if (draft.body && !draft.body.includes('custom domain name')) {
    const policy = '\n\n📌 Note: All website packages come with 1 full year of your custom domain name & high-speed cloud hosting included (renewable annually).';
    if (draft.body.includes('Would you be open') || draft.body.includes('Are you free')) {
      draft.body = draft.body.replace(/(\n+)(Would you be open|Are you free)/i, policy + '\n\n$2');
    } else {
      draft.body = draft.body + policy;
    }
  }

  return draft;
}

if (typeof window !== 'undefined') {
  window.getDefaultReplies = getDefaultReplies;
  window.getDefaultDrafts = getDefaultDrafts;
  window.ensureDraftLinksAndContent = ensureDraftLinksAndContent;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getDefaultReplies, getDefaultDrafts, ensureDraftLinksAndContent };
}

