/* =========================================================
   Luciano Rodrigues — Portfolio JS (consolidado e limpo)
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
   Modais — Stats
--------------------------*/
function openStatModal(key) {
  const data = statDetailsData[key];
  if (!data) return;
  $('#statModalIcon').className = `fas ${data.icon}`;
  $('#statModalTitle').textContent = data.title;
  $('#statModalValue').textContent = data.value;
  $('#statModalDetails').innerHTML = data.details.map(it => `<li>${it}</li>`).join('');
  $('#statModalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeStatModal() {
  const overlay = $('#statModalOverlay');
  if (!overlay) return;
  overlay.classList.remove('active');
  document.body.style.overflow = 'auto';
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
  if (!overlay) return;
  overlay.classList.remove('active');
  document.body.style.overflow = 'auto';
}

/* -------------------------
   Galerias de Projetos
--------------------------*/
function setupCardAutoSlide(card) {
  const container = card.querySelector('.gallery-main');
  if (!container) return;

  // carregar lista de imagens
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
    stop();
    if (auto && state.images.length > 1) state.timer = setInterval(tick, state.interval);
  }
  function stop() {
    if (state.timer) {
      clearInterval(state.timer);
      state.timer = null;
    }
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
    img.alt = 'Project image ' + (idx + 1);
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
   Outras melhorias
--------------------------*/
function initMobileEnhancements() {
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  if (!isTouch) return;

  $$('.stat-box, .strategy-item, .project-card, .gallery-item').forEach(el => {
    on(el, 'touchstart', function(){ this.style.transform = 'scale(0.98)'; }, { passive: true });
    on(el, 'touchend',   function(){ this.style.transform = '';           }, { passive: true });
  });

  $$('.project-card').forEach(card => {
    let startX = 0, currentX = 0;
    const gallery = card.querySelector('.gallery-main');
    if (!gallery) return;

    on(gallery, 'touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    on(gallery, 'touchmove',  e => { currentX = e.touches[0].clientX; }, { passive: true });
    on(gallery, 'touchend',   () => {
      const diff = startX - currentX;
      if (Math.abs(diff) > 50) {
        const state = CardSlides.get(card);
        if (state && state.images.length > 1) {
          state.idx = diff > 0 
            ? (state.idx + 1) % state.images.length
            : (state.idx - 1 + state.images.length) % state.images.length;

          state.imgEl.style.opacity = '0';
          setTimeout(() => {
            state.imgEl.src = state.images[state.idx];
            state.imgEl.onload = () => { state.imgEl.style.opacity = '1'; };
            card.querySelectorAll('.gallery-dot').forEach((dot, i) => {
              dot.classList.toggle('active', i === state.idx);
            });
          }, 160);
        }
      }
    }, { passive: true });
  });
}

function enhanceProjectGalleries() {
  const map = {
    "blaupunkt-tools": [
      "./Blaupunkt_Tools.png",
      "./Blaupunkt_Illumiation_booth_HK_Fair.png",
      "./Blaupunkt_Illumiation_booth_HK_Fair_1.png",
      "./Blaupunkt_Illumiation_booth_HK_Fair_2.png",
      "./Blaupunkt_Illumiation_booth_HK_Fair_3.png",
      "./Blaupunkt_Illumiation_booth_HK_Fair_4.png"
    ],
    "blaupunkt-power": [
      "./Blaupunkt_Power_Tools.png",
      "./Blaupunkt_Tools.png",
      "./Blaupunkt_Illumiation_booth_HK_Fair.png",
      "./Blaupunkt_Illumiation_booth_HK_Fair_1.png",
      "./Blaupunkt_Illumiation_booth_HK_Fair_2.png"
    ],
    "blaupunkt-garden": [
      "./Blaupunkt_Garden_Tools.png",
      "./Blaupunkt_Tools.png",
      "./Blaupunkt_Illumiation_booth_HK_Fair_2.png",
      "./Blaupunkt_Illumiation_booth_HK_Fair_3.png",
      "./Blaupunkt_Illumiation_booth_HK_Fair_4.png"
    ]
  };

  Object.keys(map).forEach(key => {
    const card = document.querySelector(`.project-card[data-gallery="${key}"]`);
    if (!card) return;
    const images = map[key];
    card.setAttribute('data-images', images.join(','));

    const gallery = card.querySelector('.project-gallery');
    if (gallery && !gallery.querySelector('.gallery-dots')) {
      const dots = document.createElement('div');
      dots.className = 'gallery-dots';
      images.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = `gallery-dot ${i === 0 ? 'active' : ''}`;
        dots.appendChild(dot);
      });
      gallery.appendChild(dots);
    }
  });
}

function initVolunteerEnhancement() {
  const section = $('#volunteering');
  if (!section) return;
  if (section.querySelector('.volunteer-hero-image')) return;

  const header = section.querySelector('.section-header');
  if (!header) return;

  const hero = document.createElement('div');
  hero.className = 'volunteer-hero-image animate-on-scroll visible';
  hero.innerHTML = '<img src="./gadsdenstatecommunitycollege.jpg" alt="Gadsden State Community College" onerror="this.style.display=\'none\'" />';
  header.after(hero);
}

/* Corrige logos do Gadsden (usa OR correto) */
function fixGadsdenImages() {
  $$('.cert-logo img').forEach(img => {
    if (img.src.includes('Gadsden') || img.alt.includes('Gadsden')) {
      img.onerror = function () { this.src = './gadsdenstatecommunitycollege_logo.jpg'; };
    }
  });
}

/* -------------------------
   Outras iniciais
--------------------------*/
function initScrollAnimations() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  $$('.animate-on-scroll').forEach(el => io.observe(el));
}

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

function initLightbox() {
  const lb = $('#lightbox');
  const lbImg = $('#lightbox-img');
  if (!lb || !lbImg) return;

  on(lb, 'click', (e) => { if (e.target === lb) closeLightbox(); });
  on(document, 'keydown', (e) => { if (lb.classList.contains('active') && e.key === 'Escape') closeLightbox(); });
}
function openLightbox(el) {
  const lb = $('#lightbox');
  const lbImg = $('#lightbox-img');
  if (!lb || !lbImg) return;
  const img = el?.querySelector?.('img');
  if (!img?.src) return;
  lbImg.src = img.src;
  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  const lb = $('#lightbox');
  if (!lb) return;
  lb.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function initTradeTabs() {
  const tabs = $$('.gallery-tab');
  if (!tabs.length) return;
  tabs.forEach(btn => {
    on(btn, 'click', () => {
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      $$('.gallery-content').forEach(gc => gc.classList.remove('active'));
      const panel = $('#' + btn.dataset.target);
      panel?.classList.add('active');
    });
  });
}

function showToast(message = '') {
  const t = $('#toast');
  if (!t) return;
  t.textContent = message;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

/* Timeline Spy (logo) */
function initTimelineSpy() { updateTimelineSpy(); }
function updateTimelineSpy() {
  const items = $$('.timeline-item');
  if (!items.length) return;
  const logoImg = $('#logo-img');
  const indicators = $$('.indicator-dot');
  if (!logoImg) return;

  let activeIndex = 0;
  const windowHeight = window.innerHeight;
  const midTop = windowHeight * 0.62;
  const midBottom = windowHeight * 0.38;

  items.forEach((item, idx) => {
    const r = item.getBoundingClientRect();
    if (r.top < midTop && r.bottom > midBottom) {
      activeIndex = idx;
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  const activeItem = items[activeIndex];
  if (activeItem) {
    const newLogo = activeItem.getAttribute('data-logo');
    const currentSrc = logoImg.getAttribute('src');
    if (newLogo && newLogo !== currentSrc) {
      logoImg.style.opacity = '0';
      setTimeout(() => {
        logoImg.src = newLogo;
        logoImg.onload = () => { logoImg.style.opacity = '1'; };
      }, 160);
    }
  }
  indicators.forEach((dot, idx) => dot.classList.toggle('active', idx === activeIndex));
}

/* Partículas (hero) – opcional, já usado pelo HTML */
function initParticles() {
  const container = $('#particles');
  if (!container) return;
  const count = 26;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    const s = Math.max(3, Math.min(6, 3 + Math.random() * 4));
    p.style.width = p.style.height = s + 'px';
    p.style.opacity = (0.22 + Math.random() * 0.35).toFixed(2);
    p.style.animationDelay = (Math.random() * 5).toFixed(2) + 's';
    p.style.animationDuration = (4 + Math.random() * 5).toFixed(2) + 's';
    p.style.position = 'absolute';
    p.style.background = 'var(--gold)';
    p.style.borderRadius = '50%';
    p.style.pointerEvents = 'none';
    container.appendChild(p);
  }
}

/* I18N — usa dicionário que já está no index.html */
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
function markActiveLang(lang) {
  $$('.lang-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
}
function initLangSwitcher() {
  const switcher = $('#langSwitcher');
  if (!switcher) return;
  on(switcher, 'click', (e) => {
    const btn = e.target.closest('.lang-btn');
    if (!btn) return;
    const lang = btn.dataset.lang;
    if (!lang) return;
    translateAll(lang);
    markActiveLang(lang);
    try { localStorage.setItem('lang', lang); } catch(e) {}
    showToast(`Translated to ${lang.toUpperCase()}`);
  });
}
function initI18N() {
  try {
    const stored = localStorage.getItem('lang');
    const browser = (navigator.language || 'en').slice(0, 2).toLowerCase();
    const initial = stored || (['en', 'pt', 'es', 'fr'].includes(browser) ? browser : 'en');
    translateAll(initial);
    markActiveLang(initial);
  } catch(e) {
    translateAll('en');
    markActiveLang('en');
  }
}

/* Loading & Âncoras */
function initLoading() {
  const loading = $('#loading');
  if (!loading) return;
  window.addEventListener('load', () => {
    setTimeout(() => {
      loading.classList.add('hidden');
      setTimeout(() => loading.remove(), 400);
    }, 1200);
  });
}
function initSmoothAnchors() {
  $$('a[href^="#"]').forEach(a => {
    on(a, 'click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = $(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* -------------------------
   Bootstrap
--------------------------*/
document.addEventListener('DOMContentLoaded', () => {
  // Sequência única de inicialização
  initLoading();
  initNavbarScroll();
  initScrollAnimations();
  initCursor();
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
    }
  });

    console.log('✅ Portfolio JS (consolidado) inicializado');
  
  // Inicializar modais dos stat boxes
  initStatModals();
});

// ============================================
// STAT BOXES MODAL FUNCTIONS
// ============================================

function initStatModals() {
  // Adicionar evento de clique em todos os stat-boxes
  document.querySelectorAll('.stat-box').forEach(box => {
    box.style.cursor = 'pointer';
    box.addEventListener('click', function(e) {
      const statKey = this.dataset.stat;
      if (statKey && statDetailsData[statKey]) {
        openStatModal(statKey);
      }
    });
  });
  
  console.log('✅ Stat modals initialized');
}

function openStatModal(key) {
  const data = statDetailsData[key];
  const overlay = document.getElementById('statModalOverlay');
  
  if (!data || !overlay) {
    console.error('Modal data or overlay not found:', key);
    return;
  }
  
  document.getElementById('statModalIcon').className = `fas ${data.icon}`;
  document.getElementById('statModalTitle').textContent = data.title;
  document.getElementById('statModalValue').textContent = data.value;
  document.getElementById('statModalDetails').innerHTML = data.details
    .map(item => `<li>${item}</li>`)
    .join('');
  
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeStatModal() {
  const overlay = document.getElementById('statModalOverlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

/* Expor globais chamadas pelo HTML inline */
window.openStatModal        = openStatModal;
window.closeStatModal       = closeStatModal;
window.openStrategyModal    = openStrategyModal;
window.closeStrategyModal   = closeStrategyModal;

window.openLightbox         = openLightbox;
window.closeLightbox        = closeLightbox;

window.changeProjectSlide   = changeProjectSlide;
window.goToProjectSlide     = goToProjectSlide;
window.closeProjectGallery  = closeProjectGallery;

window.scrollToTop          = scrollToTop;


// =================== Cursor custom (suave) ===================
function initCursor(){
  if(!window.matchMedia || !window.matchMedia('(pointer:fine)').matches) return;
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if(!cursor || !follower) return;
  let mx=0,my=0; let cx=mx, cy=my; let fx=mx, fy=my;
  function move(e){ mx=e.clientX; my=e.clientY; }
  document.addEventListener('mousemove', move, {passive:true});
  function tick(){
    cx += (mx - cx) * 0.22; cy += (my - cy) * 0.22;
    cursor.style.left = cx + 'px'; cursor.style.top = cy + 'px';
    fx += (mx - fx) * 0.12; fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px'; follower.style.top = fy + 'px';
    requestAnimationFrame(tick);
  }
  tick();
  const hoverables = ['a','button','.stat-box','.project-card','.repo-item','.contact-link','.social-link','.gallery-item','.gallery-main'];
  document.querySelectorAll(hoverables.join(',')).forEach(el=>{
    el.addEventListener('mouseenter', ()=>{
      cursor.style.transform = 'translate(-50%,-50%) scale(1.4)';
      follower.style.transform = 'translate(-50%,-50%) scale(1.35)';
      cursor.style.background = 'var(--gold)';
      cursor.style.borderColor = 'var(--gold)';
    });
    el.addEventListener('mouseleave', ()=>{
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      follower.style.transform = 'translate(-50%,-50%) scale(1)';
      cursor.style.background = 'transparent';
      cursor.style.borderColor = 'var(--gold)';
    });
  });
}
