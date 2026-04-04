import { renderSectionHeader } from '../components/SectionHeader';
import { renderSkillCard } from '../components/SkillCard';
import { skills } from '../data/skills';

export function renderSkillsSection(): string {
  return `
    <section id="skills" class="py-5">
      <div class="container">
        ${renderSectionHeader({
    eyebrow: 'Skills & Technical Focus',
    title: 'Broad Technical Range, Structured Execution',
    description:
      'My profile combines modern frontend work, workflow-based AI systems, creative AI generation and long-term technical depth across IT-related disciplines.'
  })}

        <div class="row g-4">
          ${skills.map(renderSkillCard).join('')}
        </div>
      </div>
    </section>
  `;
}