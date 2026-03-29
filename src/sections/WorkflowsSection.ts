import { workflows } from '../data/workflows';
import { renderWorkflowCard } from '../components/WorkflowCard';
import { renderSectionHeader } from '../components/SectionHeader';

export function renderWorkflowsSection(): string {
  return `
    <section id="workflows" class="py-5 bg-dark">
      <div class="container">
        ${renderSectionHeader({
    eyebrow: 'Agentic Workflows Hub',
    title: 'Documented, Multi-Stage AI Workflows',
    description:
      'I don’t build simple chatbots. I design structured, production-oriented AI workflows that combine research, automation, retrieval, reporting and multi-channel delivery into systems that create real operational value.'
  })}

        <div class="row g-4">
          ${workflows.map(renderWorkflowCard).join('')}
        </div>

        <div class="mt-5 p-4 rounded-4 workflow-highlight">
          <h3 class="h4 text-white fw-bold mb-3">Why These Workflows Matter</h3>
          <p class="text-light mb-0">
            These systems demonstrate more than isolated prompting. They show end-to-end workflow thinking:
            structured research, content filtering, historical comparison, AI-based synthesis, channel-specific formatting
            and operational delivery in one coherent pipeline.
          </p>
        </div>
      </div>
    </section>
  `;
}