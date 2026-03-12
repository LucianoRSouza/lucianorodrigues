// Estado global
const PG_state = {
  images: [],
  index: 0,
  currentLang: "en"
};

// Helpers
const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));

// Funções de Modal de Estatísticas
function openStatModal(type) {
  const data = statDetailsData[type];
  if (!data) return;
  
  const content = `
    <div class="stat-modal-icon"><i class="fas ${data.icon}"></i></div>
    <h3 style="color:var(--navy); margin-bottom:1rem;">${data.title}</h3>
    <p style="font-style:italic; margin-bottom:1.5rem;">${data.story}</p>
    <ul style="text-align:left;">
      ${data.details.map(item => `<li style="margin-bottom:0.5rem;"><i class="fas fa-check-circle" style="color:var(--gold)"></i> ${item}</li>`).join('')}
    </ul>
  `;
  
  $('#statModalContent').innerHTML = content;
  $('#statModalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeStatModal() {
  $('#statModalOverlay').classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Funções de Galeria de Projetos
function openProjectGallery(imagesString) {
  const images = imagesString.split(',');
  PG_state.images = images;
  PG_state.index = 0;
  
  const slider = $('#gallerySlider');
  slider.innerHTML = images.map((src, i) => `
    <div class="gallery-slide ${i === 0 ? 'active' : ''}">
      <img src="${src.trim()}" alt="Project Image">
    </div>
  `).join('');
  
  $('#projectGalleryModal').classList.add('active');
}

function changeProjectSlide(dir) {
  const slides = $$('.gallery-slide');
  slides[PG_state.index].classList.remove('active');
  PG_state.index = (PG_state.index + dir + PG_state.images.length) % PG_state.images.length;
  slides[PG_state.index].classList.add('active');
}

function closeProjectGallery() {
  $('#projectGalleryModal').classList.remove('active');
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  console.log("Iniciando site...");
  // Adicione aqui chamadas para initLoading(), etc, se você tiver essas funções.
  // Esconda o loader após carregar
  const loader = $('#loading');
  if(loader) setTimeout(() => loader.style.display = 'none', 1000);
});

// Exportar para o HTML poder usar no onclick
window.openStatModal = openStatModal;
window.closeStatModal = closeStatModal;
window.openProjectGallery = openProjectGallery;
window.closeProjectGallery = closeProjectGallery;
window.changeProjectSlide = changeProjectSlide;
