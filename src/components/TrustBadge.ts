import type { TrustPoint } from '../data/profile';

export function renderTrustBadge(item: TrustPoint): string {
  return `
    <div class="col-12 col-lg-4">
      <div class="about-card h-100 p-4">
        <div class="trust-icon mb-3">
          <i class="bi ${item.icon}"></i>
        </div>
        <h3 class="h5 text-white fw-bold mb-3">${item.title}</h3>
        <p class="text-light mb-0">${item.description}</p>
      </div>
    </div>
  `;
}
