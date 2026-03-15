
// ===================== I18N DICTIONARY =====================
window.I18N = {
  en: {
    nav: { about: 'About', experience: 'Experience', projects: 'Projects', tradeshows: 'Trade Shows', certs: 'Certifications', contact: 'Contact' },
    hero: {
      title: 'Luciano Rodrigues de Souza',
      subtitle: 'AI-Driven Procurement & Operations Leader · Strategic Transformation',
      desc: 'I connect governance, technical rigor, and AI to deliver measurable outcomes: transparent tenders, reliable partners, and resilient operations across Europe, LATAM, and Asia.',
      stats: {
        savings: 'Cumulative Savings', savings_note: 'Across multi-category negotiations',
        rfps: 'RFP/RFQ Led', rfps_note: 'With technical annexes & weighted scoring',
        projects: 'Project Portfolio', projects_note: 'From concept to audited mass production',
        regions: 'Countries', regions_note: 'Europe · LATAM · Asia'
      }
    },
    projects: { title: 'Featured Projects', subtitle: 'Product development excellence and AI innovation portfolio', view_gallery: 'View Gallery' },
    tradeshows: { title: 'Trade Shows & Global Exhibitions', subtitle: 'Exhibitor and strategic buyer across worldwide markets',
      strategy: { title: 'Trade Show Strategy & Execution', pillars: { 1:'Stand Design & Merchandising',2:'Meetings Orchestration & Lead Capture',3:'Negotiations & Partnering',4:'Tech Discovery & Benchmark',5:'Factory Audits & Capability Mapping',6:'Post-Fair Pipeline, ROI & Governance' } }
    },
    about: { title:'Leadership Philosophy', subtitle:'From LATAM operations to global procurement strategy', heading:'Transformation Through Collaboration', body:{1:'I design procurement systems that scale...',2:'My leadership style blends cross‑functional facilitation...'} },
    timeline: { title:'Professional Journey', subtitle:'15+ years of progressive leadership', level:{ senior:'Senior Level', director:'Director Level', manager:'Manager Level', growth:'Growth Phase' } },
    vol: { title:'Volunteering & Community Impact', subtitle:'Giving back through education and mentorship', position:'Mathematics & English Instructor', school:'Gadsden State Community College', desc:'Mathematics and English tutoring for students in need of academic support.' }
  },
  pt: {
    nav: { about: 'Sobre', experience: 'Experiência', projects: 'Projetos', tradeshows: 'Feiras', certs: 'Certificações', contact: 'Contato' },
    hero: {
      title: 'Luciano Rodrigues de Souza',
      subtitle: 'Procurement & Operações orientados por IA · Transformação Estratégica',
      desc: 'Conecto governança, rigor técnico e IA para gerar resultados mensuráveis: tenders transparentes, parceiros confiáveis e operações resilientes na Europa, LATAM e Ásia.',
      stats: {
        savings: 'Poupança Acumulada', savings_note: 'Em negociações multi‑categoria',
        rfps: 'RFP/RFQ Conduzidos', rfps_note: 'Com anexos técnicos e scoring ponderado',
        projects: 'Portfólio de Projetos', projects_note: 'Do conceito à produção auditada',
        regions: 'Países', regions_note: 'Europa · LATAM · Ásia'
      }
    },
    projects: { title: 'Projetos em Destaque', subtitle: 'Excelência em desenvolvimento de produto e inovação com IA', view_gallery: 'Ver Galeria' },
    tradeshows: { title: 'Feiras & Expos Internacionais', subtitle: 'Expositor e comprador estratégico em mercados globais',
      strategy: { title: 'Estratégia & Execução de Feiras', pillars: { 1:'Design de Stand & Merchandising',2:'Reuniões & Captação de Leads',3:'Negociações & Parcerias',4:'Descoberta Tecnológica & Benchmark',5:'Auditorias de Fábrica & Capacidades',6:'Pipeline Pós‑Feira, ROI & Governança' } }
    },
    about: { title:'Filosofia de Liderança', subtitle:'Das operações na LATAM à estratégia global de procurement', heading:'Transformação pela Colaboração', body:{1:'Desenho sistemas de procurement escaláveis...',2:'Liderança transversal apoiada por dados e IA...'} },
    timeline: { title:'Trajetória Profissional', subtitle:'15+ anos de liderança progressiva', level:{ senior:'Nível Sênior', director:'Diretoria', manager:'Gestão', growth:'Expansão' } },
    vol: { title:'Voluntariado & Impacto Comunitário', subtitle:'Retribuindo por meio da educação e mentoria', position:'Instrutor de Matemática & Inglês', school:'Gadsden State Community College', desc:'Aulas de matemática e inglês para alunos com necessidade de apoio.' }
  }
};

// ============== Helpers ==============
const $ = (s, c=document)=>c.querySelector(s);
const $$ = (s, c=document)=>Array.from(c.querySelectorAll(s));

function getLang(){ const el = document.documentElement; return (el.lang||'en').slice(0,2); }
function translateAll(lang){ document.documentElement.lang = lang; const dict = (window.I18N[lang]||window.I18N.en);
  $$('[data-i18n]').forEach(el=>{ const path = el.dataset.i18n.split('.'); let val = dict; for(const p of path){ val = (val||{})[p]; if(val===undefined) break; } if(val!==undefined) el.textContent = val; });
}
function initLangSwitcher(){ const sw = $('#langSwitcher'); if(!sw) return; sw.addEventListener('click',e=>{ const b = e.target.closest('.lang-btn'); if(!b) return; const lang = b.dataset.lang; translateAll(lang); $$('.lang-btn').forEach(x=>x.classList.toggle('active', x===b)); try{localStorage.setItem('lang',lang);}catch(_){} });
  try{ const stored=localStorage.getItem('lang'); translateAll(stored||'en'); }catch(_){ translateAll('en'); }
}

// ============== Stat modal (multi-language) ==============
const STAT_DETAILS_I18N = {
  en: {
    savings: { icon:'fa-piggy-bank', title:'Cumulative Savings Delivered', value:'€1M+', details:[
      'Multi-category strategic sourcing initiatives across direct and indirect spend',
      'Negotiated favorable payment terms (60-90 days) improving cash flow',
      'Should-cost modeling identifying 15–25% cost reductions',
      'Supplier base consolidation from 200+ to 80 key partners',
      'Zero-based budgeting for CAPEX projects saving ~20% on average'
    ] },
    rfps: { icon:'fa-file-contract', title:'Strategic Tenders Led', value:'120+', details:[
      'End-to-end RFI/RFP/RFQ design with technical annexes',
      'Weighted scoring: technical, commercial, ESG',
      'E-procurement integration with full audit trail',
      'Cross-functional evaluation committees',
      'Cycle time reduction from 45 to 28 days'
    ] },
    projects: { icon:'fa-project-diagram', title:'Project Portfolio Value', value:'€10M+', details:[
      'New product development from concept to mass production',
      'Licensed portfolio launches (Blaupunkt, etc.)',
      'Factory audits & capability assessments across Asia',
      'Quality systems (ISO 9001, compliance frameworks)',
      'Logistics optimization and customs compliance'
    ] },
    regions: { icon:'fa-globe', title:'Global Operations Coverage', value:'20+', details:[
      'Europe: Portugal, Spain, Germany, UK, Netherlands, Italy, France',
      'LATAM: Brazil, Argentina, Chile, Colombia, Mexico, Peru, Uruguay',
      'Asia: China, Hong Kong, Taiwan, Vietnam, India, South Korea',
      'Multi-cultural negotiation experience',
      '24/7 project execution across time zones'
    ] }
  },
  pt: {
    savings: { icon:'fa-piggy-bank', title:'Poupança Acumulada', value:'€1M+', details:[
      'Sourcing estratégico multi‑categoria (diretos e indiretos)',
      'Prazos de pagamento negociados (60–90 dias) e melhor fluxo de caixa',
      'Modelagem should‑cost com reduções de 15–25%',
      'Consolidação da base de fornecedores de 200+ para 80 parceiros‑chave',
      'Orçamentação base‑zero em CAPEX com ~20% de economia média'
    ] },
    rfps: { icon:'fa-file-contract', title:'Tenders Estratégicos Conduzidos', value:'120+', details:[
      'Desenho ponta‑a‑ponta de RFI/RFP/RFQ com anexos técnicos',
      'Matrizes de scoring ponderado: técnico, comercial, ESG',
      'Integração com e‑procurement e trilha de auditoria',
      'Comitês de avaliação multifuncionais',
      'Redução do lead time de 45 para 28 dias'
    ] },
    projects: { icon:'fa-project-diagram', title:'Valor do Portfólio de Projetos', value:'€10M+', details:[
      'Desenvolvimento de produto do conceito à produção em massa',
      'Lançamentos licenciados (Blaupunkt, etc.)',
      'Auditorias de fábrica e avaliação de capacidades na Ásia',
      'Sistemas de qualidade (ISO 9001, compliance)',
      'Otimização logística e conformidade aduaneira'
    ] },
    regions: { icon:'fa-globe', title:'Cobertura Operacional Global', value:'20+', details:[
      'Europa: Portugal, Espanha, Alemanha, Reino Unido, Holanda, Itália, França',
      'LATAM: Brasil, Argentina, Chile, Colômbia, México, Peru, Uruguai',
      'Ásia: China, Hong Kong, Taiwan, Vietnã, Índia, Coreia do Sul',
      'Negociação multicultural e conhecimento local',
      'Execução 24/7 coordenando fusos horários'
    ] }
  }
};

function openStatModal(key){ const lang = getLang(); const data = (STAT_DETAILS_I18N[lang]&&STAT_DETAILS_I18N[lang][key]) || (STAT_DETAILS_I18N.en[key]); if(!data) return;
  $('#statModalIcon').className = `fas ${data.icon}`; $('#statModalTitle').textContent = data.title; $('#statModalValue').textContent = data.value;
  $('#statModalDetails').innerHTML = data.details.map(it=>`<li>${it}</li>`).join('');
  const ov = $('#statModalOverlay'); ov.classList.add('active'); document.body.style.overflow='hidden';
  ensureFixedClose(ov, closeStatModal, 'stat-fixed-close');
}
function closeStatModal(){ const ov = $('#statModalOverlay'); ov.classList.remove('active'); document.body.style.overflow='auto'; removeFixedClose('stat-fixed-close'); }

// ============== Strategy modal (titles via I18N; content remains) ==============
function openStrategyModal(num){ const dict = window.I18N[getLang()]||window.I18N.en; const title = dict?.tradeshows?.strategy?.pillars?.[num] || 'Strategy';
  $('#strategyDetailIcon').className = 'fas fa-star'; $('#strategyDetailTitle').textContent = title; $('#strategyDetailSubtitle').textContent = '';
  $('#strategyDetailBody').innerHTML = '<div class="strategy-detail-section"><h4><i class="fas fa-chevron-right"></i>Highlights</h4><ul><li>Planned, executed and measured end‑to‑end.</li><li>Cross‑functional alignment with Marketing & Sales.</li><li>Clear post‑fair pipeline for ROI.</li></ul></div>';
  const ov = $('#strategyDetailOverlay'); ov.classList.add('active'); document.body.style.overflow='hidden';
  ensureFixedClose(ov, closeStrategyModal, 'strategy-fixed-close');
}
function closeStrategyModal(){ const ov = $('#strategyDetailOverlay'); ov.classList.remove('active'); document.body.style.overflow='auto'; removeFixedClose('strategy-fixed-close'); }

// ============== Project gallery ==============
const PG_state = { images:[], index:0 };
function buildProjectSlides(images){ const slider = $('#gallerySlider'); const dots = $('#galleryDots'); slider.innerHTML=''; dots.innerHTML='';
  images.forEach((src,i)=>{ const s = document.createElement('div'); s.className='gallery-slide'+(i===0?' active':''); const im=document.createElement('img'); im.src=src; im.alt='Project image '+(i+1); s.appendChild(im); slider.appendChild(s); const d=document.createElement('div'); d.className='gallery-dot'+(i===0?' active':''); d.addEventListener('click',()=>goToProjectSlide(i)); dots.appendChild(d); });
  PG_state.images = images.slice(); PG_state.index = 0;
}
function openProjectGalleryFromCard(card){ let images = []; const csv = card.getAttribute('data-images')||''; if(csv.trim()) images = csv.split(',').map(s=>s.trim()).filter(Boolean);
  if(!images.length){ const main = card.querySelector('.gallery-main img'); if(main?.src) images=[main.src]; }
  if(!images.length) return; buildProjectSlides(images); $('#projectGalleryModal').classList.add('active'); document.body.style.overflow='hidden'; }
function closeProjectGallery(){ $('#projectGalleryModal').classList.remove('active'); document.body.style.overflow='auto'; }
function changeProjectSlide(dir){ if(!PG_state.images.length) return; const slides=$$('.gallery-slide'); const dots=$$('.gallery-dot'); slides[PG_state.index]?.classList.remove('active'); dots[PG_state.index]?.classList.remove('active'); PG_state.index=(PG_state.index+dir+PG_state.images.length)%PG_state.images.length; slides[PG_state.index]?.classList.add('active'); dots[PG_state.index]?.classList.add('active'); }
function goToProjectSlide(idx){ if(!PG_state.images.length) return; const slides=$$('.gallery-slide'); const dots=$$('.gallery-dot'); slides[PG_state.index]?.classList.remove('active'); dots[PG_state.index]?.classList.remove('active'); PG_state.index=idx; slides[PG_state.index]?.classList.add('active'); dots[PG_state.index]?.classList.add('active'); }

function setupCardAutoSlide(card){ const container = card.querySelector('.gallery-main'); if(!container) return; let images=[]; const csv=card.getAttribute('data-images')||''; if(csv.trim()) images=csv.split(',').map(s=>s.trim()); else { const m=container.querySelector('img'); if(m?.src) images=[m.src]; }
  if(!images.length) return; const imgEl = container.querySelector('img'); const auto = card.getAttribute('data-autoslide')==='true'; const interval = Math.max(1000, parseInt(card.getAttribute('data-interval'),10)||2500);
  const state = { images, idx:0, timer:null, interval, imgEl, paused:false };
  function tick(){ if(state.paused||!auto||state.images.length<=1) return; state.idx=(state.idx+1)%state.images.length; imgEl.style.opacity='0'; setTimeout(()=>{ imgEl.src=state.images[state.idx]; imgEl.onload=()=>{ imgEl.style.opacity='1'; }; },160); }
  function start(){ stop(); if(auto && state.images.length>1) state.timer=setInterval(tick, state.interval); }
  function stop(){ if(state.timer){ clearInterval(state.timer); state.timer=null; } }
  container.addEventListener('mouseenter',()=>state.paused=true); container.addEventListener('mouseleave',()=>state.paused=false);
  (card.querySelector('.gallery-overlay')||container).addEventListener('click',e=>{ e.preventDefault(); openProjectGalleryFromCard(card); });
  start();
}

// ============== Trade shows: single rotating image + click opens gallery ==============
const TRADE_GALLERIES = {
  'trade-blaupunkt': [
    './Blaupunkt_Illumination_booth_HK_Fair.png',
    './Blaupunkt_Illumination_booth_HK_Fair_1.png',
    './Blaupunkt_Illumination_booth_HK_Fair_2.png',
    './Blaupunkt_Illumination_booth_HK_Fair_3.png',
    './Blaupunkt_Illumination_booth_HK_Fair_4.png'
  ],
  'trade-ford': [
    './Ford_lighting_solutions_HK_Intl.png',
    './Ford_lighting_solutions_HK_Intl_1.png',
    './Ford_lighting_solutions_HK_Intl_2.png'
  ]
};

function initTradeSlides(){ $$('.trade-hero[data-gallery-id]').forEach(block=>{ const id=block.getAttribute('data-gallery-id'); const imgs=TRADE_GALLERIES[id]||[]; if(!imgs.length) return; const imgEl = block.querySelector('img'); let idx=0; setInterval(()=>{ idx=(idx+1)%imgs.length; imgEl.style.opacity='0'; setTimeout(()=>{ imgEl.src=imgs[idx]; imgEl.onload=()=>imgEl.style.opacity='1'; },140); }, 1000);
  block.querySelector('.trade-hero-link').addEventListener('click',e=>{ e.preventDefault(); buildProjectSlides(imgs); $('#projectGalleryModal').classList.add('active'); document.body.style.overflow='hidden'; }); }); }

// ============== Fixed close btn helpers ==============
function ensureFixedClose(overlay, onClick, id){ if(document.getElementById(id)) return; const b=document.createElement('button'); b.id=id; b.className='modal-close-fixed'; b.innerHTML='×'; b.setAttribute('aria-label','Close'); b.addEventListener('click', onClick); overlay.appendChild(b); }
function removeFixedClose(id){ const b=document.getElementById(id); if(b) b.remove(); }

// ============== Mobile logos inside timeline items ==============
function injectMobileLogos(){ const isMobile = window.matchMedia('(max-width: 640px)').matches; $$('.timeline-item').forEach(item=>{
  const content = item.querySelector('.timeline-content'); if(!content) return; const existing = content.querySelector('.mobile-company-logo'); if(!isMobile){ if(existing) existing.remove(); return; }
  if(existing) return; const src = item.getAttribute('data-logo'); if(!src) return; const img = document.createElement('img'); img.className='mobile-company-logo'; img.src=src; img.alt='Company logo'; content.appendChild(img); }); }

// ============== Init ==============
document.addEventListener('DOMContentLoaded',()=>{
  initLangSwitcher();
  // projects
  $$('.project-card').forEach(setupCardAutoSlide);
  // click handlers for stat boxes
  $$('.stat-box').forEach(b=> b.addEventListener('click',()=> openStatModal(b.getAttribute('data-stat'))));
  // trade slides
  initTradeSlides();
  // mobile logos
  injectMobileLogos(); window.addEventListener('resize', injectMobileLogos);
});

// Lightbox (kept minimal for trade grid leftovers if any)
function openLightbox(el){ const lb=$('#lightbox'); const img=$('#lightbox-img'); const target = el?.querySelector?.('img'); if(!lb||!img||!target) return; img.src=target.src; lb.classList.add('active'); document.body.style.overflow='hidden'; }
function closeLightbox(){ $('#lightbox').classList.remove('active'); document.body.style.overflow='auto'; }


// === Overrides: localized stat modal + fixed close button ===
const STAT_DETAILS_I18N = {
  en: {
    savings: { icon:'fa-piggy-bank', title:'Cumulative Savings Delivered', value:'€1M+', details:[
      'Multi-category strategic sourcing initiatives across direct and indirect spend',
      'Negotiated favorable payment terms (60-90 days) improving cash flow',
      'Should-cost modeling identifying 15–25% cost reductions',
      'Supplier base consolidation from 200+ to 80 key partners',
      'Zero-based budgeting for CAPEX projects saving ~20% on average'
    ] },
    rfps: { icon:'fa-file-contract', title:'Strategic Tenders Led', value:'120+', details:[
      'End-to-end RFI/RFP/RFQ design with technical annexes',
      'Weighted scoring: technical, commercial, ESG',
      'E-procurement integration with full audit trail',
      'Cross-functional evaluation committees',
      'Cycle time reduction from 45 to 28 days'
    ] },
    projects: { icon:'fa-project-diagram', title:'Project Portfolio Value', value:'€10M+', details:[
      'New product development from concept to mass production',
      'Licensed portfolio launches (Blaupunkt, etc.)',
      'Factory audits & capability assessments across Asia',
      'Quality systems (ISO 9001, compliance frameworks)',
      'Logistics optimization and customs compliance'
    ] },
    regions: { icon:'fa-globe', title:'Global Operations Coverage', value:'20+', details:[
      'Europe: Portugal, Spain, Germany, UK, Netherlands, Italy, France',
      'LATAM: Brazil, Argentina, Chile, Colombia, Mexico, Peru, Uruguay',
      'Asia: China, Hong Kong, Taiwan, Vietnam, India, South Korea',
      'Multi-cultural negotiation experience',
      '24/7 project execution across time zones'
    ] }
  },
  pt: {
    savings: { icon:'fa-piggy-bank', title:'Poupança Acumulada', value:'€1M+', details:[
      'Sourcing estratégico multi‑categoria (diretos e indiretos)',
      'Prazos de pagamento negociados (60–90 dias) e melhor fluxo de caixa',
      'Modelagem should‑cost com reduções de 15–25%',
      'Consolidação da base de fornecedores de 200+ para 80 parceiros‑chave',
      'Orçamentação base‑zero em CAPEX com ~20% de economia média'
    ] },
    rfps: { icon:'fa-file-contract', title:'Tenders Estratégicos Conduzidos', value:'120+', details:[
      'Desenho ponta‑a‑ponta de RFI/RFP/RFQ com anexos técnicos',
      'Matrizes de scoring ponderado: técnico, comercial, ESG',
      'Integração com e‑procurement e trilha de auditoria',
      'Comitês de avaliação multifuncionais',
      'Redução do lead time de 45 para 28 dias'
    ] },
    projects: { icon:'fa-project-diagram', title:'Valor do Portfólio de Projetos', value:'€10M+', details:[
      'Desenvolvimento de produto do conceito à produção em massa',
      'Lançamentos licenciados (Blaupunkt, etc.)',
      'Auditorias de fábrica e avaliação de capacidades na Ásia',
      'Sistemas de qualidade (ISO 9001, compliance)',
      'Otimização logística e conformidade aduaneira'
    ] },
    regions: { icon:'fa-globe', title:'Cobertura Operacional Global', value:'20+', details:[
      'Europa: Portugal, Espanha, Alemanha, Reino Unido, Holanda, Itália, França',
      'LATAM: Brasil, Argentina, Chile, Colômbia, México, Peru, Uruguai',
      'Ásia: China, Hong Kong, Taiwan, Vietnã, Índia, Coreia do Sul',
      'Negociação multicultural e conhecimento local',
      'Execução 24/7 coordenando fusos horários'
    ] }
  }
};
function ensureFixedClose(overlay, onClick, id){ if(document.getElementById(id)) return; const b=document.createElement('button'); b.id=id; b.className='modal-close-fixed'; b.innerHTML='×'; b.setAttribute('aria-label','Close'); b.addEventListener('click', onClick); overlay.appendChild(b); }
function removeFixedClose(id){ const b=document.getElementById(id); if(b) b.remove(); }
function getLang(){ return (document.documentElement.lang||'en').slice(0,2); }
function openStatModal(key){ const lang=getLang(); const data=(STAT_DETAILS_I18N[lang]&&STAT_DETAILS_I18N[lang][key]) || STAT_DETAILS_I18N.en[key]; if(!data) return; 
  document.getElementById('statModalIcon').className = `fas ${data.icon}`;
  document.getElementById('statModalTitle').textContent = data.title;
  document.getElementById('statModalValue').textContent = data.value;
  document.getElementById('statModalDetails').innerHTML = data.details.map(item=>`<li>${item}</li>`).join('');
  const overlay = document.getElementById('statModalOverlay'); overlay.classList.add('active'); document.body.style.overflow='hidden';
  ensureFixedClose(overlay, closeStatModal, 'stat-fixed-close');
}
function closeStatModal(){ const overlay = document.getElementById('statModalOverlay'); if(overlay){ overlay.classList.remove('active'); document.body.style.overflow='auto'; removeFixedClose('stat-fixed-close'); } }
// Strategy modal: keep content, but ensure close fixed exists
const _openStrategyModal = window.openStrategyModal || function(){};
window.openStrategyModal = function(num){ _openStrategyModal(num); const ov=document.getElementById('strategyDetailOverlay'); if(ov){ ensureFixedClose(ov, closeStrategyModal, 'strategy-fixed-close'); }};
function closeStrategyModal(){ const ov=document.getElementById('strategyDetailOverlay'); if(ov){ ov.classList.remove('active'); document.body.style.overflow='auto'; removeFixedClose('strategy-fixed-close'); }}
window.closeStrategyModal = closeStrategyModal;


// === Override enhanceProjectGalleries: exact images per request ===
function enhanceProjectGalleries(){
  const map = {
    'blaupunkt-tools': [
      './BP_Powertools.jpg',
      './Blaupunkt_Illumination_booth_HK_Fair.png',
      './Blaupunkt_Power_Tools.png',
      './Blaupunkt_Tools.png'
    ],
    'blaupunkt-power': [
      './BP_Powertools.jpg',
      './Blaupunkt_Power_Tools.png',
      './Blaupunkt_Tools.png'
    ],
    'blaupunkt-garden': [
      './Blaupunkt_Garden_Tools.png'
    ]
  };
  Object.keys(map).forEach(key=>{
    const card = document.querySelector(`.project-card[data-gallery="${key}"]`);
    if(!card) return; const images = map[key];
    card.setAttribute('data-images', images.join(','));
    const gallery = card.querySelector('.project-gallery');
    if(gallery && !gallery.querySelector('.gallery-dots')){
      const dots=document.createElement('div'); dots.className='gallery-dots';
      images.forEach((_,i)=>{ const d=document.createElement('div'); d.className='gallery-dot'+(i===0?' active':''); dots.appendChild(d); });
      gallery.appendChild(dots);
    }
  });
}


// === Trade shows: single rotating image per brand + click opens gallery ===
const TRADE_GALLERIES = {
  'trade-blaupunkt': [
    './Blaupunkt_Illumination_booth_HK_Fair.png',
    './Blaupunkt_Illumination_booth_HK_Fair_1.png',
    './Blaupunkt_Illumination_booth_HK_Fair_2.png',
    './Blaupunkt_Illumination_booth_HK_Fair_3.png',
    './Blaupunkt_Illumination_booth_HK_Fair_4.png'
  ],
  'trade-ford': [
    './Ford_lighting_solutions_HK_Intl.png',
    './Ford_lighting_solutions_HK_Intl_1.png',
    './Ford_lighting_solutions_HK_Intl_2.png'
  ]
};
function buildProjectSlides(images){ const slider = document.getElementById('gallerySlider'); const dots = document.getElementById('galleryDots'); if(!slider||!dots) return; slider.innerHTML=''; dots.innerHTML=''; images.forEach((src,i)=>{ const s=document.createElement('div'); s.className='gallery-slide'+(i===0?' active':''); const im=document.createElement('img'); im.src=src; im.alt='image '+(i+1); s.appendChild(im); slider.appendChild(s); const d=document.createElement('div'); d.className='gallery-dot'+(i===0?' active':''); d.addEventListener('click',()=>{ goToProjectSlide(i); }); dots.appendChild(d); }); window.PG_state = { images: images.slice(), index:0 } }
function goToProjectSlide(i){ const slides = document.querySelectorAll('.gallery-slide'); const dots=document.querySelectorAll('.gallery-dot'); if(!window.PG_state) return; slides[window.PG_state.index]?.classList.remove('active'); dots[window.PG_state.index]?.classList.remove('active'); window.PG_state.index=i; slides[i]?.classList.add('active'); dots[i]?.classList.add('active'); }
function changeProjectSlide(delta){ const slides=document.querySelectorAll('.gallery-slide'); const dots=document.querySelectorAll('.gallery-dot'); if(!window.PG_state) return; const n=window.PG_state.images.length; slides[window.PG_state.index]?.classList.remove('active'); dots[window.PG_state.index]?.classList.remove('active'); window.PG_state.index=(window.PG_state.index+delta+n)%n; slides[window.PG_state.index]?.classList.add('active'); dots[window.PG_state.index]?.classList.add('active'); }
function closeProjectGallery(){ document.getElementById('projectGalleryModal')?.classList.remove('active'); document.body.style.overflow='auto'; }
function initTradeSlides(){ document.querySelectorAll('.trade-hero[data-gallery-id]').forEach(block=>{ const id=block.getAttribute('data-gallery-id'); const imgs=TRADE_GALLERIES[id]||[]; if(!imgs.length) return; const imgEl = block.querySelector('img'); let idx=0; setInterval(()=>{ idx=(idx+1)%imgs.length; imgEl.style.opacity='0'; setTimeout(()=>{ imgEl.src=imgs[idx]; imgEl.onload=()=>imgEl.style.opacity='1'; },120); }, 1000); block.querySelector('.trade-hero-link').addEventListener('click', e=>{ e.preventDefault(); buildProjectSlides(imgs); document.getElementById('projectGalleryModal')?.classList.add('active'); document.body.style.overflow='hidden'; }); }); }
// Mobile company logo injection in timeline
function injectMobileLogos(){ const isMobile = window.matchMedia('(max-width: 640px)').matches; document.querySelectorAll('.timeline-item').forEach(item=>{ const content = item.querySelector('.timeline-content'); if(!content) return; const existing = content.querySelector('.mobile-company-logo'); if(!isMobile){ if(existing) existing.remove(); return; } if(existing) return; const src=item.getAttribute('data-logo'); if(!src) return; const img=document.createElement('img'); img.className='mobile-company-logo'; img.src=src; img.alt='Company logo'; content.appendChild(img); }); }

document.addEventListener('DOMContentLoaded', ()=>{ try{ initTradeSlides(); }catch(e){} injectMobileLogos(); window.addEventListener('resize', injectMobileLogos); });
