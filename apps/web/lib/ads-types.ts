export interface Campaign {
  id: string
  business_id: string
  name: string
  description?: string
  type: 'search' | 'display' | 'social' | 'video' | 'shopping' | 'app' | 'native'
  status: 'draft' | 'active' | 'paused' | 'completed' | 'cancelled'
  objective: 'awareness' | 'traffic' | 'engagement' | 'conversions' | 'leads' | 'sales' | 'app_installs' | 'store_visits' | 'brand_awareness'
  budget: {
    amount: number
    currency: string
    type: 'daily' | 'lifetime'
    period?: {
      start_date: string
      end_date: string
    }
  }
  targeting: {
    demographics?: {
      age_min?: number
      age_max?: number
      gender?: 'male' | 'female' | 'all'
      languages?: string[]
      locations?: string[]
      income_range?: {
        min?: number
        max?: number
      }
    }
    interests?: string[]
    behaviors?: string[]
    custom_audiences?: string[]
    remarketing?: {
      enabled: boolean
      audiences?: string[]
      duration?: number
    }
    platforms?: string[]
    devices?: string[]
    operating_systems?: string[]
    carriers?: string[]
  }
  ad_groups: AdGroup[]
  creatives: Creative[]
  tracking: {
    conversion_tracking?: {
      enabled: boolean
      pixel_id?: string
      conversion_events?: ConversionEvent[]
    }
    analytics?: {
      tracking_id?: string
      utm_parameters?: Record<string, string>
    }
  }
  performance: {
    impressions: number
    clicks: number
    ctr: number
    cpc: number
    cpm: number
    spend: number
    conversions: number
    conversion_rate: number
    cost_per_conversion: number
    roas: number
    quality_score?: number
  }
  start_date?: string
  end_date?: string
  created_at: string
  updated_at: string
}

export interface AdGroup {
  id: string
  campaign_id: string
  name: string
  description?: string
  status: 'enabled' | 'paused' | 'removed'
  targeting?: {
    keywords?: string[]
    placements?: string[]
    devices?: string[]
    scheduling?: {
      start_time?: string
      end_time?: string
      days_of_week?: number[]
    }
  }
  ads: Ad[]
  performance: {
    impressions: number
    clicks: number
    ctr: number
    cpc: number
    cpm: number
    spend: number
    conversions: number
    conversion_rate: number
    cost_per_conversion: number
  }
  created_at: string
  updated_at: string
}

export interface Ad {
  id: string
  ad_group_id: string
  campaign_id: string
  name: string
  description?: string
  type: 'text' | 'image' | 'video' | 'carousel' | 'collection' | 'app' | 'lead_form'
  status: 'enabled' | 'paused' | 'removed'
  creative: {
    headline?: string
    description?: string
    display_url?: string
    final_url?: string
    call_to_action?: string
    image_url?: string
    video_url?: string
    carousel_items?: CarouselItem[]
    app_info?: AppInfo
    lead_form?: LeadForm
  }
  tracking: {
    tracking_params?: Record<string, string>
    conversion_pixel?: string
  }
  performance: {
    impressions: number
    clicks: number
    ctr: number
    cpc: number
    cpm: number
    spend: number
    conversions: number
    conversion_rate: number
    cost_per_conversion: number
  }
  created_at: string
  updated_at: string
}

export interface Creative {
  id: string
  business_id: string
  name: string
  type: 'image' | 'video' | 'carousel' | 'collection'
  file_url?: string
  thumbnail_url?: string
  dimensions?: {
    width: number
    height: number
  }
  file_size?: number
  mime_type?: string
  duration?: number
  tags?: string[]
  usage_count: number
  created_at: string
  updated_at: string
}

export interface CarouselItem {
  headline?: string
  description?: string
  image_url?: string
  final_url?: string
  call_to_action?: string
}

export interface AppInfo {
  app_id?: string
  app_name?: string
  url?: string
  icon_url?: string
  rating?: number
  price?: string
  description?: string
}

export interface LeadForm {
  headline?: string
  description?: string
  privacy_policy_url?: string
  fields?: FormField[]
  submit_button_text?: string
  consent_text?: string
}

export interface FormField {
  name: string
  type: 'text' | 'email' | 'phone' | 'number' | 'date' | 'dropdown' | 'checkbox' | 'textarea'
  label: string
  required: boolean
  placeholder?: string
  options?: string[]
  validation?: {
    min_length?: number
    max_length?: number
    pattern?: string
  }
}

export interface ConversionEvent {
  name: string
  type: 'page_view' | 'lead' | 'purchase' | 'add_to_cart' | 'sign_up' | 'download' | 'custom'
  value?: number
  currency?: string
  description?: string
}

export interface AdAccount {
  id: string
  business_id: string
  platform: 'google_ads' | 'facebook_ads' | 'instagram_ads' | 'linkedin_ads' | 'tiktok_ads' | 'twitter_ads' | 'pinterest_ads' | 'microsoft_ads'
  account_id: string
  account_name: string
  currency: string
  timezone: string
  access_token?: string
  refresh_token?: string
  token_expires_at?: string
  is_active: boolean
  is_connected: boolean
  billing_info?: {
    payment_method: string
    billing_threshold?: number
    auto_recharge: boolean
  }
  settings?: {
    auto_optimization: boolean
    bid_strategy: string
    budget_delivery: string
  }
  created_at: string
  updated_at: string
}

export interface AdRule {
  id: string
  business_id: string
  name: string
  description?: string
  type: 'budget' | 'bid' | 'targeting' | 'creative' | 'schedule'
  conditions: RuleCondition[]
  actions: RuleAction[]
  is_active: boolean
  priority: number
  created_at: string
  updated_at: string
}

export interface RuleCondition {
  field: string
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains' | 'not_contains'
  value: any
  logical_operator?: 'and' | 'or'
}

export interface RuleAction {
  type: 'adjust_budget' | 'pause_campaign' | 'send_alert' | 'update_bid' | 'change_targeting'
  parameters?: Record<string, any>
}

export interface AdInsight {
  id: string
  business_id: string
  campaign_id?: string
  type: 'performance' | 'optimization' | 'opportunity' | 'anomaly'
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  confidence: number
  recommendations: string[]
  data?: Record<string, any>
  created_at: string
  is_read: boolean
}
