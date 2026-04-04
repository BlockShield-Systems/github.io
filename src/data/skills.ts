export interface SkillCategory {
  icon: string;
  title: string;
  description: string;
  focus: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  {
    icon: 'bi-code-slash',
    title: 'Frontend & Modern Web',
    description:
      'Modern frontend implementation with a strong focus on structure, maintainability, responsive delivery and clean technical execution.',
    focus:
      'I use modern web tooling to build modular, production-oriented interfaces that remain readable, scalable and efficient to maintain.',
    items: [
      'Vite',
      'TypeScript',
      'Bootstrap 5',
      'Responsive Design',
      'Semantic HTML',
      'Performance Optimization',
      'Modular UI Architecture'
    ]
  },
  {
    icon: 'bi-diagram-3',
    title: 'Workflow Systems & AI Automation',
    description:
      'Design and implementation of structured AI workflows that combine research, retrieval, transformation, reasoning and delivery.',
    focus:
      'My strength lies in building end-to-end workflow logic instead of isolated prompts — including branching, connectors, RAG, reporting and multi-channel output.',
    items: [
      'Needle Workflows',
      'AI Agents',
      'RAG',
      'Code Nodes',
      'Connectors',
      'Scheduled Triggers',
      'Multi-Channel Delivery'
    ]
  },
  {
    icon: 'bi-palette',
    title: 'Creative AI & Visual Systems',
    description:
      'Creative AI direction for transformation concepts, brand visuals, cyberpunk aesthetics and visually distinctive AI-generated outputs.',
    focus:
      'I combine visual experimentation with structured creative intent, turning AI generation into a usable branding and presentation layer.',
    items: [
      'ComfyUI',
      'Flux',
      'SDXL',
      'Visual Concept Design',
      'Creative AI Pipelines',
      'Transformation Visuals',
      'Brand-Oriented Output'
    ]
  },
  {
    icon: 'bi-shield-lock',
    title: 'Technical Depth & Infrastructure Thinking',
    description:
      'Long-term technical immersion across systems, administration, Linux, networking, automation and structured problem-solving.',
    focus:
      'My background gives me a system-level way of thinking: not just how something looks, but how it runs, scales, fails and integrates.',
    items: [
      'Systems Administration',
      'Linux',
      'Networking',
      'Automation Thinking',
      'Security Awareness',
      'Platform-Oriented IT',
      'Technical Architecture'
    ]
  }
];