import { renderSectionHeader } from '../components/SectionHeader';
import { renderServiceCard } from '../components/ServiceCard';
import { services } from '../data/services';

export function renderServicesSection(): string {
  return `
    <section id="services" class="py-5">
      <div class="container">
        ${renderSectionHeader({
    eyebrow: 'Services',
    title: 'What I Can Build and Deliver',
    description:
      'I focus on work that combines technical clarity, workflow logic, creative execution and modern digital presentation — with an emphasis on useful, structured outcomes.'
  })}

        <div class="row g-4">
          ${services.map(renderServiceCard).join('')}
        </div>
      </div>
    </section>
  `;
}