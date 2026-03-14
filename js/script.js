/* =========================================================
   Portfolio JS — v5 corrigida (Chrome + Edge)
   ========================================================= */
const PG_state = { images: [], index: 0, currentLang: 'en' };

/* ---------- Helpers ---------- */
const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
const on = (el, ev, fn, opts) => el && el.addEventListener(ev, fn, opts);

/* ---------- I18N (stat modals) ---------- */
const STAT_I18N = {
  en:{savings:{title:'Cumulative Savings Delivered',details:[
    'Multi-category strategic sourcing initiatives across direct and indirect spend',
    'Negotiated favorable payment terms (60-90 days) improving cash flow',
    'Implemented should-cost modeling identifying 15-25% cost reduction opportunities',
    'Consolidated supplier base from 200+ to 80 key partners',
    'Zero-based budgeting approach for CAPEX projects saving 20% on average'
  ]},rfps:{title:'Strategic Tenders Led',details:[
    'End-to-end RFI/RFP/RFQ process design with technical annexes (A1/A2)',
    'Weighted scoring matrices balancing technical, commercial, and ESG criteria',
    'E-procurement platform integration with full audit trails',
    'Cross-functional evaluation committees (Engineering, Finance, Legal, Operations)',
    'Cycle time reduction while improving compliance'
  ]},projects:{title:'Project Portfolio Value',details:[
    'New product development from concept to mass production',
    'Licensed portfolio launches (Blaupunkt, Spear & Jackson, Pininfarina)',
    'Factory audits and supplier capability assessments across Asia',
    'Quality system implementations and compliance frameworks',
    'Cross-border logistics optimization and customs compliance'
  ]},regions:{title:'Global Operations Coverage',details:[
    'Europe: Portugal, Spain, Germany, UK, Netherlands, Italy, France',
    'LATAM: Brazil, Argentina, Chile, Colombia, Mexico, Peru, Uruguay',
    'Asia: China, Hong Kong, Taiwan, Vietnam, India, South Korea',
    'Multi-cultural negotiation experience and local market knowledge',
    'Time zone coordination for 24/7 project execution'
  ]}},
  pt:{savings:{title:'Poupança Acumulada',details:[
    'Sourcing estratégico multi‑categoria em compras diretas e indiretas',
    'Negociação de prazos de pagamento (60–90 dias) melhorando o cash‑flow',
    'Modelagem de “should‑cost” identificando 15–25% de redução',
    'Consolidação da base de fornecedores de 200+ para ~80 parceiros‑chave',
    'Orçamento base zero para CAPEX com ~20% de economia'
  ]},rfps:{title:'RFP/RFQ Conduzidos',details:[
    'Desenho fim‑a‑fim de RFI/RFP/RFQ com anexos técnicos (A1/A2)',
    'Matrizes de “weighted scoring” equilibrando técnico, comercial e ESG',
    'Integração com e‑procurement e trilhas de auditoria',
    'Comitês de avaliação multifuncionais',
    'Redução de lead‑time com melhoria de compliance'
  ]},projects:{title:'Valor do Portfólio de Projetos',details:[
    'Desenvolvimento de produto do conceito à produção em massa',
    'Lançamentos licenciados (Blaupunkt, Spear & Jackson, Pininfarina)',
    'Auditorias fabris e mapeamento de capacidades na Ásia',
    'Implementação de sistemas de qualidade e compliance',
    'Otimização logística e compliance aduaneiro'
  ]},regions:{title:'Cobertura Operacional Global',details:[
    'Europa: Portugal, Espanha, Alemanha, Reino Unido, Holanda, Itália, França',
    'LATAM: Brasil, Argentina, Chile, Colômbia, México, Peru, Uruguai',
    'Ásia: China, Hong Kong, Taiwan, Vietname, Índia, Coreia do Sul',
    'Negociação multicultural e conhecimento de mercados locais',
    'Coordenação de fusos para execução 24/7'
  ]}},
  es:{savings:{title:'Ahorro Acumulado',details:[
    'Sourcing estratégico multi‑categoría en gasto directo e indirecto',
    'Negociación de plazos de pago (60–90 días) mejorando el cash‑flow',
    'Modelado “should‑cost” identificando 15–25% de reducción',
    'Consolidación de la base de proveedores de 200+ a ~80 socios clave',
    'Presupuesto base cero en CAPEX con ~20% de ahorro'
  ]},rfps:{title:'Licitaciones Dirigidas',details:[
    'Diseño integral de RFI/RFP/RFQ con anexos técnicos (A1/A2)',
    'Matrices de puntuación ponderada equilibrando técnico, comercial y ESG',
    'Integración con e‑procurement y trazabilidad de auditoría',
    'Comités de evaluación multifuncionales',
    'Reducción de tiempos con mayor compliance'
  ]},projects:{title:'Valor del Portafolio de Proyectos',details:[
    'Desarrollo de producto del concepto a la producción masiva',
    'Lanzamientos licenciados (Blaupunkt, Spear & Jackson, Pininfarina)',
    'Auditorías de fábricas y evaluación de capacidades en Asia',
    'Implementación de sistemas de calidad y compliance',
    'Optimización logística y cumplimiento aduanero'
  ]},regions:{title:'Cobertura Operativa Global',details:[
    'Europa: Portugal, España, Alemania, Reino Unido, Países Bajos, Italia, Francia',
    'LATAM: Brasil, Argentina, Chile, Colombia, México, Perú, Uruguay',
    'Asia: China, Hong Kong, Taiwán, Vietnam, India, Corea del Sur',
    'Experiencia multicultural y conocimiento local',
    'Coordinación de zonas horarias para ejecución 24/7'
  ]}},
  fr:{savings:{title:'Économies Cumulées',details:[
    'Sourcing stratégique multi‑catégorie (direct/indirect)',
    'Négociation de délais de paiement (60–90 jours) améliorant la trésorerie',
    'Modèle “should‑cost” identifiant 15–25% de réduction',
    'Consolidation des fournisseurs de 200+ à ~80 partenaires clés',
    'Budget base zéro en CAPEX avec ~20% d’économie'
  ]},rfps:{title:'Appels d’offres dirigés',details:[
    'Processus RFI/RFP/RFQ de bout en bout avec annexes techniques (A1/A2)',
    'Matrice de scoring pondéré (technique, commercial, ESG)',
    'Intégration e‑procurement et traçabilité',
    'Comités d’évaluation interfonctionnels',
    'Réduction des délais avec meilleur compliance'
  ]},projects:{title:'Valeur du Portefeuille de Projets',details:[
    'Développement produit du concept à la production de masse',
    'Lancements sous licence (Blaupunkt, Spear & Jackson, Pininfarina)',
    'Audits d’usines et cartographie des capacités en Asie',
    'Systèmes qualité et cadres de conformité',
    'Optimisation logistique transfrontalière et douanes'
  ]},regions:{title:'Couverture Opérationnelle Globale',details:[
    'Europe : Portugal, Espagne, Allemagne, Royaume‑Uni, Pays‑Bas, Italie, France',
    'LATAM : Brésil, Argentine, Chili, Colombie, Mexique, Pérou, Uruguay',
    'Asie : Chine, Hong Kong, Taïwan, Vietnam, Inde, Corée du Sud',
    'Négociations multiculturelles et connaissance locale',
    'Coordination des fuseaux pour exécution 24/7'
  ]}}
};

/* ---------- Dados (stat & strategy) ---------- */
const statDetailsData = {
  savings:{icon:'fa-piggy-bank', title:'Cumulative Savings Delivered', value:'€1M+', details:[
    'Multi-category strategic sourcing initiatives across direct and indirect spend',
    'Negotiated favorable payment terms (60-90 days) improving cash flow',
    'Implemented should-cost modeling identifying 15-25% cost reduction opportunities',
    'Consolidated supplier base from 200+ to 80 key partners',
    'Zero-based budgeting approach for CAPEX projects saving 20% on average'
  ]},
  rfps:{icon:'fa-file-contract', title:'Strategic Tenders Led', value:'120+', details:[
    'End-to-end RFI/RFP/RFQ process design with technical annexes (A1/A2)',
    'Weighted scoring matrices balancing technical, commercial, and ESG criteria',
    'E-procurement platform integration with full audit trails',
    'Cross-functional evaluation committees (Engineering, Finance, Legal, Operations)',
    'Cycle time reduction while improving compliance'
  ]},
  projects:{icon:'fa-project-diagram', title:'Project Portfolio Value', value:'€10M+', details:[
    'New product development from concept to mass production',
    'Licensed portfolio launches (Blaupunkt, Spear & Jackson, Pininfarina)',
    'Factory audits and supplier capability assessments across Asia',
    'Quality system implementations and compliance frameworks',
    'Cross-border logistics optimization and customs compliance'
  ]},
  regions:{icon:'fa-globe', title:'Global Operations Coverage', value:'20+', details:[
    'Europe: Portugal, Spain, Germany, UK, Netherlands, Italy, France',
    'LATAM: Brazil, Argentina, Chile, Colombia, Mexico, Peru, Uruguay',
    'Asia: China, Hong Kong, Taiwan, Vietnam, India, South Korea',
    'Multi-cultural negotiation experience and local market knowledge',
    'Time zone coordination for 24/7 project execution'
  ]}
};

const strategyDetailsData = {
  1:{title:'Stand Design & Merchandising', subtitle:'Creating immersive brand experiences', icon:'fa-drafting-compass', sections:[
    {title:'Strategic Approach', items:[
      'Co-created booth concept aligned to brand positioning',
      'Traffic flow optimization',
      'Display hierarchy for hero SKUs and launches',
      'Lighting & visual merchandising',
      'Interactive demo stations'
    ]},
    {title:'Technical Execution', items:[
      '3D renderings approved 60 days prior',
      'Modular stand components',
      'Digital signage with real-time catalogs',
      'Storage & logistics for 500+ SKUs',
      'On-site supervision build-up/dismantling'
    ]}
  ]},
  2:{title:'Meetings Orchestration & Lead Capture', subtitle:'Maximizing ROI through engagement', icon:'fa-calendar-check', sections:[
    {title:'Pre-Event Planning', items:[
      'Target list: 200+ prospects',
      'Scheduling with reminders',
      'Sales briefing & product sessions',
      'Segmented pitch decks',
      'Lead scoring (budget, timeline, authority)'
    ]},
    {title:'On-Site Execution', items:[
      'Structured 30-min slots',
      'Real-time lead capture via CRM app',
      'Follow-ups in 4 hours',
      'Standardized meeting notes',
      'Daily team huddles'
    ]}
  ]},
  3:{title:'Negotiations & Partnering', subtitle:'Strategic supplier relationships', icon:'fa-handshake-angle', sections:[
    {title:'Partnership Development', items:[
      'Qualification: financials, capacity, certifications',
      'Term sheet: MOQ, terms, exclusivity',
      'Pricing with volume breaks/rebates',
      'Quality agreements & corrective actions',
      'IP/NDA frameworks'
    ]},
    {title:'Contractual Framework', items:[
      'MSA & standardized terms',
      'SoW templates',
      'SLA w/ penalties & incentives',
      'Force majeure & BCP',
      'Exit clauses & knowledge transfer'
    ]}
  ]},
  4:{title:'Tech Discovery & Benchmark', subtitle:'Market innovation scouting', icon:'fa-microchip', sections:[
    {title:'Market Intelligence', items:[
      'Scouting 50+ booths',
      'Teardowns & feature comparison',
      'Cost benchmarking',
      'Trend mapping (IoT, sustainability, smart)',
      'Patent landscape checks'
    ]},
    {title:'Technical Evaluation', items:[
      'Samples for lab testing',
      'Engineering feasibility',
      'DFM feedback',
      'Certifications (CE, FCC, etc.)',
      'R&D roadmap alignment'
    ]}
  ]},
  5:{title:'Factory Audits & Capability Mapping', subtitle:'Operational excellence', icon:'fa-industry', sections:[
    {title:'Audit Framework', items:[
      'ISO 9001 system verification',
      'Capacity (lines, shifts, utilization)',
      'Maintenance & calibration records',
      'Skill assessment & training',
      'Environmental compliance'
    ]},
    {title:'Risk Assessment', items:[
      'Financial health checks',
      'Resilience (dual source, buffer)',
      'Social compliance (BSCI/SA8000)',
      'Cybersecurity protocols',
      'BCP/DR plans'
    ]}
  ]},
  6:{title:'Post-Fair Pipeline, ROI & Governance', subtitle:'Converting leads to revenue', icon:'fa-chart-line', sections:[
    {title:'Pipeline Management', items:[
      'Hot/Warm/Cold categorization',
      'CRM with automated follow-ups',
      'Opportunity value & win odds',
      'Handover to regional sales',
      'Weekly reviews (30 days)'
    ]},
    {title:'Performance Metrics', items:[
      'Cost per lead',
      'Lead→order conversion',
      'Avg deal size vs non-fair',
      'Time-to-close bottlenecks',
      'Annual ROI reporting'
    ]}
  ]}
};

/* ---------- Stat modal ---------- */
function openStatModal(key){
  const data=statDetailsData[key], overlay=$('#statModalOverlay'); if(!data||!overlay) return;
  $('#statModalIcon').className=`fas ${data.icon}`;
  const lang=PG_state.currentLang||'en', tr=(STAT_I18N[lang]&&STAT_I18N[lang][key])||null;
  $('#statModalTitle').textContent=tr?tr.title:data.title;
  $('#statModalValue').textContent=data.value;
  $('#statModalDetails').innerHTML=(tr?tr.details:data.details).map(t=>`<li>${t}</li>`).join('');
  overlay.classList.add('active'); document.body.style.overflow='hidden';
}
function closeStatModal(){ const o=$('#statModalOverlay'); if(!o) return; o.classList.remove('active'); document.body.style.overflow='auto'; }
window.openStatModal=openStatModal; window.closeStatModal=closeStatModal;

/* ---------- Strategy modal ---------- */
function openStrategyModal(n){
  const d=strategyDetailsData[n], o=$('#strategyDetailOverlay'); if(!d||!o) return;
  $('#strategyDetailIcon').className=`fas ${d.icon}`;
  $('#strategyDetailTitle').textContent=d.title;
  $('#strategyDetailSubtitle').textContent=d.subtitle;
  const body=d.sections.map(sec=>`<div class="strategy-detail-section"><h4><i class="fas fa-chevron-right"></i> ${sec.title}</h4><ul>${sec.items.map(i=>`<li>${i}</li>`).join('')}</ul></div>`).join('');
  $('#strategyDetailBody').innerHTML=body;
  o.classList.add('active'); document.body.style.overflow='hidden';
}
function closeStrategyModal(){ const o=$('#strategyDetailOverlay'); if(!o) return; o.classList.remove('active'); document.body.style.overflow='auto'; }
window.openStrategyModal=openStrategyModal; window.closeStrategyModal=closeStrategyModal;

/* ---------- Gallery ---------- */
function buildProjectSlides(images){
  const s=$('#gallerySlider'), d=$('#galleryDots'); if(!s||!d) return;
  s.innerHTML=''; d.innerHTML='';
  images.forEach((src,i)=>{
    const slide=document.createElement('div'); slide.className='gallery-slide'+(i===0?' active':'');
    const img=document.createElement('img'); img.src=src; img.alt=`Project image ${i+1}`;
    slide.appendChild(img); s.appendChild(slide);
    const dot=document.createElement('div'); dot.className='gallery-dot'+(i===0?' active':'');
    dot.addEventListener('click',()=>goToProjectSlide(i)); d.appendChild(dot);
  });
  PG_state.images=images.slice(); PG_state.index=0;
}
function openProjectGalleryFromCard(card){
  const m=$('#projectGalleryModal'); if(!m) return;
  let images=[]; const csv=(card.getAttribute('data-images')||'').trim();
  if(csv){ images=csv.split(',').map(s=>s.trim()).filter(Boolean); }
  else{ const main=card.querySelector('.gallery-main img'); if(main?.src) images=[main.src]; }
  if(!images.length) return;
  buildProjectSlides(images); m.classList.add('active'); document.body.style.overflow='hidden';
}
function changeProjectSlide(d){ if(!PG_state.images.length) return;
  const slides=$$('.gallery-slide'), dots=$$('.gallery-dot');
  slides[PG_state.index]?.classList.remove('active'); dots[PG_state.index]?.classList.remove('active');
  PG_state.index=(PG_state.index+d+PG_state.images.length)%PG_state.images.length;
  slides[PG_state.index]?.classList.add('active'); dots[PG_state.index]?.classList.add('active');
}
function goToProjectSlide(i){ if(!PG_state.images.length) return;
  const slides=$$('.gallery-slide'), dots=$$('.gallery-dot');
  slides[PG_state.index]?.classList.remove('active'); dots[PG_state.index]?.classList.remove('active');
  PG_state.index=i; slides[i]?.classList.add('active'); dots[i]?.classList.add('active');
}
function closeProjectGallery(){ const m=$('#projectGalleryModal'); if(!m) return; m.classList.remove('active'); document.body.style.overflow='auto'; }
window.openProjectGalleryFromCard=openProjectGalleryFromCard; window.changeProjectSlide=changeProjectSlide; window.goToProjectSlide=goToProjectSlide; window.closeProjectGallery=closeProjectGallery;

/* Clique robusto no card */
document.addEventListener('click',(ev)=>{
  const card=ev.target.closest('.project-card'); if(!card) return;
  if(ev.target.closest('.gallery-main')||ev.target.closest('.gallery-overlay')||ev.target.closest('.project-image')){
    ev.preventDefault(); openProjectGalleryFromCard(card);
  }
}, true);

/* ---------- Blaupunkt (mapeamento estrito) ---------- */
function collectCandidates(){
  const set=new Set();
  $$('img[src]').forEach(img=>set.add(img.getAttribute('src')));
  $$('[data-images]').forEach(el=>{
    (el.getAttribute('data-images')||'').split(',').map(s=>s.trim()).filter(Boolean).forEach(s=>set.add(s));
  });
  return Array.from(set).map(s=>s.replace(/\s+/g,' ').trim());
}
function mapBlaupunkt(){
  const all=collectCandidates();
  const isFair=s=>/Illumi|HK_Fair|Booth|Fair/i.test(s);
  const tools = all.filter(s=>/Blaupunkt_.*Tools/i.test(s) && !isFair(s));   // tudo com "Tools"
  const power = all.filter(s=>/Power_Tools/i.test(s) && !isFair(s));         // só Power_Tools
  const garden= all.filter(s=>/Garden_Tools/i.test(s) && !isFair(s));        // só Garden_Tools
  const set=(key,arr)=>{ const el=document.querySelector(`.project-card[data-gallery="${key}"]`); if(!el) return; el.setAttribute('data-images',(arr.length?arr:tools).join(','));};
  set('blaupunkt-tools', tools);
  set('blaupunkt-power', power);
  set('blaupunkt-garden', garden);
}

/* ---------- Journey: sticky + badge mobile ---------- */
function updateTimelineSpy(){
  const items=$$('.timeline-item'); if(!items.length) return;
  const logoImg=$('#logo-img'); if(!logoImg) return;
  let activeIndex=0, h=innerHeight, mt=h*.62, mb=h*.38;
  items.forEach((it,i)=>{ const r=it.getBoundingClientRect(); if(r.top<mt && r.bottom>mb) activeIndex=i; });
  const active=items[activeIndex], src=active?.getAttribute('data-logo');
  if(src && src!==logoImg.getAttribute('src')){ logoImg.style.opacity='0'; setTimeout(()=>{ logoImg.src=src; logoImg.onload=()=>logoImg.style.opacity='1'; },140); }
}
function initTimelineSpy(){ updateTimelineSpy(); addEventListener('scroll',updateTimelineSpy,{passive:true}); }
function injectTimelineMobileBadges(){
  if(window.matchMedia && !window.matchMedia('(max-width: 768px)').matches) return;
  $$('.timeline-item').forEach(item=>{
    if(item.querySelector('.timeline-badge-mobile')) return;
    item.style.position='relative';
    const src=item.getAttribute('data-logo'); if(!src) return;
    const b=document.createElement('div'); b.className='timeline-badge-mobile';
    const im=document.createElement('img'); im.src=src; im.alt='Company'; b.appendChild(im);
    item.appendChild(b);
  });
}

/* ---------- Voluntariado ---------- */
function swapVolunteerIconToG(){ const icon=$('.volunteer-icon'); if(!icon) return; icon.innerHTML=''; const im=document.createElement('img'); im.src='./gadsdenstatecommunitycollege_logo.jpg'; im.alt='Gadsden logo'; im.className='g-badge'; icon.appendChild(im); }
function fixVolunteerHero(){ const h=$('.volunteer-hero-image'), img=h?.querySelector('img'); if(!h||!img) return; h.style.maxWidth='1000px'; h.style.margin='0 auto 3rem'; h.style.border='4px solid var(--gold)'; h.style.borderRadius='24px'; h.style.overflow='hidden'; img.style.display='block'; img.style.width='100%'; img.style.height='auto'; img.style.objectFit='cover'; img.style.objectPosition='center center'; }

/* ---------- Idioma ---------- */
function translateAll(lang){ PG_state.currentLang=lang; document.documentElement.lang=lang; }
function markActiveLang(lang){ $$('.lang-btn').forEach(b=>b.classList.toggle('active', b.dataset.lang===lang)); }
function initLangSwitcher(){
  const sw=$('#langSwitcher'); if(!sw) return;
  on(sw,'click',(e)=>{ const btn=e.target.closest('.lang-btn'); if(!btn) return; const lang=btn.dataset.lang||'en'; translateAll(lang); markActiveLang(lang); try{localStorage.setItem('lang',lang);}catch(_){}
    const t=$('#toast'); if(t){t.textContent=`Lang: ${lang.toUpperCase()}`; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),1400);}
  });
  try{ const stored=localStorage.getItem('lang'); const browser=(navigator.language||'en').slice(0,2).toLowerCase(); const initial = stored || (['en','pt','es','fr'].includes(browser)?browser:'en'); translateAll(initial); markActiveLang(initial); }catch(_){ translateAll('en'); markActiveLang('en'); }
}

/* ---------- Misc ---------- */
function initLoading(){ const el=$('#loading'); if(!el) return; addEventListener('load',()=>{ setTimeout(()=>{ el.classList.add('hidden'); setTimeout(()=>el.remove(), 300); }, 700); }); }
function initNavbarScroll(){ const navbar=$('#navbar'), topBtn=$('#scrollTop'); const fn=()=>{ const y=scrollY||document.documentElement.scrollTop; navbar?.classList.toggle('scrolled',y>50); topBtn?.classList.toggle('visible',y>600); }; fn(); addEventListener('scroll',fn,{passive:true}); }
function scrollToTop(){ scrollTo({top:0,behavior:'smooth'}); }
window.scrollToTop=scrollToTop;

/* ---------- Strategy click + teclado ---------- */
function initStrategyClick(){
  $$('.strategy-item[data-strategy]').forEach(el=>{
    on(el,'click',()=>{ const n=Number(el.getAttribute('data-strategy')); if(!isNaN(n)) openStrategyModal(n); });
    on(el,'keydown',(e)=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); const n=Number(el.getAttribute('data-strategy')); if(!isNaN(n)) openStrategyModal(n); }});
  });
}

/* ---------- ESC global ---------- */
document.addEventListener('keydown',(e)=>{
  if(e.key!=='Escape') return;
  try{ closeStatModal(); }catch(_){}
  try{ closeStrategyModal(); }catch(_){}
  const pg=$('#projectGalleryModal'); if(pg?.classList.contains('active')) closeProjectGallery();
});

/* ---------- DOM Ready ---------- */
document.addEventListener('DOMContentLoaded', ()=>{
  initLoading();
  initNavbarScroll();
  initLangSwitcher();
  initStrategyClick();
  initTimelineSpy();
  injectTimelineMobileBadges();
  swapVolunteerIconToG();
  fixVolunteerHero();

  // Stat boxes (clique + teclado)
  $$('.stat-box').forEach(b=>{
    on(b,'click',()=>{ const key=b.dataset.stat; if(key) openStatModal(key); });
    on(b,'keydown',(e)=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); const key=b.dataset.stat; if(key) openStatModal(key); }});
  });

  // Fechar modais por clique fora
  on(document,'click',(e)=>{
    if(e.target?.id==='statModalOverlay') closeStatModal();
    if(e.target?.id==='strategyDetailOverlay') closeStrategyModal();
    if(e.target?.id==='projectGalleryModal') closeProjectGallery();
  });

  // Blaupunkt
  mapBlaupunkt();
});
