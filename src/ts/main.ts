import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/main.css';

document.addEventListener('DOMContentLoaded', () => {
  // Dark Mode
  document.documentElement.classList.add('dark');

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href')!);
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ==================== TRANSFORMATIONS GALLERY ====================
  interface Transformation {
    title: string;
    before: string;
    after: string;
  }

  const transformations: Transformation[] = [
    { title: "Traditional Home → Smart Home", before: "traditional-home-4k-before.png", after: "smart-home-4k-after.png" },
    { title: "Car Interior → Smart Car Interior", before: "car-interior-4k-before.png", after: "car-interior-after.png" },
    { title: "Low-Tech Fitness → Smart Fitness", before: "low-tech-fitness-4k-before.png", after: "smart-fitness-4k-after.png" },
    { title: "Physical Storefront → Smart Fashion", before: "physical-storefront-4k-before.png", after: "smart-fashion-4k-after.png" },
    { title: "Ordinary Supermarket → Smart Retail", before: "ordinary-supermarket-4k-before.png", after: "smart-retail-4k-after.png" },
    { title: "Empty Render Stage → Metaverse", before: "empty-render-stage-4k-before.png", after: "metaverse-4k-after.png" },
    { title: "Old-School Kitchen → Smart Kitchen", before: "oldschool-kitchen-4k-before.png", after: "smart-kitchen-4k-after.png" },
    { title: "Legacy Healthcare → AI Healthcare", before: "legacy-healthcare-4k-before.png", after: "ai-healthcare-after.png" },
    { title: "Analog Bank → Digital Banking", before: "analog-bank-interior-before.png", after: "digital-banking-4k-after.png" },
    { title: "Conventional Office → AR Spatial Computing", before: "conventional-office-4k-before.png", after: "ar-spatial-computing-after.png" },
    { title: "Classic Computer Lab → AI Research Lab", before: "classic-computer-lab-4k-before.png", after: "ai-research-lab-after.png" },
    { title: "Basic Reception Lobby → Advanced Biometrics", before: "basic-reception-lobby-4k-before.png", after: "advanced-biometrics-after.png" },
    // Falls du noch mehr Paare hast, einfach hier ergänzen (gleiches Schema)
  ];

  const grid = document.getElementById('transformations-grid') as HTMLDivElement;

  grid.innerHTML = transformations.map(t => `
  <div class="col-md-6 col-lg-4">
    <div class="card bg-dark border-0 h-100 transformation-card overflow-hidden">
      <div class="position-relative">
        <!-- BEFORE -->
        <img src="/assets/images/transformations/${t.before}"
          class="before-img w-100 h-100 object-fit-cover"
          alt="${t.title} Before"
          style="transition: opacity 0.5s ease;">
        
        <!-- AFTER -->
        <img src="/assets/images/transformations/${t.after}"
          class="after-img w-100 h-100 object-fit-cover position-absolute top-0 start-0"
          alt="${t.title} After"
          style="opacity: 0; transition: opacity 0.5s ease;">

        <div class="card-img-overlay d-flex flex-column justify-content-end p-4 bg-gradient">
          <h5 class="text-white fw-bold mb-1">${t.title}</h5>
          <small class="text-light opacity-75">Hover für den Wow-Effekt</small>
        </div>
      </div>
    </div>
  </div>
`).join('');

  // Hover-Effekt
  document.querySelectorAll('.transformation-card').forEach(card => {
    const beforeImg = card.querySelector('.before-img') as HTMLImageElement;
    const afterImg = card.querySelector('.after-img') as HTMLImageElement;

    card.addEventListener('mouseenter', () => {
      beforeImg.style.opacity = '0';
      afterImg.style.opacity = '1';
    });

    card.addEventListener('mouseleave', () => {
      beforeImg.style.opacity = '1';
      afterImg.style.opacity = '0';
    });
  });

  const galleryContainer = document.getElementById('transformation-gallery') as HTMLElement;

  transformations.forEach(item => {
    const card = document.createElement('div');
    card.className = 'col-lg-6 col-xl-4';
    card.innerHTML = `
      <div class="card bg-dark text-white h-100 border-0 overflow-hidden transformation-card">
        <div class="position-relative">
          <img src="${item.before}" class="card-img-top before-img" alt="Before">
          <img src="${item.after}" class="card-img-top after-img position-absolute top-0 start-0 w-100 h-100 opacity-0" alt="After">
          <div class="position-absolute top-0 end-0 m-3">
            <span class="badge bg-primary">Before → After</span>
          </div>
        </div>
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
          <p class="card-text text-light">${item.desc}</p>
        </div>
      </div>
    `;
    galleryContainer.appendChild(card);
  });

  // Hover-Effekt: Before → After
  document.querySelectorAll('.transformation-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      (card.querySelector('.after-img') as HTMLElement).style.opacity = '1';
    });
    card.addEventListener('mouseleave', () => {
      (card.querySelector('.after-img') as HTMLElement).style.opacity = '0';
    });
  });

  console.log('🚀 Transformation Gallery geladen');
});