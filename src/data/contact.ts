export interface ContactTopic {
  label: string;
  value: string;
}

export interface ProjectStage {
  label: string;
  value: string;
}

export const contactTopics: ContactTopic[] = [
  { label: 'Select inquiry type', value: '' },
  { label: 'AI Workflow / Agentic Systems', value: 'ai-workflow' },
  { label: 'Modern Web Development', value: 'web-development' },
  { label: 'Creative AI / Visual Direction', value: 'creative-ai' },
  { label: 'Branding / Graphic Design', value: 'branding-design' },
  { label: 'Local AI / Automation Consulting', value: 'local-ai-consulting' },
  { label: 'Collaboration / Partnership', value: 'collaboration' },
  { label: 'Other', value: 'other' }
];

export const projectStages: ProjectStage[] = [
  { label: 'Select project stage', value: '' },
  { label: 'Just exploring / early idea', value: 'idea' },
  { label: 'Planning an implementation', value: 'planning' },
  { label: 'Need execution soon', value: 'execution' },
  { label: 'Looking for long-term collaboration', value: 'long-term' }
];

export const contactHighlights: string[] = [
  'AI workflow design and automation thinking',
  'Modern frontend and structured digital delivery',
  'Creative AI visuals, visual direction and branding support',
  'Technical concepts with practical implementation focus'
];