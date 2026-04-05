import type { TimelineEntry } from '../data/profile';

export function renderTimelineItem(entry: TimelineEntry): string {
  return `
    <div class="timeline-item position-relative ps-4 pb-4">
      <span class="timeline-dot"></span>
      <p class="small text-uppercase text-info fw-semibold mb-2">${entry.period}</p>
      <h3 class="h5 text-white fw-bold mb-2">${entry.title}</h3>
      <p class="text-light mb-0">${entry.description}</p>
    </div>
  `;
}