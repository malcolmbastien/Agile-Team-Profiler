import type { Attribute } from './types';

export const ATTRIBUTES: Attribute[] = [
  // Execution & Delivery
  { id: 'speed_of_delivery', name: 'Speed of Delivery', description: 'The pace at which the team consistently delivers value. Higher scores mean faster, more efficient delivery cycles.' },
  { id: 'quality_focus', name: 'Focus on Quality', description: 'The emphasis on quality assurance, testing, and building a reliable product. Higher scores mean a stronger commitment to quality.' },
  { id: 'technical_excellence', name: 'Technical Excellence', description: 'Emphasis on high-quality code, architecture, and engineering practices. Higher scores mean a stronger focus.' },
  { id: 'process_efficiency', name: 'Process Efficiency', description: 'Amount of effort spent on value-add activities vs. ceremonies/admin. Higher scores mean less wasteful overhead.' },
  
  // Team Dynamics & Culture
  { id: 'psychological_safety', name: 'Psychological Safety', description: 'The level of safety team members feel to take risks and be vulnerable. Higher scores indicate a safer, more open environment.' },
  { id: 'team_growth', name: 'Team Growth & Support', description: 'Support for the development and growth of individual team members. Higher scores mean more support.' },
  { id: 'collaboration', name: 'Collaboration Intensity', description: 'Reliance on cross-functional collaboration during discovery and delivery. Higher scores mean more collaboration.' },
  { id: 'autonomy', name: 'Team Autonomy', description: 'Level of freedom and self-direction team members have in their work. Higher scores mean more autonomy.' },
  { id: 'sustainable_pace', name: 'Sustainable Pace', description: 'The team\'s ability to maintain a constant, manageable pace of development indefinitely without burnout. High scores indicate that the team avoids "death marches" and maintains a healthy work-life balance, resulting in higher quality and engagement.' },
  { id: 'learning_culture', name: 'Learning & Experimentation Culture', description: 'The degree to which the team is encouraged to learn, experiment with new ideas, and potentially fail without blame. High scores indicate a culture that values innovation and continuous improvement over short-term certainty.' },

  // Planning & Agility
  { id: 'team_empowerment', name: 'Team Empowerment', description: 'Degree of decision-making authority held by the team versus direct management control. Higher scores mean more empowerment and less top-down oversight.' },
  { id: 'agility', name: 'Agility & Responsiveness', description: 'Ability to easily and quickly react to change and new information. Higher scores mean more agility.' },
  
  // Communication & Feedback
  { id: 'stakeholder_alignment', name: 'Stakeholder Alignment', description: 'How well the team is aligned with business and stakeholder expectations. Higher scores mean better alignment and communication.' },
  { id: 'customer_feedback', name: 'Customer Feedback Loop', description: 'Frequency and quality of feedback from end-users. Higher scores mean a tighter, more effective feedback loop.' },
  { id: 'transparency', name: 'Work Transparency', description: 'Visibility of progress, impediments, and plans to all stakeholders. Higher scores mean greater transparency.' },

  // Organizational Design
  { id: 'cognitive_load_optimization', name: 'Cognitive Load Optimization', description: 'The degree to which team and system design minimizes cognitive load, enabling developers to focus. Higher scores mean better developer experience.' },
  { id: 'end_to_end_ownership', name: 'End-to-End Ownership', description: 'The extent to which teams own a full value stream, minimizing handoffs and external dependencies. Higher scores mean teams are more stream-aligned.' },
  { id: 'inter_team_collaboration', name: 'Inter-Team Collaboration', description: 'The effectiveness of communication and collaboration between different teams. Higher scores indicate smoother cross-team workflows.' },
  { id: 'mission_clarity', name: 'Team Mission Clarity', description: 'The extent to which the team has a clear, well-understood purpose and mission within the organization (e.g., stream-aligned, platform, enabling). High scores mean less ambiguity, clearer boundaries, and a better fit into the broader system.' },
];

export const ATTRIBUTE_GROUPS = [
  {
    title: 'Execution & Delivery',
    attributeIds: ['speed_of_delivery', 'quality_focus', 'technical_excellence', 'process_efficiency'],
  },
  {
    title: 'Team Dynamics & Culture',
    attributeIds: ['psychological_safety', 'team_growth', 'collaboration', 'autonomy', 'sustainable_pace', 'learning_culture'],
  },
  {
    title: 'Planning & Agility',
    attributeIds: ['team_empowerment', 'agility'],
  },
  {
    title: 'Communication & Feedback',
    attributeIds: ['stakeholder_alignment', 'customer_feedback', 'transparency'],
  },
  {
    title: 'Organizational Design',
    attributeIds: ['cognitive_load_optimization', 'end_to_end_ownership', 'inter_team_collaboration', 'mission_clarity'],
  },
];

export const PRACTICE_CATEGORIES: string[] = [
  'Ceremonies & Meetings',
  'Technical Practices',
  'Planning & Estimation',
  'Team Culture & Collaboration',
  'Release & Deployment',
  'Feedback & Improvement',
  'Roles & Responsibilities',
  'Other',
];

export const SCORE_MIN = -5;
export const SCORE_MAX = 5;