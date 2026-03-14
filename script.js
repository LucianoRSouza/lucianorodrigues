// ===== Helpers & Estado =====
const PG_state = { images: [], index: 0, currentLang: 'pt' };
const CardSlides = new Map();
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));
const on = (el, evt, fn, opts) => el && el.addEventListener(evt, fn, opts);

// ===== Dados =====
const statDetailsData = {
  savings:{ icon:'fa-piggy-bank', title:'Cumulative Savings Delivered', value:'€1M+', details:[
    'Multi-category strategic sourcing across direct and indirect spend',
    'Negotiated favorable payment terms (60-90 days) improving cash flow',
    'Should-cost modeling identifying 15–25% opportunities',
    'Supplier base consolidation from 200+ to 80 key partners',
    'Zero-based budgeting on CAPEX saving ~20% on average'] },
  rfps:{ icon:'fa-file-contract', title:'Strategic Tenders Led', value:'120+', details:[
    'End-to-end RFI/RFP/RFQ with annexes (A1/A2)',
    'Weighted scoring matrices (technical/commercial/ESG)',
    'E-procurement integration with full audit trails',
    'Cross-functional evaluation committees',
    'Cycle time reduction 45 → 28 days with higher compliance'] },
  projects:{ icon:'fa-project-diagram', title:'Project Portfolio Value', value:'€10M+', details:[
    'New product development to audited mass production',
    'Licensed portfolio launches (Blaupunkt, Spear & Jackson, Pininfarina)',
    'Factory audits & capability assessments across Asia',
    'Quality systems (ISO 9001, compliance frameworks)',
    'Cross-border logistics & customs optimization'] },
  regions:{ icon:'fa-globe', title:'Global Operations Coverage', value:'20+', details:[
    'Europe · LATAM · Asia (multi-country ops & negotiation)',
    'Local market knowledge & capability mapping',
    '24/7 coordination across time zones',
    'Continuity planning & dual sourcing',
    'Structured governance & SLA dashboards'] }
};

const strategyDetailsData = {
  1:{ title:'Stand Design & Merchandising', subtitle:'Creating immersive brand experiences', icon:'fa-drafting-compass', sections:[
    { title:'Strategic Approach', items:[ 'Booth concept aligned to brand', 'Traffic flow optimization', 'Display hierarchy (hero SKUs/new)', 'Lighting & VM for premium look', 'Interactive demo stations' ] },
    { title:'Technical Execution', items:[ '3D mockups 60d before', 'Modular stand (re-usable)', 'Digital signage with live catalogs', 'Storage & logistics planning', 'On-site supervision' ] }
  ]},
  2:{ title:'Meetings Orchestration & Lead Capture', subtitle:'Maximizing ROI', icon:'fa-calendar-check', sections:[
    { title:'Pre-Event', items:[ 'Target list (200+ prospects)', 'Scheduling with reminders', 'Sales briefings', 'Segmented decks', 'Lead scoring (BANT-like)' ] },
    { title:'On-Site', items:[ '30-min slots', 'CRM mobile capture', 'Follow-up ≤ 4h', 'Standardized notes', 'Daily huddles' ] }
  ]},
  3:{ title:'Negotiations & Partnering', subtitle:'Strategic supplier relationships', icon:'fa-handshake-angle', sections:[
    { title:'Partnerships', items:[ 'Financial stability & capacity', 'MOQ/terms/exclusivity', 'Volume breaks & rebates', 'Quality agreements', 'NDA/IP protection' ] },
    { title:'Contractual', items:[ 'MSA standard', 'SoW templates', 'SLA (penalties/incentives)', 'Force majeure & continuity', 'Exit & knowledge transfer' ] }
  ]},
  4:{ title:'Tech Discovery & Benchmark', subtitle:'Ahead of innovation', icon:'fa-microchip', sections:[
    { title:'Intelligence', items:[ '50+ booths scouting', 'Competitive teardowns', 'Cost benchmarking', 'Trend mapping (IoT/sustainability)', 'Patent landscape checks' ] },
    { title:'Evaluation', items:[ 'Samples for lab validation', 'Engineering feasibility', 'DFM feedback', 'CE/FCC/ANATEL requirements', 'Roadmap alignment' ] }
  ]},
  5:{ title:'Factory Audits & Capability Mapping', subtitle:'Operational excellence', icon:'fa-industry', sections:[
    { title:'Audit Framework', items:[ 'ISO 9001 verification', 'Capacity analysis', 'Maintenance & calibration', 'Workforce skills & training', 'Environmental compliance' ] },
    { title:'Risk', items:[ 'Financial health', 'Dual sourcing & buffers', 'Social compliance (BSCI/SA8000)', 'Cybersecurity for data sharing', 'BCP/DR planning' ] }
  ]},
  6:{ title:'Post-Fair Pipeline, ROI & Governance', subtitle:'Convert leads to revenue', icon:'fa-chart-line', sections:[
    { title:'Pipeline', items:[ 'Hot/Warm/Cold categories', 'CRM automations', 'Value & win-probability', 'Handover to regions', 'Weekly review (30d)' ] },
    { title:'Metrics', items:[ 'Cost per lead', 'Lead→Order conversion', 'Avg. deal size vs. baseline', 'Time-to-close analysis', 'Annual ROI report' ] }
  ]}
};

// ===== Modais (Stats) =====
function openStatModal(key){
  const data = statDetailsData[key]; if(!data) return;
  $('#statModalIcon').className = `fas ${data.icon}`;
  $('#statModalTitle').textContent = data.title;
  $('#statModalValue').textContent = data.value;
  $('#statModalDetails').innerHTML = data.details.map(li=>`<li>${li}</li>`).join('');
  $('#statModalOverlay').classList.add('active');
  document.body.style.overflow='hidden';
}
function closeStatModal(){ const o=$('#statModalOverlay'); if(!o) return; o.classList.remove('active'); document.body.style.overflow='auto'; }

// ===== Modais (Estratégia) =====
function openStrategyModal(num){
  const data = strategyDetailsData[num]; if(!data) return;
  $('#strategyDetailIcon').className = `fas ${data.icon}`;
  $('#strategyDetailTitle').textContent = data.title;
  $('#strategyDetailSubtitle').textContent = data.subtitle;
  const body = data.sections.map(sec=>`<div class="strategy-detail-section"><h4>${sec.title}</h4><ul>${sec.items.map(i=>`<li>${i}</li>`).join('')}</ul></div>`).join('');
  $('#strategyDetailBody').innerHTML = body;
  $('#strategyDetailOverlay').classList.add('active');
  document.body.style.overflow='hidden';
}
function closeStrategyModal(){ const o=$('#strategyDetailOverlay'); if(!o) return; o.classList.remove('active'); document.body.style.overflow='auto'; }

// ===== Galerias =====
function setupCardAutoSlide(card){
  const container = card.querySelector('.gallery-main'); if(!container) return;
  let images=[]; const csv = card.getAttribute('data-images') || '';
  if(csv.trim()) images = csv.split(',').map(s=>s.trim()).filter(Boolean);
  else { const main = container.querySelector('img'); if(main?.src) images=[main.src]; }
  if(!images.length) return;
  const imgEl = container.querySelector('img');
  const auto = card.getAttribute('data-autoslide') === 'true';
  const interval = Math.max(1200, parseInt(card.getAttribute('data-interval'),10) || 2500);
  const state = { images, idx:0, timer:null, interval, imgEl, paused:false };
  CardSlides.set(card, state);
  function tick(){ if(state.paused || !auto || state.images.length<=1) return; state.idx=(state.idx+1)%state.images.length; state.imgEl.style.opacity='0'; setTimeout(()=>{ state.imgEl.src=state.images[state.idx]; state.imgEl.onload=()=> state.imgEl.style.opacity='1'; },160); }
  function start(){ stop(); if(auto && state.images.length>1) state.timer=setInterval(tick, state.interval); }
  function stop(){ if(state.timer){ clearInterval(state.timer); state.timer=null; } }
  on(card,'mouseenter',()=>{state.paused=true}); on(card,'mouseleave',()=>{state.paused=false});
  const clickable = card.querySelector('.gallery-overlay') || container; on(clickable,'click',e=>{ e.stopPropagation(); openProjectGalleryFromCard(card); });
  start();
}

function openProjectGalleryFromCard(card){
  const modal = $('#projectGalleryModal'); if(!modal) return;
  let images=[]; const csv = card.getAttribute('data-images') || '';
  if(csv.trim()) images = csv.split(',').map(s=>s.trim()).filter(Boolean);
  else { const main = card.querySelector('.gallery-main img'); if(main?.src) images=[main.src]; }
  if(!images.length) return; buildProjectSlides(images); modal.classList.add('active'); document.body.style.overflow='hidden';
}
function buildProjectSlides(images){
  const slider=$('#gallerySlider'); const dots=$('#galleryDots'); if(!slider||!dots) return; slider.innerHTML=''; dots.innerHTML='';
  images.forEach((src,idx)=>{ const slide=document.createElement('div'); slide.className='gallery-slide'+(idx===0?' active':''); const img=document.createElement('img'); img.alt='Imagem '+(idx+1); img.src=src; slide.appendChild(img); slider.appendChild(slide); const dot=document.createElement('div'); dot.className='gallery-dot'+(idx===0?' active':''); dot.addEventListener('click',()=>goToProjectSlide(idx)); dots.appendChild(dot); });
  PG_state.images = images.slice(); PG_state.index=0;
}
function changeProjectSlide(dir){ if(!PG_state.images.length) return; const slides=$$('.gallery-slide'); const dots=$$('.gallery-dot'); slides[PG_state.index]?.classList.remove('active'); dots[PG_state.index]?.classList.remove('active'); PG_state.index=(PG_state.index+dir+PG_state.images.length)%PG_state.images.length; slides[PG_state.index]?.classList.add('active'); dots[PG_state.index]?.classList.add('active'); }
function goToProjectSlide(idx){ if(!PG_state.images.length) return; const slides=$$('.gallery-slide'); const dots=$$('.gallery-dot'); slides[PG_state.index]?.classList.remove('active'); dots[PG_state.index]?.classList.remove('active'); PG_state.index=idx; slides[PG_state.index]?.classList.add('active'); dots[PG_state.index]?.classList.add('active'); }
function closeProjectGallery(){ const m=$('#projectGalleryModal'); if(m){ m.classList.remove('active'); document.body.style.overflow='auto'; } }

// ===== UX =====
function initMobileEnhancements(){ const isTouch=matchMedia('(pointer: coarse)').matches; if(!isTouch) return; $$('.stat-box,.strategy-item,.project-card,.gallery-item').forEach(el=>{ on(el,'touchstart',function(){this.style.transform='scale(0.98)'},{passive:true}); on(el,'touchend',function(){this.style.transform=''}, {passive:true}); }); }
function enhanceProjectGalleries(){ const map={
  'blaupunkt-tools':[ 'Blaupunkt_Tools.png', 'Blaupunkt_Illumiation_booth_HK_Fair.png', 'Blaupunkt_Illumiation_booth_HK_Fair_1.png', 'Blaupunkt_Illumiation_booth_HK_Fair_2.png' ],
  'blaupunkt-power':[ 'Blaupunkt_Power_Tools.png','Blaupunkt_Tools.png','Blaupunkt_Illumiation_booth_HK_Fair.png' ],
  'blaupunkt-garden':[ 'Blaupunkt_Garden_Tools.png','Blaupunkt_Tools.png','Blaupunkt_Illumiation_booth_HK_Fair_2.png' ] };
  Object.keys(map).forEach(key=>{ const card=document.querySelector(`.project-card[data-gallery="${key}"]`); if(!card) return; const images=map[key]; card.setAttribute('data-images', images.join(',')); const gallery=card.querySelector('.project-gallery'); if(gallery && !gallery.querySelector('.gallery-dots')){ const dots=document.createElement('div'); dots.className='gallery-dots'; images.forEach((_,i)=>{ const dot=document.createElement('div'); dot.className=`gallery-dot ${i===0?'active':''}`; dots.appendChild(dot); }); gallery.appendChild(dots);} });
}
function initScrollAnimations(){ const io=new IntersectionObserver((entries)=>{ entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); }); }, {threshold:0.12, rootMargin:'0px 0px -60px 0px'}); $$('.animate-on-scroll').forEach(el=>io.observe(el)); }
function initNavbarScroll(){ const navbar=$('#navbar'); const scrollTopBtn=$('#scrollTop'); const onScroll=()=>{ const y=window.scrollY||document.documentElement.scrollTop; navbar?.classList.toggle('scrolled', y>50); scrollTopBtn?.classList.toggle('visible', y>600); updateTimelineSpy(); }; onScroll(); addEventListener('scroll', onScroll, {passive:true}); }
function scrollToTop(){ scrollTo({top:0, behavior:'smooth'}); }
function initLightbox(){ const lb=$('#lightbox'); const img=$('#lightbox-img'); if(!lb||!img) return; on(lb,'click',e=>{ if(e.target===lb) closeLightbox(); }); on(document,'keydown',e=>{ if(lb.classList.contains('active') && e.key==='Escape') closeLightbox(); }); }
function openLightbox(el){ const lb=$('#lightbox'); const img=$('#lightbox-img'); const src=el?.querySelector('img')?.src; if(!lb||!img||!src) return; img.src=src; lb.classList.add('active'); document.body.style.overflow='hidden'; }
function closeLightbox(){ const lb=$('#lightbox'); if(!lb) return; lb.classList.remove('active'); document.body.style.overflow='auto'; }
function initTradeTabs(){ const tabs=$$('.gallery-tab'); if(!tabs.length) return; tabs.forEach(btn=>{ on(btn,'click',()=>{ tabs.forEach(t=>{ t.classList.remove('active'); t.setAttribute('aria-selected','false'); }); btn.classList.add('active'); btn.setAttribute('aria-selected','true'); $$('.gallery-content').forEach(gc=>gc.classList.remove('active')); const panel=$('#'+btn.dataset.target); panel?.classList.add('active'); }); }); }
function showToast(message=''){ const t=$('#toast'); if(!t) return; t.textContent=message; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),2800); }

// Timeline spy
function updateTimelineSpy(){ const items=$$('.timeline-item'); if(!items.length) return; const logo=$('#logo-img'); const dots=$$('.indicator-dot'); if(!logo) return; let activeIndex=0; const h=innerHeight, top=h*0.62, bottom=h*0.38; items.forEach((it,idx)=>{ const r=it.getBoundingClientRect(); if(r.top<top && r.bottom>bottom){ activeIndex=idx; it.classList.add('active'); } else { it.classList.remove('active'); } }); const active=items[activeIndex]; if(active){ const src=active.getAttribute('data-logo'); const cur=logo.getAttribute('src'); if(src && src!==cur){ logo.style.opacity='0'; setTimeout(()=>{ logo.src=src; logo.onload=()=>logo.style.opacity='1'; },160); } } dots.forEach((d,i)=> d.classList.toggle('active', i===activeIndex)); }

// Partículas (hero)
function initParticles(){ const c=$('#particles'); if(!c) return; const n=26; for(let i=0;i<n;i++){ const p=document.createElement('div'); p.className='particle'; p.style.left=Math.random()*100+'%'; p.style.top=Math.random()*100+'%'; const s=Math.max(3, Math.min(6, 3+Math.random()*4)); p.style.width=p.style.height=s+'px'; p.style.opacity=(0.22+Math.random()*0.35).toFixed(2); p.style.animationDelay=(Math.random()*5).toFixed(2)+'s'; p.style.animationDuration=(4+Math.random()*5).toFixed(2)+'s'; p.style.position='absolute'; p.style.background='var(--gold)'; p.style.borderRadius='50%'; p.style.pointerEvents='none'; c.appendChild(p); } }

// I18N
function translateAll(lang){ PG_state.currentLang=lang; document.documentElement.lang=lang; const dict=(window.I18N && window.I18N[lang])||(window.I18N&&window.I18N['pt'])||{}; $$('[data-i18n]').forEach(el=>{ const path=el.dataset.i18n; const value=path?.split('.').reduce((acc,k)=> (acc && acc[k]!==undefined ? acc[k] : undefined), dict); if(value!==undefined) el.textContent=value; }); setTimeout(updateTimelineSpy,100); }
function markActiveLang(lang){ $$('.lang-btn').forEach(b=> b.classList.toggle('active', b.dataset.lang===lang)); }
function initLangSwitcher(){ const sw=$('#langSwitcher'); if(!sw) return; on(sw,'click',e=>{ const btn=e.target.closest('.lang-btn'); if(!btn) return; const lang=btn.dataset.lang; if(!lang) return; translateAll(lang); markActiveLang(lang); try{ localStorage.setItem('lang', lang);}catch(e){} showToast('Idioma: '+lang.toUpperCase()); }); }
function initI18N(){ try{ const stored=localStorage.getItem('lang'); const browser=(navigator.language||'pt').slice(0,2).toLowerCase(); const initial=stored||(['pt','en','es','fr'].includes(browser)?browser:'pt'); translateAll(initial); markActiveLang(initial); }catch(e){ translateAll('pt'); markActiveLang('pt'); } }

// Loading & Âncoras
function initLoading(){ const l=$('#loading'); if(!l) return; addEventListener('load', ()=>{ setTimeout(()=>{ l.classList.add('hidden'); setTimeout(()=> l.remove(), 400); }, 800); }); }
function initSmoothAnchors(){ $$('a[href^="#"]').forEach(a=>{ on(a,'click',e=>{ const href=a.getAttribute('href'); if(!href || href==='#') return; const t=$(href); if(!t) return; e.preventDefault(); t.scrollIntoView({behavior:'smooth', block:'start'}); }); }); }

// Bootstrap
addEventListener('DOMContentLoaded', ()=>{
  initLoading(); initNavbarScroll(); initScrollAnimations(); initParticles(); initSmoothAnchors();
  initLangSwitcher(); initI18N(); initTradeTabs(); initLightbox();
  enhanceProjectGalleries(); $$('.project-card').forEach(setupCardAutoSlide);
  initMobileEnhancements();
  // Fechar modais por clique/ESC
  on(document,'click',e=>{ if(e.target?.id==='statModalOverlay') closeStatModal(); if(e.target?.id==='strategyDetailOverlay') closeStrategyModal(); if(e.target?.id==='projectGalleryModal') closeProjectGallery(); });
  on(document,'keydown',e=>{ if(e.key==='Escape'){ try{ closeStatModal(); }catch(_){} try{ closeStrategyModal(); }catch(_){} try{ closeProjectGallery(); }catch(_){} }});
  // Stat boxes
  $$('.stat-box').forEach(box=> on(box,'click',()=>{ const k=box.dataset.stat; if(k && statDetailsData[k]) openStatModal(k); }));
});

// Expor (para handlers inline que existem no HTML)
window.openStatModal=openStatModal; window.closeStatModal=closeStatModal;
window.openStrategyModal=openStrategyModal; window.closeStrategyModal=closeStrategyModal;
window.openLightbox=openLightbox; window.closeLightbox=closeLightbox;
window.changeProjectSlide=changeProjectSlide; window.goToProjectSlide=goToProjectSlide; window.closeProjectGallery=closeProjectGallery;
window.scrollToTop=scrollToTop;
