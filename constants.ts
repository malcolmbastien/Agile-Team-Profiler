import type { Attribute } from './types';

export const ATTRIBUTES: Attribute[] = [
  // 1. Delivery Flow
  { id: 'delivery_speed_predictability', name: 'Delivery Speed & Predictability', description: 'Ability to deliver working software quickly, consistently, and in small, reliable increments.' },
  { id: 'flow_efficiency', name: 'Flow Efficiency', description: 'Minimizing waiting, context switching, and bottlenecks to maintain smooth delivery flow.' },
  { id: 'process_simplicity', name: 'Process Simplicity', description: 'Lean and effective processes that minimize ceremony while ensuring alignment.' },
  { id: 'sustainable_pace', name: 'Sustainable Pace', description: 'Delivering value at a steady, healthy rhythm that can be maintained long-term.' },

  // 2. Customer Value
  { id: 'customer_feedback_loop', name: 'Customer Feedback Loop', description: 'Regularly collecting and acting on insights from users and customers.' },
  { id: 'stakeholder_alignment', name: 'Stakeholder Alignment', description: 'Shared understanding between the team and stakeholders on priorities and success metrics.' },
  { id: 'outcome_orientation', name: 'Outcome Orientation', description: 'Focus on delivering measurable business or user value, not just completing tasks.' },
  { id: 'mission_clarity', name: 'Mission Clarity', description: 'Clear understanding of why the team exists and what success looks like.' },

  // 3. Technical Craftsmanship
  { id: 'built_in_quality', name: 'Built-in Quality', description: 'Quality practices (testing, reviews, etc.) are embedded in daily work, not inspected in later.' },
  { id: 'technical_excellence', name: 'Technical Excellence', description: 'Application of strong engineering principles, design patterns, and clean code practices.' },
  { id: 'automation_maturity', name: 'Automation Maturity', description: 'Effective use of CI/CD, automated testing, and monitoring for fast feedback and reliability.' },
  { id: 'end_to_end_ownership', name: 'End-to-End Ownership', description: 'Team owns the full lifecycle — from design through deployment and maintenance.' },
  { id: 'cognitive_load_management', name: 'Cognitive Load Management', description: 'Technical and domain complexity are managed to keep the system and team understandable.' },

  // 4. Team Culture
  { id: 'psychological_safety', name: 'Psychological Safety', description: 'Team members feel safe to express ideas, take risks, and admit mistakes.' },
  { id: 'team_cohesion_support', name: 'Team Cohesion & Support', description: 'Team members help one another, communicate openly, and resolve conflict constructively.' },
  { id: 'autonomy_empowerment', name: 'Autonomy & Empowerment', description: 'Team has control over how work is done and can make local decisions effectively.' },
  { id: 'work_transparency', name: 'Work Transparency', description: 'Progress, decisions, and blockers are visible and communicated clearly.' },
  { id: 'inter_team_collaboration', name: 'Inter-Team Collaboration', description: 'Cross-team cooperation and alignment across functions and dependencies.' },

  // 5. Continuous Improvement
  { id: 'continuous_improvement', name: 'Continuous Improvement', description: 'Team regularly inspects performance and implements small, meaningful improvements.' },
  { id: 'learning_experimentation', name: 'Learning & Experimentation', description: 'Encouragement of experimentation and learning from both successes and failures.' },
  { id: 'adaptability', name: 'Adaptability', description: 'Ability to adjust plans and priorities quickly in response to feedback or change.' },
  { id: 'growth_mindset', name: 'Growth Mindset', description: 'Individuals and the team seek feedback, new skills, and professional development.' },

  // 6. Organizational Enablement
  { id: 'leadership_support', name: 'Leadership Support', description: 'Leaders empower teams, remove obstacles, and model Agile behaviors.' },
  { id: 'organizational_agility', name: 'Organizational Agility', description: 'The wider organization adapts to change and supports iterative learning.' },
  { id: 'systemic_impediment_removal', name: 'Systemic Impediment Removal', description: 'Issues beyond the team’s control are identified and resolved effectively.' },
  { id: 'aligned_goals_incentives', name: 'Aligned Goals & Incentives', description: 'Organizational metrics and incentives support collaboration and value delivery.' },
];

export const ATTRIBUTE_GROUPS = [
  {
    title: 'Delivery Flow',
    description: 'Focuses on how effectively and predictably the team turns ideas into valuable working software.',
    attributeIds: ['delivery_speed_predictability', 'flow_efficiency', 'process_simplicity', 'sustainable_pace'],
  },
  {
    title: 'Customer Value',
    description: 'Measures how well the team aligns with real user needs and delivers meaningful outcomes.',
    attributeIds: ['customer_feedback_loop', 'stakeholder_alignment', 'outcome_orientation', 'mission_clarity'],
  },
  {
    title: 'Technical Craftsmanship',
    description: 'Assesses engineering practices, maintainability, and adaptability of the product and codebase.',
    attributeIds: ['built_in_quality', 'technical_excellence', 'automation_maturity', 'end_to_end_ownership', 'cognitive_load_management'],
  },
  {
    title: 'Team Culture',
    description: 'Captures psychological safety, cohesion, and the human dynamics that enable great teamwork.',
    attributeIds: ['psychological_safety', 'team_cohesion_support', 'autonomy_empowerment', 'work_transparency', 'inter_team_collaboration'],
  },
  {
    title: 'Continuous Improvement',
    description: 'Reflects how the team learns, experiments, and evolves in pursuit of better ways of working.',
    attributeIds: ['continuous_improvement', 'learning_experimentation', 'adaptability', 'growth_mindset'],
  },
  {
    title: 'Organizational Enablement',
    description: 'Evaluates how the surrounding environment supports and amplifies Agile ways of working.',
    attributeIds: ['leadership_support', 'organizational_agility', 'systemic_impediment_removal', 'aligned_goals_incentives'],
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