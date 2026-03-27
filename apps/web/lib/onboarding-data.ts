import { BusinessType, Industry, Goal, Tool } from './onboarding-types'

export const BUSINESS_TYPES: BusinessType[] = [
  {
    id: 'service_provider',
    name: 'Service Provider',
    description: 'Offer professional services to clients',
    icon: '💼',
    recommended_tools: ['crm', 'invoicing', 'scheduling', 'client-portal'],
    examples: ['Consulting Agency', 'Marketing Agency', 'Design Studio', 'Development Agency']
  },
  {
    id: 'agency',
    name: 'Digital Agency',
    description: 'Manage multiple client projects and campaigns',
    icon: '🎨',
    recommended_tools: ['project-management', 'campaigns', 'analytics', 'team-collaboration'],
    examples: ['Creative Agency', 'Marketing Agency', 'Web Development Agency']
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Sell products and manage online store',
    icon: '🛒',
    recommended_tools: ['inventory', 'product-management', 'order-tracking', 'customer-service'],
    examples: ['Online Store', 'Dropshipping', 'Digital Products', 'Physical Products']
  },
  {
    id: 'creator',
    name: 'Content Creator',
    description: 'Monetize content and engage with audience',
    icon: '🎬',
    recommended_tools: ['content-scheduler', 'social-media', 'analytics', 'monetization'],
    examples: ['YouTube Creator', 'Podcaster', 'Blogger', 'Social Media Influencer']
  },
  {
    id: 'consultant',
    name: 'Consultant',
    description: 'Provide expert advice and services',
    icon: '🧠',
    recommended_tools: ['client-management', 'invoicing', 'appointment-scheduling', 'knowledge-base'],
    examples: ['Business Consultant', 'IT Consultant', 'Marketing Consultant', 'Strategy Consultant']
  },
  {
    id: 'freelancer',
    name: 'Freelancer',
    description: 'Independent professional services',
    icon: '👤',
    recommended_tools: ['portfolio', 'client-management', 'invoicing', 'project-tracking'],
    examples: ['Freelance Developer', 'Freelance Designer', 'Freelance Writer', 'Freelance Consultant']
  }
]

export const INDUSTRIES: Industry[] = [
  {
    id: 'technology',
    name: 'Technology',
    description: 'Software, SaaS, and tech services',
    icon: '💻'
  },
  {
    id: 'marketing',
    name: 'Marketing & Advertising',
    description: 'Digital marketing, advertising, and branding',
    icon: '📢'
  },
  {
    id: 'ecommerce',
    name: 'E-commerce & Retail',
    description: 'Online stores and retail businesses',
    icon: '🛒'
  },
  {
    id: 'finance',
    name: 'Finance & Consulting',
    description: 'Financial services and business consulting',
    icon: '💰'
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Wellness',
    description: 'Healthcare services and wellness businesses',
    icon: '🏥'
  },
  {
    id: 'education',
    name: 'Education & Training',
    description: 'Educational services and training programs',
    icon: '🎓'
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    description: 'Real estate and property management',
    icon: '🏢'
  },
  {
    id: 'hospitality',
    name: 'Hospitality & Tourism',
    description: 'Hotels, restaurants, and tourism',
    icon: '🏨'
  },
  {
    id: 'professional-services',
    name: 'Professional Services',
    description: 'Professional and B2B services',
    icon: '👔'
  },
  {
    id: 'creative',
    name: 'Creative & Design',
    description: 'Design, creative, and artistic services',
    icon: '🎨'
  },
  {
    id: 'other',
    name: 'Other',
    description: 'Other industries and services',
    icon: '📋'
  }
]

export const GOALS: Goal[] = [
  {
    id: 'grow-revenue',
    name: 'Grow Revenue',
    description: 'Increase sales and revenue streams',
    icon: '📈'
  },
  {
    id: 'acquire-clients',
    name: 'Acquire Clients',
    description: 'Attract and retain more clients',
    icon: '👥'
  },
  {
    id: 'streamline-operations',
    name: 'Streamline Operations',
    description: 'Automate and optimize business processes',
    icon: '⚡'
  },
  {
    id: 'build-brand',
    name: 'Build Brand',
    description: 'Establish and grow brand presence',
    icon: '🏆'
  },
  {
    id: 'scale-business',
    name: 'Scale Business',
    description: 'Expand operations and team',
    icon: '🚀'
  },
  {
    id: 'improve-efficiency',
    name: 'Improve Efficiency',
    description: 'Increase productivity and reduce costs',
    icon: '⚙️'
  },
  {
    id: 'launch-products',
    name: 'Launch Products',
    description: 'Create and launch new products or services',
    icon: '🚀'
  },
  {
    id: 'enhance-customer-experience',
    name: 'Enhance Customer Experience',
    description: 'Improve customer satisfaction and loyalty',
    icon: '😊'
  }
]

export const TOOLS: Tool[] = [
  // Marketing Tools
  {
    id: 'email-marketing',
    name: 'Email Marketing',
    description: 'Create and send email campaigns',
    category: 'marketing',
    icon: '📧'
  },
  {
    id: 'social-media',
    name: 'Social Media Manager',
    description: 'Manage all social media platforms',
    category: 'marketing',
    icon: '📱'
  },
  {
    id: 'seo-tools',
    name: 'SEO Tools',
    description: 'Optimize for search engines',
    category: 'marketing',
    icon: '🔍'
  },
  {
    id: 'ad-manager',
    name: 'Ad Manager',
    description: 'Manage advertising campaigns',
    category: 'marketing',
    icon: '📢'
  },
  
  // Operations Tools
  {
    id: 'crm',
    name: 'CRM',
    description: 'Customer relationship management',
    category: 'operations',
    icon: '👥'
  },
  {
    id: 'project-management',
    name: 'Project Management',
    description: 'Track and manage projects',
    category: 'operations',
    icon: '📋'
  },
  {
    id: 'invoicing',
    name: 'Invoicing',
    description: 'Create and send invoices',
    category: 'operations',
    icon: '🧾'
  },
  {
    id: 'scheduling',
    name: 'Appointment Scheduling',
    description: 'Manage appointments and calendar',
    category: 'operations',
    icon: '📅'
  },
  {
    id: 'team-collaboration',
    name: 'Team Collaboration',
    description: 'Internal team communication and tools',
    category: 'operations',
    icon: '👥'
  },
  
  // Analytics Tools
  {
    id: 'analytics-dashboard',
    name: 'Analytics Dashboard',
    description: 'Track business metrics and performance',
    category: 'analytics',
    icon: '📊'
  },
  {
    id: 'conversion-tracking',
    name: 'Conversion Tracking',
    description: 'Monitor conversion rates and funnels',
    category: 'analytics',
    icon: '🎯'
  },
  {
    id: 'revenue-analytics',
    name: 'Revenue Analytics',
    description: 'Track revenue and financial metrics',
    category: 'analytics',
    icon: '💰'
  },
  
  // Content Tools
  {
    id: 'content-generator',
    name: 'AI Content Generator',
    description: 'Generate content with AI assistance',
    category: 'content',
    icon: '🤖'
  },
  {
    id: 'content-scheduler',
    name: 'Content Scheduler',
    description: 'Schedule content across platforms',
    category: 'content',
    icon: '📅'
  },
  {
    id: 'media-library',
    name: 'Media Library',
    description: 'Organize and manage media files',
    category: 'content',
    icon: '🖼️'
  },
  
  // Automation Tools
  {
    id: 'workflow-automation',
    name: 'Workflow Automation',
    description: 'Automate business workflows',
    category: 'automation',
    icon: '⚡'
  },
  {
    id: 'auto-responder',
    name: 'Auto Responder',
    description: 'Automated email responses',
    category: 'automation',
    icon: '📧'
  },
  {
    id: 'integration-tools',
    name: 'Integration Tools',
    description: 'Connect with third-party services',
    category: 'automation',
    icon: '🔗'
  }
]
