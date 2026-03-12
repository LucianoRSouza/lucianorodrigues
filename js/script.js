const PG_state = {
  images: [],
  index: 0,
  currentLang: "en",
  currentProjectImages: [],
  currentProjectIndex: 0
};

const CardSlides = new Map;
const $ = (e, t = document) => t.querySelector(e);
const $$ = (e, t = document) => Array.from(t.querySelectorAll(e));

const statDetailsData = {
  savings: {
    icon: "fa-piggy-bank",
    title: "Cumulative Savings Delivered",
    value: "€1M+",
    story: "Within the first 6 months at Details Hospitality, I orchestrated a procurement transformation that delivered over €1 million in cumulative savings through strategic category management and AI-driven supplier optimization.",
    details: [
      "Multi-category strategic sourcing initiatives across direct and indirect spend",
      "Negotiated favorable payment terms (60-90 days) improving cash flow by 23%",
      "Implemented should-cost modeling identifying 15-25% cost reduction opportunities",
      "Consolidated supplier base from 200+ to 80 key strategic partners",
      "Zero-based budgeting approach for CAPEX projects saving 20% on average",
      "AI-powered spend analysis revealing hidden optimization opportunities",
      "Cross-functional cost councils with Engineering, Operations, and Finance"
    ]
  },
  rfps: {
    icon: "fa-file-contract",
    title: "Strategic Tenders Led",
    value: "120+",
    story: "120+ tender processes meticulously structured, documented, and executed with full audit compliance in accordance with Procurement 4.0 standards and international best practices.",
    details: [
      "End-to-end RFI/RFP/RFQ process design with technical annexes (A1/A2)",
      "Weighted scoring matrices balancing technical (40%), commercial (35%), and ESG (25%) criteria",
      "E-procurement platform integration with full audit trails and digital signatures",
      "Cross-functional evaluation committees (Engineering, Finance, Legal, Operations)",
      "Average cycle time reduction from 45 to 28 days while improving compliance",
      "AI-assisted proposal analysis reducing evaluation time by 40%",
      "Standardized contract templates with dynamic clause libraries",
      "Real-time stakeholder dashboards for transparent decision-making"
    ]
  },
  projects: {
    icon: "fa-project-diagram",
    title: "Project Portfolio Value",
    value: "€10M+",
    story: "A diverse portfolio spanning licensed brand launches, product development from concept to mass production, and AI-driven operational transformations across three continents.",
    details: [
      "New product development from concept to mass production (Blaupunkt, Spear & Jackson, Pininfarina)",
      "Licensed portfolio launches with complete IP management and royalty optimization",
      "Factory audits and supplier capability assessments across Asia (China, Vietnam, Taiwan)",
      "Quality system implementations (ISO 9001, compliance frameworks, ANATEL, CE, FCC)",
      "Cross-border logistics optimization and customs compliance automation",
      "AI-powered demand forecasting reducing inventory carrying costs by 30%",
      "End-to-end supply chain digitization with real-time visibility",
      "Sustainable sourcing initiatives reducing carbon footprint by 25%"
    ]
  },
  regions: {
    icon: "fa-globe",
    title: "Global Operations Coverage",
    value: "20+",
    story: "Operating seamlessly across 20+ countries, leveraging deep cultural understanding and multi-language capabilities to build trust and drive results in diverse markets.",
    details: [
      "Europe: Portugal, Spain, Germany, UK, Netherlands, Italy, France",
      "LATAM: Brazil, Argentina, Chile, Colombia, Mexico, Peru, Uruguay",
      "Asia: China, Hong Kong, Taiwan, Vietnam, India, South Korea, Thailand",
      "Multi-cultural negotiation experience and local market knowledge",
      "Time zone coordination for 24/7 project execution and supplier management",
      "Local compliance expertise across trade regulations and certifications",
      "Regional pricing intelligence and market benchmarking capabilities",
      "Cross-cultural team leadership and stakeholder management"
    ]
  }
};

const strategyDetailsData = {
  1: {
    title: "Stand Design & Merchandising",
    subtitle: "Creating Immersive Brand Experiences That Convert",
    icon: "fa-drafting-compass",
    sections: [
      {
        title: "Strategic Approach",
        items: [
          "Co-created booth concept with Marketing aligning to brand positioning and target audience journey",
          "Traffic flow optimization using heat mapping data for maximum visitor engagement",
          "Product display hierarchy highlighting hero SKUs and new launches with strategic lighting",
          "Lighting and visual merchandising for premium brand perception and emotional connection",
          "Interactive demo stations for hands-on product experience with guided tours"
        ]
      },
      {
        title: "Cross-Functional Collaboration",
        items: [
          "Weekly sync meetings with Marketing, Sales, and Product teams during pre-event phase",
          "Integrated brand storytelling across all touchpoints (digital, physical, human)",
          "Real-time feedback loops with Engineering on product display technical requirements",
          "Budget optimization through shared cost centers with Marketing and Sales departments",
          "Post-event analysis sessions with all stakeholders for continuous improvement"
        ]
      },
      {
        title: "Technical Execution",
        items: [
          "3D renderings and mockups approved 60 days prior to event with stakeholder sign-off",
          "Modular stand components for reusability across fairs reducing costs by 35%",
          "Digital signage integration with real-time product catalogs and QR code tracking",
          "Storage and logistics planning for 500+ SKU displays with inventory accuracy",
          "On-site supervision during build-up and dismantling with safety compliance"
        ]
      }
    ]
  },
  2: {
    title: "Meetings Orchestration & Lead Capture",
    subtitle: "Maximizing ROI Through Structured Engagement",
    icon: "fa-calendar-check",
    sections: [
      {
        title: "Pre-Event Planning",
        items: [
          "Target list development: 200+ qualified prospects per fair using CRM data and AI scoring",
          "Meeting scheduling system with automated reminders and calendar integration",
          "Sales team briefing with product knowledge sessions and objection handling training",
          "Customized pitch decks by customer segment (Enterprise, Mid-Market, SMB)",
          "Lead scoring criteria defined (budget, timeline, authority, need) with weighted values"
        ]
      },
      {
        title: "Cross-Functional Coordination",
        items: [
          "Daily huddles with Sales, Marketing, and Technical teams during the fair",
          "Real-time lead qualification with Engineering support for technical questions",
          "Seamless handover process from booth staff to regional sales managers",
          "Integrated CRM updates with automated workflow triggers for follow-up",
          "Collaborative pipeline building with Finance for deal structure optimization"
        ]
      },
      {
        title: "On-Site Execution",
        items: [
          "Structured 30-minute meeting slots with clear agendas and desired outcomes",
          "Real-time lead capture via CRM mobile app with business card scanning",
          "Immediate follow-up emails sent within 4 hours with personalized content",
          "Meeting notes standardized for pipeline visibility and next action tracking",
          "Daily team huddles to adjust strategy based on feedback and market intelligence"
        ]
      }
    ]
  },
  3: {
    title: "Negotiations & Partnering",
    subtitle: "Building Strategic Supplier Relationships",
    icon: "fa-handshake-angle",
    sections: [
      {
        title: "Partnership Development",
        items: [
          "Initial qualification: financial stability analysis, capacity assessment, certifications verification",
          "Term sheet negotiations: MOQ optimization, payment terms (60-90 days), exclusivity clauses",
          "Pricing framework with volume breaks, annual rebates, and market-adjustment clauses",
          "Quality agreements defining defect rates (PPM targets) and corrective action timelines",
          "IP protection and NDA frameworks for new product development collaborations"
        ]
      },
      {
        title: "Stakeholder Alignment",
        items: [
          "Pre-negotiation alignment meetings with Legal, Finance, and Operations teams",
          "Joint business planning sessions with suppliers and internal category managers",
          "Risk assessment workshops with Compliance and ESG teams for supplier validation",
          "Executive sponsorship alignment for strategic partnership announcements",
          "Cross-functional approval workflows for contract terms and deviations"
        ]
      },
      {
        title: "Contractual Framework",
        items: [
          "Master Service Agreements (MSA) with standardized terms and localized annexes",
          "Statement of Work (SoW) templates for project-based work with milestone payments",
          "Service Level Agreements (SLA) with penalty/incentive clauses tied to KPIs",
          "Force majeure and business continuity provisions with alternative sourcing plans",
          "Exit clauses and knowledge transfer obligations protecting intellectual property"
        ]
      }
    ]
  },
  4: {
    title: "Tech Discovery & Benchmark",
    subtitle: "Staying Ahead of Market Innovation",
    icon: "fa-microchip",
    sections: [
      {
        title: "Market Intelligence",
        items: [
          "Technology scouting across 50+ supplier booths per fair with structured evaluation sheets",
          "Competitive product teardowns and feature comparison matrices",
          "Cost benchmarking for similar specifications using should-cost modeling",
          "Innovation trend mapping (IoT, sustainability, smart features) with patent analysis",
          "Patent landscape analysis for freedom to operate and white space identification"
        ]
      },
      {
        title: "Cross-Functional Evaluation",
        items: [
          "Engineering team consultations on technical feasibility and design for manufacturing",
          "R&D roadmap alignment sessions with supplier innovation pipelines",
          "Quality team involvement in reliability testing and certification requirements",
          "Marketing input on consumer trends and feature prioritization",
          "Finance review of technology investment ROI and total cost of ownership"
        ]
      },
      {
        title: "Technical Evaluation",
        items: [
          "Sample collection for lab testing and validation against specifications",
          "Prototype review and design for manufacturing (DFM) feedback sessions",
          "Certification requirements assessment (CE, FCC, ANATEL, UL) with timeline planning",
          "Roadmap alignment with supplier R&D investments and joint development opportunities",
          "Technology scouting reports distributed to Product Management and Engineering"
        ]
      }
    ]
  },
  5: {
    title: "Factory Audits & Capability Mapping",
    subtitle: "Ensuring Operational Excellence",
    icon: "fa-industry",
    sections: [
      {
        title: "Audit Framework",
        items: [
          "ISO 9001 quality management system verification with gap analysis",
          "Production capacity analysis (lines, shifts, utilization rates, OEE metrics)",
          "Equipment maintenance records and calibration certificates review",
          "Workforce skill assessment and training program evaluation",
          "Environmental compliance and waste management practices audit"
        ]
      },
      {
        title: "Cross-Functional Audit Teams",
        items: [
          "Quality Engineers for technical capability and process control assessment",
          "ESG specialists for social compliance and environmental impact evaluation",
          "Operations managers for capacity planning and flexibility analysis",
          "IT auditors for cybersecurity protocols and data protection measures",
          "Finance representatives for financial health and payment practice verification"
        ]
      },
      {
        title: "Risk Assessment",
        items: [
          "Financial health check (credit reports, payment history, banking references)",
          "Supply chain resilience (dual sourcing, buffer stock, geographic diversification)",
          "Social compliance audits (SA8000, BSCI standards) with worker interviews",
          "Cybersecurity protocols for data-sharing partnerships and IP protection",
          "Business continuity planning and disaster recovery capability assessment"
        ]
      }
    ]
  },
  6: {
    title: "Post-Fair Pipeline, ROI & Governance",
    subtitle: "Converting Leads into Revenue",
    icon: "fa-chart-line",
    sections: [
      {
        title: "Pipeline Management",
        items: [
          "Lead categorization: Hot (immediate), Warm (3 months), Cold (nurture) with scoring",
          "CRM integration with automated follow-up sequences and task assignments",
          "Opportunity value estimation and win probability scoring using historical data",
          "Cross-functional handover to regional sales teams with complete context",
          "Weekly pipeline review meetings for first 30 days with executive sponsorship"
        ]
      },
      {
        title: "Cross-Functional Follow-Up",
        items: [
          "Sales team enablement with technical documentation and competitive positioning",
          "Marketing nurture campaigns tailored to lead segments and interest areas",
          "Product team feedback integration for roadmap prioritization",
          "Finance involvement for deal structuring and payment term negotiations",
          "Operations planning for fulfillment capacity and logistics optimization"
        ]
      },
      {
        title: "Performance Metrics",
        items: [
          "Cost per lead calculation (stand cost ÷ qualified leads) with benchmark comparison",
          "Conversion rate tracking from lead to order with cohort analysis",
          "Average deal size comparison vs. non-fair customers and channel benchmarks",
          "Time-to-close analysis identifying bottlenecks and process improvements",
          "Annual ROI reporting for marketing budget justification and future investment"
        ]
      }
    ]
  }
};

function initLoading() {
  const e = $("#loading");
  e && window.addEventListener("load", (() => {
    setTimeout((() => {
      e.classList.add("hidden");
      setTimeout((() => e.remove()), 400);
    }), 1200);
  }));
}

function initNavbarScroll() {
  const e = $("#navbar");
  const t = $("#scrollTop");
  const n = () => {
    const n = window.scrollY || document.documentElement.scrollTop;
    e && e.classList.toggle("scrolled", n > 50);
    t && t.classList.toggle("visible", n > 600);
    updateTimelineSpy();
  };
  n();
  window.addEventListener("scroll", n, { passive: true });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function initScrollAnimations() {
  const e = {
    threshold: 0.12,
    rootMargin: "0px 0px -60px 0px"
  };
  const t = new IntersectionObserver((e => {
    e.forEach((e => {
      e.isIntersecting && e.target.classList.add("visible");
    }));
  }), e);
  $$(".animate-on-scroll").forEach((e => t.observe(e)));
}

function initParticles() {
  const e = $("#particles");
  if (!e) return;
  for (let t = 0; t < 26; t++) {
    const t = document.createElement("div");
    t.className = "particle";
    t.style.left = 100 * Math.random() + "%";
    t.style.top = 100 * Math.random() + "%";
    t.style.width = t.style.height = Math.max(3, Math.min(6, 3 + 4 * Math.random())) + "px";
    t.style.opacity = (0.22 + 0.35 * Math.random()).toFixed(2);
    t.style.animationDelay = (5 * Math.random()).toFixed(2) + "s";
    t.style.animationDuration = (4 + 5 * Math.random()).toFixed(2) + "s";
    t.style.position = "absolute";
    t.style.background = "var(--gold)";
    t.style.borderRadius = "50%";
    t.style.pointerEvents = "none";
    e.appendChild(t);
  }
}

function initSmoothAnchors() {
  $$('a[href^="#"]').forEach((e => {
    e.addEventListener("click", (t => {
      const n = e.getAttribute("href");
      if (n && "#" !== n) {
        const e = $(n);
        e && (t.preventDefault(), e.scrollIntoView({ behavior: "smooth", block: "start" }));
      }
    }));
  }));
}

function showToast(e = "") {
  const t = $("#toast");
  t && (t.textContent = e, t.classList.add("show"), setTimeout((() => t.classList.remove("show")), 2800));
}

function initTimelineSpy() {
  updateTimelineSpy();
}

function updateTimelineSpy() {
  const e = $$(".timeline-item");
  if (!e.length) return;
  const t = $("#logo-img");
  const n = $$(".indicator-dot");
  if (!t) return;
  let o = 0;
  const i = window.innerHeight;
  const s = 0.62 * i;
  const a = 0.38 * i;
  e.forEach(((e, t) => {
    const n = e.getBoundingClientRect();
    n.top < s && n.bottom > a ? (o = t, e.classList.add("active")) : e.classList.remove("active");
  }));
  const r = e[o];
  if (r) {
    const e = r.getAttribute("data-logo");
    const n = t.getAttribute("src");
    e && e !== n && (t.style.opacity = "0", setTimeout((() => {
      t.src = e;
      t.onload = () => {
        t.style.opacity = "1";
      };
    }), 160));
  }
  n.forEach(((e, t) => e.classList.toggle("active", t === o)));
}

function initLangSwitcher() {
  const e = $("#langSwitcher");
  e && e.addEventListener("click", (e => {
    const t = e.target.closest(".lang-btn");
    if (!t) return;
    const n = t.dataset.lang;
    n && ($$(".lang-btn").forEach((e => e.classList.remove("active"))), t.classList.add("active"), showToast(`Language: ${n.toUpperCase()}`));
  }));
}

function initTradeTabs() {
  const e = $$(".gallery-tab");
  e.length && e.forEach((t => {
    t.addEventListener("click", (() => {
      e.forEach((e => {
        e.classList.remove("active");
        e.setAttribute("aria-selected", "false");
      }));
      t.classList.add("active");
      t.setAttribute("aria-selected", "true");
      $$(".gallery-content").forEach((e => e.classList.remove("active")));
      const n = t.dataset.target;
      const o = $("#" + n);
      o && o.classList.add("active");
    }));
  }));
}

function openStatModal(e) {
  const t = statDetailsData[e];
  if (!t) return;
  const n = $("#statModalOverlay");
  const o = $("#statModalIcon");
  const i = $("#statModalTitle");
  const s = $("#statModalStory");
  const a = $("#statModalValue");
  const r = $("#statModalDetails");
  n && (o.className = "fas " + t.icon, i.textContent = t.title, s.textContent = t.story, a.textContent = t.value, r.innerHTML = t.details.map((e => "<li>" + e + "</li>")).join(""), n.classList.add("active"), document.body.style.overflow = "hidden");
}

function closeStatModal() {
  const e = $("#statModalOverlay");
  e && (e.classList.remove("active"), document.body.style.overflow = "auto");
}

function openStrategyModal(e) {
  const t = strategyDetailsData[e];
  if (!t) return;
  const n = $("#strategyDetailOverlay");
  const o = $("#strategyDetailIcon");
  const i = $("#strategyDetailTitle");
  const s = $("#strategyDetailSubtitle");
  const a = $("#strategyDetailBody");
  n && (o.className = "fas " + t.icon, i.textContent = t.title, s.textContent = t.subtitle, a.innerHTML = t.sections.map((e => '<div class="strategy-detail-section"><h4><i class="fas fa-chevron-right"></i> ' + e.title + '</h4><ul>' + e.items.map((e => "<li>" + e + "</li>")).join("") + "</ul></div>")).join(""), n.classList.add("active"), document.body.style.overflow = "hidden");
}

function closeStrategyModal() {
  const e = $("#strategyDetailOverlay");
  e && (e.classList.remove("active"), document.body.style.overflow = "auto");
}

function initProjectGalleries() {
  $$(".project-card[data-gallery]").forEach(setupCardAutoSlide);
}

function setupCardAutoSlide(e) {
  const t = e.querySelector(".gallery-main");
  if (!t) return;
  let n = [];
  const o = e.getAttribute("data-images") || "";
  if (o.trim().length) n = o.split(",").map((e => e.trim())).filter(Boolean);
  else {
    const e = t.querySelector("img");
    e && e.src && (n = [e.src]);
  }
  if (!n.length) return;
  const i = t.querySelector("img");
  if (!i) return;
  const s = {
    images: n,
    idx: 0,
    timer: null,
    interval: 2500,
    imgEl: i,
    paused: false
  };
  CardSlides.set(e, s);
  const a = document.createElement("div");
  a.className = "gallery-dots";
  n.forEach(((e, t) => {
    const n = document.createElement("div");
    n.className = "gallery-dot" + (0 === t ? " active" : "");
    a.appendChild(n);
  }));
  e.querySelector(".project-gallery").appendChild(a);

  function r() {
    s.paused || s.images.length <= 1 || (s.idx = (s.idx + 1) % s.images.length, i.style.opacity = "0", setTimeout((() => {
      i.src = s.images[s.idx];
      i.onload = () => {
        i.style.opacity = "1";
      };
      e.querySelectorAll(".gallery-dot").forEach(((e, t) => e.classList.toggle("active", t === s.idx)));
    }), 160));
  }

  function l() {
    c();
    s.images.length > 1 && (s.timer = setInterval(r, s.interval));
  }

  function c() {
    s.timer && (clearInterval(s.timer), s.timer = null);
  }

  e.addEventListener("mouseenter", (() => {
    s.paused = true;
  }));
  e.addEventListener("mouseleave", (() => {
    s.paused = false;
  }));
  l();
}

function openProjectGallery(e) {
  const t = e.closest(".project-card");
  if (!t) return;
  const n = t.getAttribute("data-images") || "";
  if (!n.trim().length) return;
  const o = n.split(",").map((e => e.trim())).filter(Boolean);
  if (!o.length) return;
  PG_state.currentProjectImages = o;
  PG_state.currentProjectIndex = 0;
  const i = $("#projectGalleryModal");
  const s = $("#gallerySlider");
  const a = $("#galleryDots");
  if (!i || !s || !a) return;
  s.innerHTML = "";
  a.innerHTML = "";
  o.forEach(((e, t) => {
    const n = document.createElement("div");
    n.className = "gallery-slide" + (0 === t ? " active" : "");
    const o = document.createElement("img");
    o.alt = "Project image " + (t + 1);
    o.src = e;
    n.appendChild(o);
    s.appendChild(n);
    const i = document.createElement("div");
    i.className = "gallery-dot" + (0 === t ? " active" : "");
    i.onclick = () => goToProjectSlide(t);
    a.appendChild(i);
  }));
  i.classList.add("active");
  document.body.style.overflow = "hidden";
}

function changeProjectSlide(e) {
  if (!PG_state.currentProjectImages.length) return;
  const t = $$(".gallery-slide");
  const n = $$("#galleryDots .gallery-dot");
  t[PG_state.currentProjectIndex]?.classList.remove("active");
  n[PG_state.currentProjectIndex]?.classList.remove("active");
  PG_state.currentProjectIndex = (PG_state.currentProjectIndex + e + PG_state.currentProjectImages.length) % PG_state.currentProjectImages.length;
  t[PG_state.currentProjectIndex]?.classList.add("active");
  n[PG_state.currentProjectIndex]?.classList.add("active");
}

function goToProjectSlide(e) {
  if (!PG_state.currentProjectImages.length) return;
  const t = $$(".gallery-slide");
  const n = $$("#galleryDots .gallery-dot");
  t[PG_state.currentProjectIndex]?.classList.remove("active");
  n[PG_state.currentProjectIndex]?.classList.remove("active");
  PG_state.currentProjectIndex = e;
  t[PG_state.currentProjectIndex]?.classList.add("active");
  n[PG_state.currentProjectIndex]?.classList.add("active");
}

function closeProjectGallery() {
  const e = $("#projectGalleryModal");
  e && (e.classList.remove("active"), document.body.style.overflow = "auto");
}

function openLightbox(e) {
  const t = $("#lightbox");
  const n = $("#lightbox-img");
  if (!t || !n) return;
  let o = "";
  if (e && e.querySelector) {
    const t = e.querySelector("img");
    t && (o = t.src);
  }
  o && (n.src = o, t.classList.add("active"), document.body.style.overflow = "hidden");
}

function closeLightbox() {
  const e = $("#lightbox");
  e && (e.classList.remove("active"), document.body.style.overflow = "auto");
}

document.addEventListener("keydown", (e => {
  "Escape" === e.key && (closeStatModal(), closeStrategyModal(), closeProjectGallery(), closeLightbox());
}));

document.addEventListener("DOMContentLoaded", (function() {
  console.log("🚀 Initializing Luciano Portfolio...");
  initLoading();
  initNavbarScroll();
  initScrollAnimations();
  initParticles();
  initSmoothAnchors();
  initLangSwitcher();
  initTradeTabs();
  initTimelineSpy();
  initProjectGalleries();
  console.log("✅ All systems initialized");
}));

window.openStatModal = openStatModal;
window.closeStatModal = closeStatModal;
window.openStrategyModal = openStrategyModal;
window.closeStrategyModal = closeStrategyModal;
window.openProjectGallery = openProjectGallery;
window.closeProjectGallery = closeProjectGallery;
window.changeProjectSlide = changeProjectSlide;
window.goToProjectSlide = goToProjectSlide;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.scrollToTop = scrollToTop;
