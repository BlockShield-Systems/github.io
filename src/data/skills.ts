export interface SkillCategory {
  icon: string;
  title: string;
  description: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  {
    icon: 'bi-code-slash',
    title: 'Frontend & Modern Web',
    description:
      'Modern frontend work focused on Vite, TypeScript, Bootstrap, responsive UI architecture and clean maintainable delivery.',
    items: ['Vite', 'TypeScript', 'Bootstrap 5', 'Responsive Design', 'Performance']
  },
  {
    icon: 'bi-palette',
    title: 'AI & Creative Generation',
    description:
      'Creative AI workflows for visual generation, branding concepts, cyberpunk aesthetics and structured generative pipelines.',
    items: ['ComfyUI', 'Flux', 'SDXL', 'Creative AI', 'Generative Visuals']
  },
  {
    icon: 'bi-diagram-3',
    title: 'Automation & Agentic Systems',
    description:
      'Workflow-oriented AI systems with research, retrieval, reporting, connectors, structured prompts and operational delivery.',
    items: ['Needle Workflows', 'RAG', 'AI Agents', 'Automation Logic', 'Connectors']
  },
  {
    icon: 'bi-shield-lock',
    title: 'Security & Smart-Tech Infrastructure',
    description:
      'Enterprise-minded approach to secure systems, infrastructure thinking, platform depth and resilient technical design.',
    items: ['System Engineering', 'Platform Development', 'Security', 'Infrastructure', 'Smart-Tech']
  }
];