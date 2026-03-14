/* =========================================================
   Portfolio JS — FIXED (unificado e sem duplicações)
   - Click-to-detail: highlights (4) + trade shows (6)
   - Gadsden image helper + event mapping acessível
   - Remoção de conflitos/IDs duplicados
========================================================= */

// ---------- Helpers / Estado Global ----------
const PG_state = { images: [], index: 0 };
const CardSlides = new Map();
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const on = (el, evt, fn, opts) => el && el.addEventListener(evt, fn, opts);

// ---------- Dados (detalhes) ----------
const statDetailsData = {
  savings: {
    icon: 'fa-piggy-bank',
    title: 'Cumulative Savings Delivered',
    value: '€1M+',
    details: [
      'Multi-category strategic sourcing initiatives across direct and indirect spend',
      'Negotiated favorable payment terms (60-90 days) improving cash flow',
      'Implemented should-cost modeling identifying 15-25% cost reduction opportunities',
      'Consolidated supplier base from 200+ to 80 key partners',
      'Zero-based budgeting approach for CAPEX projects saving 20% on average'
    ]
  },
  rfps: {
    icon: 'fa-file-contract',
    title: 'Strategic Tenders Led',
    value: '120+',
    details: [
      'End-to-end RFI/RFP/RFQ process design with technical annexes (A1/A2)',
      'Weighted scoring matrices balancing technical (40%), commercial (35%), and ESG (25%) criteria',
      'E-procurement platform integration with full audit trails',
      'Cross-functional evaluation committees (Engineering, Finance, Legal, Operations)',
      'Average cycle time reduction from 45 to 28 days while improving compliance'
    ]
  },
  projects: {
    icon: 'fa-project-diagram',
    title: 'Project Portfolio Value',
    value: '€10M+',
    details: [
      'New product development from concept to mass production',
      'Licensed portfolio launches (Blaupunkt, Spear & Jackson, Pininfarina)',
      'Factory audits and supplier capability assessments across Asia',
      'Quality system implementations (ISO 9001, compliance frameworks)',
      'Cross-border logistics optimization and customs compliance'
    ]
  },
  regions: {
    icon: 'fa-globe',
    title: 'Global Operations Coverage',
    value: '20+',
    details: [
      'Europe: Portugal, Spain, Germany, UK, Netherlands, Italy, France',
      'LATAM: Brazil, Argentina, Chile, Colombia, Mexico, Peru, Uruguay',
      'Asia: China, Hong Kong, Taiwan, Vietnam, India, South Korea',
      'Multi-cultural negotiation experience and local market knowledge',
      'Time zone coordination for 24/7 project execution'
    ]
  }
};

const strategyDetailsData = {
  1: {
    title: 'Stand Design & Merchandising',
    subtitle: 'Creating immersive brand experiences',
    icon: 'fa-drafting-compass',
    sections: [
      { title: 'Strategic Approach', items: [
        'Co-created booth concept with Marketing aligning to brand positioning',
        'Traffic flow optimization for maximum visitor engagement',
        'Product display hierarchy highlighting hero SKUs and new launches',
        'Lighting and visual merchandising for premium brand perception',
        'Interactive demo stations for hands-on product experience'
      ]},
      { title: 'Technical Execution', items: [
        '3D renderings and mockups approved 60 days prior to event',
        'Modular stand components for reusability across fairs',
        'Digital signage integration with real-time product catalogs',
        'Storage and logistics planning for 500+ SKU displays',
        'On-site supervision during build-up and dismantling'
      ]}
    ]
  },
  2: {
    title: 'Meetings Orchestration & Lead Capture',
    subtitle: 'Maximizing ROI through structured engagement',
    icon: 'fa-calendar-check',
    sections: [
      { title: 'Pre-Event Planning', items: [
        'Target list development: 200+ qualified prospects per fair',
        'Meeting scheduling system with automated reminders',
        'Sales team briefing with product knowledge sessions',
        'Customized pitch decks by customer segment',
        'Lead scoring criteria defined (budget, timeline, authority)'
      ]},
      { title: 'On-Site Execution', items: [
        'Structured 30-minute meeting slots with clear agendas',
        'Real-time lead capture via CRM mobile app',
        'Immediate follow-up emails sent within 4 hours',
        'Meeting notes standardized for pipeline visibility',
        'Daily team huddles to adjust strategy based on feedback'
      ]}
    ]
  },
  3: {
    title: 'Negotiations & Partnering',
    subtitle: 'Building strategic supplier relationships',
    icon: 'fa-handshake-angle',
    sections: [
      { title: 'Partnership Development', items: [
        'Initial qualification: financial stability, capacity, certifications',
        'Term sheet negotiations: MOQ, payment terms, exclusivity clauses',
        'Pricing framework with volume breaks and annual rebates',
        'Quality agreements defining defect rates and corrective actions',
        'IP protection and NDA frameworks for new product development'
      ]},
      { title: 'Contractual Framework', items: [
        'Master Service Agreements (MSA) with standardized terms',
        'Statement of Work (SoW) templates for project-based work',
        'Service Level Agreements (SLA) with penalty/incentive clauses',
        'Force majeure and business continuity provisions',
        'Exit clauses and knowledge transfer obligations'
      ]}
    ]
  },
  4: {
    title: 'Tech Discovery & Benchmark',
    subtitle: 'Staying ahead of market innovation',
    icon: 'fa-microchip',
    sections: [
      { title: 'Market Intelligence', items: [
        'Technology scouting across 50+ supplier booths per fair',
        'Competitive product teardowns and feature comparison',
        'Cost benchmarking for similar specifications',
        'Innovation trend mapping (IoT, sustainability, smart features)',
        'Patent landscape analysis for freedom to operate'
      ]},
      { title: 'Technical Evaluation', items: [
        'Sample collection for lab testing and validation',
        'Engineering team consultations on technical feasibility',
        'Prototype review and design for manufacturing (DFM) feedback',
        'Certification requirements assessment (CE, FCC, ANATEL)',
        'Roadmap alignment with supplier R&D investments'
      ]}
    ]
  },
  5: {
    title: 'Factory Audits & Capability Mapping',
    subtitle: 'Ensuring operational excellence',
    icon: 'fa-industry',
    sections: [
      { title: 'Audit Framework', items: [
        'ISO 9001 quality management system verification',
        'Production capacity analysis (lines, shifts, utilization)',
        'Equipment maintenance records and calibration certificates',
        'Workforce skill assessment and training programs',
        'Environmental compliance and waste management practices'
      ]},
      { title: 'Risk Assessment', items: [
        'Financial health check (credit reports, payment history)',
        'Supply chain resilience (dual sourcing, buffer stock)',
        'Social compliance audits (SA8000, BSCI standards)',
        'Cybersecurity protocols for data-sharing partnerships',
        'Business continuity planning and disaster recovery'
      ]}
    ]
  },
  6: {
    title: 'Post-Fair Pipeline, ROI & Governance',
    subtitle: 'Converting leads into revenue',
    icon: 'fa-chart-line',
    sections: [
      { title: 'Pipeline Management', items: [
        'Lead categorization: Hot (immediate), Warm (3 months), Cold (nurture)',
        'CRM integration with automated follow-up sequences',
        'Opportunity value estimation and win probability scoring',
        'Cross-functional handover to regional sales teams',
        'Weekly pipeline review meetings for first 30 days'
      ]},
      { title: 'Performance Metrics', items: [
        'Cost per lead calculation (stand cost ÷ qualified leads)',
        'Conversion rate tracking from lead to order',
        'Average deal size comparison vs. non-fair customers',
        'Time-to-close analysis identifying bottlenecks',
        'Annual ROI reporting for marketing budget justification'
      ]}
    ]
  }
};

// ---------- Modais (Stats) ----------
function openStatModal(key){
  const data = statDetailsData[key];
  if(!data) return;
  $('#statModalIcon').className = `fas ${data.icon}`;
  $('#statModalTitle').textContent = data.title;
  $('#statModalValue').textContent = data.value;
  $('#statModalDetails').innerHTML = data.details.map(x=>`<li>${x}</li>`).join('');
  $('#statModalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeStatModal(){
  $('#statModalOverlay')?.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// ---------- Modais (Strategy) ----------
function openStrategyModal(num){
  const data = strategyDetailsData[num];
  if(!data) return;
  $('#strategyDetailIcon').className = `fas ${data.icon}`;
  $('#strategyDetailTitle').textContent = data.title;
  $('#strategyDetailSubtitle').textContent = data.subtitle;
  const sections = data.sections.map(sec=>{
    const items = sec.items.map(li=>`<li>${li}</li>`).join('');
    return `<div class="strategy-detail-section"><h4><i class="fas fa-chevron-right"></i> ${sec.title}</h4><ul>${items}</ul></div>`;
  }).join('');
  $('#strategyDetailBody').innerHTML = sections;
  $('#strategyDetailOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeStrategyModal(){
  $('#strategyDetailOverlay')?.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// ---------- Interatividade: Highlights + Feiras ----------
function initClickableHighlights(){
  $$('.stat-box').forEach(box=>{
    box.setAttribute('role','button');
    box.addEventListener('click', ()=>{
      const key = box.dataset.stat; if (key) openStatModal(key);
    });
    box.addEventListener('keydown', e=>{
      if(e.key==='Enter' || e.key===' '){ e.preventDefault(); box.click(); }
    });
  });
}
function initStrategyClicks(){
  const bind = el=>{
    el.setAttribute('role','button');
    el.addEventListener('click', ()=>{
      const mode = el.dataset.mode || 'modal';
      const href = el.dataset.href;
      const num = Number(el.dataset.strategy);
      if(mode==='link' && href){ window.location.href = href; return; }
      if(Number.isFinite(num)) openStrategyModal(num);
    });
    el.addEventListener('keydown', e=>{
      if(e.key==='Enter' || e.key===' '){ e.preventDefault(); el.click(); }
    });
  };
  $$('.strategy-item, .fair-card').forEach(bind);
}

// ---------- Gadsden: imagem fallback/ajustes ----------
function initVolunteerEnhancement(){
  const img = $('#volunteering .volunteer-hero-image img');
  if(!img) return;
  img.addEventListener('error', ()=>{ img.style.display='none'; });
}

// ---------- Partículas (opcional) ----------
function initParticles(){
  const container = $('#particles');
  if(!container) return;
  const count = 20;
  for(let i=0;i<count;i++){
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random()*100 + '%';
    p.style.top = Math.random()*100 + '%';
    const s = 3 + Math.random()*4; p.style.width = p.style.height = s+'px';
    p.style.opacity = (0.22 + Math.random()*0.35).toFixed(2);
    p.style.setProperty('--dur', (5+Math.random()*5)+'s');
    p.style.position = 'absolute'; p.style.borderRadius='50%'; p.style.background='var(--gold)';
    p.style.pointerEvents='none';
    container.appendChild(p);
  }
}

// ---------- Utilidades ----------
function scrollToTop(){ window.scrollTo({top:0,behavior:'smooth'}); }
function initScrollTop(){
  const btn = $('#scrollTop');
  const onScroll = ()=>{
    const y = window.scrollY || document.documentElement.scrollTop;
    btn?.classList.toggle('visible', y>600);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});
}

// ---------- Bootstrap ----------
document.addEventListener('DOMContentLoaded', ()=>{
  initParticles();
  initClickableHighlights();
  initStrategyClicks();
  initVolunteerEnhancement();
  initScrollTop();

  // Fechar modais ao clicar no overlay / ESC
  document.addEventListener('click', (e)=>{
    if(e.target?.id==='statModalOverlay') closeStatModal();
    if(e.target?.id==='strategyDetailOverlay') closeStrategyModal();
  });
  document.addEventListener('keydown', (e)=>{
    if(e.key==='Escape'){ closeStatModal(); closeStrategyModal(); }
  });
});

// Expor globais se necessário para handlers inline
window.openStatModal = openStatModal;
window.closeStatModal = closeStatModal;
window.openStrategyModal = openStrategyModal;
window.closeStrategyModal = closeStrategyModal;
window.scrollToTop = scrollToTop;
