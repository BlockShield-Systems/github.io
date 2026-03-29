import { renderSectionHeader } from '../components/SectionHeader';
import { renderServiceCard } from '../components/ServiceCard';
import { services } from '../data/services';

export function renderServicesSection(): string {
  return `
    <section id="services" class="py-5">
      <div class="container">
        ${renderSectionHeader({
    eyebrow: 'Services',
    title: 'What I Offer',
    description:
      'I help turn complex ideas into tangible technical and creative outcomes — from workflow logic to visual concepts and structured digital delivery.'
  })}

        <div class="row g-4">
          ${services.map(renderServiceCard).join('')}
        </div>
      </div>
    </section>
  `;
}