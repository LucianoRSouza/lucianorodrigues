"use strict";
(function(){
  // ---------- Fail-safe Loader ----------
  const loader = document.getElementById('app-loader');
  const hideLoader = ()=>{ if(!loader) return; loader.classList.add('hidden'); setTimeout(()=>loader.remove(), 320); };
  if(document.readyState === 'complete' || document.readyState === 'interactive'){
    setTimeout(hideLoader, 120); // quick hide after DOM ready
  } else {
    document.addEventListener('DOMContentLoaded', hideLoader, { once:true });
  }
  window.addEventListener('load', hideLoader, { once:true });
  // safety fallback if anything blocks
  setTimeout(hideLoader, 2500);

  // ---------- Data (Stats & Strategy) ----------
  const statData = {
    savings:{ title:'Poupança acumulada', value:'€1M+', items:[
      'Iniciativas multi-categoria (diretos/indiretos) com foco em TCO',
      'Prazos de pagamento negociados (60–90 dias) e melhoria do fluxo de caixa',
      'Should-cost: oportunidades de 15–25% por categoria',
      'Base de fornecedores consolidada de 200+ para 80 parceiros‑chave',
      'Budgeting zero‑base em CAPEX com média de 20% de redução'
    ]},
    rfps:{ title:'RFP/RFQ liderados', value:'120+', items:[
      'Processo fim‑a‑fim com anexos técnicos e trilhas de auditoria',
      'Matrizes de scoring: Técnico (40%), Comercial (35%), ESG (25%)',
      'Comitês multifuncionais e compliance por design',
      'Integração com e‑procurement e redução do ciclo (45 → 28 dias)',
      'Ganhos de qualidade na tomada de decisão e governança'
    ]},
    projects:{ title:'Portfólio de projetos', value:'€10M+', items:[
      'Do conceito à produção em massa com auditoria de linha',
      'Lançamentos licenciados (Blaupunkt, Spear & Jackson, Pininfarina)',
      'Auditorias de fábrica e avaliação de capacidade na Ásia',
      'Sistemas de qualidade (ISO 9001, conformidade) e PPAP quando aplicável',
      'Logística cross‑border e conformidade aduaneira'
    ]},
    regions:{ title:'Cobertura global', value:'20+', items:[
      'EU: PT, ES, DE, UK, NL, IT, FR',
      'LATAM: BR, AR, CL, CO, MX, PE, UY',
      'Ásia: CN, HK, TW, VN, IN, KR',
      'Negociação multicultural com leitura de mercado local',
      'Coordenação multi‑fuso para execução contínua'
    ]}
  };

  const strategyData = {
    1:{ title:'Stand & Visual Merchandising', sub:'Experiência de marca e fluxo', items:[
      'Conceito co‑criado com Marketing alinhado ao posicionamento',
      'Otimização de fluxo e hierarquia de exposição',
      'Demos e estação de produto para interação',
      'Iluminação e leitura premium do portfólio',
      'Componentes modulares para reuso entre feiras'
    ]},
    2:{ title:'Reuniões & Lead Capture', sub:'ROI por engajamento estruturado', items:[
      'Agenda com lembretes e qualificação (BANT)',
      'Notas padronizadas no CRM mobile e follow‑up em 4h',
      'Pitch decks por segmento e preparação do time',
      'Daily huddles para ajustes táticos',
      'Transição organizada para pipeline regional'
    ]},
    3:{ title:'Negociações & Parcerias', sub:'Relacionamentos estratégicos', items:[
      'Qualificação: estabilidade, capacidade e certificações',
      'Termos: MOQ, prazos, exclusividade e garantias',
      'Framework de preços com degraus e rebates',
      'Acordos de qualidade e ações corretivas',
      'Proteção de IP e NDAs para P&D conjunto'
    ]},
    4:{ title:'Tech Discovery & Benchmark', sub:'Inovação e custo alvo', items:[
      'Scouting de 50+ booths por feira e teardown comparativo',
      'Benchmark de custo vs. especificação',
      'Tendências (IoT, sustentabilidade, smart features)',
      'Requisitos de certificação (CE, FCC, ANATEL)',
      'Alinhamento de roadmap com P&D de fornecedores'
    ]},
    5:{ title:'Auditorias & Capacidades', sub:'Excelência operacional', items:[
      'ISO 9001, manutenção e calibração de equipamentos',
      'Capacidade: linhas, turnos e utilização',
      'Treinamento e matriz de competências',
      'Ambiental e gestão de resíduos',
      'Planos de continuidade de negócios'
    ]},
    6:{ title:'Pipeline, ROI & Governance', sub:'Resultados pós‑feira', items:[
      'Classificação de leads (Hot/Warm/Cold) e cadências',
      'Estimativa de valor e probabilidade de ganho',
      'KPIs: CPL, conversão, ticket médio e time‑to‑close',
      'Relatório de ROI para orçamento de Marketing',
      'Auditoria de decisões e lições aprendidas'
    ]}
  };

  // ---------- Modal Core ----------
  const modal = document.getElementById('modal');
  const mTitle = document.getElementById('modal-title');
  const mSub   = document.getElementById('modal-sub');
  const mBody  = document.getElementById('modal-body');
  const openModal = (title, sub, items)=>{
    mTitle.textContent = title || '';
    mSub.textContent = sub || '';
    mSub.style.display = sub ? 'block':'none';
    mBody.innerHTML = (items||[]).map(li=>`<li>${li}</li>`).join('');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
  };
  const closeModal = ()=>{
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow='auto';
  };
  modal.addEventListener('click', (e)=>{ if(e.target === modal || e.target.hasAttribute('data-close')) closeModal(); });
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape' && modal.getAttribute('aria-hidden')==='false') closeModal(); });

  // ---------- Bind Stats ----------
  document.querySelectorAll('.stat[data-stat]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const key = btn.getAttribute('data-stat');
      const d = statData[key];
      if(!d) return;
      openModal(`${d.title} · ${d.value}`, '', d.items);
    });
    btn.addEventListener('keydown', (e)=>{ if((e.key==='Enter'||e.key===' ') && !e.repeat){ e.preventDefault(); btn.click(); }});
  });

  // ---------- Bind Strategy ----------
  document.querySelectorAll('[data-strategy]').forEach(el=>{
    el.addEventListener('click', ()=>{
      const k = el.getAttribute('data-strategy');
      const d = strategyData[k];
      if(!d) return;
      openModal(d.title, d.sub, d.items);
    });
  });
})();
