import { renderSectionHeader } from '../components/SectionHeader';

interface Transformation {
  title: string;
  before: string;
  after: string;
  description: string;
}

const transformations: Transformation[] = [
  {
    title: 'Traditional Home → Smart Home',
    before: 'traditional-home-4k-before.webp',
    after: 'smart-home-4k-after.webp',
    description: 'Legacy residential environment reimagined as an intelligent living system.'
  },
  {
    title: 'Car Interior → Smart Car Interior',
    before: 'car-interior-4k-before.webp',
    after: 'car-interior-after.webp',
    description: 'Conventional interior concept transformed into a futuristic connected mobility space.'
  },
  {
    title: 'Low-Tech Fitness → Smart Fitness',
    before: 'low-tech-fitness-4k-before.webp',
    after: 'smart-fitness-4k-after.webp',
    description: 'A static workout setting redesigned as an adaptive performance environment.'
  },
  {
    title: 'Physical Storefront → Smart Fashion',
    before: 'physical-storefront-4k-before.webp',
    after: 'smart-fashion-4k-after.webp',
    description: 'Retail identity elevated through AI-driven visual modernization.'
  },
  {
    title: 'Ordinary Supermarket → Smart Retail',
    before: 'ordinary-supermarket-4k-before.webp',
    after: 'smart-retail-4k-after.webp',
    description: 'Everyday commerce reframed as a high-tech customer experience.'
  },
  {
    title: 'Empty Render Stage → Metaverse',
    before: 'empty-render-stage-4k-before.webp',
    after: 'metaverse-4k-after.webp',
    description: 'A neutral scene transformed into a stylized immersive digital world.'
  },
  {
    title: 'Old-School Kitchen → Smart Kitchen',
    before: 'oldschool-kitchen-4k-before.webp',
    after: 'smart-kitchen-4k-after.webp',
    description: 'Classic domestic design shifted toward connected living and intelligent comfort.'
  },
  {
    title: 'Legacy Healthcare → AI Healthcare',
    before: 'legacy-healthcare-4k-before.webp',
    after: 'ai-healthcare-after.webp',
    description: 'Healthcare visuals updated into an advanced, AI-supported care environment.'
  },
  {
    title: 'Analog Bank → Digital Banking',
    before: 'analog-bank-interior-before.webp',
    after: 'digital-banking-4k-after.webp',
    description: 'Traditional finance space reimagined as a future-facing digital experience.'
  },
  {
    title: 'Conventional Office → AR Spatial Computing',
    before: 'conventional-office-4k-before.webp',
    after: 'ar-spatial-computing-after.webp',
    description: 'Office concept upgraded into a mixed-reality productivity environment.'
  },
  {
    title: 'Classic Computer Lab → AI Research Lab',
    before: 'classic-computer-lab-4k-before.webp',
    after: 'ai-research-lab-after.webp',
    description: 'Legacy computing transformed into an AI-native innovation space.'
  },
  {
    title: 'Basic Reception Lobby → Advanced Biometrics',
    before: 'basic-reception-lobby-4k-before.webp',
    after: 'advanced-biometrics-after.webp',
    description: 'Conventional entry space reframed through futuristic security design.'
  }
];

function getTransformationImagePath(fileName: string): string {
  return `/images/transformations/${fileName}`;
}

export function renderGallerySection(): string {
  return `
    <section id="transformations" class="py-5 bg-dark">
      <div class="container">
        ${renderSectionHeader({
    eyebrow: 'Transformations Gallery',
    title: 'Visual Before & After Concepts',
    description:
      'A curated visual gallery showing how legacy, ordinary or static environments can be reimagined into intelligent, branded and future-oriented concepts.'
  })}

        <div class="row g-4">
          ${transformations
      .map(
        t => `
                <div class="col-md-6 col-lg-4">
                  <article class="card bg-dark border-0 h-100 transformation-card overflow-hidden cursor-pointer">
                    <div class="position-relative transformation-media">
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

                      <div class="card-img-overlay d-flex flex-column justify-content-end p-4 bg-gradient-dark">
                        <h3 class="h5 text-white fw-bold mb-1">${t.title}</h3>
                        <p class="text-light small mb-1">${t.description}</p>
                        <small class="text-info">Hover or tap to compare</small>
                      </div>
                    </div>
                  </article>
                </div>
              `
      )
      .join('')}
        </div>
      </div>
    </section>
  `;
}
