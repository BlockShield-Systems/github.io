import { renderSectionHeader } from '../components/SectionHeader';
import { renderProjectCard } from '../components/ProjectCard';
import { projects } from '../data/projects';

export function renderProjectsSection(): string {
  return `
    <section id="projects" class="py-5 bg-dark">
      <div class="container">
        ${renderSectionHeader({
    eyebrow: 'Selected Projects & Public Proof',
    title: 'Work That Can Be Explored Further',
    description:
      'These projects are meant to show not only what I can describe, but what I can publicly demonstrate through workflow templates, creative profiles and structured technical output.'
  })}

        <div class="row g-4">
          ${projects.map(renderProjectCard).join('')}
        </div>

        <div class="mt-5 p-4 rounded-4 workflow-highlight">
          <h3 class="h4 text-white fw-bold mb-3">Next Step for This Section</h3>
          <p class="text-light mb-0">
            This project layer will be expanded further with carousel previews, stronger case-study packaging,
            workflow diagrams, and more public reference material from LinkedIn, ArtStation and future documentation assets.
          </p>
        </div>
      </div>
    </section>
  `;
}