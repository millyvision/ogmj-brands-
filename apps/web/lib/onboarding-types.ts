export interface OnboardingData {
  business_name: string
  business_type: 'service_provider' | 'agency' | 'ecommerce' | 'creator' | 'consultant' | 'freelancer'
  industry: string
  primary_goal: string
  sell_services: boolean
  sell_products: boolean
  sell_campaigns: boolean
  priority_tools: string[]
}

export interface BusinessType {
  id: string
  name: string
  description: string
  icon: string
  recommended_tools: string[]
  examples: string[]
}

export interface Industry {
  id: string
  name: string
  description: string
  icon: string
}

export interface Goal {
  id: string
  name: string
  description: string
  icon: string
}

export interface Tool {
  id: string
  name: string
  description: string
  category: 'marketing' | 'operations' | 'analytics' | 'content' | 'automation'
  icon: string
}
