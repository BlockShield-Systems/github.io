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
    description:
      'Legacy living redesigned as a connected smart-home concept.'
  },
  {
    title: 'Car Interior → Smart Car Interior',
    before: 'car-interior-4k-before.webp',
    after: 'car-interior-4k-after.webp',
    description:
      'A dated cockpit evolved into a premium connected driving experience.'
  },
  {
    title: 'Low-Tech Fitness → Smart Fitness',
    before: 'low-tech-fitness-4k-before.webp',
    after: 'smart-fitness-4k-after.webp',
    description:
      'A conventional gym reimagined as a data-enhanced fitness environment.'
  },
  {
    title: 'Physical Storefront → Smart Fashion',
    before: 'physical-storefront-4k-before.webp',
    after: 'smart-fashion-4k-after.webp',
    description:
      'A classic boutique transformed into a smart retail fashion concept.'
  },
  {
    title: 'Ordinary Supermarket → Smart Retail',
    before: 'ordinary-supermarket-4k-before.webp',
    after: 'smart-retail-4k-after.webp',
    description:
      'Everyday retail elevated into a high-tech customer experience.'
  },
  {
    title: 'Empty Render Stage → Metaverse',
    before: 'empty-render-stage-4k-before.webp',
    after: 'metaverse-4k-after.webp',
    description:
      'A neutral stage expanded into an immersive branded metaverse concept.'
  },
  {
    title: 'Old-School Kitchen → Smart Kitchen',
    before: 'oldschool-kitchen-4k-before.webp',
    after: 'smart-kitchen-4k-after.webp',
    description:
      'A classic kitchen redesigned as a connected smart-operations space.'
  },
  {
    title: 'Legacy Healthcare → AI Healthcare',
    before: 'legacy-healthcare-4k-before.webp',
    after: 'ai-healthcare-4k-after.webp',
    description:
      'A dated care setting transformed into an AI-supported healthcare concept.'
  },
  {
    title: 'Analog Bank → Digital Banking',
    before: 'analog-bank-interior-4k-before.webp',
    after: 'digital-banking-4k-after.webp',
    description:
      'Traditional banking reframed as a digital-first service environment.'
  },
  {
    title: 'Conventional Office → AR Spatial Computing',
    before: 'conventional-office-4k-before.webp',
    after: 'ar-spatial-computing-4k-after.webp',
    description:
      'A standard office upgraded into an immersive spatial-computing workspace.'
  },
  {
    title: 'Classic Computer Lab → AI Research Lab',
    before: 'classic-computer-lab-4k-before.webp',
    after: 'ai-research-lab-4k-after.webp',
    description:
      'Legacy computing transformed into an AI-native research environment.'
  },
  {
    title: 'Basic Reception Lobby → Advanced Biometrics',
    before: 'basic-reception-lobby-4k-before.webp',
    after: 'advanced-biometrics-4k-after.webp',
    description:
      'A minimal lobby reimagined as a biometric security access concept.'
  }
];

function getTransformationImagePath(fileName: string): string {
  return `/images/transformations/${fileName}`;
}

export function renderGallerySection(): string {
  return `
    <section id="transformations" class="py-5">
      <div class="container">
        ${renderSectionHeader({
    eyebrow: 'Transformations Gallery',
    title: 'Visual Before & After Concepts',
    description:
      'A curated visual gallery showing how legacy, ordinary, or static environments can be reimagined into intelligent, branded, and future-oriented concepts. Use the before/after controls on each card to compare both states directly.'
  })}

        <div class="row g-4">
          ${transformations
      .map(
        (t, index) => `
                <div class="col-12 col-md-6">
                  <article class="transformation-card h-100">
                    <div
                      class="transformation-media"
                      data-transformation-card
                      data-view="before"
                    >
                      <img
                        src="${getTransformationImagePath(t.before)}"
                        class="before-img transformation-image"
                        alt="${t.title} before transformation"
                        loading="${index < 2 ? 'eager' : 'lazy'}"
                        decoding="async"
                      />
                      <img
                        src="${getTransformationImagePath(t.after)}"
                        class="after-img transformation-image"
                        alt="${t.title} after transformation"
                        loading="lazy"
                        decoding="async"
                      />

                      <div
                        class="transformation-state-badge"
                        data-transformation-state
                        data-state="before"
                        aria-live="polite"
                      >
                        Before
                      </div>

                      <div
                        class="transformation-state-toggle"
                        role="group"
                        aria-label="Toggle transformation view"
                      >
                        <button
                          type="button"
                          class="transformation-toggle-btn is-active"
                          data-view="before"
                          aria-pressed="true"
                        >
                          Before
                        </button>
                        <button
                          type="button"
                          class="transformation-toggle-btn"
                          data-view="after"
                          aria-pressed="false"
                        >
                          After
                        </button>
                      </div>

                      <div class="transformation-overlay-bottom">
                        <div class="transformation-content">
                          <p class="transformation-top-label mb-2">
                            Concept Transformation
                          </p>
                          <h3 class="transformation-title mb-2">${t.title}</h3>
                          <p class="transformation-description mb-0">
                            ${t.description}
                          </p>
                        </div>
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
