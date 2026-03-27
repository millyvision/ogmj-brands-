'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ogmj/ui'
import { Button } from '@ogmj/ui'
import { Input } from '@ogmj/ui'
import { Textarea } from '@ogmj/ui'
import { Badge } from '@ogmj/ui'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ogmj/ui'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ogmj/ui'
import { useAuthStore } from '@/store/auth-store'
import { getContent, createContent, updateContent, deleteContent } from '@/lib/content-engine'
import { getSocialAccounts, createSocialPost, scheduleSocialPost } from '@/lib/content-engine'
import type { Content, SocialAccount } from '@/lib/content-types'

export default function ContentPage() {
  const { user } = useAuthStore()
  const [content, setContent] = useState<Content[]>([])
  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('content')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingContent, setEditingContent] = useState<Content | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    type: 'blog',
    status: 'draft',
    visibility: 'public',
    tags: []
  })

  useEffect(() => {
    if (user) {
      loadData()
    }
  }, [user, activeTab])

  const loadData = async () => {
    try {
      setLoading(true)
      if (activeTab === 'content') {
        const data = await getContent(user?.business_id || '')
        setContent(data)
      } else if (activeTab === 'social') {
        const data = await getSocialAccounts(user?.business_id || '')
        setSocialAccounts(data)
      }
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateContent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user?.business_id) return

    try {
      await createContent(user.business_id, formData)
      setFormData({
        title: '',
        description: '',
        content: '',
        type: 'blog',
        status: 'draft',
        visibility: 'public',
        tags: []
      })
      setShowCreateModal(false)
      await loadData()
    } catch (error) {
      console.error('Error creating content:', error)
    }
  }

  const handleUpdateContent = async (contentId: string, updates: Partial<Content>) => {
    try {
      await updateContent(contentId, updates)
      await loadData()
      setEditingContent(null)
    } catch (error) {
      console.error('Error updating content:', error)
    }
  }

  const handleDeleteContent = async (contentId: string) => {
    if (!confirm('Are you sure you want to delete this content?')) return

    try {
      await deleteContent(contentId)
      await loadData()
    } catch (error) {
      console.error('Error deleting content:', error)
    }
  }

  const handleConnectSocial = async (platform: string) => {
    // Mock social connection - in production, this would handle OAuth flow
    console.log(`Connecting to ${platform}...`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'gray'
      case 'scheduled': return 'yellow'
      case 'published': return 'emerald'
      case 'archived': return 'blue'
      default: return 'gray'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'draft': return 'Draft'
      case 'scheduled': return 'Scheduled'
      case 'published': return 'Published'
      case 'archived': return 'Archived'
      default: return status
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent border-r-transparent animate-spin rounded-full"></div>
          <p className="mt-4">Loading content...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Content & Social</h1>
          <div className="flex space-x-4">
            <Button onClick={() => setShowCreateModal(true)} className="premium">
              Create Content
            </Button>
            <Button variant="outline">
              AI Assistant
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            {/* Content Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="glass-dark border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Total Content</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-emerald-400">24</div>
                  <div className="text-gray-400 text-sm">+8 this month</div>
                </CardContent>
              </Card>
              <Card className="glass-dark border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Published</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-white">18</div>
                  <div className="text-gray-400 text-sm">+6 this month</div>
                </CardContent>
              </Card>
              <Card className="glass-dark border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Scheduled</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">6</div>
                  <div className="text-gray-400 text-sm">Next 7 days</div>
                </CardContent>
              </Card>
              <Card className="glass-dark border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Engagement</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-blue-400">4.2%</div>
                  <div className="text-gray-400 text-sm">+0.8% this month</div>
                </CardContent>
              </Card>
            </div>

            {/* Content List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {content.map((item) => (
                <Card key={item.id} className="glass-dark border-gray-800 hover:border-emerald-500/40 transition-all duration-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Badge variant={getStatusColor(item.status) as any} className="text-xs mb-2">
                          {getStatusText(item.status)}
                        </Badge>
                        <CardTitle className="text-white line-clamp-2">{item.title}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {item.description}
                        </CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setEditingContent(item)}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {/* View analytics */}}
                        >
                          Analytics
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2 text-gray-300 text-sm">
                      <span>📄</span>
                      <span>{item.type}</span>
                      <span>•</span>
                      <span>{item.visibility}</span>
                    </div>
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="text-gray-300 text-sm">
                        <span>Views:</span>
                        <span className="text-white font-medium ml-1">{item.analytics?.views || 0}</span>
                      </div>
                      <div className="text-gray-300 text-sm">
                        <span>Engagement:</span>
                        <span className="text-emerald-400 font-medium ml-1">{item.analytics?.read_time || 0}%</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {/* Preview */}}
                      >
                        Preview
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {/* Share */}}
                      >
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="social" className="space-y-6">
            {/* Social Accounts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { platform: 'facebook', name: 'Facebook', icon: '📘', color: 'blue' },
                { platform: 'twitter', name: 'Twitter', icon: '🐦', color: 'sky' },
                { platform: 'instagram', name: 'Instagram', icon: '📷', color: 'pink' },
                { platform: 'linkedin', name: 'LinkedIn', icon: '💼', color: 'blue' },
                { platform: 'tiktok', name: 'TikTok', icon: '🎵', color: 'black' },
                { platform: 'youtube', name: 'YouTube', icon: '📺', color: 'red' },
                { platform: 'pinterest', name: 'Pinterest', icon: '📌', color: 'red' }
              ].map((social) => {
                const isConnected = socialAccounts.some(acc => acc.platform === social.platform)
                return (
                  <Card key={social.platform} className={`glass-dark border-gray-800 ${isConnected ? 'border-emerald-500/40' : 'border-gray-700'}`}>
                    <CardContent className="p-6 text-center">
                      <div className={`text-4xl mb-3 ${isConnected ? '' : 'opacity-50'}`}>
                        {social.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{social.name}</h3>
                      {isConnected ? (
                        <Badge variant="emerald" className="mb-4">Connected</Badge>
                      ) : (
                        <Button 
                          onClick={() => handleConnectSocial(social.platform)}
                          className="w-full"
                          variant={social.color === 'red' || social.color === 'pink' ? 'outline' : 'default'}
                        >
                          Connect {social.name}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Recent Social Posts */}
            <Card className="glass-dark border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Recent Posts</CardTitle>
                <CardDescription>Latest social media activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { platform: 'twitter', content: 'Just launched our new feature! 🚀 #innovation #tech', time: '2 hours ago', engagement: { likes: 45, shares: 12, comments: 8 } },
                    { platform: 'instagram', content: 'Behind the scenes at our office today! #team #worklife #bts', time: '5 hours ago', engagement: { likes: 128, shares: 23, comments: 15 } },
                    { platform: 'facebook', content: 'Client success story of the week! 💪 #testimonial #success', time: '1 day ago', engagement: { likes: 89, shares: 34, comments: 27 } },
                    { platform: 'linkedin', content: 'Excited to announce our partnership with TechCorp! 🤝 #partnership #business', time: '2 days ago', engagement: { likes: 156, shares: 45, comments: 32 } }
                  ].map((post, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        post.platform === 'twitter' ? 'bg-sky-500' :
                        post.platform === 'instagram' ? 'bg-pink-500' :
                        post.platform === 'facebook' ? 'bg-blue-600' :
                        'bg-blue-700'
                      }`}>
                        <span className="text-white font-bold text-sm">
                          {post.platform === 'twitter' ? 'X' :
                           post.platform === 'instagram' ? '📷' :
                           post.platform === 'facebook' ? 'f' :
                           'in'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm mb-2">{post.content}</p>
                        <div className="flex items-center space-x-4 text-gray-400 text-xs">
                          <span>{post.time}</span>
                          <div className="flex items-center space-x-3">
                            <span>❤️ {post.engagement.likes}</span>
                            <span>🔄 {post.engagement.shares}</span>
                            <span>💬 {post.engagement.comments}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <Card className="glass-dark border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Content Calendar</CardTitle>
                <CardDescription>Schedule your content across all platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📅</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Content Calendar</h3>
                    <p className="text-gray-300">Plan and schedule your content across all platforms</p>
                  </div>
                  <Button className="premium">
                    Setup Calendar
                  </Button>
                </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-dark border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Content Performance</CardTitle>
                  <CardDescription>How your content is performing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Total Views</p>
                      <p className="text-2xl font-bold text-white">12.4K</p>
                      <p className="text-emerald-400 text-sm">+23% this month</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Engagement Rate</p>
                      <p className="text-2xl font-bold text-white">8.2%</p>
                      <p className="text-emerald-400 text-sm">+1.2% this month</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Avg. Read Time</p>
                      <p className="text-2xl font-bold text-white">3:42</p>
                      <p className="text-emerald-400 text-sm">+0:15 this month</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Shares</p>
                      <p className="text-2xl font-bold text-white">847</p>
                      <p className="text-emerald-400 text-sm">+124 this month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-dark border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Top Performing Content</CardTitle>
                  <CardDescription>Your most successful pieces</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { title: '5 Tips for Growing Your Business', views: 3420, engagement: '12.4%', type: 'blog' },
                    { title: 'Product Launch Announcement', views: 2156, engagement: '8.9%', type: 'social' },
                    { title: 'Customer Success Story', views: 1876, engagement: '15.2%', type: 'blog' },
                    { title: 'Behind the Scenes Video', views: 5643, engagement: '23.1%', type: 'video' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 border border-gray-700">
                      <div>
                        <h4 className="text-white font-medium">{item.title}</h4>
                        <div className="flex items-center space-x-2 text-gray-400 text-sm">
                          <Badge variant="outline" className="text-xs">{item.type}</Badge>
                          <span>👁 {item.views.toLocaleString()} views</span>
                        </div>
                      </div>
                      <Badge variant="emerald" className="text-xs">
                        {item.engagement}% engagement
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Create/Edit Content Modal */}
        {(showCreateModal || editingContent) && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-4xl glass-dark border-gray-800 max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle className="text-white">
                  {editingContent ? 'Edit Content' : 'Create New Content'}
                </CardTitle>
                <CardDescription>
                  {editingContent ? 'Update your content and settings' : 'Create new content for your audience'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateContent} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Title *
                      </label>
                      <Input
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        className="bg-gray-800 border-gray-700 text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Content Type
                      </label>
                      <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as any }))}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="blog">Blog Post</SelectItem>
                          <SelectItem value="social">Social Media</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="landing">Landing Page</SelectItem>
                          <SelectItem value="product">Product Description</SelectItem>
                          <SelectItem value="service">Service Description</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Description
                    </label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                      placeholder="Brief description of your content..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Content *
                    </label>
                    <Textarea
                      value={formData.content}
                      onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                      rows={8}
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                      placeholder="Write your content here..."
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Status
                      </label>
                      <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as any }))}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Visibility
                      </label>
                      <Select value={formData.visibility} onValueChange={(value) => setFormData(prev => ({ ...prev, visibility: value as any }))}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                          <SelectItem value="unlisted">Unlisted</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => {
                        setShowCreateModal(false)
                        setEditingContent(null)
                        setFormData({
                          title: '',
                          description: '',
                          content: '',
                          type: 'blog',
                          status: 'draft',
                          visibility: 'public',
                          tags: []
                        })
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="premium">
                      {editingContent ? 'Update Content' : 'Create Content'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
