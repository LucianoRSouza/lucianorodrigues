// Dados das galerias de projetos
const projectGalleries = {
    'blaupunkt-tools': ['./Blaupunkt_Tools.png'],
    'blaupunkt-power': ['./Blaupunkt_Power_Tools.png'],
    'blaupunkt-garden': ['./Blaupunkt_Garden_Tools.png'],
    'spear-jackson': ['./S&J_Cast_Irons_2.jpg','./S&J_Cast_Irons_3.jpg','./S&J_Cast_Irons_4.jpg','./S&J_Cast_Irons_5.jpg','./S&J_Cast_Irons_6.jpg','./S&J_Cast_Irons_7.jpg'],
    'pininfarina': ['./Pininfarina_BBQ.jpg','./Pininfarina_BBQ_1.jpg'],
    'nks-estrelas': ['./NKS_Estrelas.png','./NKS_Estrelas_1.png','./NKS_Estrelas_2.png','./NKS_Estrelas_3.png','./NKS_Estrelas_4.png','./NKS_Estrelas_5.png'],
    'nks-audio': ['./NKS_Audio.png','./NKS_Audio_1.png','./NKS_Audio_2.png','./NKS_Audio_3.png','./NKS_Audio_4.png','./NKS_Audio_5.png','./NKS_Audio_6.png','./NKS_Audio_7.png'],
    'nks-maisvc': ['./NKS_Mais_Vc.png','./NKS_Mais_Vc_1.png','./NKS_Mais_Vc_2.png','./NKS_Mais_Vc_3.png','./NKS_Mais_Vc_4.png']
};

let currentGallery = [], currentSlide = 0;

// Inicialização
window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('loading').classList.add('hidden'), 1500);
    createParticles();
    updateTimelineLogo();
});

// Scroll effects
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const scrollTop = document.getElementById('scrollTop');
    
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    scrollTop.classList.toggle('visible', window.scrollY > 500);
    updateTimelineLogo();
});

// Intersection Observer para animações
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible'));
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// Timeline Logo Scroll Spy
function updateTimelineLogo() {
    const items = document.querySelectorAll('.timeline-item');
    const logoImg = document.getElementById('logo-img');
    const dots = document.querySelectorAll('.indicator-dot');
    let activeIndex = 0;
    
    items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const isActive = rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4;
        item.classList.toggle('active', isActive);
        if (isActive) activeIndex = index;
    });
    
    const activeItem = items[activeIndex];
    if (activeItem && logoImg) {
        const newLogo = activeItem.dataset.logo;
        if (newLogo && newLogo !== logoImg.src) {
            logoImg.style.opacity = '0';
            setTimeout(() => { logoImg.src = newLogo; logoImg.style.opacity = '1'; }, 200);
        }
    }
    
    dots.forEach((dot, index) => dot.classList.toggle('active', index === activeIndex));
}

// Partículas
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < 20; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.animationDelay = Math.random() * 6 + 's';
        p.style.animationDuration = (Math.random() * 4 + 4) + 's';
        container.appendChild(p);
    }
}

// Galeria de Projetos
function openProjectGallery(name) {
    const modal = document.getElementById('projectGalleryModal');
    const slider = document.getElementById('gallerySlider');
    const dotsContainer = document.getElementById('galleryDots');
    
    currentGallery = projectGalleries[name] || [];
    currentSlide = 0;
    
    slider.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    currentGallery.forEach((img, index) => {
        const slide = document.createElement('div');
        slide.className = 'gallery-slide' + (index === 0 ? ' active' : '');
        slide.innerHTML = `<img src="${img}" alt="Image ${index + 1}" onerror="this.src='${img.replace('.png','.jpg').replace('.jpg','.png')}'">`;
        slider.appendChild(slide);
        
        const dot = document.createElement('div');
        dot.className = 'gallery-dot' + (index === 0 ? ' active' : '');
        dot.onclick = () => goToSlide(index);
        dotsContainer.appendChild(dot);
    });
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectGallery() {
    document.getElementById('projectGalleryModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function changeSlide(dir) {
    goToSlide((currentSlide + dir + currentGallery.length) % currentGallery.length);
}

function goToSlide(index) {
    document.querySelectorAll('.gallery-slide')[currentSlide]?.classList.remove('active');
    document.querySelectorAll('.gallery-dot')[currentSlide]?.classList.remove('active');
    currentSlide = index;
    document.querySelectorAll('.gallery-slide')[currentSlide]?.classList.add('active');
    document.querySelectorAll('.gallery-dot')[currentSlide]?.classList.add('active');
}

// Trade Show Tabs
function switchGallery(gal) {
    document.querySelectorAll('.gallery-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    document.querySelectorAll('.gallery-content').forEach(c => c.classList.remove('active'));
    document.getElementById('gallery-' + gal).classList.add('active');
}

// Lightbox
function openLightbox(el) {
    const img = el.querySelector('img');
    const lightbox = document.getElementById('lightbox');
    document.getElementById('lightbox-img').src = img.src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Toast
function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

function showStatDetail(stat) {
    const msgs = {
        savings: '€1M+ in cost savings achieved through AI-powered procurement strategies',
        experience: '15+ years leading procurement transformations across 4 continents',
        projects: '$10M+ in project value managed from concept to delivery',
        countries: '20+ countries served across Europe, LATAM, and Asia'
    };
    showToast(msgs[stat] || 'Details coming soon');
}

function changeLang(lang) {
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    showToast(lang === 'en' ? 'English is already active' : `Right-click and select "Translate to ${lang.toUpperCase()}" for automatic translation`);
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (document.getElementById('projectGalleryModal').classList.contains('active')) {
        if (e.key === 'ArrowLeft') changeSlide(-1);
        if (e.key === 'ArrowRight') changeSlide(1);
        if (e.key === 'Escape') closeProjectGallery();
    }
    if (e.key === 'Escape') closeLightbox();
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

console.log('🚀 Luciano Rodrigues Portfolio loaded successfully!');
