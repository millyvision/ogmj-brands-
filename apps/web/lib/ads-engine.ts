import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Campaign Management
export async function getCampaigns(businessId: string, filters?: {
  status?: string
  type?: string
  objective?: string
  date_range?: {
    start: string
    end: string
  }
}) {
  let query = supabase
    .from('campaigns')
    .select('*')
    .eq('business_id', businessId)
    .order('created_at', { ascending: false })

  if (filters?.status) {
    query = query.eq('status', filters.status)
  }

  if (filters?.type) {
    query = query.eq('type', filters.type)
  }

  if (filters?.objective) {
    query = query.eq('objective', filters.objective)
  }

  if (filters?.date_range) {
    query = query.gte('created_at', filters.date_range.start)
      .lte('created_at', filters.date_range.end)
  }

  const { data, error } = await query
  if (error) throw error
  return data || []
}

export async function createCampaign(businessId: string, campaignData: any) {
  const { data, error } = await supabase
    .from('campaigns')
    .insert({
      ...campaignData,
      business_id,
      status: 'draft',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateCampaign(campaignId: string, updates: any) {
  const { data, error } = await supabase
    .from('campaigns')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', campaignId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function launchCampaign(campaignId: string) {
  const { data, error } = await supabase
    .from('campaigns')
    .update({
      status: 'active',
      start_date: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq('id', campaignId)
    .select()
    .single()

  if (error) throw error
  return data
}

// Ad Group Management
export async function getAdGroups(campaignId: string) {
  const { data, error } = await supabase
    .from('ad_groups')
    .select('*')
    .eq('campaign_id', campaignId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function createAdGroup(campaignId: string, adGroupData: any) {
  const { data, error } = await supabase
    .from('ad_groups')
    .insert({
      ...adGroupData,
      campaign_id,
      status: 'enabled',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) throw error
  return data
}

// Ad Management
export async function getAds(adGroupId?: string, filters?: {
  status?: string
  campaign_id?: string
}) {
  let query = supabase
    .from('ads')
    .select(`
      *,
      ad_group:ad_groups(id, name, campaign_id),
      campaign:campaigns(id, name, objective)
    `)
    .order('created_at', { ascending: false })

  if (adGroupId) {
    query = query.eq('ad_group_id', adGroupId)
  }

  if (filters?.campaign_id) {
    query = query.eq('campaign_id', filters.campaign_id)
  }

  if (filters?.status) {
    query = query.eq('status', filters.status)
  }

  const { data, error } = await query
  if (error) throw error
  return data || []
}

export async function createAd(adGroupId: string, adData: any) {
  const { data, error } = await supabase
    .from('ads')
    .insert({
      ...adData,
      ad_group_id,
      status: 'enabled',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) throw error
  return data
}

// Creative Management
export async function getCreatives(businessId: string, filters?: {
  type?: string
  search?: string
}) {
  let query = supabase
    .from('creatives')
    .select('*')
    .eq('business_id', businessId)
    .order('created_at', { ascending: false })

  if (filters?.type) {
    query = query.eq('type', filters.type)
  }

  if (filters?.search) {
    query = query.ilike('name', `%${filters.search}%`)
  }

  const { data, error } = await query
  if (error) throw error
  return data || []
}

export async function uploadCreative(businessId: string, creativeData: any) {
  const { data, error } = await supabase
    .from('creatives')
    .insert({
      ...creativeData,
      business_id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) throw error
  return data
}

// Ad Accounts Management
export async function getAdAccounts(businessId: string) {
  const { data, error } = await supabase
    .from('ad_accounts')
    .select('*')
    .eq('business_id', businessId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function connectAdAccount(businessId: string, accountData: any) {
  const { data, error } = await supabase
    .from('ad_accounts')
    .insert({
      ...accountData,
      business_id,
      is_connected: true,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) throw error
  return data
}

// Performance Analytics
export async function getCampaignPerformance(campaignId: string, dateRange?: {
  start: string
  end: string
}) {
  let query = supabase
    .from('campaigns')
    .select('performance')
    .eq('id', campaignId)

  if (dateRange) {
    // This would typically query performance data from a separate analytics table
    // For now, return mock performance data
  }

  const { data, error } = await query
  if (error) throw error
  
  // Mock performance data
  return {
    impressions: 15420,
    clicks: 342,
    ctr: 2.22,
    cpc: 1.45,
    cpm: 8.90,
    spend: 495.67,
    conversions: 23,
    conversion_rate: 6.73,
    cost_per_conversion: 21.55,
    roas: 4.12,
    quality_score: 8.5
  }
}

export async function getAdInsights(businessId: string, filters?: {
  type?: string
  date_range?: {
    start: string
    end: string
  }
}) {
  // Mock insights data - in production, this would use AI/ML to generate insights
  const insights = [
    {
      id: '1',
      type: 'performance',
      title: 'High CTR Detected',
      description: 'Your ad group "Summer Sale" has a CTR of 3.2%, significantly above the industry average of 1.8%',
      impact: 'high',
      confidence: 0.92,
      recommendations: [
        'Increase budget for this ad group',
        'Test similar ad creatives',
        'Expand targeting to include similar audiences'
      ]
    },
    {
      id: '2',
      type: 'optimization',
      title: 'Budget Optimization Opportunity',
      description: 'AI analysis suggests reallocating 20% of budget from underperforming ads to top performers',
      impact: 'medium',
      confidence: 0.87,
      recommendations: [
        'Reduce budget for "Brand Awareness" campaign by 30%',
        'Increase budget for "Product Launch" campaign by 20%',
        'Enable auto-optimization for better performance'
      ]
    },
    {
      id: '3',
      type: 'opportunity',
      title: 'New Audience Segment Identified',
      description: 'Users aged 25-34 who engaged with your content have 3x higher conversion rates',
      impact: 'medium',
      confidence: 0.78,
      recommendations: [
        'Create targeted campaign for this segment',
        'Develop specific messaging for this demographic',
        'Test different ad formats for this audience'
      ]
    }
  ]

  return insights
}

// Ad Rules Automation
export async function getAdRules(businessId: string) {
  const { data, error } = await supabase
    .from('ad_rules')
    .select('*')
    .eq('business_id', businessId)
    .eq('is_active', true)
    .order('priority', { ascending: false })

  if (error) throw error
  return data || []
}

export async function createAdRule(businessId: string, ruleData: any) {
  const { data, error } = await supabase
    .from('ad_rules')
    .insert({
      ...ruleData,
      business_id,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) throw error
  return data
}

// Budget Management
export async function updateCampaignBudget(campaignId: string, budget: number, type: 'daily' | 'lifetime') {
  const { data, error } = await supabase
    .from('campaigns')
    .update({
      budget: {
        amount: budget,
        currency: 'USD',
        type: type
      },
      updated_at: new Date().toISOString()
    })
    .eq('id', campaignId)
    .select()
    .single()

  if (error) throw error
  return data
}

// Targeting Optimization
export async function getTargetingRecommendations(campaignId: string) {
  // Mock AI-powered targeting recommendations
  return {
    demographics: {
      age_ranges: [
        { min: 18, max: 24, confidence: 0.85, reason: 'High engagement in this age group' },
        { min: 25, max: 34, confidence: 0.78, reason: 'Higher conversion rates' },
        { min: 35, max: 44, confidence: 0.72, reason: 'Purchasing power' }
      ],
      genders: [
        { gender: 'female', confidence: 0.82, reason: '65% of conversions from female audience' },
        { gender: 'male', confidence: 0.68, reason: 'Balanced performance' }
      ],
      locations: [
        { city: 'New York', confidence: 0.91, reason: 'High engagement from metro area' },
        { city: 'Los Angeles', confidence: 0.87, reason: 'Large market with good performance' },
        { city: 'Chicago', confidence: 0.73, reason: 'Emerging market opportunity' }
      ]
    },
    interests: [
      { interest: 'digital_marketing', confidence: 0.88, reason: 'High relevance to campaign content' },
      { interest: 'entrepreneurship', confidence: 0.84, reason: 'Strong alignment with business objectives' },
      { interest: 'technology', confidence: 0.79, reason: 'Good performance in previous campaigns' },
      { interest: 'business_services', confidence: 0.76, reason: 'Consistent conversions' }
    ],
    devices: [
      { device: 'mobile', confidence: 0.92, reason: '70% of traffic from mobile' },
      { device: 'desktop', confidence: 0.68, reason: 'Higher conversion rates on desktop' }
    ]
  }
}
