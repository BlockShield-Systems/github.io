import type { Workflow } from '../data/workflows';

export function renderWorkflowCard(workflow: Workflow): string {
  return `
    <div class="col-12 col-lg-4">
      <article class="workflow-card p-4 h-100">
        <h3 class="h4 text-white fw-bold mb-3">${workflow.title}</h3>
        <p class="text-info fw-semibold">${workflow.summary}</p>

        <div class="mb-3">
          <h4 class="h6 text-white">Problem</h4>
          <p class="text-light">${workflow.problem}</p>
        </div>

        <div class="mb-3">
          <h4 class="h6 text-white">Solution</h4>
          <p class="text-light">${workflow.solution}</p>
        </div>

        <div class="mb-4">
          <h4 class="h6 text-white">Result</h4>
          <p class="text-light mb-0">${workflow.result}</p>
        </div>

        <div class="d-flex flex-wrap gap-2 mb-4">
          ${workflow.stack
      .map(item => `<span class="badge text-bg-secondary">${item}</span>`)
      .join('')}
        </div>

        <div class="d-flex flex-wrap gap-3">
          ${workflow.docUrl
      ? `
                <a
                  href="${workflow.docUrl}"
                  target="_blank"
                  rel="noreferrer"
                  class="btn btn-outline-light btn-sm"
                >
                  View Needle Template
                </a>
              `
      : ''
    }

          ${workflow.diagramUrl
      ? `
                <a
                  href="${workflow.diagramUrl}"
                  target="_blank"
                  rel="noreferrer"
                  class="btn btn-primary btn-sm"
                >
                  See workflow diagram
                </a>
              `
      : ''
    }
        </div>
      </article>
    </div>
  `;
}