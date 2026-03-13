/* =========================================================
   Luciano Rodrigues — Portfolio JS (Versão Final Consolidada)
   ========================================================= */

/* -------------------------
   Helpers / Estado Global
--------------------------*/
const PG_state = { images: [], index: 0, currentLang: 'en' };
const CardSlides = new Map();

const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const on = (el, evt, fn, opts) => el && el.addEventListener(evt, fn, opts);

/* -------------------------
   Dados — Stats & Estratégia
--------------------------*/
const statDetailsData = {
  savings: {
    icon: "fa-piggy-bank",
    title: "Cumulative Savings Delivered",
    value: "€1M+",
    details: [
      "Multi-category strategic sourcing initiatives across direct and indirect spend",
      "Negotiated favorable payment terms (60-90 days) improving cash flow",
      "Implemented should-cost modeling identifying 15-25% cost reduction opportunities",
      "Consolidated supplier base from 200+ to 80 key partners",
      "Zero-based budgeting approach for CAPEX projects saving 20% on average"
    ]
  },
  rfps: {
    icon: "fa-file-contract",
    title: "Strategic Tenders Led",
    value: "120+",
    details: [
      "End-to-end RFI/RFP/RFQ process design with technical annexes (A1/A2)",
      "Weighted scoring matrices balancing technical (40%), commercial (35%), and ESG (25%) criteria",
      "E-procurement platform integration with full audit trails",
      "Cross-functional evaluation committees (Engineering, Finance, Legal, Operations)",
      "Average cycle time reduction from 45 to 28 days while improving compliance"
    ]
  },
  projects: {
    icon: "fa-project-diagram",
    title: "Project Portfolio Value",
    value: "€10M+",
    details: [
      "New product development from concept to mass production",
      "Licensed portfolio launches (Blaupunkt, Spear & Jackson, Pininfarina)",
      "Factory audits and supplier capability assessments across Asia",
      "Quality system implementations (ISO 9001, compliance frameworks)",
      "Cross-border logistics optimization and customs compliance"
    ]
  },
  regions: {
    icon: "fa-globe",
    title: "Global Operations Coverage",
    value: "20+",
    details: [
      "Europe: Portugal, Spain, Germany, UK, Netherlands, Italy, France",
      "LATAM: Brazil, Argentina, Chile, Colombia, Mexico, Peru, Uruguay",
      "Asia: China, Hong Kong, Taiwan, Vietnam, India, South Korea",
      "Multi-cultural negotiation experience and local market knowledge",
      "Time zone coordination for 24/7 project execution"
    ]
  }
};

const strategyDetailsData = {
  1: {
    title: "Stand Design & Merchandising",
    subtitle: "Creating immersive brand experiences",
    icon: "fa-drafting-compass",
    sections: [
      {
        title: "Strategic Approach",
        items: [
          "Co-created booth concept with Marketing aligning to brand positioning",
          "Traffic flow optimization for maximum visitor engagement",
          "Product display hierarchy highlighting hero SKUs and new launches",
          "Lighting and visual merchandising for premium brand perception",
          "Interactive demo stations for hands-on product experience"
        ]
      },
      {
        title: "Technical Execution",
        items: [
          "3D renderings and mockups approved 60 days prior to event",
          "Modular stand components for reusability across fairs",
          "Digital signage integration with real-time product catalogs",
          "Storage and logistics planning for 500+ SKU displays",
          "On-site supervision during build-up and dismantling"
        ]
      }
    ]
  },
  2: {
    title: "Meetings Orchestration & Lead Capture",
    subtitle: "Maximizing ROI through structured engagement",
    icon: "fa-calendar-check",
    sections: [
      {
        title: "Pre-Event Planning",
        items: [
          "Target list development: 200+ qualified prospects per fair",
          "Meeting scheduling system with automated reminders",
          "Sales team briefing with product knowledge sessions",
          "Customized pitch decks by customer segment",
          "Lead scoring criteria defined (budget, timeline, authority)"
        ]
      },
      {
        title: "On-Site Execution",
        items: [
          "Structured 30-minute meeting slots with clear agendas",
          "Real-time lead capture via CRM mobile app",
          "Immediate follow-up emails sent within 4 hours",
          "Meeting notes standardized for pipeline visibility",
          "Daily team huddles to adjust strategy based on feedback"
        ]
      }
    ]
  },
  3: {
    title: "Negotiations & Partnering",
    subtitle: "Building strategic supplier relationships",
    icon: "fa-handshake-angle",
    sections: [
      {
        title: "Partnership Development",
        items: [
          "Initial qualification: financial stability, capacity, certifications",
          "Term sheet negotiations: MOQ, payment terms, exclusivity clauses",
          "Pricing framework with volume breaks and annual rebates",
          "Quality agreements defining defect rates and corrective actions",
          "IP protection and NDA frameworks for new product development"
        ]
      },
      {
        title: "Contractual Framework",
        items: [
          "Master Service Agreements (MSA) with standardized terms",
          "Statement of Work (SoW) templates for project-based work",
          "Service Level Agreements (SLA) with penalty/incentive clauses",
          "Force majeure and business continuity provisions",
          "Exit clauses and knowledge transfer obligations"
        ]
      }
    ]
  },
  4: {
    title: "Tech Discovery & Benchmark",
    subtitle: "Staying ahead of market innovation",
    icon: "fa-microchip",
    sections: [
      {
        title: "Market Intelligence",
        items: [
          "Technology scouting across 50+ supplier booths per fair",
          "Competitive product teardowns and feature comparison",
          "Cost benchmarking for similar specifications",
          "Innovation trend mapping (IoT, sustainability, smart features)",
          "Patent landscape analysis for freedom to operate"
        ]
      },
      {
        title: "Technical Evaluation",
        items: [
          "Sample collection for lab testing and validation",
          "Engineering team consultations on technical feasibility",
          "Prototype review and design for manufacturing (DFM) feedback",
          "Certification requirements assessment (CE, FCC, ANATEL)",
          "Roadmap alignment with supplier R&D investments"
        ]
      }
    ]
  },
  5: {
    title: "Factory Audits & Capability Mapping",
    subtitle: "Ensuring operational excellence",
    icon: "fa-industry",
    sections: [
      {
        title: "Audit Framework",
        items: [
          "ISO 9001 quality management system verification",
          "Production capacity analysis (lines, shifts, utilization)",
          "Equipment maintenance records and calibration certificates",
          "Workforce skill assessment and training programs",
          "Environmental compliance and waste management practices"
        ]
      },
      {
        title: "Risk Assessment",
        items: [
          "Financial health check (credit reports, payment history)",
          "Supply chain resilience (dual sourcing, buffer stock)",
          "Social compliance audits (SA8000, BSCI standards)",
          "Cybersecurity protocols for data-sharing partnerships",
          "Business continuity planning and disaster recovery"
        ]
      }
    ]
  },
  6: {
    title: "Post-Fair Pipeline, ROI & Governance",
    subtitle: "Converting leads into revenue",
    icon: "fa-chart-line",
    sections: [
      {
        title: "Pipeline Management",
        items: [
          "Lead categorization: Hot (immediate), Warm (3 months), Cold (nurture)",
          "CRM integration with automated follow-up sequences",
          "Opportunity value estimation and win probability scoring",
          "Cross-functional handover to regional sales teams",
          "Weekly pipeline review meetings for first 30 days"
        ]
      },
      {
        title: "Performance Metrics",
        items: [
          "Cost per lead calculation (stand cost ÷ qualified leads)",
          "Conversion rate tracking from lead to order",
          "Average deal size comparison vs. non-fair customers",
          "Time-to-close analysis identifying bottlenecks",
          "Annual ROI reporting for marketing budget justification"
        ]
      }
    ]
  }
};

/* -------------------------
   Bootstrap / Inicialização
--------------------------*/
document.addEventListener('DOMContentLoaded', () => {
  initLoading();
  initNavbarScroll();
  initScrollAnimations();
  initParticles();
  initSmoothAnchors();
  initLangSwitcher();
  initI18N();
  initTradeTabs();
  initLightbox();

  // Galerias & cartões
  enhanceProjectGalleries();
  $$('.project-card').forEach(setupCardAutoSlide);

  // Voluntariado + correções de imagem
  initVolunteerEnhancement();
  fixGadsdenImages();

  // Mobile/touch
  initMobileEnhancements();

  // Fechar modais por clique/ESC
  on(document, 'click', (e) => {
    if (e.target?.id === 'statModalOverlay') closeStatModal();
    if (e.target?.id === 'strategyDetailOverlay') closeStrategyModal();
  });
  on(document, 'keydown', (e) => {
    if (e.key === 'Escape') {
      closeStatModal();
      closeStrategyModal();
      closeProjectGallery();
    }
  });

  // Inicializa Modais de Stats
  initStatModals();

  console.log('✅ Portfolio JS (consolidado) inicializado');
});

/* -------------------------
   Modais — Stats
--------------------------*/
function initStatModals() {
  $$('.stat-box').forEach(box => {
    box.style.cursor = 'pointer';
    on(box, 'click', function() {
      const key = this.getAttribute('data-stat');
      if (key) openStatModal(key);
    });
  });
}

function openStatModal(key) {
  const data = statDetailsData[key];
  if (!data) return;
  const overlay = $('#statModalOverlay');
  if (!overlay) return;

  $('#statModalIcon').className = `fas ${data.icon} stat-modal-icon`;
  $('#statModalTitle').textContent = data.title;
  $('#statModalValue').textContent = data.value;
  $('#statModalDetails').innerHTML = data.details.map(it => `<li>${it}</li>`).join('');
  
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeStatModal() {
  const overlay = $('#statModalOverlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

/* -------------------------
   Modais — Estratégia
--------------------------*/
function openStrategyModal(num) {
  const data = strategyDetailsData[num];
  if (!data) return;
  $('#strategyDetailIcon').className = `fas ${data.icon}`;
  $('#strategyDetailTitle').textContent = data.title;
  $('#strategyDetailSubtitle').textContent = data.subtitle;
  const body = data.sections.map(sec => {
    const items = sec.items.map(li => `<li>${li}</li>`).join('');
    return `<div class="strategy-detail-section"><h4><i class="fas fa-chevron-right"></i> ${sec.title}</h4><ul>${items}</ul></div>`;
  }).join('');
  $('#strategyDetailBody').innerHTML = body;
  $('#strategyDetailOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeStrategyModal() {
  const overlay = $('#strategyDetailOverlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

/* -------------------------
   Galerias de Projetos
--------------------------*/
function setupCardAutoSlide(card) {
  const container = card.querySelector('.gallery-main');
  if (!container) return;

  let images = [];
  const csv = card.getAttribute('data-images') || '';
  if (csv.trim()) {
    images = csv.split(',').map(s => s.trim()).filter(Boolean);
  } else {
    const main = container.querySelector('img');
    if (main?.src) images = [main.src];
  }
  if (!images.length) return;

  const imgEl = container.querySelector('img');
  const auto = card.getAttribute('data-autoslide') === 'true';
  const interval = Math.max(1200, parseInt(card.getAttribute('data-interval'), 10) || 2500);

  const state = { images, idx: 0, timer: null, interval, imgEl, paused: false };
  CardSlides.set(card, state);

  function tick() {
    if (state.paused || !auto || state.images.length <= 1) return;
    state.idx = (state.idx + 1) % state.images.length;
    state.imgEl.style.opacity = '0';
    setTimeout(() => {
      state.imgEl.src = state.images[state.idx];
      state.imgEl.onload = () => { state.imgEl.style.opacity = '1'; };
    }, 160);
  }
  
  function start() {
    if (auto && state.images.length > 1) state.timer = setInterval(tick, state.interval);
  }

  on(card, 'mouseenter', () => { state.paused = true; });
  on(card, 'mouseleave', () => { state.paused = false; });

  const clickable = card.querySelector('.gallery-overlay') || container;
  on(clickable, 'click', (e) => {
    e.stopPropagation();
    openProjectGalleryFromCard(card);
  });

  start();
}

function openProjectGalleryFromCard(card) {
  const modal = $('#projectGalleryModal');
  if (!modal) return;

  let images = [];
  const csv = card.getAttribute('data-images') || '';
  if (csv.trim()) {
    images = csv.split(',').map(s => s.trim()).filter(Boolean);
  } else {
    const main = card.querySelector('.gallery-main img');
    if (main?.src) images = [main.src];
  }
  if (!images.length) return;

  buildProjectSlides(images);
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function buildProjectSlides(images) {
  const slider = $('#gallerySlider');
  const dotsContainer = $('#galleryDots');
  if (!slider || !dotsContainer) return;

  slider.innerHTML = '';
  dotsContainer.innerHTML = '';

  images.forEach((src, idx) => {
    const slide = document.createElement('div');
    slide.className = 'gallery-slide' + (idx === 0 ? ' active' : '');
    const img = document.createElement('img');
    img.src = src;
    slide.appendChild(img);
    slider.appendChild(slide);

    const dot = document.createElement('div');
    dot.className = 'gallery-dot' + (idx === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToProjectSlide(idx));
    dotsContainer.appendChild(dot);
  });

  PG_state.images = images.slice();
  PG_state.index = 0;
}

function changeProjectSlide(dir) {
  if (!PG_state.images.length) return;
  const slides = $$('.gallery-slide');
  const dots = $$('.gallery-dot');
  slides[PG_state.index]?.classList.remove('active');
  dots[PG_state.index]?.classList.remove('active');
  PG_state.index = (PG_state.index + dir + PG_state.images.length) % PG_state.images.length;
  slides[PG_state.index]?.classList.add('active');
  dots[PG_state.index]?.classList.add('active');
}

function goToProjectSlide(idx) {
  if (!PG_state.images.length) return;
  const slides = $$('.gallery-slide');
  const dots = $$('.gallery-dot');
  slides[PG_state.index]?.classList.remove('active');
  dots[PG_state.index]?.classList.remove('active');
  PG_state.index = idx;
  slides[PG_state.index]?.classList.add('active');
  dots[PG_state.index]?.classList.add('active');
}

function closeProjectGallery() {
  const modal = $('#projectGalleryModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

/* -------------------------
   Navbar & Scroll
--------------------------*/
function initNavbarScroll() {
  const navbar = $('#navbar');
  const scrollTopBtn = $('#scrollTop');
  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    navbar?.classList.toggle('scrolled', y > 50);
    scrollTopBtn?.classList.toggle('visible', y > 600);
    updateTimelineSpy();
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

/* -------------------------
   I18N — Tradução
--------------------------*/
function translateAll(lang) {
  PG_state.currentLang = lang;
  document.documentElement.lang = lang;
  const dict = (window.I18N && window.I18N[lang]) || (window.I18N && window.I18N['en']) || {};
  $$('[data-i18n]').forEach(el => {
    const path = el.dataset.i18n;
    const value = path?.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), dict);
    if (value !== undefined) el.textContent = value;
  });
  setTimeout(updateTimelineSpy, 100);
}

function initLangSwitcher() {
  const switcher = $('#langSwitcher');
  if (!switcher) return;
  on(switcher, 'click', (e) => {
    const btn = e.target.closest('.lang-btn');
    if (!btn) return;
    const lang = btn.dataset.lang;
    translateAll(lang);
    $$('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
  });
}

function initI18N() {
  const browser = (navigator.language || 'en').slice(0, 2).toLowerCase();
  const initial = (['en', 'pt', 'es', 'fr'].includes(browser) ? browser : 'en');
  translateAll(initial);
}

/* -------------------------
   Outras Funcionalidades
--------------------------*/
function initScrollAnimations() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  $$('.animate-on-scroll').forEach(el => io.observe(el));
}

function initParticles() {
  const container = $('#particles');
  if (!container) return;
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.animationDelay = (Math.random() * 5) + 's';
    container.appendChild(p);
  }
}

function initSmoothAnchors() {
  $$('a[href^="#"]').forEach(a => {
    on(a, 'click', (e) => {
      const target = $(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

function initTradeTabs() {
  $$('.gallery-tab').forEach(btn => {
    on(btn, 'click', () => {
      $$('.gallery-tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      $$('.gallery-content').forEach(gc => gc.classList.remove('active'));
      $('#' + btn.dataset.target)?.classList.add('active');
    });
  });
}

function initLightbox() {
  const lb = $('#lightbox');
  if (!lb) return;
  on(lb, 'click', () => closeLightbox());
}

function openLightbox(el) {
  const lb = $('#lightbox');
  const lbImg = $('#lightbox-img');
  const src = el?.querySelector('img')?.src;
  if (!lb || !lbImg || !src) return;
  lbImg.src = src;
  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  $('#lightbox')?.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function updateTimelineSpy() {
  const items = $$('.timeline-item');
  const logoImg = $('#logo-img');
  if (!items.length || !logoImg) return;

  let activeIdx = 0;
  items.forEach((item, idx) => {
    const r = item.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.5) activeIdx = idx;
  });
  
  const newLogo = items[activeIdx].getAttribute('data-logo');
  if (newLogo && logoImg.src !== newLogo) logoImg.src = newLogo;
}

function initLoading() {
  window.addEventListener('load', () => {
    setTimeout(() => $('#loading')?.classList.add('hidden'), 1000);
  });
}

function initMobileEnhancements() {
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  if (!isTouch) return;
  $$('.stat-box, .project-card').forEach(el => {
    on(el, 'touchstart', () => el.style.transform = 'scale(0.98)', {passive: true});
    on(el, 'touchend', () => el.style.transform = '', {passive: true});
  });
}

function enhanceProjectGalleries() {
  const map = {
    "blaupunkt-tools": ["./Blaupunkt_Tools.png","./Blaupunkt_Illumiation_booth_HK_Fair.png"],
    "blaupunkt-power": ["./Blaupunkt_Power_Tools.png","./Blaupunkt_Tools.png"],
    "blaupunkt-garden": ["./Blaupunkt_Garden_Tools.png","./Blaupunkt_Tools.png"]
  };
  Object.keys(map).forEach(key => {
    const card = $(`.project-card[data-gallery="${key}"]`);
    if (card) card.setAttribute('data-images', map[key].join(','));
  });
}

function initVolunteerEnhancement() {
  const section = $('#volunteering');
  if (!section || section.querySelector('.volunteer-hero-image')) return;
  const hero = document.createElement('div');
  hero.className = 'volunteer-hero-image animate-on-scroll';
  hero.innerHTML = '<img src="./gadsdenstatecommunitycollege.jpg" alt="Gadsden" />';
  section.querySelector('.section-header')?.after(hero);
}

function fixGadsdenImages() {
  $$('.cert-logo img').forEach(img => {
    img.onerror = () => { if(img.src.includes('Gadsden')) img.src = './gadsdenstatecommunitycollege_logo.jpg'; };
  });
}

/* -------------------------
   Exposição Global (HTML)
--------------------------*/
window.openStatModal       = openStatModal;
window.closeStatModal      = closeStatModal;
window.openStrategyModal   = openStrategyModal;
window.closeStrategyModal  = closeStrategyModal;
window.changeProjectSlide  = changeProjectSlide;
window.goToProjectSlide    = goToProjectSlide;
window.closeProjectGallery = closeProjectGallery;
window.scrollToTop         = scrollToTop;
window.openLightbox        = openLightbox;
window.closeLightbox       = closeLightbox;
