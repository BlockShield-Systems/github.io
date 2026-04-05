import { projects } from '../data/projects';
import { renderProjectCard } from '../components/ProjectCard';

export function renderProjectsSection(): string {
  return `
    <section id="projects" class="py-5">
      <div class="container">
        <div class="text-center mb-5">
          <p class="text-uppercase text-info fw-semibold letter-spacing mb-2">
            Selected Projects & Proof
          </p>
          <h2 class="display-5 fw-bold text-white">
            Public workflow assets, visual direction and growing case-study depth
          </h2>
          <p class="lead text-light mx-auto" style="max-width: 920px;">
            This section connects real workflow systems, visual work and infrastructure direction
            with public proof, structured outcomes and evolving case-study material.
          </p>
        </div>

        <div class="row g-4">
          ${projects.map((project) => renderProjectCard(project)).join('')}
        </div>

        <div class="workflow-highlight mt-5 p-4 p-lg-5">
          <h3 class="h4 text-white fw-bold mb-3">Why this proof layer matters</h3>
          <p class="text-light mb-0">
            This portfolio is not meant to show isolated prompts or vague claims. It is designed
            to demonstrate structured execution: real workflows, documented outputs, visible creative
            direction and a growing bridge between AI systems, design thinking and technical delivery.
          </p>
        </div>
      </div>
    </section>
  `;
}