
export interface JobRole {
  id: string;
  title: string;
  category: string;
  keywords: string[];
  skills: string[];
  description: string;
}

export const jobRoles: JobRole[] = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    category: 'Technology',
    keywords: [
      'JavaScript', 'React', 'Python', 'Node.js', 'SQL', 'Git', 'AWS', 'Docker',
      'API', 'REST', 'Agile', 'Scrum', 'Testing', 'CI/CD', 'MongoDB', 'Express',
      'TypeScript', 'HTML', 'CSS', 'Redux', 'GraphQL', 'Microservices'
    ],
    skills: [
      'Problem Solving', 'Team Collaboration', 'Communication', 'Leadership',
      'Project Management', 'Code Review', 'Debugging', 'System Design'
    ],
    description: 'Full-stack software development roles'
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    category: 'Technology',
    keywords: [
      'Python', 'R', 'SQL', 'Machine Learning', 'Deep Learning', 'TensorFlow',
      'PyTorch', 'Pandas', 'NumPy', 'Scikit-learn', 'Statistics', 'Data Mining',
      'Big Data', 'Hadoop', 'Spark', 'Tableau', 'Power BI', 'A/B Testing'
    ],
    skills: [
      'Statistical Analysis', 'Data Visualization', 'Research', 'Communication',
      'Critical Thinking', 'Problem Solving', 'Business Acumen'
    ],
    description: 'Machine learning and data analysis roles'
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Manager',
    category: 'Marketing',
    keywords: [
      'SEO', 'SEM', 'Google Analytics', 'PPC', 'Social Media', 'Content Marketing',
      'Email Marketing', 'Facebook Ads', 'Google Ads', 'Conversion Rate',
      'A/B Testing', 'Marketing Automation', 'HubSpot', 'Salesforce', 'CRM'
    ],
    skills: [
      'Strategic Planning', 'Creative Thinking', 'Data Analysis', 'Communication',
      'Project Management', 'Brand Management', 'Customer Insights'
    ],
    description: 'Digital marketing and growth roles'
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    category: 'Product',
    keywords: [
      'Product Strategy', 'Roadmap', 'User Research', 'Agile', 'Scrum', 'Jira',
      'A/B Testing', 'Analytics', 'Wireframing', 'User Stories', 'MVP',
      'Go-to-Market', 'Stakeholder Management', 'KPIs', 'OKRs'
    ],
    skills: [
      'Strategic Thinking', 'Leadership', 'Communication', 'Data Analysis',
      'Problem Solving', 'User Empathy', 'Cross-functional Collaboration'
    ],
    description: 'Product development and strategy roles'
  },
  {
    id: 'sales-representative',
    title: 'Sales Representative',
    category: 'Sales',
    keywords: [
      'CRM', 'Salesforce', 'Lead Generation', 'Cold Calling', 'B2B Sales',
      'Account Management', 'Pipeline Management', 'Quota Achievement',
      'Negotiation', 'Prospecting', 'Customer Relationship', 'Revenue Growth'
    ],
    skills: [
      'Communication', 'Persuasion', 'Relationship Building', 'Resilience',
      'Goal-Oriented', 'Time Management', 'Customer Service'
    ],
    description: 'Sales and business development roles'
  },
  {
    id: 'ux-designer',
    title: 'UX Designer',
    category: 'Design',
    keywords: [
      'User Experience', 'User Interface', 'Wireframing', 'Prototyping',
      'Figma', 'Sketch', 'Adobe XD', 'User Research', 'Usability Testing',
      'Information Architecture', 'Interaction Design', 'Design Systems'
    ],
    skills: [
      'Creative Problem Solving', 'Empathy', 'Communication', 'Collaboration',
      'Critical Thinking', 'Attention to Detail', 'User-Centered Design'
    ],
    description: 'User experience and interface design roles'
  },
  {
    id: 'financial-analyst',
    title: 'Financial Analyst',
    category: 'Finance',
    keywords: [
      'Financial Modeling', 'Excel', 'Financial Analysis', 'Budgeting',
      'Forecasting', 'Valuation', 'Risk Assessment', 'Investment Analysis',
      'Financial Reporting', 'SQL', 'Python', 'Bloomberg Terminal'
    ],
    skills: [
      'Analytical Thinking', 'Attention to Detail', 'Communication',
      'Problem Solving', 'Time Management', 'Critical Thinking'
    ],
    description: 'Financial analysis and planning roles'
  },
  {
    id: 'hr-manager',
    title: 'HR Manager',
    category: 'Human Resources',
    keywords: [
      'Talent Acquisition', 'Employee Relations', 'Performance Management',
      'HRIS', 'Compensation', 'Benefits', 'Training', 'Development',
      'Compliance', 'Recruiting', 'Onboarding', 'Policy Development'
    ],
    skills: [
      'Leadership', 'Communication', 'Conflict Resolution', 'Empathy',
      'Strategic Thinking', 'Organizational Skills', 'Confidentiality'
    ],
    description: 'Human resources and talent management roles'
  }
];

export const getJobRoleById = (id: string): JobRole | undefined => {
  return jobRoles.find(role => role.id === id);
};

export const getJobRolesByCategory = (category: string): JobRole[] => {
  return jobRoles.filter(role => role.category === category);
};

export const getAllCategories = (): string[] => {
  return [...new Set(jobRoles.map(role => role.category))];
};
