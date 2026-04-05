export interface ProjectLink {
  label: string;
  url: string;
  variant?: 'primary' | 'outline' | 'ghost';
}

export interface Project {
  title: string;
  category: string;
  status: 'Published' | 'Live' | 'Case Study' | 'In Progress';
  proofLabel: string;
  summary: string;
  problem: string;
  solution: string;
  result: string;
  stack: string[];
  previewImage?: string;
  previewAlt?: string;
  links: ProjectLink[];
}

export const projects: Project[] = [
  {
    title: 'Automated Sport Prediction Analyzer',
    category: 'Agentic Workflow',
    status: 'Published',
    proofLabel: 'Public Needle template available',
    summary:
      'A structured sports analysis workflow covering multiple disciplines with layered reasoning, research synthesis and delivery-ready outputs.',
    problem:
      'Sports prediction content is often inconsistent, fragmented and not structured for repeatable analysis across multiple sports and competitions.',
    solution:
      'Built a multi-stage workflow that combines research, contextual evaluation, reasoning layers, structured output generation and delivery logic into one repeatable system.',
    result:
      'Created a reusable workflow asset that demonstrates practical AI automation, research orchestration and applied decision-support thinking.',
    stack: [
      'Needle Workflows',
      'GPT-4.1',
      'Claude Sonnet',
      'RAG',
      'Telegram',
      'Microsoft Outlook'
    ],
    previewImage: '/images/projects/sport-prediction-analyzer-preview.webp',
    previewAlt:
      'Preview of the Automated Sport Prediction Analyzer workflow and output interface.',
    links: [
      {
        label: 'View Needle Template',
        url: 'https://needle.app/workflow-templates/automated-sport-prediction-analyzer',
        variant: 'primary'
      }
    ]
  },
  {
    title: 'AI Visual Trend Analyzer & Trend Report Generator',
    category: 'Research Automation',
    status: 'Published',
    proofLabel: 'Public Needle template available',
    summary:
      'A workflow for visual trend discovery, structured reporting and repeatable insight generation for creative and strategic use cases.',
    problem:
      'Trend monitoring is often manual, inconsistent and too time-consuming to transform into useful reports with strategic value.',
    solution:
      'Designed an AI-supported workflow that gathers signals, structures them, compares patterns and generates an output-ready trend report.',
    result:
      'Turned trend research into a repeatable process with stronger clarity, faster reporting and better reusability for future decisions and creative direction.',
    stack: [
      'Needle Workflows',
      'GPT-4.1',
      'Claude Sonnet',
      'RAG',
      'Google Docs',
      'Google Sheets',
      'Microsoft Outlook'
    ],
    previewImage: '/images/projects/ai-visual-trend-analyzer-preview.webp',
    previewAlt:
      'Preview of the AI Visual Trend Analyzer workflow and intelligence report structure.',
    links: [
      {
        label: 'View Needle Template',
        url: 'https://needle.app/workflow-templates/ai-visual-trend-analyzer-trend-report-generator',
        variant: 'primary'
      }
    ]
  },
  {
    title: 'AI Robotics Intelligence Briefing',
    category: 'AI Briefing System',
    status: 'Published',
    proofLabel: 'Public Needle template available',
    summary:
      'A structured intelligence workflow that transforms robotics-related signals into a readable, multi-section briefing format.',
    problem:
      'AI robotics developments move fast, but relevant information is scattered across sources and difficult to compress into actionable summaries.',
    solution:
      'Created a workflow that gathers, filters, compares and synthesizes robotics developments into a consistent multi-part briefing pipeline.',
    result:
      'Produced a reusable briefing format that demonstrates structured research automation, editorial logic and operational AI reporting.',
    stack: [
      'Needle Workflows',
      'GPT-4.1',
      'Claude Sonnet',
      'RAG',
      'Google Docs',
      'Google Sheets',
      'Microsoft Outlook'
    ],
    previewImage: '/images/projects/ai-robotics-briefing-preview.webp',
    previewAlt:
      'Preview of the AI Robotics Intelligence Briefing workflow and briefing structure.',
    links: [
      {
        label: 'View Needle Template',
        url: 'https://needle.app/workflow-templates/ai-robotics-intelligence-briefing-2',
        variant: 'primary'
      }
    ]
  },
  {
    title: 'Twisted_4_Chaos Visual Direction',
    category: 'Creative AI / Visual Identity',
    status: 'Live',
    proofLabel: 'Public visual portfolio available',
    summary:
      'A cyberpunk-inspired visual direction combining AI-assisted art, mood systems, visual experimentation and identity-driven creative work.',
    problem:
      'Creative AI work often lacks a recognizable artistic direction and therefore feels generic instead of intentional and memorable.',
    solution:
      'Built a distinct visual identity around atmosphere, consistency, futuristic design language and AI-supported experimentation.',
    result:
      'Established a recognizable creative direction that strengthens brand identity, artistic positioning and portfolio differentiation.',
    stack: [
      'ComfyUI',
      'Flux / SDXL',
      'Prompt Design',
      'Visual Storytelling',
      'Brand Direction'
    ],
    previewImage: '/images/projects/twisted4chaos-visual-direction-preview.webp',
    previewAlt:
      'Preview of the Twisted_4_Chaos visual direction and cyberpunk-inspired portfolio work.',
    links: [
      {
        label: 'View ArtStation',
        url: 'https://www.artstation.com/twisted_4_chaos',
        variant: 'outline'
      }
    ]
  },
  {
    title: 'Branding & Graphic Design Proof Collection',
    category: 'Brand / Graphic Design',
    status: 'Case Study',
    proofLabel: 'Selected visual proof and booklet material',
    summary:
      'A curated collection of graphic-design, visual communication and branding-related proof material across layouts, booklet concepts and presentation assets.',
    problem:
      'Brand and graphic work is often undervalued when it is not contextualized as part of communication, positioning and system thinking.',
    solution:
      'Collected representative materials that show layout awareness, presentation structure, creative consistency and communication-focused design decisions.',
    result:
      'Adds a stronger visual proof layer to the website and helps connect creative execution with business-facing communication outcomes.',
    stack: [
      'Graphic Design',
      'Brand Communication',
      'Layout Systems',
      'Presentation Design',
      'Visual Consistency'
    ],
    previewImage: '/images/projects/branding-graphic-design-preview.webp',
    previewAlt:
      'Preview of branding and graphic design proof materials including booklet and layout examples.',
    links: [
      {
        label: 'Discuss Design Work',
        url: '#contact',
        variant: 'outline'
      }
    ]
  },
  {
    title: 'Local AI & Automation Lab',
    category: 'Infrastructure / In Progress',
    status: 'In Progress',
    proofLabel: 'Currently building public-ready self-hosted demonstrations',
    summary:
      'A growing lab environment focused on self-hosted AI, automation systems and local-first experimentation with secure deployment thinking.',
    problem:
      'Many AI setups depend too heavily on external platforms and do not address privacy, local control or flexible automation infrastructure.',
    solution:
      'Building a practical foundation for local AI execution, self-hosted workflow orchestration and secure experimentation environments.',
    result:
      'This work will form the basis for future public demos around self-hosted automation, local inference and infrastructure-backed AI workflows.',
    stack: [
      'n8n',
      'Ollama',
      'Docker',
      'Proxmox',
      'Linux',
      'Self-Hosted AI'
    ],
    previewImage: '/images/projects/local-ai-lab-preview.webp',
    previewAlt:
      'Preview of the Local AI and Automation Lab architecture with Proxmox, Docker, Ollama and n8n.',
    links: [
      {
        label: 'Explore Current Site',
        url: 'https://ai-techart.com/',
        variant: 'ghost'
      }
    ]
  }
];