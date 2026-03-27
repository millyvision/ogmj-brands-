export interface AnalyticsDashboard {
  id: string
  business_id: string
  name: string
  description?: string
  type: 'revenue' | 'traffic' | 'conversion' | 'engagement' | 'performance' | 'custom'
  widgets: DashboardWidget[]
  layout: {
    columns: number
    rows: number
    widgets: WidgetPosition[]
  }
  filters: DashboardFilter[]
  date_range: {
    preset: 'today' | 'yesterday' | 'last_7_days' | 'last_30_days' | 'last_90_days' | 'last_12_months' | 'custom'
    start_date?: string
    end_date?: string
  }
  sharing: {
    is_public: boolean
    share_url?: string
    allowed_emails?: string[]
    password?: string
  }
  created_at: string
  updated_at: string
}

export interface DashboardWidget {
  id: string
  type: 'metric' | 'chart' | 'table' | 'funnel' | 'heatmap' | 'map' | 'text' | 'alert'
  title: string
  description?: string
  position: {
    x: number
    y: number
    width: number
    height: number
  }
  config: {
    metric?: string
    chart_type?: 'line' | 'bar' | 'pie' | 'area' | 'scatter' | 'gauge'
    data_source?: string
    filters?: Record<string, any>
    refresh_interval?: number
    comparison?: {
      enabled: boolean
      period?: 'previous_period' | 'same_period_last_year'
    }
  }
  data?: any
  last_updated?: string
}

export interface WidgetPosition {
  widget_id: string
  x: number
  y: number
  width: number
  height: number
}

export interface DashboardFilter {
  id: string
  name: string
  type: 'date_range' | 'segment' | 'property' | 'custom'
  field: string
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than' | 'between'
  value?: any
  options?: string[]
  is_required: boolean
}

export interface AnalyticsEvent {
  id: string
  business_id: string
  event_name: string
  event_type: 'page_view' | 'user_action' | 'conversion' | 'custom_event'
  properties: Record<string, any>
  user_id?: string
  session_id?: string
  timestamp: string
  device?: {
    type: 'desktop' | 'mobile' | 'tablet'
    os?: string
    browser?: string
    screen_resolution?: string
  }
  location?: {
    country?: string
    region?: string
    city?: string
    ip_address?: string
  }
  utm?: {
    source?: string
    medium?: string
    campaign?: string
    term?: string
    content?: string
  }
  value?: number
  currency?: string
}

export interface AnalyticsReport {
  id: string
  business_id: string
  name: string
  description?: string
  type: 'traffic' | 'conversion' | 'revenue' | 'engagement' | 'retention' | 'custom'
  format: 'pdf' | 'excel' | 'csv' | 'json'
  schedule: {
    enabled: boolean
    frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly'
    recipients: string[]
    next_run?: string
  }
  filters: ReportFilter[]
  metrics: string[]
  dimensions: string[]
  created_at: string
  updated_at: string
}

export interface ReportFilter {
  field: string
  operator: string
  value: any
}

export interface AnalyticsFunnel {
  id: string
  business_id: string
  name: string
  description?: string
  steps: FunnelStep[]
  conversion_window: {
    type: 'time' | 'sessions'
    value: number
  }
  created_at: string
  updated_at: string
}

export interface FunnelStep {
  id: string
  funnel_id: string
  name: string
  description?: string
  event_name?: string
  conditions?: StepCondition[]
  order: number
}

export interface StepCondition {
  field: string
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than'
  value: any
}

export interface AnalyticsSegment {
  id: string
  business_id: string
  name: string
  description?: string
  type: 'static' | 'dynamic'
  definition: {
    rules: SegmentRule[]
    conditions?: SegmentCondition[]
  }
  user_count?: number
  created_at: string
  updated_at: string
}

export interface SegmentRule {
  field: string
  operator: string
  value: any
  logical_operator?: 'and' | 'or'
}

export interface SegmentCondition {
  type: 'behavior' | 'demographic' | 'technographic' | 'custom'
  field: string
  operator: string
  value: any
}

export interface AnalyticsAlert {
  id: string
  business_id: string
  name: string
  description?: string
  type: 'metric' | 'anomaly' | 'trend' | 'custom'
  metric: string
  condition: {
    operator: 'greater_than' | 'less_than' | 'equals' | 'not_equals' | 'percentage_change'
    value: number
    time_period?: number
  }
  notification: {
    channels: ('email' | 'slack' | 'webhook' | 'sms')[]
    recipients: string[]
    template?: string
    frequency?: 'immediate' | 'daily' | 'weekly'
  }
  is_active: boolean
  last_triggered?: string
  created_at: string
  updated_at: string
}

export interface AnalyticsInsight {
  id: string
  business_id: string
  title: string
  description: string
  type: 'opportunity' | 'risk' | 'trend' | 'anomaly' | 'prediction'
  impact: 'high' | 'medium' | 'low'
  confidence: number
  data?: Record<string, any>
  recommendations: string[]
  created_at: string
  is_read: boolean
}

export interface AnalyticsGoal {
  id: string
  business_id: string
  name: string
  description?: string
  type: 'revenue' | 'users' | 'sessions' | 'conversion' | 'engagement' | 'custom'
  target_value: number
  current_value?: number
  progress?: number
  period: {
    type: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'
    start_date?: string
    end_date?: string
  }
  created_at: string
  updated_at: string
}
