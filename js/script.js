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
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    if (window.scrollY > 500) {
        scrollTop.classList.add('visible');
    } else {
        scrollTop.classList.remove('visible');
    }
    
    updateTimelineLogo();
});

// ============================================
// SCROLL ANIMATIONS
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
// TIMELINE LOGO SCROLL SPY
// ============================================
function updateTimelineLogo() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const logoImg = document.getElementById('logo-img');
    const indicators = document.querySelectorAll('.indicator-dot');
    
    let activeIndex = 0;
    
    timelineItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight * 0.6 && rect.bottom > windowHeight * 0.4) {
            activeIndex = index;
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    const activeItem = timelineItems[activeIndex];
    if (activeItem && logoImg) {
        const newLogo = activeItem.getAttribute('data-logo');
        const currentSrc = logoImg.getAttribute('src');
        
        if (newLogo && newLogo !== currentSrc) {
            logoImg.style.opacity = '0';
            setTimeout(() => {
                logoImg.src = newLogo;
                logoImg.style.opacity = '1';
            }, 200);
        }
    }
    
    indicators.forEach((dot, index) => {
        if (index === activeIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

updateTimelineLogo();

// ============================================
// PARTICLES
// ============================================
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    for (let i = 0; i < 25; i++) {
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
// CUSTOM CURSOR ORIGINAL (CORRIGIDO)
// ============================================
if (window.matchMedia('(pointer: fine)').matches) {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        // Cursor segue imediatamente
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        // Follower segue com delay (efeito suave)
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Efeito hover em elementos interativos
    document.querySelectorAll('a, button, .stat-box, .project-card, .repo-item, .contact-link, .social-link, .gallery-item, .gallery-main').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.background = 'var(--gold)';
            cursor.style.borderColor = 'var(--gold)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.background = 'transparent';
            cursor.style.borderColor = 'var(--gold)';
        });
    });
} else {
    // Esconde cursor em dispositivos touch
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    if (cursor) cursor.style.display = 'none';
    if (follower) follower.style.display = 'none';
}

// ============================================
// PROJECT GALLERIES
// ============================================
const projectGalleries = {
    'blaupunkt-tools': ['./Blaupunkt_Tools.png'],
    'blaupunkt-power': ['./Blaupunkt_Power_Tools.png'],
    'blaupunkt-garden': ['./Blaupunkt_Garden_Tools.png'],
    'spear-jackson': [
        './S&J_Cast_Irons_2.jpg',
        './S&J_Cast_Irons_3.jpg',
        './S&J_Cast_Irons_4.jpg',
        './S&J_Cast_Irons_5.jpg',
        './S&J_Cast_Irons_6.jpg',
        './S&J_Cast_Irons_7.jpg'
    ],
    'pininfarina': ['./Pininfarina_BBQ.jpg', './Pininfarina_BBQ_1.jpg'],
    'nks-estrelas': [
        './NKS_Estrelas.png',
        './NKS_Estrelas_1.png',
        './NKS_Estrelas_2.png',
        './NKS_Estrelas_3.png',
        './NKS_Estrelas_4.png',
        './NKS_Estrelas_5.png'
    ],
    'nks-audio': [
        './NKS_Audio.png',
        './NKS_Audio_1.png',
        './NKS_Audio_2.png',
        './NKS_Audio_3.png',
        './NKS_Audio_4.png',
        './NKS_Audio_5.png',
        './NKS_Audio_6.png',
        './NKS_Audio_7.png'
    ],
    'nks-maisvc': [
        './NKS_Mais_Vc.png',
        './NKS_Mais_Vc_1.png',
        './NKS_Mais_Vc_2.png',
        './NKS_Mais_Vc_3.png',
        './NKS_Mais_Vc_4.png'
    ]
};

let currentGallery = [];
let currentSlide = 0;

function openProjectGallery(galleryName) {
    const modal = document.getElementById('projectGalleryModal');
    const slider = document.getElementById('gallerySlider');
    const dotsContainer = document.getElementById('galleryDots');
    
    currentGallery = projectGalleries[galleryName] || [];
    currentSlide = 0;
    
    // Limpa e cria slides
    slider.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    currentGallery.forEach((img, index) => {
        // Cria slide
        const slide = document.createElement('div');
        slide.className = 'gallery-slide' + (index === 0 ? ' active' : '');
        slide.innerHTML = `<img src="${img}" alt="Gallery image ${index + 1}" onerror="this.src='${img.replace('.png', '.jpg').replace('.jpg', '.png')}'">`;
        slider.appendChild(slide);
        
        // Cria dot
        const dot = document.createElement('div');
        dot.className = 'gallery-dot' + (index === 0 ? ' active' : '');
        dot.onclick = () => goToSlide(index);
        dotsContainer.appendChild(dot);
    });
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectGallery() {
    const modal = document.getElementById('projectGalleryModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.gallery-slide');
    const dots = document.querySelectorAll('.gallery-dot');
    
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = (currentSlide + direction + currentGallery.length) % currentGallery.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.gallery-slide');
    const dots = document.querySelectorAll('.gallery-dot');
    
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = index;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Navegação por teclado na galeria
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('projectGalleryModal');
    if (modal.classList.contains('active')) {
        if (e.key === 'ArrowLeft') changeSlide(-1);
        if (e.key === 'ArrowRight') changeSlide(1);
        if (e.key === 'Escape') closeProjectGallery();
    }
});

// ============================================
// TRADE SHOWS TABS
// ============================================
function switchGallery(gallery) {
    document.querySelectorAll('.gallery-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    document.querySelectorAll('.gallery-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById('gallery-' + gallery).classList.add('active');
}

// ============================================
// LIGHTBOX
// ============================================
function openLightbox(element) {
    const img = element.querySelector('img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    if (img && lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

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
function showStatDetail(stat) {
    const messages = {
        savings: '€1M+ in cost savings achieved through AI-powered procurement strategies',
        experience: '15+ years leading procurement transformations across 4 continents',
        projects: '$10M+ in project value managed from concept to delivery',
        countries: '20+ countries served across Europe, LATAM, and Asia'
    };
    
    showToast(messages[stat] || 'Details coming soon');
}

// ============================================
// LANGUAGE SWITCHER
// ============================================
function changeLang(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    event.target.classList.add('active');
    
    if (lang === 'en') {
        showToast('English is already active');
    } else {
        showToast('Right-click and select "Translate to ' + lang.toUpperCase() + '" for automatic translation');
    }
}

// ============================================
// SCROLL TO TOP
// ============================================
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// SMOOTH SCROLL
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

console.log('🚀 Site de Luciano Rodrigues carregado com sucesso!');
