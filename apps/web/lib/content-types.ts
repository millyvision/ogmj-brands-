export interface Content {
  id: string
  business_id: string
  title: string
  description?: string
  content: string
  type: 'blog' | 'social' | 'email' | 'landing' | 'product' | 'service'
  status: 'draft' | 'scheduled' | 'published' | 'archived'
  visibility: 'public' | 'private' | 'unlisted'
  slug?: string
  featured_image?: string
  images?: string[]
  tags: string[]
  categories: string[]
  seo?: {
    meta_title?: string
    meta_description?: string
    keywords?: string[]
    og_image?: string
  }
  social?: {
    platforms: string[]
    scheduled_date?: string
    published_at?: Record<string, string>
    engagement?: {
      likes?: number
      comments?: number
      shares?: number
      clicks?: number
    }
  }
  analytics?: {
    views: number
    unique_views: number
    read_time?: number
    bounce_rate?: number
    conversion_rate?: number
  }
  author_id?: string
  created_at: string
  updated_at: string
  published_at?: string
}

export interface ContentTemplate {
  id: string
  business_id: string
  name: string
  description?: string
  type: 'social' | 'email' | 'blog'
  content: string
  variables: ContentVariable[]
  thumbnail?: string
  category: string
  tags: string[]
  is_active: boolean
  usage_count: number
  created_at: string
  updated_at: string
}

export interface ContentVariable {
  name: string
  type: 'text' | 'image' | 'video' | 'link' | 'date'
  default_value?: string
  required: boolean
  description?: string
}

export interface SocialAccount {
  id: string
  business_id: string
  platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'tiktok' | 'youtube' | 'pinterest'
  account_name: string
  account_id: string
  access_token?: string
  refresh_token?: string
  token_expires_at?: string
  is_active: boolean
  is_connected: boolean
  profile_data?: {
    username?: string
    display_name?: string
    profile_image?: string
    followers?: number
    following?: number
    verified?: boolean
  }
  settings?: {
    auto_post: boolean
    post_frequency: string
    best_times: string[]
    hashtags: boolean
    mentions: boolean
  }
  created_at: string
  updated_at: string
}

export interface SocialPost {
  id: string
  business_id: string
  account_id: string
  content_id?: string
  platform: string
  post_id: string
  content: string
  media_urls?: string[]
  hashtags?: string[]
  mentions?: string[]
  status: 'draft' | 'scheduled' | 'posted' | 'failed'
  scheduled_date?: string
  posted_date?: string
  engagement?: {
    likes?: number
    comments?: number
    shares?: number
    clicks?: number
    impressions?: number
    reach?: number
  }
  analytics?: {
    click_through_rate?: number
    engagement_rate?: number
    best_posting_time?: string
  }
  created_at: string
  updated_at: string
}

export interface ContentCalendar {
  id: string
  business_id: string
  date: string
  posts: ScheduledPost[]
  notes?: string
  created_at: string
  updated_at: string
}

export interface ScheduledPost {
  id: string
  content_id?: string
  platform: string
  time: string
  type: 'post' | 'story' | 'reel' | 'video'
  content: string
  media_urls?: string[]
  status: 'scheduled' | 'posted' | 'failed'
}

export interface MediaLibrary {
  id: string
  business_id: string
  name: string
  type: 'image' | 'video' | 'document' | 'audio'
  file_url: string
  file_size: number
  mime_type: string
  dimensions?: {
    width: number
    height: number
  }
  duration?: number
  thumbnail_url?: string
  tags: string[]
  usage_count: number
  created_at: string
  updated_at: string
}

export interface ContentWorkflow {
  id: string
  business_id: string
  name: string
  description?: string
  steps: WorkflowStep[]
  triggers: WorkflowTrigger[]
  is_active: boolean
  execution_count: number
  created_at: string
  updated_at: string
}

export interface WorkflowStep {
  id: string
  workflow_id: string
  name: string
  description?: string
  action: 'create_content' | 'schedule_post' | 'send_email' | 'publish_post' | 'generate_ai_content'
  parameters?: Record<string, any>
  order: number
}

export interface WorkflowTrigger {
  id: string
  workflow_id: string
  type: 'manual' | 'scheduled' | 'webhook' | 'content_published'
  config?: Record<string, any>
  is_active: boolean
}
