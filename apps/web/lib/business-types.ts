export interface Business {
  id: string
  name: string
  type: 'service_provider' | 'agency' | 'ecommerce' | 'creator' | 'consultant' | 'freelancer'
  industry: string
  description: string
  website?: string
  logo?: string
  founded_date?: string
  team_size: number
  revenue?: number
  currency: string
  timezone: string
  settings: {
    notifications: boolean
    auto_backup: boolean
    two_factor_auth: boolean
    api_access: boolean
  }
  metadata: {
    subscription_plan: 'free' | 'starter' | 'pro' | 'enterprise'
    billing_cycle: 'monthly' | 'yearly'
    trial_ends_at?: string
    features: string[]
  }
  created_at: string
  updated_at: string
}

export interface TeamMember {
  id: string
  user_id: string
  business_id: string
  role: 'owner' | 'admin' | 'member' | 'viewer'
  permissions: string[]
  invited_by?: string
  invited_at?: string
  joined_at?: string
  status: 'active' | 'pending' | 'suspended'
  created_at: string
  updated_at: string
}

export interface BusinessSettings {
  business_id: string
  key: string
  value: any
  category: 'general' | 'notifications' | 'security' | 'integrations' | 'billing'
  created_at: string
  updated_at: string
}
