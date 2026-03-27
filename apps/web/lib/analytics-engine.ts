import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Event Tracking
export async function trackEvent(businessId: string, eventData: any) {
  const { data, error } = await supabase
    .from('analytics_events')
    .insert({
      ...eventData,
      business_id,
      timestamp: new Date().toISOString()
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getEvents(businessId: string, filters?: {
  event_name?: string
  event_type?: string
  date_range?: {
    start: string
    end: string
  }
  user_id?: string
}) {
  let query = supabase
    .from('analytics_events')
    .select('*')
    .eq('business_id', businessId)
    .order('timestamp', { ascending: false })

  if (filters?.event_name) {
    query = query.eq('event_name', filters.event_name)
  }

  if (filters?.event_type) {
    query = query.eq('event_type', filters.event_type)
  }

  if (filters?.user_id) {
    query = query.eq('user_id', filters.user_id)
  }

  if (filters?.date_range) {
    query = query.gte('timestamp', filters.date_range.start)
      .lte('timestamp', filters.date_range.end)
  }

  const { data, error } = await query
  if (error) throw error
  return data || []
}

// Dashboard Management
export async function getDashboards(businessId: string) {
  const { data, error } = await supabase
    .from('analytics_dashboards')
    .select(`
      *,
      widgets:dashboard_widgets(*)
    `)
    .eq('business_id', businessId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function createDashboard(businessId: string, dashboardData: any) {
  const { data, error } = await supabase
    .from('analytics_dashboards')
    .insert({
      ...dashboardData,
      business_id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateDashboard(dashboardId: string, updates: any) {
  const { data, error } = await supabase
    .from('analytics_dashboards')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', dashboardId)
    .select()
    .single()

  if (error) throw error
  return data
}

// Analytics Data Processing
export async function getTrafficAnalytics(businessId: string, dateRange: {
  start: string
  end: string
}) {
  // Mock analytics data - in production, this would query aggregated analytics tables
  return {
    sessions: 12450,
    users: 8932,
    pageviews: 45678,
    bounce_rate: 32.4,
    avg_session_duration: 245,
    pages_per_session: 3.67,
    new_vs_returning: {
      new: 3456,
      returning: 5476
    },
    traffic_sources: [
      { source: 'organic', sessions: 5234, percentage: 42.1 },
      { source: 'direct', sessions: 3421, percentage: 27.5 },
      { source: 'social', sessions: 2156, percentage: 17.3 },
      { source: 'referral', sessions: 1239, percentage: 10.0 },
      { source: 'email', sessions: 402, percentage: 3.2 }
    ],
    devices: [
      { device: 'desktop', sessions: 7823, percentage: 62.8 },
      { device: 'mobile', sessions: 4234, percentage: 34.0 },
      { device: 'tablet', sessions: 393, percentage: 3.2 }
    ],
    top_pages: [
      { page: '/dashboard', views: 12345, percentage: 27.0 },
      { page: '/products', views: 8976, percentage: 19.6 },
      { page: '/about', views: 6543, percentage: 14.3 },
      { page: '/contact', views: 4321, percentage: 9.5 },
      { page: '/blog', views: 3876, percentage: 8.5 }
    ],
    geographic: [
      { country: 'United States', sessions: 7823, percentage: 62.8 },
      { country: 'Canada', sessions: 1567, percentage: 12.6 },
      { country: 'United Kingdom', sessions: 1234, percentage: 9.9 },
      { country: 'Australia', sessions: 876, percentage: 7.0 },
      { country: 'Germany', sessions: 950, percentage: 7.6 }
    ]
  }
}

export async function getConversionAnalytics(businessId: string, dateRange: {
  start: string
  end: string
}) {
  return {
    total_conversions: 1247,
    conversion_rate: 3.2,
    revenue: $45678,
    cost_per_acquisition: 23.45,
    customer_lifetime_value: 156.78,
    funnels: [
      {
        name: 'E-commerce Purchase',
        steps: ['Product View', 'Add to Cart', 'Checkout', 'Purchase'],
        conversion_rate: 2.8,
        total_conversions: 892,
        revenue: $34567
      },
      {
        name: 'Lead Generation',
        steps: ['Landing Page', 'Form Fill', 'Lead Submitted'],
        conversion_rate: 12.4,
        total_conversions: 355,
        revenue: $11111
      }
    ],
    conversion_sources: [
      { source: 'Google Ads', conversions: 445, revenue: $22334, percentage: 48.9 },
      { source: 'Facebook Ads', conversions: 234, revenue: $12345, percentage: 27.0 },
      { source: 'Organic Search', conversions: 189, revenue: $8976, percentage: 15.2 },
      { source: 'Email Marketing', conversions: 156, revenue: $6789, percentage: 12.5 },
      { source: 'Direct', conversions: 123, revenue: $4567, percentage: 9.9 }
    ],
    top_converting_pages: [
      { page: '/product/premium-plan', conversions: 234, conversion_rate: 8.9 },
      { page: '/landing/special-offer', conversions: 189, conversion_rate: 7.2 },
      { page: '/checkout', conversions: 156, conversion_rate: 5.9 }
    ]
  }
}

export async function getRevenueAnalytics(businessId: string, dateRange: {
  start: string
  end: string
}) {
  return {
    total_revenue: $45678,
    recurring_revenue: $12345,
    one_time_revenue: $33333,
    average_order_value: $89.45,
    revenue_by_product: [
      { product: 'Premium Plan', revenue: $23456, percentage: 51.3 },
      { product: 'Professional Services', revenue: $15678, percentage: 34.3 },
      { product: 'Add-on Features', revenue: $6544, percentage: 14.3 }
    ],
    revenue_by_month: [
      { month: '2024-01', revenue: $3456 },
      { month: '2024-02', revenue: $3789 },
      { month: '2024-03', revenue: $4234 },
      { month: '2024-04', revenue: $4567 },
      { month: '2024-05', revenue: $4890 },
      { month: '2024-06', revenue: $5234 }
    ],
    customer_segments: [
      { segment: 'Enterprise', revenue: $23456, customers: 45, avg_revenue: $521.24 },
      { segment: 'Small Business', revenue: $15678, customers: 234, avg_revenue: $67.01 },
      { segment: 'Individual', revenue: $6544, customers: 567, avg_revenue: $11.54 }
    ],
    churn_analysis: {
      total_customers: 846,
      churned_customers: 23,
      churn_rate: 2.7,
      revenue_lost: $1234,
      churn_by_segment: [
        { segment: 'Enterprise', churn_rate: 1.1 },
        { segment: 'Small Business', churn_rate: 3.2 },
        { segment: 'Individual', churn_rate: 4.8 }
      ]
    }
  }
}

export async function getEngagementAnalytics(businessId: string, dateRange: {
  start: string
  end: string
}) {
  return {
    total_sessions: 12450,
    engaged_sessions: 8932,
    engagement_rate: 71.7,
    avg_session_duration: 245,
    pages_per_session: 3.67,
    bounce_rate: 32.4,
    top_events: [
      { event: 'Button Click', count: 5678, percentage: 23.4 },
      { event: 'Form Submission', count: 2345, percentage: 9.7 },
      { event: 'Video Play', count: 1890, percentage: 7.8 },
      { event: 'Download', count: 1234, percentage: 5.1 }
    ],
    user_retention: {
      day_1: 100,
      day_7: 78.5,
      day_30: 65.2,
      day_90: 45.7
    },
    feature_adoption: [
      { feature: 'Dashboard', adoption_rate: 89.2 },
      { feature: 'Analytics', adoption_rate: 67.8 },
      { feature: 'Reports', adoption_rate: 45.3 },
      { feature: 'API', adoption_rate: 23.1 }
    ],
    content_performance: [
      { content: 'Blog Posts', avg_engagement: 4.2, total_views: 45678 },
      { content: 'Videos', avg_engagement: 6.8, total_views: 23456 },
      { content: 'Downloads', avg_engagement: 2.1, total_downloads: 12345 }
    ]
  }
}

// Segmentation
export async function getSegments(businessId: string) {
  const { data, error } = await supabase
    .from('analytics_segments')
    .select('*')
    .eq('business_id', businessId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function createSegment(businessId: string, segmentData: any) {
  const { data, error } = await supabase
    .from('analytics_segments')
    .insert({
      ...segmentData,
      business_id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getSegmentUsers(businessId: string, segmentId: string) {
  // Mock segment user data - in production, this would query user data based on segment rules
  return {
    total_users: 2345,
    sample_users: [
      { id: '1', name: 'John Doe', email: 'john@example.com', properties: { plan: 'premium', join_date: '2024-01-15' } },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', properties: { plan: 'professional', join_date: '2024-02-20' } },
      { id: '3', name: 'Bob Johnson', email: 'bob@example.com', properties: { plan: 'basic', join_date: '2024-03-10' } }
    ],
    segment_criteria: {
      rules: [
        { field: 'plan', operator: 'equals', value: 'premium' },
        { field: 'join_date', operator: 'greater_than', value: '2024-01-01' }
      ]
    }
  }
}

// Reports
export async function getReports(businessId: string) {
  const { data, error } = await supabase
    .from('analytics_reports')
    .select('*')
    .eq('business_id', businessId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function createReport(businessId: string, reportData: any) {
  const { data, error } = await supabase
    .from('analytics_reports')
    .insert({
      ...reportData,
      business_id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function generateReport(businessId: string, reportId: string, format: 'pdf' | 'excel' | 'csv') {
  // Mock report generation - in production, this would generate actual reports
  return {
    file_url: `https://example.com/reports/${reportId}.${format}`,
    file_size: 1024567,
    generated_at: new Date().toISOString()
  }
}

// Goals
export async function getGoals(businessId: string) {
  const { data, error } = await supabase
    .from('analytics_goals')
    .select('*')
    .eq('business_id', businessId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function createGoal(businessId: string, goalData: any) {
  const { data, error } = await supabase
    .from('analytics_goals')
    .insert({
      ...goalData,
      business_id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateGoalProgress(goalId: string, current_value: number) {
  const progress = Math.min((current_value / 100) * 100, 100)
  
  const { data, error } = await supabase
    .from('analytics_goals')
    .update({
      current_value,
      progress,
      updated_at: new Date().toISOString()
    })
    .eq('id', goalId)
    .select()
    .single()

  if (error) throw error
  return data
}

// AI-Powered Insights
export async function generateInsights(businessId: string, type: 'opportunity' | 'risk' | 'trend' | 'prediction') {
  // Mock AI insights generation - in production, this would use ML/AI to generate insights
  const insights = {
    opportunity: [
      {
        title: 'High-Value Customer Segment Identified',
        description: 'Users who have viewed pricing pages 3+ times in the last 30 days have 4x higher conversion rates',
        impact: 'high',
        confidence: 0.87,
        recommendations: [
          'Create targeted campaign for this segment',
          'Offer personalized discounts',
          'Implement retargeting ads'
        ],
        data: {
          segment_size: 1234,
          potential_revenue: '$45,678',
          conversion_rate: 8.9
        }
      },
      {
        title: 'Optimal Pricing Opportunity',
        description: 'AI analysis suggests a 15% price increase could maximize revenue without significant churn',
        impact: 'medium',
        confidence: 0.78,
        recommendations: [
          'Test price increase on 10% of traffic',
          'Monitor conversion rates closely',
          'Prepare customer communication strategy'
        ],
        data: {
          estimated_revenue_increase: '$12,345',
          risk_level: 'low',
          implementation_complexity: 'medium'
        }
      }
    ],
    risk: [
      {
        title: 'Churn Risk Increase Detected',
        description: 'Customer engagement has declined 23% in the last 14 days, indicating potential churn risk',
        impact: 'high',
        confidence: 0.92,
        recommendations: [
          'Launch retention campaign immediately',
          'Offer personalized incentives',
          'Schedule customer success calls'
        ],
        data: {
          at_risk_customers: 45,
          potential_revenue_loss: '$23,456',
          urgency_level: 'high'
        }
      }
    ],
    trend: [
      {
        title: 'Mobile Traffic Surge',
        description: 'Mobile traffic has increased 45% month-over-month, driven by social media campaigns',
        impact: 'medium',
        confidence: 0.85,
        recommendations: [
          'Optimize mobile experience',
          'Increase mobile ad spend',
          'Create mobile-specific content'
        ],
        data: {
          traffic_increase: '45%',
          source_channels: ['Instagram', 'TikTok'],
          conversion_rate_change: '+2.3%'
        }
      }
    ],
    prediction: [
      {
        title: 'Q4 Revenue Forecast',
        description: 'Based on current trends and historical data, Q4 revenue is projected to increase 28%',
        impact: 'high',
        confidence: 0.79,
        recommendations: [
          'Scale customer support for Q4',
          'Prepare inventory for increased demand',
          'Plan marketing budget allocation'
        ],
        data: {
          projected_revenue: '$156,789',
          confidence_interval: ['$134,567', '$178,901'],
          key_drivers: ['Holiday season', 'New product launch']
        }
      }
    ]
  }

  return insights[type] || []
}
