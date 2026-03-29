export interface Workflow {
  title: string;
  summary: string;
  problem: string;
  solution: string;
  result: string;
  stack: string[];
  docUrl?: string;
  diagramUrl?: string;
}

export const workflows: Workflow[] = [
  {
    title: 'Sport Prediction Analyzer',
    summary:
      'AI-powered multi-sport intelligence workflow with event discovery, parallel research and structured prediction delivery.',
    problem:
      'Upcoming sports events require fast, repeatable and data-backed analysis across multiple sources and disciplines.',
    solution:
      'Built a multi-stage prediction workflow with event parsing, parallel stats and news research, a 3-layer prediction engine, and multi-channel delivery.',
    result:
      'Production-oriented sports intelligence pipeline with structured outputs, confidence scoring and automated reporting.',
    stack: [
      'Needle Workflows',
      'GPT-4.1',
      'Claude Sonnet 4.5',
      'Telegram Bot API',
      'Microsoft Outlook',
      'Notion MCP',
      'RAG'
    ],
    docUrl: 'https://needle.app/workflow-templates/automated-sport-prediction-analyzer'
  },
  {
    title: 'AI-Generative Trend Multi-Workflow',
    summary:
      'Autonomous trend intelligence engine for AI-generated visual content, platform developments and market analysis.',
    problem:
      'Creative AI trends evolve quickly and are difficult to track consistently across tools, platforms, legal changes and market shifts.',
    solution:
      'Designed a multi-branch workflow for research, scraping, cleaning, RAG-supported comparison, report generation and parallel delivery.',
    result:
      'Recurring intelligence briefings with historical context, source-aware reporting and operational distribution.',
    stack: [
      'Needle Workflows',
      'GPT-4.1',
      'Claude Sonnet 4.6',
      'RAG',
      'Google Sheets',
      'Google Docs',
      'Microsoft Outlook'
    ],
    docUrl: 'https://needle.app/workflow-templates/ai-visual-trend-analyzer-trend-report-generator'
  },
  {
    title: 'AI Robotics Intelligence Briefing',
    summary:
      'Automated robotics intelligence workflow covering industry, science, defense, market and policy developments.',
    problem:
      'Robotics trends span many domains and require structured, date-aware research with historical comparison and quality control.',
    solution:
      'Implemented a multi-branch workflow combining targeted search, web scraping, content cleaning, historical comparison, AI analysis and delivery monitoring.',
    result:
      'A 14-section professional robotics briefing with source freshness logic, anti-hallucination rules and multi-channel publishing.',
    stack: [
      'Needle Workflows',
      'GPT-4.1',
      'Claude Sonnet 4',
      'RAG',
      'Google Sheets',
      'Google Docs',
      'Microsoft Outlook'
    ],
    docUrl: 'https://needle.app/workflow-templates/ai-robotics-intelligence-briefing-2'
  }
];