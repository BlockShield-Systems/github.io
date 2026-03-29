import type { Service } from '../data/services';

export function renderServiceCard(service: Service): string {
  return `
    <div class="col-12 col-md-6 col-xl-3">
      <article class="service-card p-4 h-100">
        <div class="service-icon mb-3">
          <i class="bi ${service.icon}"></i>
        </div>
        <h3 class="h5 text-white fw-bold mb-3">${service.title}</h3>
        <p class="text-light mb-4">${service.description}</p>
        <a href="#contact" class="btn btn-outline-light btn-sm">Get in touch</a>
      </article>
    </div>
  `;
}