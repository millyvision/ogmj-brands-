import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Content Management
export async function getContent(businessId: string, filters?: {
  type?: string
  status?: string
  search?: string
  tags?: string[]
}) {
  let query = supabase
    .from('content')
    .select(`
      *,
      author:author_id(name, email, avatar_url)
    `)
    .eq('business_id', businessId)
    .order('created_at', { ascending: false })

  if (filters?.type) {
    query = query.eq('type', filters.type)
  }

  if (filters?.status) {
    query = query.eq('status', filters.status)
  }

  if (filters?.search) {
    query = query.or(`title.ilike.%${filters.search}%,content.ilike.%${filters.search}%`)
  }

  if (filters?.tags && filters.tags.length > 0) {
    query = query.contains('tags', filters.tags)
  }

  const { data, error } = await query
  if (error) throw error
  return data || []
}

export async function createContent(businessId: string, contentData: any) {
  const { data, error } = await supabase
    .from('content')
    .insert({
      ...contentData,
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

export async function updateContent(contentId: string, updates: any) {
  const { data, error } = await supabase
    .from('content')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', contentId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteContent(contentId: string) {
  const { data, error } = await supabase
    .from('content')
    .delete()
    .eq('id', contentId)

  if (error) throw error
  return data
}

// Social Media Management
export async function getSocialAccounts(businessId: string) {
  const { data, error } = await supabase
    .from('social_accounts')
    .select('*')
    .eq('business_id', businessId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function connectSocialAccount(businessId: string, accountData: any) {
  const { data, error } = await supabase
    .from('social_accounts')
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

export async function getSocialPosts(businessId: string, filters?: {
  account_id?: string
  platform?: string
  status?: string
  date_range?: {
    start: string
    end: string
  }
}) {
  let query = supabase
    .from('social_posts')
    .select(`
      *,
      account:account_id(platform, account_name, profile_data)
    `)
    .eq('business_id', businessId)
    .order('created_at', { ascending: false })

  if (filters?.account_id) {
    query = query.eq('account_id', filters.account_id)
  }

  if (filters?.platform) {
    query = query.eq('platform', filters.platform)
  }

  if (filters?.status) {
    query = query.eq('status', filters.status)
  }

  if (filters?.date_range) {
    query = query.gte('created_at', filters.date_range.start)
      .lte('created_at', filters.date_range.end)
  }

  const { data, error } = await query
  if (error) throw error
  return data || []
}

export async function createSocialPost(businessId: string, postData: any) {
  const { data, error } = await supabase
    .from('social_posts')
    .insert({
      ...postData,
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

export async function scheduleSocialPost(postId: string, scheduledDate: string) {
  const { data, error } = await supabase
    .from('social_posts')
    .update({
      status: 'scheduled',
      scheduled_date: scheduledDate,
      updated_at: new Date().toISOString()
    })
    .eq('id', postId)
    .select()
    .single()

  if (error) throw error
  return data
}

// Media Library
export async function getMediaLibrary(businessId: string, filters?: {
  type?: string
  search?: string
  tags?: string[]
}) {
  let query = supabase
    .from('media_library')
    .select('*')
    .eq('business_id', businessId)
    .order('created_at', { ascending: false })

  if (filters?.type) {
    query = query.eq('type', filters.type)
  }

  if (filters?.search) {
    query = query.ilike('name', `%${filters.search}%`)
  }

  if (filters?.tags && filters.tags.length > 0) {
    query = query.contains('tags', filters.tags)
  }

  const { data, error } = await query
  if (error) throw error
  return data || []
}

export async function uploadMedia(businessId: string, mediaData: any) {
  const { data, error } = await supabase
    .from('media_library')
    .insert({
      ...mediaData,
      business_id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) throw error
  return data
}

// Content Templates
export async function getContentTemplates(businessId: string, filters?: {
  type?: string
  category?: string
}) {
  let query = supabase
    .from('content_templates')
    .select('*')
    .eq('business_id', businessId)
    .eq('is_active', true)
    .order('usage_count', { ascending: false })

  if (filters?.type) {
    query = query.eq('type', filters.type)
  }

  if (filters?.category) {
    query = query.eq('category', filters.category)
  }

  const { data, error } = await query
  if (error) throw error
  return data || []
}

// Content Calendar
export async function getContentCalendar(businessId: string, dateRange: {
  start: string
  end: string
}) {
  const { data, error } = await supabase
    .from('content_calendar')
    .select('*')
    .eq('business_id', businessId)
    .gte('date', dateRange.start)
    .lte('date', dateRange.end)
    .order('date', { ascending: true })

  if (error) throw error
  return data || []
}

export async function createContentCalendarEntry(businessId: string, calendarData: any) {
  const { data, error } = await supabase
    .from('content_calendar')
    .insert({
      ...calendarData,
      business_id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) throw error
  return data
}

// Content Analytics
export async function getContentAnalytics(businessId: string, filters?: {
  content_id?: string
  date_range?: {
    start: string
    end: string
  }
}) {
  let query = supabase
    .from('content')
    .select('analytics')
    .eq('business_id', businessId)

  if (filters?.content_id) {
    query = query.eq('id', filters.content_id)
  }

  if (filters?.date_range) {
    query = query.gte('created_at', filters.date_range.start)
      .lte('created_at', filters.date_range.end)
  }

  const { data, error } = await query
  if (error) throw error
  return data || []
}

// AI Content Generation
export async function generateAIContent(prompt: string, options?: {
  type?: 'blog' | 'social' | 'email'
  tone?: 'professional' | 'casual' | 'friendly' | 'urgent'
  length?: 'short' | 'medium' | 'long'
  include_hashtags?: boolean
  include_emojis?: boolean
}) {
  // This would integrate with an AI service like OpenAI
  // For now, return a mock response
  const generatedContent = {
    title: options?.type === 'blog' ? '5 Tips for Growing Your Business in 2024' : 'Boost Your Business Today!',
    content: generateContentBasedOnPrompt(prompt, options),
    hashtags: options?.include_hashtags ? generateHashtags(prompt) : [],
    suggested_images: options?.type === 'social' ? ['image1.jpg', 'image2.jpg'] : [],
    seo_description: generateSEODescription(prompt)
  }

  return generatedContent
}

function generateContentBasedOnPrompt(prompt: string, options?: any): string {
  // Mock AI content generation - in production, this would call an AI API
  const templates = {
    blog: `Based on your request about "${prompt}", here's a comprehensive blog post that will engage your audience and drive results.`,
    social: `🚀 ${prompt} - Ready to transform your business! #business #growth #success`,
    email: `Hi there! I wanted to share some exciting updates about ${prompt}. Let's connect soon!`
  }

  return templates[options?.type || 'blog'] || templates.blog
}

function generateHashtags(prompt: string): string[] {
  // Mock hashtag generation
  const baseHashtags = ['#business', '#entrepreneur', '#growth', '#success']
  const promptHashtags = prompt.split(' ').map(word => `#${word.replace(/[^a-zA-Z0-9]/g, '')}`)
  
  return [...new Set([...baseHashtags, ...promptHashtags])].slice(0, 10)
}

function generateSEODescription(prompt: string): string {
  // Mock SEO description generation
  return `Discover everything you need to know about ${prompt}. Expert insights, tips, and strategies to help you succeed.`
}
