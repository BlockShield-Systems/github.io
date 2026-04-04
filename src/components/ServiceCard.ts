import type { Service } from '../data/services';

export function renderServiceCard(service: Service): string {
  return `
    <div class="col-12 col-md-6">
      <article class="service-card p-4 h-100">
        <div class="service-icon mb-3">
          <i class="bi ${service.icon}"></i>
        </div>

        <h3 class="h5 text-white fw-bold mb-3">${service.title}</h3>

        <p class="text-info fw-semibold mb-3">${service.audience}</p>

        <p class="text-light mb-3">${service.description}</p>

        <div class="service-outcome-box mb-4">
          <h4 class="h6 text-info fw-semibold mb-2">Outcome</h4>
          <p class="text-light mb-0">${service.outcome}</p>
        </div>

        <a href="#contact" class="btn btn-outline-light btn-sm">Get in touch</a>
      </article>
    </div>
  `;
}