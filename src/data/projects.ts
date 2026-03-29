export interface Project {
  title: string;
  category: string;
  problem: string;
  solution: string;
  result: string;
  stack: string[];
  link?: string;
}

export const projects: Project[] = [
  {
    title: 'Casino Contest Winning Visual',
    category: 'Visual Impact',
    problem:
      'A high-impact visual concept had to stand out quickly in a competitive environment and generate attention within a short timeframe.',
    solution:
      'Created a visually distinctive AI-driven concept with strong atmosphere, composition and brand impact.',
    result:
      'Contest-winning result with visible public traction, including notable views and engagement.',
    stack: ['Creative AI', 'Visual Design', 'Brand Impact']
  },
  {
    title: 'AI Robotics Intelligence Briefing',
    category: 'Agentic Workflow',
    problem:
      'Robotics developments across science, defense, markets and policy are fragmented and difficult to track consistently.',
    solution:
      'Built an automated intelligence workflow that researches, cleans, compares and synthesizes robotics developments into structured briefings.',
    result:
      'Repeatable 14-section intelligence reporting pipeline with source-aware quality control.',
    stack: ['Needle Workflows', 'RAG', 'Claude Sonnet', 'GPT-4.1']
  },
  {
    title: 'Sport Prediction Analyzer',
    category: 'Operational Intelligence',
    problem:
      'Sports prediction across multiple disciplines requires fast aggregation of stats, news, injuries and context.',
    solution:
      'Designed a multi-stage prediction system with event parsing, parallel research and layered AI analysis.',
    result:
      'Structured multi-sport prediction output with confidence logic and automated multi-channel delivery.',
    stack: ['Needle Workflows', 'Prediction Logic', 'Telegram', 'Notion']
  },
  {
    title: 'AI-Generative Trend Intelligence',
    category: 'Market & Trend Research',
    problem:
      'Generative AI trends change quickly across image, video, typography, pricing and platform ecosystems.',
    solution:
      'Created a recurring AI trend intelligence workflow with research, cleanup, RAG memory and executive briefing generation.',
    result:
      'Faster monitoring of creative AI developments with structured reporting and historical context.',
    stack: ['Needle Workflows', 'RAG', 'Google Docs', 'Microsoft Outlook']
  }
];