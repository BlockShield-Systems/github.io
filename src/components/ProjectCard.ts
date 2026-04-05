import type { Project } from '../data/projects';

export function renderProjectCard(project: Project): string {
  return `
    <div class="col-12 col-lg-6">
      <article class="project-card p-4 h-100">
        <div class="d-flex justify-content-between align-items-start gap-3 mb-3 flex-wrap">
          <h3 class="h4 text-white fw-bold mb-0">${project.title}</h3>
          <span class="badge text-bg-info">${project.category}</span>
        </div>

        <div class="project-proof-label mb-4">
          <span class="small text-info fw-semibold">${project.proofLabel}</span>
        </div>

        <div class="mb-3">
          <h4 class="h6 text-white">Problem</h4>
          <p class="text-light mb-0">${project.problem}</p>
        </div>

        <div class="mb-3">
          <h4 class="h6 text-white">Solution</h4>
          <p class="text-light mb-0">${project.solution}</p>
        </div>

        <div class="mb-4">
          <h4 class="h6 text-white">Result</h4>
          <p class="text-light mb-0">${project.result}</p>
        </div>

        <div class="d-flex flex-wrap gap-2 mb-4">
          ${project.stack
      .map(item => `<span class="badge text-bg-secondary">${item}</span>`)
      .join('')}
        </div>

        <div class="d-flex flex-wrap gap-3">
          ${project.links
      .map(
        link => `
                <a
                  href="${link.url}"
                  target="_blank"
                  rel="noreferrer"
                  class="btn btn-outline-light btn-sm"
                >
                  ${link.label}
                </a>
              `
      )
      .join('')}
        </div>
      </article>
    </div>
  `;
}