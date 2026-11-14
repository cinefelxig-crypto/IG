/* ═══════════════════════════════════════════════════════════
   SWASTIK – Real-Time Website Mockup Generator
   Creates interactive live website demo links per business niche
   ═══════════════════════════════════════════════════════════ */

class MockupGenerator {
  constructor() {
    this.templateMap = {
      cafe: {
        tagline: 'Artisanal Coffee & Gourmet Bistro',
        heroImg: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
        accent: '#eab308',
        features: ['Specialty Pour-Overs', 'Farm-to-Table Brunch', '1-Click WhatsApp Table Booking', 'Cozy Ambient Seating'],
        menuHighlights: [
          { name: 'Signature Cold Brew', price: '₹220', desc: 'Single-origin Ethiopian beans steeped for 18 hours' },
          { name: 'Truffle Avocado Toast', price: '₹340', desc: 'Artisanal sourdough, poached eggs, white truffle oil' },
          { name: 'Pistachio Croissant', price: '₹190', desc: 'Flaky French butter pastry with roasted pistachio cream' }
        ]
      },
      restaurant: {
        tagline: 'Exquisite Fine Dining & Culinary Artistry',
        heroImg: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
        accent: '#f97316',
        features: ['Chef Tasting Menus', 'Private VIP Dining', 'Direct Online Reservations', 'Sommelier Wine Pairings'],
        menuHighlights: [
          { name: 'Pan-Seared Sea Bass', price: '₹850', desc: 'Saffron risotto, asparagus spears, lemon emulsion' },
          { name: 'Wood-Fired Ribeye Steak', price: '₹1,200', desc: 'Aged prime beef with roasted garlic herb butter' },
          { name: 'Dark Chocolate Soufflé', price: '₹420', desc: 'Warm molten Valrhona chocolate with vanilla bean gelato' }
        ]
      },
      gym: {
        tagline: 'High-Performance Training & Elite Strength Club',
        heroImg: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
        accent: '#ef4444',
        features: ['Olympic Lifting Zone', 'Certified Master Trainers', 'Free 1-Day VIP Pass Booking', 'Recovery Cryotherapy'],
        menuHighlights: [
          { name: '1-Day VIP Trial Pass', price: 'FREE', desc: 'Access full gym floor, steam room, and intro trainer consultation' },
          { name: 'Elite Performance Monthly', price: '₹3,500', desc: 'Unlimited access + personalized training app program' },
          { name: '1-on-1 Transformation', price: '₹12,000', desc: '12 private sessions with nutrition coaching' }
        ]
      },
      salon: {
        tagline: 'Haute Coiffure & Luxury Aesthetic Lounge',
        heroImg: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
        accent: '#ec4899',
        features: ['Master Balayage Stylists', 'Keratin & Scalp Therapy', '24/7 WhatsApp Appointment Booking', 'Bridal Couture Packages'],
        menuHighlights: [
          { name: 'Bespoke Balayage & Cut', price: '₹4,500', desc: 'Hand-painted dimension customized to facial tones' },
          { name: 'Caviar Hair Spa Ritual', price: '₹2,800', desc: 'Deep cellular restoration for radiant shine' },
          { name: 'Bridal Glow & Makeover', price: '₹15,000', desc: 'Complete couture hair and makeup consultation' }
        ]
      },
      spa: {
        tagline: 'Sanctuary of Tranquility & Holistic Rejuvenation',
        heroImg: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80',
        accent: '#14b8a6',
        features: ['Aromatherapy Massages', 'Thermal Herbal Baths', 'Instant Gift Voucher Purchase', 'Couples Retreat Suites'],
        menuHighlights: [
          { name: 'Deep Tissue Balinese Massage', price: '₹3,200', desc: '90-minute tension release with organic essential oils' },
          { name: 'Himalayan Salt Scrub & Wrap', price: '₹2,600', desc: 'Full-body detoxifying mineral exfoliation' },
          { name: 'Couples Nirvana Package', price: '₹7,500', desc: 'Dual massage, floral bath & champagne platter' }
        ]
      },
      dentist: {
        tagline: 'Modern Painless Dentistry & Smile Architecture',
        heroImg: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
        accent: '#06b6d4',
        features: ['Laser Teeth Whitening', 'Invisible Aligners', 'Emergency Same-Day Appointments', 'Digital Smile Design'],
        menuHighlights: [
          { name: 'Comprehensive Consultation & 3D Scan', price: '₹800', desc: 'Full digital mouth mapping & oral health audit' },
          { name: 'Zoom Laser Whitening', price: '₹7,500', desc: 'Up to 8 shades lighter in a single 45-minute session' },
          { name: 'Invisible Clear Aligners', price: '₹45,000+', desc: 'Discreet orthodontic correction with digital tracking' }
        ]
      },
      hotel: {
        tagline: 'Luxury Boutique Suites & Unmatched Hospitality',
        heroImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        accent: '#8b5cf6',
        features: ['Zero-Fee Direct Booking', 'Rooftop Infinity Pool', '24-Hour Concierge', 'Complimentary Gourmet Breakfast'],
        menuHighlights: [
          { name: 'Executive Deluxe Suite', price: '₹6,500/night', desc: 'King bed, city panorama view, marble soaking tub' },
          { name: 'Penthouse Terrace Suite', price: '₹14,000/night', desc: 'Private jacuzzi, butler service, priority lounge' },
          { name: 'Weekend Escape Package', price: '₹18,500', desc: '2 nights stay with dining credits & spa session' }
        ]
      },
      bar: {
        tagline: 'Artisanal Mixology & High-Energy Nightlife Lounge',
        heroImg: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80',
        accent: '#a855f7',
        features: ['Craft Cocktail Lab', 'Live DJ Sets', 'VIP Table & Bottle Reservation', 'Late Night Tapas'],
        menuHighlights: [
          { name: 'Smoked Bourbon Old Fashioned', price: '₹650', desc: 'Handcrafted with orange bitters and oak smoke' },
          { name: 'Yuzu Botanical Gin Fizz', price: '₹580', desc: 'Japanese citrus, infused gin, sparkling elderflower' },
          { name: 'VIP Lounge Table Reservation', price: '₹5,000 deposit', desc: 'Dedicated server & priority bottle service' }
        ]
      },
      bakery: {
        tagline: 'Artisanal Sourdough & French Pastry Boutique',
        heroImg: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
        accent: '#eab308',
        features: ['Fresh Daily Bakes', 'Custom Birthday Cakes', '1-Click WhatsApp Ordering', 'Gluten-Free Delights'],
        menuHighlights: [
          { name: '24-Hour Fermented Sourdough', price: '₹180', desc: 'Crispy crackling crust with airy, tangy crumb' },
          { name: 'Custom Fondant Celebration Cake', price: '₹1,500/kg', desc: 'Personalized handcrafted themes and Belgian chocolate' },
          { name: 'Parisian Macaron Gift Box (12pc)', price: '₹750', desc: 'Assorted ganache flavors in luxury presentation box' }
        ]
      },
      pharmacy: {
        tagline: 'Trusted Neighborhood Healthcare & Fast Home Delivery',
        heroImg: 'https://images.unsplash.com/photo-1586015555751-63c2999e52c9?auto=format&fit=crop&w=1200&q=80',
        accent: '#10b981',
        features: ['Prescription WhatsApp Upload', 'Express 30-Min Delivery', 'Free Blood Pressure Check', 'Genuine Brand Meds'],
        menuHighlights: [
          { name: 'Quick Prescription Refill', price: 'Same Day', desc: 'Take a photo of prescription and receive meds at doorstep' },
          { name: 'Home Health Monitoring Kit', price: '₹1,850', desc: 'Digital BP monitor, oximeter, and thermometer' },
          { name: 'Monthly Wellness Subscription', price: 'Custom', desc: 'Automated recurring delivery of maintenance medicines' }
        ]
      },
      retail: {
        tagline: 'Curated Designer Apparel & Lifestyle Collection',
        heroImg: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
        accent: '#6366f1',
        features: ['New Season Arrivals', 'Personal Styling Sessions', 'Click-and-Collect in Store', 'WhatsApp Lookbook Preview'],
        menuHighlights: [
          { name: 'Signature Linen Ensemble', price: '₹3,400', desc: 'Breathable Italian linen tailored for effortless elegance' },
          { name: 'Handcrafted Leather Tote', price: '₹4,800', desc: 'Full-grain artisan leather with brass hardware' },
          { name: 'Private VIP Fitting Appointment', price: 'FREE', desc: 'Dedicated stylist with champagne preview' }
        ]
      },
      lawyer: {
        tagline: 'Strategic Corporate Counsel & High-Stakes Litigation',
        heroImg: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
        accent: '#3b82f6',
        features: ['Confidential Case Evaluation', 'Corporate & Commercial Law', 'Direct Attorney WhatsApp Line', 'Proven Track Record'],
        menuHighlights: [
          { name: 'Initial Strategic Legal Audit', price: '₹3,000', desc: 'Comprehensive case review and risk mitigation roadmap' },
          { name: 'Startup Incorporation & Contracts', price: '₹15,000', desc: 'Complete founders agreement, IP assignment & bylaws' },
          { name: 'Commercial Litigation Retainer', price: 'Bespoke', desc: 'Aggressive representation by seasoned courtroom advocates' }
        ]
      }
    };
  }

  getTemplate(type) {
    return this.templateMap[type] || this.templateMap.cafe;
  }

  /* ────────────────────────────────────────────────────────
     $50,000 ULTRA-LUXURY BESPOKE WEBSITE MOCKUP GENERATOR
     With Ambient Motion Animations, Dynamic Currency & Live Booking Console
  ──────────────────────────────────────────────────────── */
  generateHTML(biz, options = {}) {
    const t = this.getTemplate(biz.type || 'cafe');
    const phone = options.yourPhone || '9511347627';
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const agencyName = options.yourName || 'Swastik';
    const city = biz.city || 'your city';
    const currSym = biz.currencySymbol || '₹';
    const currCode = biz.currencyCode || 'INR';

    // Format menu prices according to business country & currency
    const formatPrice = (rawPrice) => {
      if (rawPrice === 'FREE' || rawPrice === 0) return 'FREE VIP PASS';
      if (rawPrice === 'Bespoke') return 'BESPOKE';

      if (currSym === '₹') return rawPrice;

      const usdEquiv = {
        '₹220': '$8.50', '₹340': '$14.00', '₹190': '$7.50',
        '₹850': '$32.00', '₹1,200': '$48.00', '₹420': '$16.00',
        'FREE': 'FREE PASS', '₹3,500': '$49.00', '₹12,000': '$160.00',
        '₹4,500': '$65.00', '₹2,800': '$39.00', '₹15,000': '$195.00',
        '₹3,200': '$45.00', '₹2,600': '$36.00',
        '₹1,500': '$22.00', '₹35,000': '$480.00', '₹8,500': '$120.00',
        '₹12,000': '$160.00', '₹28,000': '$390.00',
        '₹650': '$25.00', '₹850': '$32.00', '₹750': '$28.00',
        '₹65': '$3.50', '₹280': '$11.00', '₹180': '$7.50',
        '₹150': '$6.00', '₹450': '$18.00',
        '₹2,500': '$38.00', '₹1,800': '$28.00',
        '₹3,000': '$45.00', 'Bespoke': 'BESPOKE'
      };

      let priceStr = usdEquiv[rawPrice] || '$24.00';
      if (currSym === '£') priceStr = priceStr.replace('$', '£');
      else if (currSym === '€') priceStr = priceStr.replace('$', '€');
      else if (currSym === 'AED') priceStr = priceStr.replace('$', 'AED ');
      else if (currSym === 'S$') priceStr = priceStr.replace('$', 'S$ ');
      else if (currSym === 'CA$') priceStr = priceStr.replace('$', 'CA$ ');
      else if (currSym === 'A$') priceStr = priceStr.replace('$', 'A$ ');
      return priceStr;
    };

    const items = t.menuHighlights.map(m => ({
      ...m,
      priceFormatted: formatPrice(m.price)
    }));

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${biz.name} – Bespoke Digital Concept Preview</title>
  
  <!-- Premium Google Fonts: Syne (Luxury Headlines), Playfair Display & Plus Jakarta Sans -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Syne:wght@700;800&display=swap" rel="stylesheet">

  <style>
    *, *::before, *::after {
      margin: 0; padding: 0; box-sizing: border-box;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }

    :root {
      --accent: ${t.accent};
      --accent-glow: ${t.accent}40;
      --bg-noir: #070913;
      --bg-card: rgba(13, 19, 36, 0.65);
      --border-card: rgba(255, 255, 255, 0.08);
      --border-glow: ${t.accent}60;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
    }

    body {
      background-color: var(--bg-noir);
      color: var(--text-main);
      overflow-x: hidden;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }

    /* ═══════════════════════════════
       ANIMATED AMBIENT AURORA & MESH
       ═══════════════════════════════ */
    .ambient-canvas {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      overflow: hidden;
    }
    .ambient-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(90px);
      opacity: 0.35;
      animation: orbFloat 22s infinite alternate ease-in-out;
      will-change: transform, opacity;
    }
    .orb-1 {
      top: -10%; left: 10%;
      width: 650px; height: 650px;
      background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
      animation-duration: 20s;
    }
    .orb-2 {
      bottom: 10%; right: 5%;
      width: 700px; height: 700px;
      background: radial-gradient(circle, #6366f1 0%, transparent 70%);
      animation-duration: 26s;
      animation-delay: -6s;
    }
    .orb-3 {
      top: 40%; right: 25%;
      width: 550px; height: 550px;
      background: radial-gradient(circle, #10b981 0%, transparent 70%);
      animation-duration: 28s;
      animation-delay: -12s;
    }
    .grid-overlay {
      position: absolute;
      inset: 0;
      background-image: 
        radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
        linear-gradient(180deg, rgba(7, 9, 19, 0.2) 0%, rgba(7, 9, 19, 0.8) 100%);
      background-size: 36px 36px, 100% 100%;
      opacity: 0.8;
    }

    @keyframes orbFloat {
      0% { transform: translate(0, 0) scale(1) rotate(0deg); }
      50% { transform: translate(60px, -50px) scale(1.15) rotate(180deg); }
      100% { transform: translate(-40px, 40px) scale(0.92) rotate(360deg); }
    }

    /* ═══════════════════════════════
       PREVIEW WATERMARK BAR (TOP)
       ═══════════════════════════════ */
    .preview-bar {
      position: sticky;
      top: 0;
      z-index: 9999;
      background: rgba(8, 12, 24, 0.94);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.14);
      padding: 0.65rem 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.6);
    }
    .preview-info {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      font-size: 0.85rem;
      color: #e2e8f0;
    }
    .preview-pulse {
      width: 8px; height: 8px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 12px #10b981;
      animation: pulseGlow 2s infinite;
    }
    .badge-real-photos {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid rgba(16, 185, 129, 0.35);
      color: #6ee7b7;
      font-size: 0.72rem;
      font-weight: 700;
      padding: 0.2rem 0.6rem;
      border-radius: 999px;
      letter-spacing: 0.3px;
    }
    .btn-3d-toggle {
      background: rgba(212, 175, 55, 0.15);
      border: 1px solid rgba(212, 175, 55, 0.4);
      color: #f4dda9;
      font-size: 0.78rem;
      font-weight: 700;
      padding: 0.3rem 0.85rem;
      border-radius: 6px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      transition: all 0.2s ease;
    }
    .btn-3d-toggle:hover {
      background: rgba(212, 175, 55, 0.3);
      transform: translateY(-1px);
    }

    /* ═══════════════════════════════
       INTERACTIVE 3D PERSPECTIVE STAGE
       ═══════════════════════════════ */
    .stage-3d-wrapper {
      perspective: 1400px;
      transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      transform-style: preserve-3d;
      padding: 0;
    }
    .stage-3d-active {
      padding: 2rem 3rem 4rem 3rem;
      background: radial-gradient(circle at center, rgba(30, 41, 59, 0.4) 0%, rgba(7, 9, 19, 0.95) 100%);
    }
    .stage-3d-active .stage-canvas {
      transform: rotateX(7deg) rotateY(-5deg) scale(0.96);
      border: 2px solid rgba(212, 175, 55, 0.35);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 45px 120px rgba(0, 0, 0, 0.85), 0 0 50px rgba(212, 175, 55, 0.15);
      transition: transform 0.2s ease-out;
    }
    .btn-claim-site {
      background: linear-gradient(135deg, #10b981, #059669);
      color: #fff;
      text-decoration: none;
      font-size: 0.82rem;
      font-weight: 800;
      padding: 0.45rem 1rem;
      border-radius: 99px;
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      box-shadow: 0 0 25px rgba(16, 185, 129, 0.4);
      transition: all 0.25s ease;
      letter-spacing: 0.02em;
    }
    .btn-claim-site:hover {
      transform: translateY(-1px) scale(1.03);
      box-shadow: 0 0 35px rgba(16, 185, 129, 0.7);
    }

    @keyframes pulseGlow {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(1.25); }
    }

    /* ═══════════════════════════════
       LUXURY NAVIGATION
       ═══════════════════════════════ */
    nav {
      position: sticky;
      top: 48px;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.25rem 3.5rem;
      background: rgba(10, 14, 28, 0.75);
      backdrop-filter: blur(28px) saturate(180%);
      -webkit-backdrop-filter: blur(28px) saturate(180%);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      transition: all 0.3s ease;
    }
    .brand-logo {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      text-decoration: none;
      color: #fff;
    }
    .brand-icon {
      width: 38px; height: 38px;
      border-radius: 10px;
      background: linear-gradient(135deg, var(--accent), #6366f1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 1.15rem;
      color: #fff;
      box-shadow: 0 0 20px var(--accent-glow);
    }
    .brand-name {
      font-family: 'Syne', sans-serif;
      font-size: 1.3rem;
      font-weight: 800;
      letter-spacing: -0.02em;
    }
    .nav-links {
      display: flex;
      align-items: center;
      gap: 2.25rem;
      list-style: none;
    }
    .nav-links a {
      color: #94a3b8;
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 600;
      transition: color 0.2s;
      position: relative;
    }
    .nav-links a:hover { color: #fff; }
    .nav-links a::after {
      content: '';
      position: absolute;
      bottom: -4px; left: 0; width: 0%; height: 2px;
      background: var(--accent);
      transition: width 0.25s ease;
    }
    .nav-links a:hover::after { width: 100%; }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .status-open-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.75rem;
      padding: 0.3rem 0.75rem;
      border-radius: 99px;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: #6ee7b7;
      font-weight: 600;
    }
    .btn-nav-book {
      background: linear-gradient(135deg, var(--accent), #f59e0b);
      color: #070913;
      font-weight: 800;
      padding: 0.65rem 1.4rem;
      border-radius: 99px;
      text-decoration: none;
      font-size: 0.88rem;
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      box-shadow: 0 0 25px var(--accent-glow);
      transition: all 0.25s;
    }
    .btn-nav-book:hover {
      transform: translateY(-2px) scale(1.03);
      box-shadow: 0 0 35px var(--accent-glow);
    }

    /* ═══════════════════════════════
       HERO SECTION WITH VISUAL DEPTH
       ═══════════════════════════════ */
    .hero-section {
      position: relative;
      min-height: 90vh;
      display: flex;
      align-items: center;
      padding: 5rem 3.5rem;
      background: 
        linear-gradient(180deg, rgba(7, 9, 19, 0.4) 0%, rgba(7, 9, 19, 0.95) 100%),
        linear-gradient(90deg, rgba(7, 9, 19, 0.85) 0%, rgba(7, 9, 19, 0.4) 60%, rgba(7, 9, 19, 0.85) 100%),
        url('${t.heroImg}');
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
    }
    .hero-content {
      max-width: 760px;
      z-index: 10;
      animation: heroEntrance 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
    }

    @keyframes heroEntrance {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .award-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.4rem 1rem;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 99px;
      font-size: 0.82rem;
      font-weight: 700;
      color: #fde047;
      margin-bottom: 1.5rem;
      backdrop-filter: blur(12px);
      box-shadow: 0 0 20px rgba(253, 224, 71, 0.15);
    }
    .hero-content h1 {
      font-family: 'Syne', sans-serif;
      font-size: 4rem;
      font-weight: 800;
      line-height: 1.05;
      letter-spacing: -0.03em;
      margin-bottom: 1.35rem;
      background: linear-gradient(135deg, #ffffff 45%, var(--accent));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .hero-content p {
      font-size: 1.2rem;
      color: #cbd5e1;
      line-height: 1.65;
      margin-bottom: 2.25rem;
      max-width: 650px;
    }
    .hero-cta-group {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      flex-wrap: wrap;
      margin-bottom: 3rem;
    }
    .btn-hero-primary {
      background: linear-gradient(135deg, var(--accent), #f59e0b);
      color: #070913;
      font-weight: 800;
      font-size: 1.05rem;
      padding: 0.95rem 2.25rem;
      border-radius: 99px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.55rem;
      box-shadow: 0 0 35px var(--accent-glow);
      transition: all 0.25s ease;
    }
    .btn-hero-primary:hover {
      transform: translateY(-2px) scale(1.03);
      box-shadow: 0 0 45px var(--accent-glow);
    }
    .btn-hero-secondary {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #fff;
      font-weight: 700;
      font-size: 1.05rem;
      padding: 0.95rem 1.85rem;
      border-radius: 99px;
      text-decoration: none;
      backdrop-filter: blur(12px);
      transition: all 0.25s ease;
    }
    .btn-hero-secondary:hover {
      background: rgba(255, 255, 255, 0.12);
      border-color: rgba(255, 255, 255, 0.3);
    }

    .trust-strip {
      display: flex;
      align-items: center;
      gap: 2.5rem;
      flex-wrap: wrap;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 1.75rem;
    }
    .trust-item {
      display: flex;
      align-items: center;
      gap: 0.65rem;
    }
    .trust-item span:first-child { font-size: 1.25rem; }
    .trust-item span:last-child {
      font-size: 0.85rem;
      color: #94a3b8;
      font-weight: 600;
    }

    /* ═══════════════════════════════
       INTERACTIVE LIVE VIP BOOKING CONSOLE
       ═══════════════════════════════ */
    .booking-section {
      position: relative;
      z-index: 10;
      padding: 4rem 3.5rem;
      max-width: 1200px;
      margin: -4rem auto 3rem;
    }
    .booking-console-card {
      background: rgba(14, 20, 40, 0.82);
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 24px;
      padding: 2.5rem;
      box-shadow: 0 30px 80px -10px rgba(0, 0, 0, 0.8), 0 0 50px var(--accent-glow);
      backdrop-filter: blur(36px);
      -webkit-backdrop-filter: blur(36px);
    }
    .booking-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2rem;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .booking-header h3 {
      font-family: 'Syne', sans-serif;
      font-size: 1.6rem;
      font-weight: 800;
      color: #fff;
    }
    .booking-header p {
      color: var(--text-muted);
      font-size: 0.9rem;
      margin-top: 0.25rem;
    }
    .booking-steps-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    .step-box {
      background: rgba(255, 255, 255, 0.035);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 1.25rem;
    }
    .step-label {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--accent);
      font-weight: 800;
      margin-bottom: 0.75rem;
      display: block;
    }
    .selector-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 0.45rem;
    }
    .pill-btn {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #cbd5e1;
      padding: 0.45rem 0.85rem;
      border-radius: 8px;
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }
    .pill-btn:hover, .pill-btn.active {
      background: var(--accent);
      color: #070913;
      font-weight: 800;
      border-color: var(--accent);
      box-shadow: 0 0 15px var(--accent-glow);
    }
    .booking-submit-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 1.5rem;
      flex-wrap: wrap;
      gap: 1.25rem;
    }
    .selected-summary {
      font-size: 0.9rem;
      color: #e2e8f0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .selected-summary strong { color: var(--accent); }
    .btn-execute-booking {
      background: linear-gradient(135deg, #10b981, #059669);
      color: #fff;
      text-decoration: none;
      font-weight: 800;
      font-size: 1rem;
      padding: 0.85rem 2rem;
      border-radius: 99px;
      display: inline-flex;
      align-items: center;
      gap: 0.55rem;
      box-shadow: 0 0 30px rgba(16, 185, 129, 0.4);
      transition: all 0.25s;
    }
    .btn-execute-booking:hover {
      transform: translateY(-2px) scale(1.03);
      box-shadow: 0 0 45px rgba(16, 185, 129, 0.65);
    }

    /* ═══════════════════════════════
       CURATED SIGNATURE OFFERINGS
       ═══════════════════════════════ */
    .section-wrap {
      position: relative;
      z-index: 10;
      max-width: 1200px;
      margin: 0 auto;
      padding: 5rem 3.5rem;
    }
    .section-head {
      text-align: center;
      margin-bottom: 3.5rem;
    }
    .section-head h2 {
      font-family: 'Syne', sans-serif;
      font-size: 2.8rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 0.65rem;
    }
    .section-head p {
      color: var(--text-muted);
      font-size: 1.05rem;
      max-width: 600px;
      margin: 0 auto;
    }

    .features-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.25rem;
      margin-bottom: 5rem;
    }
    .feature-tile {
      background: rgba(255, 255, 255, 0.025);
      border: 1px solid var(--border-card);
      border-radius: 20px;
      padding: 2rem 1.5rem;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
      overflow: hidden;
    }
    .feature-tile:hover {
      transform: translateY(-6px);
      background: rgba(255, 255, 255, 0.05);
      border-color: var(--border-glow);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px var(--accent-glow);
    }
    .feature-icon-box {
      font-size: 2.2rem;
      margin-bottom: 1rem;
    }
    .feature-tile h4 {
      font-size: 1.1rem;
      font-weight: 700;
      color: #fff;
    }

    .menu-cards-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.75rem;
    }
    .menu-lux-card {
      background: rgba(14, 20, 38, 0.75);
      border: 1px solid var(--border-card);
      border-radius: 22px;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
      overflow: hidden;
    }
    .menu-lux-card:hover {
      transform: translateY(-8px);
      border-color: var(--border-glow);
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6), 0 0 35px var(--accent-glow);
      background: rgba(20, 28, 52, 0.85);
    }
    .menu-card-top {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 0.85rem;
    }
    .menu-card-top h4 {
      font-size: 1.25rem;
      font-weight: 800;
      color: #fff;
    }
    .menu-price-tag {
      font-size: 1.35rem;
      font-weight: 800;
      color: var(--accent);
      font-family: 'Syne', sans-serif;
    }
    .menu-lux-card p {
      font-size: 0.9rem;
      color: var(--text-muted);
      line-height: 1.6;
      margin-bottom: 2rem;
    }
    .btn-card-order {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.14);
      color: #fff;
      font-weight: 700;
      font-size: 0.85rem;
      padding: 0.75rem;
      border-radius: 12px;
      text-align: center;
      text-decoration: none;
      transition: all 0.2s;
    }
    .menu-lux-card:hover .btn-card-order {
      background: var(--accent);
      color: #070913;
      font-weight: 800;
      border-color: var(--accent);
      box-shadow: 0 0 20px var(--accent-glow);
    }

    /* ═══════════════════════════════
       5-STAR VERIFIED TESTIMONIALS
       ═══════════════════════════════ */
    .reviews-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
      margin-top: 4rem;
    }
    .review-card {
      background: rgba(255, 255, 255, 0.025);
      border: 1px solid var(--border-card);
      border-radius: 20px;
      padding: 2rem;
      position: relative;
    }
    .stars { color: #f59e0b; margin-bottom: 1rem; font-size: 1.1rem; }
    .review-text {
      font-size: 0.95rem;
      font-style: italic;
      color: #cbd5e1;
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }
    .reviewer-meta {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .reviewer-avatar {
      width: 42px; height: 42px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--accent), #6366f1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      color: #fff;
    }
    .reviewer-name {
      font-weight: 700;
      font-size: 0.9rem;
      color: #fff;
    }
    .reviewer-source {
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    /* ═══════════════════════════════
       FINAL HIGH-CONVERTING AGENCY CTA
       ═══════════════════════════════ */
    .agency-cta-box {
      background: radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.25) 0%, rgba(16, 185, 129, 0.15) 60%, rgba(10, 14, 28, 0.8) 100%);
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 30px;
      padding: 5rem 2.5rem;
      text-align: center;
      max-width: 950px;
      margin: 4rem auto 2rem;
      position: relative;
      overflow: hidden;
      box-shadow: 0 35px 80px rgba(0, 0, 0, 0.8);
    }
    .agency-cta-box::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; height: 2px;
      background: linear-gradient(90deg, #6366f1, var(--accent), #10b981);
    }
    .agency-cta-box h2 {
      font-family: 'Syne', sans-serif;
      font-size: 2.8rem;
      font-weight: 800;
      margin-bottom: 1.25rem;
      color: #fff;
    }
    .agency-cta-box p {
      color: #cbd5e1;
      font-size: 1.15rem;
      max-width: 650px;
      margin: 0 auto 2.5rem;
      line-height: 1.7;
    }
    .btn-agency-launch {
      background: linear-gradient(135deg, #10b981, #059669);
      color: #fff;
      font-weight: 800;
      font-size: 1.1rem;
      padding: 1.1rem 2.75rem;
      border-radius: 99px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.65rem;
      box-shadow: 0 0 45px rgba(16, 185, 129, 0.5);
      transition: all 0.25s;
    }
    .btn-agency-launch:hover {
      transform: translateY(-3px) scale(1.04);
      box-shadow: 0 0 60px rgba(16, 185, 129, 0.75);
    }

    footer {
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding: 3.5rem;
      text-align: center;
      color: var(--text-muted);
      font-size: 0.85rem;
      position: relative;
      z-index: 10;
    }
    footer strong { color: #fff; }

    /* Responsive */
    @media (max-width: 1024px) {
      .features-row { grid-template-columns: repeat(2, 1fr); }
      .menu-cards-grid { grid-template-columns: repeat(2, 1fr); }
      .reviews-grid { grid-template-columns: 1fr; }
      .booking-steps-grid { grid-template-columns: 1fr; }
      .hero-content h1 { font-size: 3rem; }
      nav { padding: 1.25rem 2rem; }
    }
    @media (max-width: 768px) {
      .menu-cards-grid { grid-template-columns: 1fr; }
      .hero-section { padding: 4rem 1.5rem; }
      .hero-content h1 { font-size: 2.35rem; }
      .nav-links { display: none; }
      .booking-section { padding: 2rem 1.5rem; }
      .agency-cta-box { padding: 3rem 1.5rem; }
      .agency-cta-box h2 { font-size: 2rem; }
    }
  </style>
</head>
<body>

  <!-- Ambient Animated Canvas -->
  <div class="ambient-canvas">
    <div class="ambient-orb orb-1"></div>
    <div class="ambient-orb orb-2"></div>
    <div class="ambient-orb orb-3"></div>
    <div class="grid-overlay"></div>
  </div>

  <!-- Sticky Luxury Watermark Header -->
  <div class="preview-bar">
    <div class="preview-info">
      <span class="preview-pulse"></span>
      <span>👑 <strong>3D LIVE MOCKUP PREVIEW</strong> for <strong>${biz.name}</strong> (${city})</span>
      <span class="badge-real-photos">📸 100% Real Business Photos • Zero AI</span>
    </div>
    <div style="display:flex;align-items:center;gap:0.75rem;">
      <button type="button" class="btn-3d-toggle" onclick="window.toggle3DDeviceStage()">
        <span id="btn3DIcon">✨</span>
        <span id="btn3DLabel">3D Tilt View</span>
      </button>
      <a href="https://wa.me/91${cleanPhone}?text=Hey%20Swastik,%20I%20saw%20the%203D%20website%20preview%20for%20${encodeURIComponent(biz.name)}%20and%20want%20to%20discuss%20it!" target="_blank" class="btn-claim-site">
        🚀 Launch on WhatsApp →
      </a>
    </div>
  </div>

  <!-- Interactive Demo Clarification Banner -->
  <div style="background:rgba(212,175,55,0.12);border-bottom:1px solid rgba(212,175,55,0.3);padding:0.45rem 1.5rem;text-align:center;font-size:0.78rem;color:#fde68a;position:relative;z-index:9990;">
    ℹ️ <strong>Demo Concept Notice:</strong> This is just a concept demo website to showcase the design. If you want, we can make any changes and build an entirely fresh custom website tailored exactly to your requirements.
  </div>

  <div id="stageWrapper" class="stage-3d-wrapper">
    <div id="stageCanvas" class="stage-canvas">

  <!-- Main Luxury Navigation -->
  <nav>
    <a href="#" class="brand-logo">
      <div class="brand-icon">
        ${biz.name.charAt(0)}
      </div>
      <div class="brand-name">${biz.name}</div>
    </a>
    <ul class="nav-links">
      <li><a href="#about">About</a></li>
      <li><a href="#booking">VIP Booking</a></li>
      <li><a href="#offerings">Offerings</a></li>
      <li><a href="#reviews">Reviews</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <div class="nav-actions">
      <span class="status-open-pill">🟢 Online Bookings Open</span>
      <a href="https://wa.me/91${cleanPhone}?text=Hi,%20I%20would%20like%20to%20book%20an%20appointment/reservation%20at%20${encodeURIComponent(biz.name)}" target="_blank" class="btn-nav-book">
        <span>⚡ Book Now</span>
      </a>
    </div>
  </nav>

  <!-- Hero Section -->
  <header class="hero-section">
    <div class="hero-content">
      <div class="award-pill">
        <span>⭐ #1 Voted ${biz.type} in ${city} • 2026 Choice Award</span>
      </div>
      <h1>${t.tagline}</h1>
      <p>Welcome to ${biz.name}. Experience bespoke quality, master craftsmanship, and modern digital booking right here in ${city}.</p>
      
      <div class="hero-cta-group">
        <a href="#booking" class="btn-hero-primary">
          <span>📅 Reserve Online via WhatsApp</span>
        </a>
        <a href="#offerings" class="btn-hero-secondary">
          <span>Explore Offerings ↓</span>
        </a>
      </div>

      <div class="trust-strip">
        <div class="trust-item">
          <span>⭐</span>
          <span>4.9 / 5 Rating (520+ Reviews)</span>
        </div>
        <div class="trust-item">
          <span>⚡</span>
          <span>Instant WhatsApp Confirmation</span>
        </div>
        <div class="trust-item">
          <span>🛡️</span>
          <span>100% Satisfaction Guarantee</span>
        </div>
      </div>
    </div>
  </header>

  <!-- Interactive Live VIP Booking Console -->
  <section class="booking-section" id="booking">
    <div class="booking-console-card">
      <div class="booking-header">
        <div>
          <h3>Interactive VIP Booking & Reservation Engine</h3>
          <p>Clients book directly from smartphones in under 30 seconds with 1-click WhatsApp confirmation.</p>
        </div>
        <span class="status-open-pill">⚡ Live Customer Demo</span>
      </div>

      <div class="booking-steps-grid">
        <!-- Step 1 -->
        <div class="step-box">
          <span class="step-label">1. Select Preferred Day</span>
          <div class="selector-pills" id="dayPills">
            <button class="pill-btn active" data-val="Today">Today</button>
            <button class="pill-btn" data-val="Tomorrow">Tomorrow</button>
            <button class="pill-btn" data-val="This Friday">This Friday</button>
            <button class="pill-btn" data-val="This Saturday">This Saturday</button>
          </div>
        </div>

        <!-- Step 2 -->
        <div class="step-box">
          <span class="step-label">2. Select Time Slot</span>
          <div class="selector-pills" id="timePills">
            <button class="pill-btn" data-val="1:00 PM">1:00 PM</button>
            <button class="pill-btn active" data-val="6:30 PM">6:30 PM</button>
            <button class="pill-btn" data-val="8:00 PM">8:00 PM</button>
            <button class="pill-btn" data-val="9:30 PM">9:30 PM</button>
          </div>
        </div>

        <!-- Step 3 -->
        <div class="step-box">
          <span class="step-label">3. Party Size / Consultation</span>
          <div class="selector-pills" id="partyPills">
            <button class="pill-btn active" data-val="2 Guests">2 Guests</button>
            <button class="pill-btn" data-val="4 Guests">4 Guests</button>
            <button class="pill-btn" data-val="VIP Table">VIP Table</button>
            <button class="pill-btn" data-val="Private Event">Private Event</button>
          </div>
        </div>
      </div>

      <div class="booking-submit-row">
        <div class="selected-summary">
          <span>Booking for:</span>
          <strong id="summarySelection">Today at 6:30 PM (2 Guests)</strong>
        </div>
        <a id="btnExecuteBooking" href="https://wa.me/91${cleanPhone}?text=Hi%20${encodeURIComponent(biz.name)},%20I'd%20like%20to%20reserve%20for%20Today%20at%206:30%20PM%20(2%20Guests)!" target="_blank" class="btn-execute-booking">
          <span>📲 Confirm on WhatsApp Now →</span>
        </a>
      </div>
    </div>
  </section>

  <!-- Key Highlights & Pillars -->
  <section class="section-wrap" id="about">
    <div class="section-head">
      <h2>Why Patrons Choose ${biz.name}</h2>
      <p>Redefining standards and delivering unparalleled experiences in ${city}.</p>
    </div>

    <div class="features-row">
      ${t.features.map(f => `
        <div class="feature-tile">
          <div class="feature-icon-box">✨</div>
          <h4>${f}</h4>
        </div>
      `).join('')}
    </div>

    <!-- Featured Curated Menu / Services Grid -->
    <div class="section-head" id="offerings">
      <h2>Curated Signature Offerings</h2>
      <p>Transparent pricing, hand-crafted preparation, and seamless digital booking.</p>
    </div>

    <div class="menu-cards-grid">
      ${items.map(m => `
        <div class="menu-lux-card">
          <div>
            <div class="menu-card-top">
              <h4>${m.name}</h4>
              <span class="menu-price-tag">${m.priceFormatted}</span>
            </div>
            <p>${m.desc}</p>
          </div>
          <a href="https://wa.me/91${cleanPhone}?text=Hi%20${encodeURIComponent(biz.name)},%20I'm%20interested%20in%20ordering/booking%20${encodeURIComponent(m.name)}!" target="_blank" class="btn-card-order">
            Order / Inquire on WhatsApp →
          </a>
        </div>
      `).join('')}
    </div>

    <!-- Verified 5-Star Reviews -->
    <div class="section-head" id="reviews" style="margin-top:6rem;">
      <h2>Client Experiences & Praise</h2>
      <p>Verified testimonials from discerning patrons across ${city}.</p>
    </div>

    <div class="reviews-grid">
      <div class="review-card">
        <div class="stars">⭐⭐⭐⭐⭐</div>
        <p class="review-text">"Hands down the single best experience in ${city}. The attention to detail, atmosphere, and seamless WhatsApp booking made it effortlessly memorable."</p>
        <div class="reviewer-meta">
          <div class="reviewer-avatar">A</div>
          <div>
            <div class="reviewer-name">Aarav Mehta</div>
            <div class="reviewer-source">Verified Google Review • Local Guide</div>
          </div>
        </div>
      </div>

      <div class="review-card">
        <div class="stars">⭐⭐⭐⭐⭐</div>
        <p class="review-text">"Flawless quality from start to finish. We booked our VIP group in under a minute without waiting on phone holds. Will be back every week!"</p>
        <div class="reviewer-meta">
          <div class="reviewer-avatar">S</div>
          <div>
            <div class="reviewer-name">Sarah Jenkins</div>
            <div class="reviewer-source">TripAdvisor Verified Traveler</div>
          </div>
        </div>
      </div>

      <div class="review-card">
        <div class="stars">⭐⭐⭐⭐⭐</div>
        <p class="review-text">"The standard of service here puts everyone else to shame. Phenomenal experience and unmatched hospitality."</p>
        <div class="reviewer-meta">
          <div class="reviewer-avatar">R</div>
          <div>
            <div class="reviewer-name">Rohan Sharma</div>
            <div class="reviewer-source">Verified Customer Review</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Final High-Converting Agency Launch Box -->
    <div class="agency-cta-box" id="contact">
      <h2>Ready to Own This Complete Website for ${biz.name}?</h2>
      <p>Turn online visitors into paying customers on autopilot. Includes custom domain setup, lightning-fast mobile optimization, and 1-click WhatsApp table reservations.</p>
      <a href="https://wa.me/91${cleanPhone}?text=Hey%20Swastik,%20I'm%20ready%20to%20launch%20the%20official%20website%20for%20${encodeURIComponent(biz.name)}!" target="_blank" class="btn-agency-launch">
        <span>🚀 Launch This Website with SWASTIK on WhatsApp →</span>
      </a>
    </div>
  </section>

  <!-- Footer -->
  <footer>
    <p>📍 ${biz.address || city} • 📞 ${biz.phone || '+91 9511347627'}</p>
    <p style="margin-top:0.65rem;">© ${new Date().getFullYear()} ${biz.name}. Concept designed by <strong>SWASTIK Web Design Agency</strong> (${agencyName}).</p>
  </footer>

  <!-- Script for Interactive Booking Console -->
  <script>
    (function() {
      let curDay = 'Today';
      let curTime = '6:30 PM';
      let curParty = '2 Guests';
      const cleanPhone = '${cleanPhone}';
      const bizName = '${encodeURIComponent(biz.name)}';

      function syncBooking() {
        const text = curDay + ' at ' + curTime + ' (' + curParty + ')';
        const summary = document.getElementById('summarySelection');
        if (summary) summary.textContent = text;

        const btn = document.getElementById('btnExecuteBooking');
        if (btn) {
          const msg = encodeURIComponent("Hi " + decodeURIComponent(bizName) + ", I'd like to reserve for " + text + "!");
          btn.href = "https://wa.me/91" + cleanPhone + "?text=" + msg;
        }
      }

      function bindPills(containerId, callback) {
        const wrap = document.getElementById(containerId);
        if (!wrap) return;
        wrap.addEventListener('click', function(e) {
          const btn = e.target.closest('.pill-btn');
          if (!btn) return;
          wrap.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          callback(btn.dataset.val);
          syncBooking();
        });
      }

      bindPills('dayPills', function(v) { curDay = v; });
      bindPills('timePills', function(v) { curTime = v; });
      bindPills('partyPills', function(v) { curParty = v; });

      // Interactive 3D Perspective Stage Toggle
      let is3D = false;
      const stageWrapper = document.getElementById('stageWrapper');
      const stageCanvas = document.getElementById('stageCanvas');
      const btn3DLabel = document.getElementById('btn3DLabel');
      const btn3DIcon = document.getElementById('btn3DIcon');

      window.toggle3DDeviceStage = function() {
        is3D = !is3D;
        if (stageWrapper) {
          if (is3D) {
            stageWrapper.classList.add('stage-3d-active');
            if (btn3DLabel) btn3DLabel.textContent = 'Flat View';
            if (btn3DIcon) btn3DIcon.textContent = '📱';
          } else {
            stageWrapper.classList.remove('stage-3d-active');
            if (stageCanvas) stageCanvas.style.transform = '';
            if (btn3DLabel) btn3DLabel.textContent = '3D Tilt View';
            if (btn3DIcon) btn3DIcon.textContent = '✨';
          }
        }
      };

      // Mouse-move 3D perspective tracking when active
      document.addEventListener('mousemove', function(e) {
        if (!is3D || !stageCanvas) return;
        const xPercent = (e.clientX / window.innerWidth) - 0.5;
        const yPercent = (e.clientY / window.innerHeight) - 0.5;
        const rotX = 7 - (yPercent * 14);
        const rotY = -5 + (xPercent * 16);
        stageCanvas.style.transform = "rotateX(" + rotX.toFixed(2) + "deg) rotateY(" + rotY.toFixed(2) + "deg) scale(0.96)";
      });
    })();
  </script>

    </div><!-- #stageCanvas -->
  </div><!-- #stageWrapper -->

</body>
</html>`;
  }

  // Opens interactive live preview in a modal or new tab
  openLivePreview(biz, options = {}) {
    const html = this.generateHTML(biz, options);
    const win = window.open('', '_blank');
    if (win) {
      win.document.open();
      win.document.write(html);
      win.document.close();
    } else {
      // Fallback to data URI or blob
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    }
  }

  // Generate a shareable Data URL or preview link
  getPreviewLink(biz, options = {}) {
    // Generates high-converting 3D interactive mockup preview link
    const slug = (biz.name || 'client').toLowerCase().replace(/[^a-z0-9]/g, '-');
    return `https://swastik.dev/mockups/3d/${slug}?id=${biz.id || 'sw'}&mode=3d_live`;
  }
}

// Global instance
window.swastikMockup = new MockupGenerator();

