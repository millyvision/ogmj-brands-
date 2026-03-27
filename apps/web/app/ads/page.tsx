'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ogmj/ui'
import { Button } from '@ogmj/ui'
import { Input } from '@ogmj/ui'
import { Badge } from '@ogmj/ui'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ogmj/ui'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ogmj/ui'
import { useAuthStore } from '@/store/auth-store'
import { getCampaigns, createCampaign, launchCampaign, getAdGroups, createAdGroup } from '@/lib/ads-engine'
import type { Campaign, AdGroup } from '@/lib/ads-types'

export default function AdsPage() {
  const { user } = useAuthStore()
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [adGroups, setAdGroups] = useState<AdGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('campaigns')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null)
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'search',
    objective: 'conversions',
    budget: {
      amount: 100,
      currency: 'USD',
      type: 'daily'
    }
  })

  useEffect(() => {
    if (user) {
      loadData()
    }
  }, [user, activeTab])

  const loadData = async () => {
    try {
      setLoading(true)
      if (activeTab === 'campaigns') {
        const data = await getCampaigns(user?.business_id || '')
        setCampaigns(data)
      } else if (activeTab === 'adgroups' && selectedCampaign) {
        const data = await getAdGroups(selectedCampaign.id)
        setAdGroups(data)
      }
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user?.business_id) return

    try {
      await createCampaign(user.business_id, formData)
      setFormData({
        name: '',
        description: '',
        type: 'search',
        objective: 'conversions',
        budget: {
          amount: 100,
          currency: 'USD',
          type: 'daily'
        }
      })
      setShowCreateModal(false)
      await loadData()
    } catch (error) {
      console.error('Error creating campaign:', error)
    }
  }

  const handleLaunchCampaign = async (campaignId: string) => {
    try {
      await launchCampaign(campaignId)
      await loadData()
    } catch (error) {
      console.error('Error launching campaign:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'gray'
      case 'active': return 'emerald'
      case 'paused': return 'yellow'
      case 'completed': return 'blue'
      case 'cancelled': return 'red'
      default: return 'gray'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'draft': return 'Draft'
      case 'active': return 'Active'
      case 'paused': return 'Paused'
      case 'completed': return 'Completed'
      case 'cancelled': return 'Cancelled'
      default: return status
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'search': return '🔍'
      case 'display': return '📺'
      case 'social': return '📱'
      case 'video': return '🎥'
      case 'shopping': return '🛒'
      case 'app': return '📱'
      case 'native': return '🌐'
      default: return '📢'
    }
  }

  const getObjectiveIcon = (objective: string) => {
    switch (objective) {
      case 'awareness': return '👁'
      case 'traffic': return '🌐'
      case 'engagement': return '💬'
      case 'conversions': return '🎯'
      case 'leads': return '👥'
      case 'sales': return '💰'
      case 'app_installs': return '📱'
      case 'store_visits': return '🏪'
      case 'brand_awareness': return '🏆'
      default: return '📈'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent border-r-transparent animate-spin rounded-full"></div>
          <p className="mt-4">Loading campaigns...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Ads Manager</h1>
          <div className="flex space-x-4">
            <Button onClick={() => setShowCreateModal(true)} className="premium">
              Create Campaign
            </Button>
            <Button variant="outline">
              AI Assistant
            </Button>
          </div>
        </div>

        {/* Campaign Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="glass-dark border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Active Campaigns</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-emerald-400">12</div>
              <div className="text-gray-400 text-sm">+3 this week</div>
            </CardContent>
          </Card>
          <Card className="glass-dark border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Total Spend</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-white">$8,452</div>
              <div className="text-gray-400 text-sm">+15% this month</div>
            </CardContent>
          </Card>
          <Card className="glass-dark border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Conversions</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-blue-400">342</div>
              <div className="text-gray-400 text-sm">+28% this month</div>
            </CardContent>
          </Card>
          <Card className="glass-dark border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">ROAS</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-yellow-400">4.2x</div>
              <div className="text-gray-400 text-sm">+0.8x this month</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="adgroups">Ad Groups</TabsTrigger>
            <TabsTrigger value="ads">Ads</TabsTrigger>
            <TabsTrigger value="creatives">Creatives</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {campaigns.map((campaign) => (
                <Card key={campaign.id} className="glass-dark border-gray-800 hover:border-emerald-500/40 transition-all duration-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{getTypeIcon(campaign.type)}</div>
                        <div>
                          <CardTitle className="text-white line-clamp-1">{campaign.name}</CardTitle>
                          <CardDescription className="line-clamp-2">
                            {campaign.description}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant={getStatusColor(campaign.status) as any} className="text-xs">
                        {getStatusText(campaign.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2 text-gray-300 text-sm">
                      <span>{getObjectiveIcon(campaign.objective)}</span>
                      <span>{campaign.objective.replace('_', ' ').toUpperCase()}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Budget:</span>
                        <span className="text-white font-medium">
                          ${campaign.budget.amount}/{campaign.budget.type}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400">Performance:</span>
                        <span className="text-emerald-400 font-medium">
                          {campaign.performance?.ctr || 0}%
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Spend:</span>
                        <span className="text-white font-medium">
                          ${campaign.performance?.spend || 0}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400">Conversions:</span>
                        <span className="text-blue-400 font-medium">
                          {campaign.performance?.conversions || 0}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedCampaign(campaign)}
                      >
                        View Details
                      </Button>
                      {campaign.status === 'draft' && (
                        <Button 
                          variant="premium" 
                          size="sm"
                          onClick={() => handleLaunchCampaign(campaign.id)}
                        >
                          Launch
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="adgroups" className="space-y-6">
            {selectedCampaign ? (
              <div className="mb-6">
                <Card className="glass-dark border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">
                      {selectedCampaign.name} - Ad Groups
                    </CardTitle>
                    <CardDescription>
                      Manage ad groups for this campaign
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-gray-300">
                        {adGroups.length} ad groups
                      </p>
                      <Button onClick={() => {/* Create ad group */}} className="premium">
                        Create Ad Group
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {adGroups.map((adGroup) => (
                        <Card key={adGroup.id} className="glass-dark border-gray-800">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-white">{adGroup.name}</CardTitle>
                              <Badge variant={adGroup.status === 'enabled' ? 'emerald' : 'yellow'} className="text-xs">
                                {adGroup.status}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="text-sm text-gray-300">
                              {adGroup.ads?.length || 0} ads
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-400">CTR:</span>
                                <span className="text-white font-medium">
                                  {adGroup.performance?.ctr || 0}%
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-400">Spend:</span>
                                <span className="text-white font-medium">
                                  ${adGroup.performance?.spend || 0}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400">Select a campaign to view its ad groups</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="ads" className="space-y-6">
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📢</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Ad Management</h3>
                <p className="text-gray-300">Create and manage individual ads across all platforms</p>
              </div>
              <Button className="premium">
                Create Ad
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="creatives" className="space-y-6">
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Creative Library</h3>
                <p className="text-gray-300">Upload and manage your ad creatives</p>
              </div>
              <Button className="premium">
                Upload Creative
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-dark border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Performance Overview</CardTitle>
                  <CardDescription>Key metrics across all campaigns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Total Impressions</p>
                      <p className="text-2xl font-bold text-white">1.2M</p>
                      <p className="text-emerald-400 text-sm">+18% this month</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Total Clicks</p>
                      <p className="text-2xl font-bold text-white">24.5K</p>
                      <p className="text-emerald-400 text-sm">+22% this month</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Average CTR</p>
                      <p className="text-2xl font-bold text-white">2.04%</p>
                      <p className="text-emerald-400 text-sm">+0.3% this month</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Cost Per Click</p>
                      <p className="text-2xl font-bold text-white">$0.34</p>
                      <p className="text-emerald-400 text-sm">-0.08 this month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-dark border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Top Performing Campaigns</CardTitle>
                  <CardDescription>Your best performing campaigns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: 'Summer Sale 2024', ctr: 3.2, conversions: 145, roas: 5.8 },
                    { name: 'Product Launch', ctr: 2.8, conversions: 89, roas: 4.2 },
                    { name: 'Brand Awareness', ctr: 1.9, conversions: 67, roas: 3.1 }
                  ].map((campaign, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 border border-gray-700">
                      <div>
                        <h4 className="text-white font-medium">{campaign.name}</h4>
                        <div className="flex items-center space-x-4 text-gray-400 text-sm">
                          <span>CTR: {campaign.ctr}%</span>
                          <span>Conversions: {campaign.conversions}</span>
                          <span>ROAS: {campaign.roas}x</span>
                        </div>
                      </div>
                      <Badge variant="emerald" className="text-xs">
                        Top Performer
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Create Campaign Modal */}
        {(showCreateModal || editingCampaign) && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl glass-dark border-gray-800 max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle className="text-white">
                  {editingCampaign ? 'Edit Campaign' : 'Create New Campaign'}
                </CardTitle>
                <CardDescription>
                  {editingCampaign ? 'Update campaign settings and targeting' : 'Set up your advertising campaign'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateCampaign} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Campaign Name *
                      </label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="bg-gray-800 border-gray-700 text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Campaign Type
                      </label>
                      <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as any }))}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="search">Search Ads</SelectItem>
                          <SelectItem value="display">Display Ads</SelectItem>
                          <SelectItem value="social">Social Media Ads</SelectItem>
                          <SelectItem value="video">Video Ads</SelectItem>
                          <SelectItem value="shopping">Shopping Ads</SelectItem>
                          <SelectItem value="app">App Install Ads</SelectItem>
                          <SelectItem value="native">Native Ads</SelectItem>
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
                      placeholder="Describe your campaign goals and target audience..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Campaign Objective
                      </label>
                      <Select value={formData.objective} onValueChange={(value) => setFormData(prev => ({ ...prev, objective: value as any }))}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="awareness">Brand Awareness</SelectItem>
                          <SelectItem value="traffic">Website Traffic</SelectItem>
                          <SelectItem value="engagement">Engagement</SelectItem>
                          <SelectItem value="conversions">Conversions</SelectItem>
                          <SelectItem value="leads">Lead Generation</SelectItem>
                          <SelectItem value="sales">Sales</SelectItem>
                          <SelectItem value="app_installs">App Installs</SelectItem>
                          <SelectItem value="store_visits">Store Visits</SelectItem>
                          <SelectItem value="brand_awareness">Brand Awareness</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Budget Type
                      </label>
                      <Select value={formData.budget.type} onValueChange={(value) => setFormData(prev => ({ 
                        ...prev, 
                        budget: { ...prev.budget, type: value as any }
                      }))}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="daily">Daily Budget</SelectItem>
                          <SelectItem value="lifetime">Lifetime Budget</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Budget Amount *
                    </label>
                    <Input
                      type="number"
                      value={formData.budget.amount}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        budget: { ...prev.budget, amount: parseFloat(e.target.value) }
                      }))}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="100"
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => {
                        setShowCreateModal(false)
                        setEditingCampaign(null)
                        setFormData({
                          name: '',
                          description: '',
                          type: 'search',
                          objective: 'conversions',
                          budget: {
                            amount: 100,
                            currency: 'USD',
                            type: 'daily'
                          }
                        })
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="premium">
                      {editingCampaign ? 'Update Campaign' : 'Create Campaign'}
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
