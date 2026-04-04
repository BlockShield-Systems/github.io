import type { SkillCategory } from '../data/skills';

export function renderSkillCard(skill: SkillCategory): string {
  return `
    <div class="col-12 col-md-6">
      <article class="skill-card p-4 h-100">
        <div class="skill-icon mb-3">
          <i class="bi ${skill.icon}"></i>
        </div>

        <h3 class="h5 text-white fw-bold mb-3">${skill.title}</h3>

        <p class="text-light mb-3">${skill.description}</p>

        <div class="skill-focus-box mb-4">
          <h4 class="h6 text-info fw-semibold mb-2">Why it matters</h4>
          <p class="text-light mb-0">${skill.focus}</p>
        </div>

        <div class="d-flex flex-wrap gap-2">
          ${skill.items
      .map(item => `<span class="badge text-bg-dark border">${item}</span>`)
      .join('')}
        </div>
      </article>
    </div>
  `;
}