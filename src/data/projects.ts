export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  title: string;
  category: string;
  problem: string;
  solution: string;
  result: string;
  stack: string[];
  proofLabel: string;
  links: ProjectLink[];
}

export const projects: Project[] = [
  {
    title: 'Sport Prediction Analyzer',
    category: 'Workflow Intelligence',
    problem:
      'Multi-sport event prediction requires fast analysis across upcoming fixtures, historical patterns, injuries, news signals and output formatting.',
    solution:
      'Built a structured AI workflow with event discovery, filtering, parallel research, a 3-layer prediction engine and multi-channel delivery.',
    result:
      'A repeatable workflow system that transforms scattered sports information into structured, confidence-based prediction outputs.',
    proofLabel: 'Public workflow template available',
    stack: [
      'Needle Workflows',
      'GPT-4.1',
      'Claude Sonnet 4.5',
      'Telegram Bot API',
      'Microsoft Outlook',
      'Notion MCP',
      'RAG'
    ],
    links: [
      {
        label: 'View Needle Template',
        url: 'https://needle.app/workflow-templates/automated-sport-prediction-analyzer'
      }
    ]
  },
  {
    title: 'AI-Generative Trend Multi-Workflow',
    category: 'Trend Intelligence',
    problem:
      'AI-generated visual trends evolve quickly across image, video, typography, legal changes and platform ecosystems, making consistent monitoring difficult.',
    solution:
      'Designed an autonomous intelligence workflow for research, web scraping, content cleaning, RAG-based historical comparison and structured report generation.',
    result:
      'A recurring visual trend intelligence system with stronger signal quality, historical context and professional multi-channel delivery.',
    proofLabel: 'Public workflow template available',
    stack: [
      'Needle Workflows',
      'GPT-4.1',
      'Claude Sonnet 4.6',
      'RAG',
      'Google Sheets',
      'Google Docs',
      'Microsoft Outlook'
    ],
    links: [
      {
        label: 'View Needle Template',
        url: 'https://needle.app/workflow-templates/ai-visual-trend-analyzer-trend-report-generator'
      }
    ]
  },
  {
    title: 'AI Robotics Intelligence Briefing',
    category: 'Research Automation',
    problem:
      'Robotics developments span science, defense, markets, ethics and regulation, making structured tracking and reporting difficult without a dedicated system.',
    solution:
      'Implemented a multi-branch intelligence workflow with targeted search, quality filtering, RAG-supported comparison, AI synthesis and error-aware output delivery.',
    result:
      'A production-oriented robotics briefing pipeline with 14 structured sections, source freshness logic and multi-channel distribution.',
    proofLabel: 'Public workflow template available',
    stack: [
      'Needle Workflows',
      'GPT-4.1',
      'Claude Sonnet 4',
      'RAG',
      'Google Sheets',
      'Google Docs',
      'Microsoft Outlook'
    ],
    links: [
      {
        label: 'View Needle Template',
        url: 'https://needle.app/workflow-templates/ai-robotics-intelligence-briefing-2'
      }
    ]
  },
  {
    title: 'Twisted_4_Chaos Visual Direction',
    category: 'Creative AI',
    problem:
      'Creative AI work often lacks a recognizable artistic direction and becomes visually interchangeable.',
    solution:
      'Developed a distinct visual identity around cyberpunk-inspired AI art, transformation aesthetics and stylized concept imagery.',
    result:
      'A recognizable creative layer that strengthens visual branding, portfolio differentiation and artistic public presence.',
    proofLabel: 'Public portfolio profile available',
    stack: [
      'Creative AI',
      'ComfyUI',
      'Flux',
      'SDXL',
      'Visual Direction',
      'Concept Design'
    ],
    links: [
      {
        label: 'View ArtStation Profile',
        url: 'https://www.artstation.com/twisted_4_chaos'
      }
    ]
  }
];