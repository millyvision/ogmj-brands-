'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ogmj/ui'
import { Button } from '@ogmj/ui'
import { Badge } from '@ogmj/ui'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ogmj/ui'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ogmj/ui'
import { useAuthStore } from '@/store/auth-store'
import { 
  getTrafficAnalytics, 
  getConversionAnalytics, 
  getRevenueAnalytics, 
  getEngagementAnalytics,
  getDashboards,
  generateInsights 
} from '@/lib/analytics-engine'
import type { AnalyticsDashboard } from '@/lib/analytics-types'

export default function AnalyticsPage() {
  const { user } = useAuthStore()
  const [activeTab, setActiveTab] = useState('overview')
  const [dateRange, setDateRange] = useState('last_30_days')
  const [trafficData, setTrafficData] = useState<any>(null)
  const [conversionData, setConversionData] = useState<any>(null)
  const [revenueData, setRevenueData] = useState<any>(null)
  const [engagementData, setEngagementData] = useState<any>(null)
  const [insights, setInsights] = useState<any>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadData()
    }
  }, [user, activeTab, dateRange])

  const loadData = async () => {
    try {
      setLoading(true)
      const dateRangeObj = getDateRange(dateRange)
      
      if (activeTab === 'overview') {
        const [traffic, conversion, revenue, engagement] = await Promise.all([
          getTrafficAnalytics(user?.business_id || '', dateRangeObj),
          getConversionAnalytics(user?.business_id || '', dateRangeObj),
          getRevenueAnalytics(user?.business_id || '', dateRangeObj),
          getEngagementAnalytics(user?.business_id || '', dateRangeObj)
        ])
        setTrafficData(traffic)
        setConversionData(conversion)
        setRevenueData(revenue)
        setEngagementData(engagement)
      } else if (activeTab === 'insights') {
        const allInsights = await Promise.all([
          generateInsights(user?.business_id || '', 'opportunity'),
          generateInsights(user?.business_id || '', 'risk'),
          generateInsights(user?.business_id || '', 'trend'),
          generateInsights(user?.business_id || '', 'prediction')
        ])
        setInsights(allInsights.flat())
      }
    } catch (error) {
      console.error('Error loading analytics data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getDateRange = (preset: string) => {
    const now = new Date()
    const start = new Date()
    
    switch (preset) {
      case 'today':
        start.setHours(0, 0, 0, 0)
        return { start: start.toISOString(), end: now.toISOString() }
      case 'yesterday':
        start.setDate(now.getDate() - 1)
        start.setHours(0, 0, 0, 0)
        const end = new Date(start)
        end.setHours(23, 59, 59, 999)
        return { start: start.toISOString(), end: end.toISOString() }
      case 'last_7_days':
        start.setDate(now.getDate() - 7)
        return { start: start.toISOString(), end: now.toISOString() }
      case 'last_30_days':
        start.setDate(now.getDate() - 30)
        return { start: start.toISOString(), end: now.toISOString() }
      case 'last_90_days':
        start.setDate(now.getDate() - 90)
        return { start: start.toISOString(), end: now.toISOString() }
      case 'last_12_months':
        start.setMonth(now.getMonth() - 12)
        return { start: start.toISOString(), end: now.toISOString() }
      default:
        start.setDate(now.getDate() - 30)
        return { start: start.toISOString(), end: now.toISOString() }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent border-r-transparent animate-spin rounded-full"></div>
          <p className="mt-4">Loading analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Analytics & Intelligence</h1>
          <div className="flex items-center space-x-4">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="last_7_days">Last 7 Days</SelectItem>
                <SelectItem value="last_30_days">Last 30 Days</SelectItem>
                <SelectItem value="last_90_days">Last 90 Days</SelectItem>
                <SelectItem value="last_12_months">Last 12 Months</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              Export Report
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="traffic">Traffic</TabsTrigger>
            <TabsTrigger value="conversions">Conversions</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card className="glass-dark border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Total Revenue</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-emerald-400">$45,678</div>
                  <div className="text-gray-400 text-sm">+15% this month</div>
                </CardContent>
              </Card>
              <Card className="glass-dark border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Active Users</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-blue-400">8,932</div>
                  <div className="text-gray-400 text-sm">+23% this month</div>
                </CardContent>
              </Card>
              <Card className="glass-dark border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Conversion Rate</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">3.2%</div>
                  <div className="text-gray-400 text-sm">+0.4% this month</div>
                </CardContent>
              </Card>
              <Card className="glass-dark border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Engagement Rate</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-purple-400">71.7%</div>
                  <div className="text-gray-400 text-sm">+5.2% this month</div>
                </CardContent>
              </Card>
            </div>

            {/* Traffic Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-dark border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Traffic Sources</CardTitle>
                  <CardDescription>Where your visitors come from</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {trafficData?.traffic_sources?.map((source: any, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                          <span className="text-white font-medium">{source.source}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-bold">{source.sessions.toLocaleString()}</div>
                          <div className="text-gray-400 text-sm">{source.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-dark border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Top Pages</CardTitle>
                  <CardDescription>Most visited pages</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {trafficData?.top_pages?.map((page: any, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-white font-medium">{page.page}</span>
                        <div className="text-right">
                          <div className="text-emerald-400 font-bold">{page.views.toLocaleString()}</div>
                          <div className="text-gray-400 text-sm">{page.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="traffic" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-dark border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Device Analytics</CardTitle>
                  <CardDescription>Visitor device breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trafficData?.devices?.map((device: any, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-white font-medium capitalize">{device.device}</span>
                        <div className="text-right">
                          <div className="text-white font-bold">{device.sessions.toLocaleString()}</div>
                          <div className="text-gray-400 text-sm">{device.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-dark border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Geographic Distribution</CardTitle>
                  <CardDescription>Visitor locations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trafficData?.geographic?.map((location: any, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-white font-medium">{location.country}</span>
                        <div className="text-right">
                          <div className="text-white font-bold">{location.sessions.toLocaleString()}</div>
                          <div className="text-gray-400 text-sm">{location.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="conversions" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-dark border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Conversion Funnels</CardTitle>
                  <CardDescription>Customer journey analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {conversionData?.funnels?.map((funnel: any, index: number) => (
                      <div key={index} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                        <h4 className="text-white font-medium mb-3">{funnel.name}</h4>
                        <div className="space-y-2">
                          {funnel.steps?.map((step: string, stepIndex: number) => (
                            <div key={stepIndex} className="flex items-center space-x-2">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                                stepIndex === 0 ? 'bg-emerald-500' :
                                stepIndex === 1 ? 'bg-blue-500' :
                                stepIndex === 2 ? 'bg-yellow-500' :
                                'bg-gray-500'
                              } text-white`}>
                                {stepIndex + 1}
                              </div>
                              <span className="text-gray-300 text-sm">{step}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-700">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Conversion Rate:</span>
                            <span className="text-emerald-400 font-bold">{funnel.conversion_rate}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-dark border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Conversion Sources</CardTitle>
                  <CardDescription>Where conversions come from</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {conversionData?.conversion_sources?.map((source: any, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-white font-medium">{source.source}</span>
                        <div className="text-right">
                          <div className="text-emerald-400 font-bold">{source.conversions.toLocaleString()}</div>
                          <div className="text-gray-400 text-sm">${source.revenue.toLocaleString()}</div>
                          <div className="text-gray-400 text-sm">{source.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-dark border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Revenue Breakdown</CardTitle>
                  <CardDescription>Revenue by product/service</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenueData?.revenue_by_product?.map((product: any, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-white font-medium">{product.product}</span>
                        <div className="text-right">
                          <div className="text-emerald-400 font-bold">${product.revenue.toLocaleString()}</div>
                          <div className="text-gray-400 text-sm">{product.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-dark border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Customer Segments</CardTitle>
                  <CardDescription>Revenue by customer type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenueData?.customer_segments?.map((segment: any, index: number) => (
                      <div key={index} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-white font-medium">{segment.segment}</h4>
                          <Badge variant="emerald" className="text-xs">
                            {segment.customers} customers
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-400">Revenue:</span>
                            <span className="text-white font-medium">${segment.revenue.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Avg Revenue:</span>
                            <span className="text-white font-medium">${segment.avg_revenue}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {insights.map((insight: any, index: number) => (
                <Card key={index} className={`glass-dark border-gray-800 ${
                  insight.impact === 'high' ? 'border-red-500/40' :
                  insight.impact === 'medium' ? 'border-yellow-500/40' :
                  'border-blue-500/40'
                }`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-white">{insight.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{insight.description}</CardDescription>
                      </div>
                      <Badge variant={
                        insight.impact === 'high' ? 'error' :
                        insight.impact === 'medium' ? 'warning' :
                        'info'
                      } className="text-xs">
                        {insight.impact.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-400 text-sm">Confidence:</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              insight.confidence > 0.8 ? 'bg-emerald-500' :
                              insight.confidence > 0.6 ? 'bg-yellow-500' :
                              'bg-blue-500'
                            }`}
                            style={{ width: `${insight.confidence * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-white font-medium">{Math.round(insight.confidence * 100)}%</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Recommendations:</h4>
                      <div className="space-y-2">
                        {insight.recommendations?.map((rec: string, recIndex: number) => (
                          <div key={recIndex} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                            <span className="text-gray-300 text-sm">{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
