export interface Service {
  icon: string;
  title: string;
  audience: string;
  description: string;
  outcome: string;
}

export const services: Service[] = [
  {
    icon: 'bi-brush',
    title: 'AI-Powered Visuals & Creative Concepts',
    audience: 'For brands, campaigns and visually driven digital ideas',
    description:
      'I create AI-supported visuals, transformation concepts and cyberpunk-inspired creative assets that help ideas stand out and communicate stronger.',
    outcome:
      'You get distinctive visual output that is not generic, but aligned with mood, presentation impact and brand direction.'
  },
  {
    icon: 'bi-cpu',
    title: 'Custom AI Workflow Systems',
    audience: 'For teams or individuals who need more than a simple chatbot',
    description:
      'I design structured AI workflows for research, analysis, reporting, information processing and multi-step automation using production-oriented logic.',
    outcome:
      'You get repeatable systems that transform scattered tasks into documented, operational workflow pipelines.'
  },
  {
    icon: 'bi-shield-check',
    title: 'Secure Smart-Tech Thinking',
    audience: 'For projects that require technical depth, reliability and future-ready structure',
    description:
      'I approach digital systems with a strong awareness for architecture, operational clarity, system boundaries and long-term technical resilience.',
    outcome:
      'You get solutions that are not only functional on the surface, but thought through more deeply from a technical and structural perspective.'
  },
  {
    icon: 'bi-layers',
    title: 'Modern Web & AI-Enhanced Delivery',
    audience: 'For portfolio sites, technical showcase pages and modern digital presentation layers',
    description:
      'I build modular web experiences that combine modern frontend structure with AI-supported assets, technical clarity and strong presentation logic.',
    outcome:
      'You get a modern, maintainable and publicly presentable digital presence that communicates your work more effectively.'
  }
];