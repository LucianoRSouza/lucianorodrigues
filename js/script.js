// ============================================
// LOADING SCREEN
// ============================================
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
    }, 1500);
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const scrollTop = document.getElementById('scrollTop');
    
    // Navbar effect
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Scroll to top button
    if (window.scrollY > 500) {
        scrollTop.classList.add('visible');
    } else {
        scrollTop.classList.remove('visible');
    }
    
    // Timeline logo spy
    updateTimelineLogo();
});

// ============================================
// SCROLL ANIMATIONS (Intersection Observer)
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// ============================================
// TIMELINE LOGO SCROLL SPY (ÚNICO LOGO QUE MUDA)
// ============================================
function updateTimelineLogo() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const logoImg = document.getElementById('logo-img');
    const indicators = document.querySelectorAll('.indicator-dot');
    
    let activeIndex = 0;
    
    timelineItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Item está no centro da viewport
        if (rect.top < windowHeight * 0.6 && rect.bottom > windowHeight * 0.4) {
            activeIndex = index;
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Atualiza o logo com base no item ativo
    const activeItem = timelineItems[activeIndex];
    if (activeItem && logoImg) {
        const newLogo = activeItem.getAttribute('data-logo');
        const currentSrc = logoImg.getAttribute('src');
        
        // Só atualiza se for diferente (evita flicker)
        if (newLogo && newLogo !== currentSrc) {
            // Animação de fade out/in
            logoImg.style.opacity = '0';
            setTimeout(() => {
                logoImg.src = newLogo;
                logoImg.style.opacity = '1';
            }, 200);
        }
    }
    
    // Atualiza indicadores
    indicators.forEach((dot, index) => {
        if (index === activeIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Inicializa o logo spy
updateTimelineLogo();

// ============================================
// PARTICLES ANIMATION
// ============================================
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 25;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        container.appendChild(particle);
    }
}

createParticles();

// ============================================
// TOAST NOTIFICATION
// ============================================
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ============================================
// STAT DETAIL CLICK
// ============================================
function showDetail(stat) {
    const messages = {
        savings: '€1M+ em economias através de estratégias de procurement com IA',
        experience: '15+ anos liderando transformações em 4 continentes',
        ai: 'Especialista em ML, Python e automação inteligente de processos'
    };
    
    showToast(messages[stat] || 'Detalhes em breve');
}

// ============================================
// LANGUAGE SWITCHER
// ============================================
function changeLang(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    event.target.classList.add('active');
    
    if (lang === 'pt') {
        showToast('Português já está ativo');
    } else {
        showToast(`Clique com botão direito e selecione "Traduzir para ${lang.toUpperCase()}"`);
    }
}

// ============================================
// SCROLL TO TOP
// ============================================
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// LAZY LOAD IMAGES
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// PERFORMANCE: DEBOUNCE SCROLL EVENTS
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplica debounce no scroll para melhor performance
window.addEventListener('scroll', debounce(() => {
    // Ações de scroll otimizadas aqui se necessário
}, 10));

console.log('🚀 Site de Luciano Rodrigues carregado com sucesso!');
