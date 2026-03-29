import { renderSectionHeader } from '../components/SectionHeader';
import { renderProjectCard } from '../components/ProjectCard';
import { projects } from '../data/projects';

export function renderProjectsSection(): string {
  return `
    <section id="projects" class="py-5 bg-dark">
      <div class="container">
        ${renderSectionHeader({
    eyebrow: 'Selected Projects',
    title: 'Proof Through Execution',
    description:
      'These selected examples show how I combine creative output, workflow design, reporting logic and technical structure into publicly presentable results.'
  })}

        <div class="row g-4">
          ${projects.map(renderProjectCard).join('')}
        </div>
      </div>
    </section>
  `;
}