import { renderSectionHeader } from '../components/SectionHeader';
import { renderSkillCard } from '../components/SkillCard';
import { skills } from '../data/skills';

export function renderSkillsSection(): string {
  return `
    <section id="skills" class="py-5">
      <div class="container">
        ${renderSectionHeader({
    eyebrow: 'Skills & Tech Stack',
    title: 'Technical Breadth Meets Execution Depth',
    description:
      'My profile combines enterprise IT foundations, modern web engineering, creative AI generation and structured automation workflows.'
  })}

        <div class="row g-4">
          ${skills.map(renderSkillCard).join('')}
        </div>
      </div>
    </section>
  `;
}