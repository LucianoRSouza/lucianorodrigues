// ============================================
// Luciano Rodrigues - Portfolio JavaScript
// Corrigido e Revisado
// ============================================

// Global State
const PG_state = {
  images: [],
  index: 0,
  currentLang: 'en'
};

const CardSlides = new Map();

// Utility Functions
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const on = (el, evt, fn, opts) => el && el.addEventListener(evt, fn, opts);

// ============================================
// INITIALIZATION - ÚNICO DOMContentLoaded
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Initializing Luciano Portfolio...');
  
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
  initProjectGallery();
  initTimelineSpy();
  
  console.log('✅ All systems initialized');
});

// ============================================
// LOADING SCREEN
// ============================================

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

// ============================================
// NAVBAR & SCROLL
// ============================================

function initNavbarScroll() {
  const navbar = $('#navbar');
  const scrollTopBtn = $('#scrollTop');
  
  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    
    if (navbar) {
      navbar.classList.toggle('scrolled', y > 50);
    }
    
    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle('visible', y > 600);
    }
    
    updateTimelineSpy();
  };
  
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initScrollAnimations() {
  const opts = { 
    threshold: 0.12, 
    rootMargin: '0px 0px -60px 0px' 
  };
  
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, opts);
  
  $$('.animate-on-scroll').forEach((el) => io.observe(el));
}

// ============================================
// CUSTOM CURSOR
// ============================================

function initCursor() {
  if (!window.matchMedia || !window.matchMedia('(pointer:fine)').matches) return;
  
  const cursor = $('#cursor');
  const follower = $('#cursorFollower');
  
  if (!cursor || !follower) return;
  
  let mx = 0, my = 0;
  let cx = 0, cy = 0;
  let fx = 0, fy = 0;
  
  on(document, 'mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
  });
  
  function tick() {
    cx += (mx - cx) * 0.22;
    cy += (my - cy) * 0.22;
    cursor.style.left = cx + 'px';
    cursor.style.top = cy + 'px';
    
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top = fy + 'px';
    
    requestAnimationFrame(tick);
  }
  tick();
  
  const hoverables = ['a', 'button', '.stat-box', '.project-card', '.repo-item', '.contact-link', '.social-link', '.gallery-item', '.gallery-main'];
  
  $$(hoverables.join(',')).forEach((el) => {
    on(el, 'mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1.4)';
      follower.style.transform = 'translate(-50%,-50%) scale(1.35)';
      cursor.style.background = 'var(--gold)';
      cursor.style.borderColor = 'var(--gold)';
    });
    
    on(el, 'mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      follower.style.transform = 'translate(-50%,-50%) scale(1)';
      cursor.style.background = 'transparent';
      cursor.style.borderColor = 'var(--gold)';
    });
  });
}

// ============================================
// PARTICLES
// ============================================

function initParticles() {
  const container = $('#particles');
  if (!container) return;
  
  const count = 26;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.width = p.style.height = Math.max(3, Math.min(6, 3 + Math.random() * 4)) + 'px';
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

// ============================================
// SMOOTH ANCHORS
// ============================================

function initSmoothAnchors() {
  $$('a[href^="#"]').forEach((a) => {
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

// ============================================
// TOAST NOTIFICATIONS
// ============================================

function showToast(message = '') {
  const t = $('#toast');
  if (!t) return;
  
  t.textContent = message;
  t.classList.add('show');
  
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ============================================
// TIMELINE SPY (LOGO UPDATER) - CORRIGIDO
// ============================================

function initTimelineSpy() {
  // Initial call
  updateTimelineSpy();
}

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
    const rect = item.getBoundingClientRect();
    
    if (rect.top < midTop && rect.bottom > midBottom) {
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
        logoImg.onload = () => {
          logoImg.style.opacity = '1';
        };
      }, 160);
    }
  }
  
  indicators.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === activeIndex);
  });
}

// ============================================
// I18N SYSTEM - CORRIGIDO
// ============================================

const I18N = {
  en: {
    nav: { about: 'About', experience: 'Experience', projects: 'Projects', tradeshows: 'Trade Shows', certs: 'Certifications', contact: 'Contact' },
    hero: {
      title: 'Luciano Rodrigues de Souza',
      subtitle: 'AI-Driven Procurement & Operations Leader · Strategic Transformation',
      desc: 'I connect governance, technical rigor, and AI to deliver measurable outcomes: transparent tenders, reliable partners, and resilient operations across Europe, LATAM, and Asia.',
      badges: { top: 'Top Performer 2025', middle: 'AI Specialist', bottom: 'Trusted Leader' },
      stats: {
        savings: 'Cumulative Savings',
        savings_note: 'Across multi-category negotiations',
        rfps: 'RFP/RFQ Led',
        rfps_note: 'With technical annexes & weighted scoring',
        projects: 'Project Portfolio',
        projects_note: 'From concept to audited mass production',
        regions: 'Countries',
        regions_note: 'Europe · LATAM · Asia'
      }
    },
    cta: { connect: "Let's Connect", journey: 'View Journey' },
    about: {
      title: 'Leadership Philosophy',
      subtitle: 'From LATAM operations to global procurement strategy',
      heading: 'Transformation Through Collaboration',
      body: {
        1: 'I design procurement systems that scale: from RFI/RFP playbooks and BidMaps to governance, audits, and supplier development. The result is speed with control — faster decisions, lower risk, and clearer accountability.',
        2: 'My leadership style blends cross-functional facilitation (Engineering, ESG, Legal, Finance, Operations) with data and AI. I focus on three pillars: clarity of requirements, market transparency, and measurable outcomes.'
      },
      philosophy: '"I don\'t just optimize supply chains — I build cross-functional coalitions that transform how organizations think about procurement."',
      points: {
        1: 'Process Architecture: tender kits, weighted scoring, compliance-by-design',
        2: 'AI & Analytics: smart RFPs, proposal parsing, forecasting, inventory optimization',
        3: 'Supplier Strategy: audits, capability mapping, dual-sourcing & continuity',
        4: 'Stakeholder Trust: transparent dashboards, SLAs, and post-award governance'
      },
      lang: { pt: 'Portuguese (Native)', en: 'English (Native)', es: 'Spanish (Professional)', fr: 'French (Professional)' }
    },
    timeline: {
      title: 'Professional Journey',
      subtitle: '15+ years of progressive leadership',
      level: { senior: 'Senior Level', director: 'Director Level', manager: 'Manager Level', growth: 'Growth Phase' }
    },
    projects: {
      title: 'Featured Projects',
      subtitle: 'Product development excellence and AI innovation portfolio',
      view_gallery: 'View Gallery'
    },
    tradeshows: {
      title: 'Trade Shows & Global Exhibitions',
      subtitle: 'Exhibitor and strategic buyer across worldwide markets',
      strategy: {
        title: 'Trade Show Strategy & Execution',
        desc: 'Beyond the booth: I co-create with Marketing the end-to-end journey — stand design, narrative & assets; orchestrate meetings, capture qualified leads, and run the post-fair pipeline to real outcomes. In parallel, I negotiate with current and new partners, benchmark technologies, and audit factories for capability & compliance.',
        pillars: {
          1: 'Stand Design & Merchandising',
          2: 'Meetings Orchestration & Lead Capture',
          3: 'Negotiations & Partnering',
          4: 'Tech Discovery & Benchmark',
          5: 'Factory Audits & Capability Mapping',
          6: 'Post-Fair Pipeline, ROI & Governance'
        }
      }
    },
    certs: {
      title: 'Certifications & Education',
      subtitle: 'Continuous learning in AI, Data Science, and Strategic Procurement'
    },
    framework: {
      title: 'AI-Driven Strategic Procurement Framework',
      desc: 'One-page executive framework on how AI, data, and operational alignment elevate procurement performance.',
      badge: 'Proprietary Methodology'
    },
    ibm: {
      apply: { title: 'How I Apply This in Procurement:' },
      genai: {
        subtitle: 'Foundations in Generative AI',
        desc: 'LLM fundamentals, prompt engineering and ethical deployment; practical use in procurement workflows.',
        point1: 'Contract Parsing: clause extraction & risk flags',
        point2: 'Smart RFPs: auto-draft specs/SoW; save hours weekly',
        point3: 'Supplier Comms: consistent, data-aware templates',
        point4: 'Market Intel: proposal comparison & insights'
      },
      llms: {
        subtitle: 'Introduction to Large Language Models',
        desc: 'Transformer architecture, tokenization and prompting; patterns for data extraction and decision support.',
        point1: 'Doc Intelligence: quotes/specs parsing',
        point2: 'Forecasting Assist: LLM-augmented demand signals',
        point3: 'Compliance: policy checks vs. contracts',
        point4: 'Knowledge Ops: internal procurement assistant'
      }
    },
    umd: { subtitle: 'AI and Career Empowerment', desc: 'AI applications in business strategy and automation of procurement workflows.' },
    mit: { subtitle: 'Supply Chain Analytics', desc: 'Advanced analytics methodologies for supply chain optimization and forecasting.' },
    harvard: { subtitle: 'Decision-Making in Leadership', desc: 'Evidence-based decision frameworks and strategic thinking for leaders.' },
    esl: {
      school: 'Gadsden State Community College',
      subtitle: 'Diploma — ESL (English as a Second Language)',
      desc: 'Academic English program with communication, writing and presentation skills.'
    },
    vol: {
      title: 'Volunteering & Community Impact',
      subtitle: 'Giving back through education and mentorship',
      position: 'Mathematics & English Instructor',
      school: 'Gadsden State Community College',
      desc: 'Mathematics and English tutoring for students in need of academic support. Developed personalized learning plans, mentored diverse student populations, and contributed to community education initiatives. This experience strengthened my communication skills, patience, and ability to explain complex concepts — skills I now apply in procurement training and cross-functional team leadership.'
    },
    github: {
      title: 'GitHub & Data Science Projects',
      subtitle: 'Transforming procurement through code, algorithms, and data-driven insights',
      tagline: 'Python enthusiast leveraging data science to revolutionize procurement decision-making.',
      metrics: { accuracy: 'Prediction Accuracy', cost: 'Cost Reduction', stockout: 'Stockout Reduction' },
      cta: 'View All Repositories'
    },
    contact: {
      title: "Let's Connect",
      subtitle: 'Ready to transform your procurement strategy?',
      email: 'Email',
      location: 'Location'
    }
  },
  
  pt: {
    nav: { about: 'Sobre', experience: 'Experiência', projects: 'Projetos', tradeshows: 'Feiras', certs: 'Certificações', contact: 'Contato' },
    hero: {
      title: 'Luciano Rodrigues de Souza',
      subtitle: 'Procurement & Operações orientados por IA · Transformação Estratégica',
      desc: 'Conecto governança, rigor técnico e IA para gerar resultados mensuráveis: tenders transparentes, parceiros confiáveis e operações resilientes na Europa, LATAM e Ásia.',
      badges: { top: 'Top Performer 2025', middle: 'Especialista em IA', bottom: 'Líder de Confiança' },
      stats: {
        savings: 'Poupança Acumulada',
        savings_note: 'Em negociações multi-categoria',
        rfps: 'RFP/RFQ Conduzidos',
        rfps_note: 'Com anexos técnicos e scoring ponderado',
        projects: 'Portfólio de Projetos',
        projects_note: 'Do conceito à produção auditada',
        regions: 'Países',
        regions_note: 'Europa · LATAM · Ásia'
      }
    },
    cta: { connect: 'Vamos Conversar', journey: 'Ver Trajetória' },
    about: {
      title: 'Filosofia de Liderança',
      subtitle: 'Das operações na LATAM à estratégia global de procurement',
      heading: 'Transformação pela Colaboração',
      body: {
        1: 'Desenho sistemas de procurement escaláveis: playbooks de RFI/RFP e BidMaps até governança, auditorias e desenvolvimento de fornecedores. Resultado: velocidade com controle — decisões mais rápidas, menos risco e responsabilidades claras.',
        2: 'Liderança transversal (Engenharia, ESG, Jurídico, Finanças, Operações) aliada a dados e IA. Foco em: requisitos claros, transparência de mercado e resultados mensuráveis.'
      },
      philosophy: '"Não apenas otimizo cadeias de suprimento — construo coalizões multifuncionais que transformam a forma de pensar procurement."',
      points: {
        1: 'Arquitetura de Processos: tender kits, scoring ponderado, compliance-by-design',
        2: 'IA & Analytics: RFPs inteligentes, parsing de propostas, forecasting, inventário',
        3: 'Estratégia de Fornecedores: auditorias, mapeamento de capacidades, dual-sourcing',
        4: 'Confiança em Stakeholders: dashboards transparentes, SLAs e governança pós-contrato'
      },
      lang: { pt: 'Português (Nativo)', en: 'Inglês (Nativo)', es: 'Espanhol (Prof.)', fr: 'Francês (Prof.)' }
    },
    timeline: {
      title: 'Trajetória Profissional',
      subtitle: '15+ anos de liderança progressiva',
      level: { senior: 'Nível Sênior', director: 'Diretoria', manager: 'Gestão', growth: 'Expansão' }
    },
    projects: {
      title: 'Projetos em Destaque',
      subtitle: 'Excelência em desenvolvimento de produto e inovação com IA',
      view_gallery: 'Ver Galeria'
    },
    tradeshows: {
      title: 'Feiras & Expos Internacionais',
      subtitle: 'Expositor e comprador estratégico em mercados globais',
      strategy: {
        title: 'Estratégia & Execução de Feiras',
        desc: 'Além do stand: co-crio com Marketing a jornada ponta a ponta — design, narrativa e assets; orquestro reuniões, qualifico leads e conduzo o pipeline pós-feira. Em paralelo, negocio com parceiros, faço benchmark de tecnologias e audito fábricas.',
        pillars: {
          1: 'Design de Stand & Merchandising',
          2: 'Reuniões & Captação de Leads',
          3: 'Negociações & Parcerias',
          4: 'Descoberta Tecnológica',
          5: 'Auditorias de Fábrica',
          6: 'Pipeline, ROI & Governança'
        }
      }
    },
    certs: {
      title: 'Certificações & Educação',
      subtitle: 'Aprendizado contínuo em IA, Data Science e Procurement'
    },
    framework: {
      title: 'Framework Estratégico de Procurement orientado por IA',
      desc: 'Framework executivo one-page que mostra como IA, dados e alinhamento operacional elevam a performance de procurement.',
      badge: 'Metodologia Proprietária'
    },
    ibm: {
      apply: { title: 'Aplicações em Procurement:' },
      genai: {
        subtitle: 'Fundamentos em IA Generativa',
        desc: 'Fundamentos de LLMs, prompt engineering e ética; aplicação prática em fluxos de procurement.',
        point1: 'Leitura de Contratos: extração de cláusulas e riscos',
        point2: 'RFPs Inteligentes: specs/SoW automáticos, horas poupadas',
        point3: 'Comunicação com Fornecedores: templates consistentes',
        point4: 'Inteligência de Mercado: comparação de propostas'
      },
      llms: {
        subtitle: 'Introdução a LLMs',
        desc: 'Transformers, tokenização e prompting; padrões de extração e suporte à decisão.',
        point1: 'Inteligência de Documentos',
        point2: 'Forecasting assistido por LLM',
        point3: 'Compliance vs. políticas',
        point4: 'Assistente interno de procurement'
      }
    },
    umd: { subtitle: 'IA e Empoderamento de Carreira', desc: 'Aplicações de IA em estratégia de negócios e automação de fluxos de procurement.' },
    mit: { subtitle: 'Supply Chain Analytics', desc: 'Metodologias avançadas de analytics para otimização e forecasting da cadeia de suprimentos.' },
    harvard: { subtitle: 'Tomada de Decisão em Liderança', desc: 'Frameworks de decisão baseados em evidências e pensamento estratégico para líderes.' },
    esl: {
      school: 'Gadsden State Community College',
      subtitle: 'Diploma — ESL (Inglês como 2ª Língua)',
      desc: 'Inglês acadêmico: comunicação, escrita e apresentações.'
    },
    vol: {
      title: 'Voluntariado & Impacto Comunitário',
      subtitle: 'Retribuindo através da educação e mentoria',
      position: 'Instrutor de Matemática & Inglês',
      school: 'Gadsden State Community College',
      desc: 'Aulas de matemática e inglês para alunos com necessidade de apoio acadêmico. Desenvolvi planos de aprendizado personalizados, mentorei populações diversas de estudantes e contribuí para iniciativas de educação comunitária. Esta experiência fortaleceu minhas habilidades de comunicação, paciência e capacidade de explicar conceitos complexos — habilidades que aplico atualmente em treinamento de procurement e liderança de equipes multifuncionais.'
    },
    github: {
      title: 'Projetos de GitHub & Data Science',
      subtitle: 'Transformando procurement com código e insights',
      tagline: 'Entusiasta de Python usando data science para decisões em procurement.',
      metrics: { accuracy: 'Acurácia de Previsão', cost: 'Redução de Custo', stockout: 'Redução de Ruptura' },
      cta: 'Ver Todos os Repositórios'
    },
    contact: {
      title: 'Vamos Conversar',
      subtitle: 'Pronto para transformar sua estratégia de procurement?',
      email: 'Email',
      location: 'Localização'
    }
  },
  
  es: {
    nav: { about: 'Acerca', experience: 'Experiencia', projects: 'Proyectos', tradeshows: 'Ferias', certs: 'Certificaciones', contact: 'Contacto' },
    hero: {
      title: 'Luciano Rodrigues de Souza',
      subtitle: 'Líder en Procurement y Operaciones con IA · Transformación Estratégica',
      desc: 'Conecto gobernanza, rigor técnico e IA para generar resultados medibles: licitaciones transparentes, socios confiables y operaciones resilientes en Europa, LATAM y Asia.',
      badges: { top: 'Top Performer 2025', middle: 'Especialista en IA', bottom: 'Líder de Confianza' },
      stats: {
        savings: 'Ahorro Acumulado',
        savings_note: 'En negociaciones multi-categoría',
        rfps: 'RFP/RFQ Dirigidos',
        rfps_note: 'Con anexos técnicos y scoring ponderado',
        projects: 'Portafolio de Proyectos',
        projects_note: 'Del concepto a la producción auditada',
        regions: 'Países',
        regions_note: 'Europa · LATAM · Asia'
      }
    },
    cta: { connect: 'Conectemos', journey: 'Ver Trayectoria' },
    about: {
      title: 'Filosofía de Liderazgo',
      subtitle: 'De operaciones LATAM a estrategia global de procurement',
      heading: 'Transformación mediante la Colaboración',
      body: {
        1: 'Diseño sistemas de procurement escalables: playbooks de RFI/RFP y BidMaps hasta gobernanza, auditorías y desarrollo de proveedores. Resultado: velocidad con control — decisiones más rápidas, menos riesgo y responsabilidades claras.',
        2: 'Mi estilo de liderazgo combina facilitación multifuncional (Ingeniería, ESG, Legal, Finanzas, Operaciones) con datos e IA. Me enfoco en: requisitos claros, transparencia de mercado y resultados medibles.'
      },
      philosophy: '"No solo optimizo cadenas de suministro — construyo coaliciones multifuncionales que transforman cómo las organizaciones piensan sobre procurement."',
      points: {
        1: 'Arquitectura de Procesos: tender kits, scoring ponderado, compliance-by-design',
        2: 'IA & Analytics: RFPs inteligentes, parsing de propuestas, forecasting, inventario',
        3: 'Estrategia de Proveedores: auditorías, mapeo de capacidades, dual-sourcing',
        4: 'Confianza de Stakeholders: dashboards transparentes, SLAs y gobernanza post-contrato'
      },
      lang: { pt: 'Portugués (Nativo)', en: 'Inglés (Nativo)', es: 'Español (Prof.)', fr: 'Francés (Prof.)' }
    },
    timeline: {
      title: 'Trayectoria Profesional',
      subtitle: '15+ años de liderazgo progresivo',
      level: { senior: 'Nivel Senior', director: 'Dirección', manager: 'Gestión', growth: 'Expansión' }
    },
    projects: {
      title: 'Proyectos Destacados',
      subtitle: 'Excelencia en desarrollo de producto e innovación con IA',
      view_gallery: 'Ver Galería'
    },
    tradeshows: {
      title: 'Ferias y Exposiciones Globales',
      subtitle: 'Expositor y comprador estratégico en mercados mundiales',
      strategy: {
        title: 'Estrategia y Ejecución de Ferias',
        desc: 'Más allá del stand: co-creo con Marketing el journey de punta a punta — diseño, narrativa y assets; orquestro reuniones, califico leads y ejecuto el pipeline post-feria. En paralelo, negocio con socios actuales y nuevos, hago benchmark de tecnologías y audito fábricas.',
        pillars: {
          1: 'Diseño de Stand & Merchandising',
          2: 'Orquestación de Reuniones & Captación',
          3: 'Negociaciones y Alianzas',
          4: 'Descubrimiento Tecnológico',
          5: 'Auditorías y Mapeo de Capacidades',
          6: 'Pipeline Post-Feria, ROI y Gobernanza'
        }
      }
    },
    certs: {
      title: 'Certificaciones y Educación',
      subtitle: 'Aprendizaje continuo en IA, Data Science y Procurement'
    },
    contact: {
      title: 'Conectemos',
      subtitle: '¿Listo para transformar tu estrategia de compras?',
      email: 'Email',
      location: 'Ubicación'
    }
  },
  
  fr: {
    nav: { about: 'À propos', experience: 'Expérience', projects: 'Projets', tradeshows: 'Salons', certs: 'Certifications', contact: 'Contact' },
    hero: {
      title: 'Luciano Rodrigues de Souza',
      subtitle: 'Leader en Approvisionnement et Opérations IA · Transformation Stratégique',
      desc: 'Je connecte la gouvernance, la rigueur technique et l\'IA pour livrer des résultats mesurables: appels d\'offres transparents, partenaires fiables et opérations résilientes en Europe, LATAM et Asie.',
      badges: { top: 'Top Performer 2025', middle: 'Spécialiste IA', bottom: 'Leader de Confiance' },
      stats: {
        savings: 'Économies Cumulées',
        savings_note: 'Dans les négociations multi-catégories',
        rfps: 'RFP/RFQ Dirigés',
        rfps_note: 'Avec annexes techniques et scoring pondéré',
        projects: 'Portefeuille de Projets',
        projects_note: 'Du concept à la production auditée',
        regions: 'Pays',
        regions_note: 'Europe · LATAM · Asie'
      }
    },
    cta: { connect: 'Entrons en contact', journey: 'Voir le parcours' },
    about: {
      title: 'Philosophie de Leadership',
      subtitle: 'Des opérations LATAM à la stratégie d\'approvisionnement globale',
      heading: 'Transformation par la Collaboration',
      body: {
        1: 'Je conçois des systèmes d\'approvisionnement évolutifs: playbooks RFI/RFP et BidMaps jusqu\'à la gouvernance, audits et développement fournisseurs. Résultat: vitesse avec contrôle — décisions plus rapides, moins de risque et responsabilités claires.',
        2: 'Mon style de leadership combine facilitation interfonctionnelle (Ingénierie, ESG, Juridique, Finance, Opérations) avec données et IA. Focus sur: exigences claires, transparence du marché et résultats mesurables.'
      },
      philosophy: '"Je n\'optimise pas seulement les chaînes d\'approvisionnement — je construis des coalitions interfonctionnelles qui transforment la façon dont les organisations pensent l\'approvisionnement."',
      points: {
        1: 'Architecture de Processus: kits d\'appel d\'offres, scoring pondéré, compliance-by-design',
        2: 'IA & Analytics: RFPs intelligents, parsing de propositions, forecasting, optimisation stocks',
        3: 'Stratégie Fournisseurs: audits, cartographie des capacités, double sourcing',
        4: 'Confiance Stakeholders: dashboards transparents, SLAs et gouvernance post-contrat'
      },
      lang: { pt: 'Portugais (Natif)', en: 'Anglais (Natif)', es: 'Espagnol (Prof.)', fr: 'Français (Prof.)' }
    },
    timeline: {
      title: 'Parcours Professionnel',
      subtitle: '15+ ans de leadership progressif',
      level: { senior: 'Niveau Senior', director: 'Direction', manager: 'Management', growth: 'Expansion' }
    },
    projects: {
      title: 'Projets Phares',
      subtitle: 'Excellence en développement produit et innovation IA',
      view_gallery: 'Voir la Galerie'
    },
    tradeshows: {
      title: 'Salons et Expositions Mondiales',
      subtitle: 'Exposant et acheteur stratégique sur les marchés mondiaux',
      strategy: {
        title: 'Stratégie et Exécution de Salons',
        desc: 'Au-delà du stand: je co-crée avec le Marketing le parcours de bout en bout — design, narration et assets; j\'orquestre les réunions, qualifie les leads et gère le pipeline post-salon. En parallèle, je négocie avec partenaires actuels et nouveaux, benchmark les technologies et audite les usines.',
        pillars: {
          1: 'Design de Stand & Merchandising',
          2: 'Orquestration de Réunions & Capture',
          3: 'Négociations et Partenariats',
          4: 'Veille Technologique & Benchmark',
          5: 'Audits et Cartographie des Capacités',
          6: 'Pipeline Post-Salon, ROI et Gouvernance'
        }
      }
    },
    certs: {
      title: 'Certifications et Formation',
      subtitle: 'Apprentissage continu en IA, Data Science et Approvisionnement'
    },
    contact: {
      title: 'Entrons en contact',
      subtitle: 'Prêt à transformer votre stratégie achats?',
      email: 'Email',
      location: 'Localisation'
    }
  }
};

function initI18N() {
  const stored = localStorage.getItem('lang');
  const browser = (navigator.language || 'en').slice(0, 2).toLowerCase();
  const initial = stored || (['en', 'pt', 'es', 'fr'].includes(browser) ? browser : 'en');
  
  translateAll(initial);
  markActiveLang(initial);
}

function initLangSwitcher() {
  const switcher = $('#langSwitcher');
  if (!switcher) return;
  
  switcher.addEventListener('click', (e) => {
    const btn = e.target.closest('.lang-btn');
    if (!btn) return;
    
    const lang = btn.dataset.lang;
    if (!lang) return;
    
    translateAll(lang);
    markActiveLang(lang);
    localStorage.setItem('lang', lang);
    
    showToast(`Translated to ${lang.toUpperCase()}`);
  });
}

function translateAll(lang) {
  PG_state.currentLang = lang;
  document.documentElement.lang = lang;
  
  const dict = I18N[lang] || I18N['en'];
  
  // Translate all elements with data-i18n
  $$('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const value = getNestedValue(dict, key);
    if (value !== undefined) {
      el.textContent = value;
    }
  });
  
  // Update timeline spy after translation (height may change)
  setTimeout(updateTimelineSpy, 100);
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, key) => {
    return acc && acc[key] !== undefined ? acc[key] : undefined;
  }, obj);
}

function markActiveLang(lang) {
  $$('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

// ============================================
// TRADE SHOWS TABS - CORRIGIDO
// ============================================

function initTradeTabs() {
  const tabs = $$('.gallery-tab');
  if (!tabs.length) return;
  
  tabs.forEach((btn) => {
    on(btn, 'click', () => {
      // Remove active from all tabs
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      
      // Add active to clicked tab
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      
      // Hide all panels
      $$('.gallery-content').forEach(gc => gc.classList.remove('active'));
      
      // Show target panel
      const targetId = btn.dataset.target;
      const panel = $('#' + targetId);
      if (panel) panel.classList.add('active');
    });
  });
}

// ============================================
// LIGHTBOX
// ============================================

function initLightbox() {
  const lb = $('#lightbox');
  const lbImg = $('#lightbox-img');
  
  if (!lb || !lbImg) return;
  
  // Close on click outside
  on(lb, 'click', (e) => {
    if (e.target === lb) closeLightbox();
  });
  
  // Close on ESC
  on(document, 'keydown', (e) => {
    if (lb.classList.contains('active') && e.key === 'Escape') {
      closeLightbox();
    }
  });
}

function openLightbox(el) {
  const lb = $('#lightbox');
  const lbImg = $('#lightbox-img');
  
  if (!lb || !lbImg) return;
  
  let src = '';
  
  // If element has img
  if (el && el.querySelector) {
    const img = el.querySelector('img');
    if (img) src = img.src;
  }
  
  if (!src) return;
  
  lbImg.src = src;
  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = $('#lightbox');
  if (!lb) return;
  
  lb.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// ============================================
// PROJECT GALLERY MODAL - CORRIGIDO
// ============================================

function initProjectGallery() {
  // Setup project cards
  $$('.project-card').forEach(setupCardAutoSlide);
  
  // Setup gallery controls
  const prev = $('#galleryPrev');
  const next = $('#galleryNext');
  const closeBtn = $('#galleryClose');
  const modal = $('#projectGalleryModal');
  
  if (prev) on(prev, 'click', () => changeProjectSlide(-1));
  if (next) on(next, 'click', () => changeProjectSlide(1));
  if (closeBtn) on(closeBtn, 'click', closeProjectGallery);
  
  if (modal) {
    on(modal, 'click', (e) => {
      if (e.target === modal) closeProjectGallery();
    });
  }
  
  on(document, 'keydown', (e) => {
    if (!modal || !modal.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') changeProjectSlide(-1);
    if (e.key === 'ArrowRight') changeProjectSlide(1);
    if (e.key === 'Escape') closeProjectGallery();
  });
}

function setupCardAutoSlide(card) {
  const container = card.querySelector('.gallery-main');
  if (!container) return;
  
  // Get images from data attribute
  let images = [];
  const csv = card.getAttribute('data-images') || '';
  
  if (csv.trim().length) {
    images = csv.split(',').map(s => s.trim()).filter(Boolean);
  } else {
    const mainImg = container.querySelector('img');
    if (mainImg && mainImg.src) images = [mainImg.src];
  }
  
  if (!images.length) return;
  
  const imgEl = container.querySelector('img');
  if (!imgEl) return;
  
  const auto = card.getAttribute('data-autoslide') === 'true';
  const interval = Math.max(1200, parseInt(card.getAttribute('data-interval'), 10) || 2500);
  
  const state = {
    images,
    idx: 0,
    timer: null,
    interval,
    imgEl,
    paused: false
  };
  
  CardSlides.set(card, state);
  
  function tick() {
    if (state.paused || !auto || state.images.length <= 1) return;
    
    state.idx = (state.idx + 1) % state.images.length;
    imgEl.style.opacity = '0';
    
    setTimeout(() => {
      imgEl.src = state.images[state.idx];
      imgEl.onload = () => {
        imgEl.style.opacity = '1';
      };
    }, 160);
  }
  
  function start() {
    stop();
    if (auto && state.images.length > 1) {
      state.timer = setInterval(tick, state.interval);
    }
  }
  
  function stop() {
    if (state.timer) {
      clearInterval(state.timer);
      state.timer = null;
    }
  }
  
  // Pause on hover
  on(card, 'mouseenter', () => { state.paused = true; });
  on(card, 'mouseleave', () => { state.paused = false; });
  
  // Click to open modal
  const overlay = card.querySelector('.gallery-overlay');
  const clickable = overlay || container;
  
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
  
  if (csv.trim().length) {
    images = csv.split(',').map(s => s.trim()).filter(Boolean);
  } else {
    const mainImg = card.querySelector('.gallery-main img');
    if (mainImg && mainImg.src) images = [mainImg.src];
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

// Expose functions globally for inline onclick handlers
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.changeProjectSlide = changeProjectSlide;
window.goToProjectSlide = goToProjectSlide;
window.closeProjectGallery = closeProjectGallery;
window.scrollToTop = scrollToTop;
