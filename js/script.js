/* Build v5.fix patches (non-destructive) */
(function () {
  // =========================
  // 1) I18N dos STAT MODALS
  // =========================
  const STAT_I18N = {
    en: {
      savings: {
        title: 'Cumulative Savings Delivered',
        details: [
          'Multi-category strategic sourcing initiatives across direct and indirect spend',
          'Negotiated favorable payment terms (60-90 days) improving cash flow',
          'Implemented should-cost modeling identifying 15-25% cost reduction opportunities',
          'Consolidated supplier base from 200+ to 80 key partners',
          'Zero-based budgeting approach for CAPEX projects saving 20% on average',
        ],
      },
      rfps: {
        title: 'Strategic Tenders Led',
        details: [
          'End-to-end RFI/RFP/RFQ process design with technical annexes (A1/A2)',
          'Weighted scoring matrices balancing technical, commercial, and ESG criteria',
          'E-procurement platform integration with full audit trails',
          'Cross-functional evaluation committees (Engineering, Finance, Legal, Operations)',
          'Cycle time reduction while improving compliance',
        ],
      },
      projects: {
        title: 'Project Portfolio Value',
        details: [
          'New product development from concept to mass production',
          'Licensed portfolio launches (Blaupunkt, Spear & Jackson, Pininfarina)',
          'Factory audits and supplier capability assessments across Asia',
          'Quality system implementations and compliance frameworks',
          'Cross-border logistics optimization and customs compliance',
        ],
      },
      regions: {
        title: 'Global Operations Coverage',
        details: [
          'Europe: Portugal, Spain, Germany, UK, Netherlands, Italy, France',
          'LATAM: Brazil, Argentina, Chile, Colombia, Mexico, Peru, Uruguay',
          'Asia: China, Hong Kong, Taiwan, Vietnam, India, South Korea',
          'Multi-cultural negotiation experience and local market knowledge',
          'Time zone coordination for 24/7 project execution',
        ],
      },
    },
    pt: {
      savings: {
        title: 'Poupança Acumulada',
        details: [
          'Sourcing estratégico multi‑categoria em compras diretas e indiretas',
          'Negociação de prazos de pagamento (60–90 dias) melhorando o cash‑flow',
          'Modelagem de “should‑cost” identificando 15–25% de redução',
          'Consolidação da base de fornecedores de 200+ para ~80 parceiros‑chave',
          'Orçamento base zero para CAPEX com ~20% de economia',
        ],
      },
      rfps: {
        title: 'RFP/RFQ Conduzidos',
        details: [
          'Desenho fim‑a‑fim de RFI/RFP/RFQ com anexos técnicos (A1/A2)',
          'Matrizes de “weighted scoring” equilibrando técnico, comercial e ESG',
          'Integração com e‑procurement e trilhas de auditoria',
          'Comitês de avaliação multifuncionais',
          'Redução de lead‑time com melhoria de compliance',
        ],
      },
      projects: {
        title: 'Valor do Portfólio de Projetos',
        details: [
          'Desenvolvimento de produto do conceito à produção em massa',
          'Lançamentos licenciados (Blaupunkt, Spear & Jackson, Pininfarina)',
          'Auditorias fabris e mapeamento de capacidades na Ásia',
          'Implementação de sistemas de qualidade e compliance',
          'Otimização logística e compliance aduaneiro',
        ],
      },
      regions: {
        title: 'Cobertura Operacional Global',
        details: [
          'Europa: Portugal, Espanha, Alemanha, Reino Unido, Holanda, Itália, França',
          'LATAM: Brasil, Argentina, Chile, Colômbia, México, Peru, Uruguai',
          'Ásia: China, Hong Kong, Taiwan, Vietname, Índia, Coreia do Sul',
          'Negociação multicultural e conhecimento de mercados locais',
          'Coordenação de fusos para execução 24/7',
        ],
      },
    },
    es: {
      savings: {
        title: 'Ahorro Acumulado',
        details: [
          'Sourcing estratégico multi‑categoría en gasto directo e indirecto',
          'Negociación de plazos de pago (60–90 días) mejorando el cash‑flow',
          'Modelado “should‑cost” identificando 15–25% de reducción',
          'Consolidación de la base de proveedores de 200+ a ~80 socios clave',
          'Presupuesto base cero en CAPEX con ~20% de ahorro',
        ],
      },
      rfps: {
        title: 'Licitaciones Dirigidas',
        details: [
          'Diseño integral de RFI/RFP/RFQ con anexos técnicos (A1/A2)',
          'Matrices de puntuación ponderada equilibrando técnico, comercial y ESG',
          'Integración con e‑procurement y trazabilidad de auditoría',
          'Comités de evaluación multifuncionales',
          'Reducción de tiempos con mayor compliance',
        ],
      },
      projects: {
        title: 'Valor del Portafolio de Proyectos',
        details: [
          'Desarrollo de producto del concepto a la producción masiva',
          'Lanzamientos licenciados (Blaupunkt, Spear & Jackson, Pininfarina)',
          'Auditorías de fábricas y evaluación de capacidades en Asia',
          'Implementación de sistemas de calidad y compliance',
          'Optimización logística y cumplimiento aduanero',
        ],
      },
      regions: {
        title: 'Cobertura Operativa Global',
        details: [
          'Europa: Portugal, España, Alemania, Reino Unido, Países Bajos, Italia, Francia',
          'LATAM: Brasil, Argentina, Chile, Colombia, México, Perú, Uruguay',
          'Asia: China, Hong Kong, Taiwán, Vietnam, India, Corea del Sur',
          'Experiencia multicultural y conocimiento local',
          'Coordinación de zonas horarias para ejecución 24/7',
        ],
      },
    },
    fr: {
      savings: {
        title: 'Économies Cumulées',
        details: [
          'Sourcing stratégique multi‑catégorie (direct/indirect)',
          'Négociation de délais de paiement (60–90 jours) améliorant la trésorerie',
          'Modèle “should‑cost” identifiant 15–25% de réduction',
          'Consolidation des fournisseurs de 200+ à ~80 partenaires clés',
          'Budget base zéro en CAPEX avec ~20% d’économie',
        ],
      },
      rfps: {
        title: 'Appels d’offres dirigés',
        details: [
          'Processus RFI/RFP/RFQ de bout en bout avec annexes techniques (A1/A2)',
          'Matrice de scoring pondéré (technique, commercial, ESG)',
          'Intégration e‑procurement et traçabilité',
          'Comités d’évaluation interfonctionnels',
          'Réduction des délais avec meilleur compliance',
        ],
      },
      projects: {
        title: 'Valeur du Portefeuille de Projets',
        details: [
          'Développement produit du concept à la production de masse',
          'Lancements sous licence (Blaupunkt, Spear & Jackson, Pininfarina)',
          'Audits d’usines et cartographie des capacités en Asie',
          'Systèmes qualité et cadres de conformité',
          'Optimisation logistique transfrontalière et douanes',
        ],
      },
      regions: {
        title: 'Couverture Opérationnelle Globale',
        details: [
          'Europe : Portugal, Espagne, Allemagne, Royaume‑Uni, Pays‑Bas, Italie, France',
          'LATAM : Brésil, Argentine, Chili, Colombie, Mexique, Pérou, Uruguay',
          'Asie : Chine, Hong Kong, Taïwan, Vietnam, Inde, Corée du Sud',
          'Négociations multiculturelles et connaissance locale',
          'Coordination des fuseaux pour exécution 24/7',
        ],
      },
    },
  };

  // Wrapper: após abrir o modal (função original), aplica a tradução
  const _openStatOrig =
    window.openStatModal || (typeof openStatModal === 'function' ? openStatModal : null);

  window.openStatModal = function (key) {
    if (_openStatOrig) _openStatOrig(key);
    try {
      const lang = (window.PG_state && window.PG_state.currentLang) || 'en';
      const tr = (STAT_I18N[lang] && STAT_I18N[lang][key]) || null;
      if (tr) {
        const titleEl = document.getElementById('statModalTitle');
        const listEl = document.getElementById('statModalDetails');
        if (titleEl) titleEl.textContent = tr.title;
        if (listEl) listEl.innerHTML = tr.details.map((d) => `<li>${d}</li>`).join('');
      }
    } catch (e) {
      console.warn('stat i18n patch failed', e);
    }
  };

  // =================================
  // 2) Galeria: clique delegado robusto
  // =================================
  document.addEventListener(
    'click',
    function (ev) {
      const card = ev.target.closest('.project-card');
      if (!card) return;
      if (
        ev.target.closest('.gallery-main') ||
        ev.target.closest('.gallery-overlay') ||
        ev.target.closest('.project-image')
      ) {
        if (typeof window.openProjectGalleryFromCard === 'function') {
          ev.preventDefault();
          window.openProjectGalleryFromCard(card);
        }
      }
    },
    true
  );

  // =================================
  // 3) Blaupunkt: mapeamento estrito
  // =================================
  function fixBlaupunktGalleriesStrict() {
    const tools = [
      './Blaupunkt_Tools.png',
      './Blaupunkt_Power_Tools.png',
      './Blaupunkt_Garden_Tools.png',
    ];
    const power = ['./Blaupunkt_Power_Tools.png'];
    const garden = ['./Blaupunkt_Garden_Tools.png'];

    const set = (key, arr) => {
      const el = document.querySelector(`.project-card[data-gallery="${key}"]`);
      if (el) el.setAttribute('data-images', arr.join(','));
    };

    set('blaupunkt-tools', tools);
    set('blaupunkt-power', power);
    set('blaupunkt-garden', garden);
  }

  // =================================
  // 4) Voluntariado: bolinha com o “G”
  // =================================
  function swapVolunteerIconToG() {
    const icon = document.querySelector('.volunteer-icon');
    if (!icon) return;
    icon.innerHTML = '';
    const img = document.createElement('img');
    img.src = './gadsdenstatecommunitycollege_logo.jpg';
    img.alt = 'Gadsden logo';
    img.className = 'g-badge';
    icon.appendChild(img);
  }

  document.addEventListener('DOMContentLoaded', () => {
    try { fixBlaupunktGalleriesStrict(); } catch (_) {}
    try { swapVolunteerIconToG(); } catch (_) {}
  });
})();
