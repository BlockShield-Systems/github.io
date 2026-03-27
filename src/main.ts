import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './css/main.css';

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('dark');

  // Smooth Scroll for Navigation
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');

      if (!href || href === '#') return;

      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  console.log('🎨 Transformations Gallery initializing...');

  interface Transformation {
    title: string;
    before: string;
    after: string;
  }

  const transformations: Transformation[] = [
    { title: 'Traditional Home → Smart Home', before: 'traditional-home-4k-before.webp', after: 'smart-home-4k-after.webp' },
    { title: 'Car Interior → Smart Car Interior', before: 'car-interior-4k-before.webp', after: 'car-interior-after.webp' },
    { title: 'Low-Tech Fitness → Smart Fitness', before: 'low-tech-fitness-4k-before.webp', after: 'smart-fitness-4k-after.webp' },
    { title: 'Physical Storefront → Smart Fashion', before: 'physical-storefront-4k-before.webp', after: 'smart-fashion-4k-after.webp' },
    { title: 'Ordinary Supermarket → Smart Retail', before: 'ordinary-supermarket-4k-before.webp', after: 'smart-retail-4k-after.webp' },
    { title: 'Empty Render Stage → Metaverse', before: 'empty-render-stage-4k-before.webp', after: 'metaverse-4k-after.webp' },
    { title: 'Old-School Kitchen → Smart Kitchen', before: 'oldschool-kitchen-4k-before.webp', after: 'smart-kitchen-4k-after.webp' },
    { title: 'Legacy Healthcare → AI Healthcare', before: 'legacy-healthcare-4k-before.webp', after: 'ai-healthcare-after.webp' },
    { title: 'Analog Bank → Digital Banking', before: 'analog-bank-interior-before.webp', after: 'digital-banking-4k-after.webp' },
    { title: 'Conventional Office → AR Spatial Computing', before: 'conventional-office-4k-before.webp', after: 'ar-spatial-computing-after.webp' },
    { title: 'Classic Computer Lab → AI Research Lab', before: 'classic-computer-lab-4k-before.webp', after: 'ai-research-lab-after.webp' },
    { title: 'Basic Reception Lobby → Advanced Biometrics', before: 'basic-reception-lobby-4k-before.webp', after: 'advanced-biometrics-after.webp' },
  ];

  const grid = document.getElementById('transformations-grid') as HTMLDivElement | null;

  if (!grid) {
    console.error('❌ #transformations-grid element not found!');
    return;
  }

  console.log(`✅ Grid found – rendering ${transformations.length} transformation cards...`);

  const getTransformationImagePath = (fileName: string) => `/images/transformations/${fileName}`;

  grid.innerHTML = transformations
    .map(
      t => `
        <div class="col-md-6 col-lg-4">
          <article class="card bg-dark border-0 h-100 transformation-card overflow-hidden">
            <div class="position-relative">
              <img
                src="${getTransformationImagePath(t.before)}"
                class="before-img w-100 h-100 object-fit-cover"
                alt="${t.title} before transformation"
                loading="lazy"
                decoding="async"
                style="transition: opacity 0.5s ease;"
              />

              <img
                src="${getTransformationImagePath(t.after)}"
                class="after-img w-100 h-100 object-fit-cover position-absolute top-0 start-0"
                alt="${t.title} after transformation"
                loading="lazy"
                decoding="async"
                style="opacity: 0; transition: opacity 0.5s ease;"
              />

              <div class="card-img-overlay d-flex flex-column justify-content-end p-4 bg-gradient">
                <h3 class="h5 text-white fw-bold mb-1">${t.title}</h3>
                <small class="text-light opacity-75">Hover to see the difference</small>
              </div>
            </div>
          </article>
        </div>
      `
    )
    .join('');

  console.log('✅ Gallery successfully rendered');

  document.querySelectorAll<HTMLElement>('.transformation-card').forEach(card => {
    const beforeImg = card.querySelector<HTMLImageElement>('.before-img');
    const afterImg = card.querySelector<HTMLImageElement>('.after-img');

    if (!beforeImg || !afterImg) return;

    card.addEventListener('mouseenter', () => {
      beforeImg.style.opacity = '0';
      afterImg.style.opacity = '1';
    });

    card.addEventListener('mouseleave', () => {
      beforeImg.style.opacity = '1';
      afterImg.style.opacity = '0';
    });
  });

  console.log('✅ Hover effects attached');
  console.log('🎨 Transformations Gallery setup completed');
});

