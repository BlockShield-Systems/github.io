import type { Project } from '../data/projects';

function getButtonClass(variant?: 'primary' | 'outline' | 'ghost'): string {
  switch (variant) {
    case 'primary':
      return 'btn btn-primary btn-sm';
    case 'ghost':
      return 'btn btn-link btn-sm text-info text-decoration-none px-0';
    case 'outline':
    default:
      return 'btn btn-outline-light btn-sm';
  }
}

export function renderProjectCard(project: Project): string {
  const preview = project.previewImage
    ? `
      <div class="project-preview-wrapper mb-4">
        <img
          src="${project.previewImage}"
          alt="${project.previewAlt ?? project.title}"
          class="img-fluid project-preview"
          loading="lazy"
          decoding="async"
        />
      </div>
    `
    : '';

  const links = project.links.length
    ? `
      <div class="d-flex flex-wrap gap-2 mt-4">
        ${project.links
      .map((link) => {
        const isExternal = link.url.startsWith('http');
        return `
              <a
                href="${link.url}"
                target="${isExternal ? '_blank' : '_self'}"
                rel="${isExternal ? 'noreferrer' : ''}"
                class="${getButtonClass(link.variant)}"
              >
                ${link.label}
              </a>
            `;
      })
      .join('')}
      </div>
    `
    : '';

  return `
    <div class="col-12 col-xl-6">
      <article class="project-card h-100 p-4">
        <div class="d-flex flex-wrap align-items-center gap-2 mb-3">
          <span class="badge rounded-pill text-bg-info">${project.category}</span>
          <span class="badge rounded-pill text-bg-dark border border-secondary-subtle">${project.status}</span>
        </div>

        <p class="project-proof-label small text-uppercase fw-semibold mb-3">
          ${project.proofLabel}
        </p>

        <h3 class="h4 text-white fw-bold mb-3">${project.title}</h3>
        <p class="text-light mb-4">${project.summary}</p>

        ${preview}

        <div class="project-detail-group mb-3">
          <p class="text-info fw-semibold mb-2">Problem</p>
          <p class="text-light mb-0">${project.problem}</p>
        </div>

        <div class="project-detail-group mb-3">
          <p class="text-info fw-semibold mb-2">Solution</p>
          <p class="text-light mb-0">${project.solution}</p>
        </div>

        <div class="project-detail-group mb-4">
          <p class="text-info fw-semibold mb-2">Result</p>
          <p class="text-light mb-0">${project.result}</p>
        </div>

        <div class="d-flex flex-wrap gap-2">
          ${project.stack
      .map((item) => `<span class="badge text-bg-secondary">${item}</span>`)
      .join('')}
        </div>

        ${links}
      </article>
    </div>
  `;
}