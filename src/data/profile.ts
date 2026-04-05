export interface ProfileLink {
  label: string;
  url: string;
  icon: string;
}

export interface TimelineEntry {
  period: string;
  title: string;
  description: string;
}

export interface TrustPoint {
  title: string;
  description: string;
  icon: string;
}

export const profileLinks: ProfileLink[] = [
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/ai-techart-demian/',
    icon: 'bi-linkedin'
  },
  {
    label: 'ArtStation',
    url: 'https://www.artstation.com/twisted_4_chaos',
    icon: 'bi-palette'
  },
  {
    label: 'GitHub',
    url: 'https://github.com/BlockShield-Systems',
    icon: 'bi-github'
  },
  {
    label: 'X / Twitter',
    url: 'https://x.com/BlockShield_SYS',
    icon: 'bi-twitter-x'
  }
];

export const trustPoints: TrustPoint[] = [
  {
    title: 'Enterprise roots',
    description:
      'Platform-oriented thinking, structured systems work and a long-term technical foundation shaped by enterprise-like environments and deep private practice.',
    icon: 'bi-diagram-3'
  },
  {
    title: 'AI + workflow execution',
    description:
      'Not just prompting — but practical workflow logic, research orchestration, reporting pipelines and operational AI delivery.',
    icon: 'bi-cpu'
  },
  {
    title: 'Creative differentiation',
    description:
      'A rare mix of technical execution and visually distinctive AI-supported creative direction across branding, transformations and presentation.',
    icon: 'bi-stars'
  }
];

export const timelineEntries: TimelineEntry[] = [
  {
    period: '25+ Years',
    title: 'Deep hands-on private technical immersion',
    description:
      'Long-term self-driven involvement across administration, networking, Linux, scripting, automation, programming, web development, AI, digital creation and system experimentation.'
  },
  {
    period: 'Professional Foundation',
    title: 'Certified Swiss Informatics Specialist EFZ',
    description:
      'A formal and modern professional base in informatics and systems-oriented technical work, completed with current relevance for modern platform and engineering environments.'
  },
  {
    period: 'Current Direction',
    title: 'AI workflows, technical positioning and creative systems',
    description:
      'Today the focus is on production-oriented AI workflows, modern frontend implementation, creative AI systems, secure thinking and public portfolio building.'
  }
];