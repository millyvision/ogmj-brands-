'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ogmj/ui'
import { Badge } from '@ogmj/ui'
import OnboardingGuard from '@/components/onboarding-guard'

export default function DashboardPage() {
  const [activeView, setActiveView] = useState<'overview' | 'ai-chat' | 'insights'>('overview')

  return (
    <OnboardingGuard>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Command Center</h1>
              <p className="text-gray-400 mt-2">
                Your intelligent business operating system
              </p>
            </div>
            <Badge variant="emerald" className="text-sm">
              BETA
            </Badge>
          </div>

          {/* View Toggle */}
          <div className="flex space-x-2 mb-8">
            <button
              onClick={() => setActiveView('overview')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeView === 'overview'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveView('ai-chat')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeView === 'ai-chat'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              AI Chat
            </button>
            <button
              onClick={() => setActiveView('insights')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeView === 'insights'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Insights
            </button>
          </div>

          {/* Main Content */}
          {activeView === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Business Stats */}
              <Card className="glass-dark border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Business Overview</CardTitle>
                  <CardDescription>Your business at a glance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Total Revenue</p>
                      <p className="text-2xl font-bold text-white">$12,450</p>
                      <p className="text-emerald-400 text-sm">+15.3%</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Active Clients</p>
                      <p className="text-2xl font-bold text-white">48</p>
                      <p className="text-emerald-400 text-sm">+12</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Projects</p>
                      <p className="text-2xl font-bold text-white">23</p>
                      <p className="text-emerald-400 text-sm">+8</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Conversion Rate</p>
                      <p className="text-2xl font-bold text-white">3.2%</p>
                      <p className="text-emerald-400 text-sm">+0.8%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="glass-dark border-gray-800 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-white">Recent Activity</CardTitle>
                  <CardDescription>Latest updates from your business</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { type: 'client', title: 'New client signed up', description: 'John Doe joined your platform', time: '2 hours ago' },
                    { type: 'project', title: 'Project completed', description: 'Website redesign for TechCorp', time: '5 hours ago' },
                    { type: 'revenue', title: 'Payment received', description: '$2,500 payment from Marketing Agency', time: '1 day ago' },
                    { type: 'system', title: 'Automation triggered', description: 'Welcome email sent to 5 new clients', time: '2 days ago' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-800/50">
                      <div className={`w-2 h-2 rounded-full mt-1 ${
                        activity.type === 'client' ? 'bg-emerald-500' :
                        activity.type === 'project' ? 'bg-blue-500' :
                        activity.type === 'revenue' ? 'bg-yellow-500' :
                        'bg-gray-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{activity.title}</p>
                        <p className="text-gray-400 text-sm">{activity.description}</p>
                        <p className="text-gray-500 text-xs">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* AI Suggestions */}
              <Card className="glass-dark border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">AI Suggestions</CardTitle>
                  <CardDescription>Personalized recommendations for your business</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { title: 'Optimize your pricing', description: 'Based on your service analysis, you could increase rates by 15-20%', action: 'Review Pricing' },
                    { title: 'Launch email campaign', description: 'Your clients haven\'t received updates in 2 weeks. Consider a newsletter campaign.', action: 'Create Campaign' },
                    { title: 'Update your website', description: 'Your website hasn\'t been updated in 3 months. Fresh content could improve engagement.', action: 'Update Website' },
                    { title: 'Automate invoicing', description: 'Save 8 hours per week by automating your invoice generation and follow-ups.', action: 'Setup Automation' }
                  ].map((suggestion, index) => (
                    <div key={index} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                      <h4 className="text-white font-medium mb-2">{suggestion.title}</h4>
                      <p className="text-gray-300 text-sm mb-3">{suggestion.description}</p>
                      <button className="text-emerald-400 text-sm hover:text-emerald-300 transition-colors">
                        {suggestion.action} →
                      </button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

          {activeView === 'ai-chat' && (
            <Card className="glass-dark border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">AI Business Assistant</CardTitle>
                <CardDescription>Get help from our intelligent business assistant</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-96 flex flex-col">
                  <div className="flex-1 space-y-4 overflow-y-auto">
                    {/* Sample AI messages */}
                    <div className="flex justify-start mb-4">
                      <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">AI</span>
                      </div>
                      <div className="flex-1 max-w-md">
                        <div className="bg-gray-800 rounded-lg p-4">
                          <p className="text-white text-sm">
                            Hello! I'm your AI business assistant. I can help you with:
                          </p>
                          <ul className="text-gray-300 text-sm mt-2 space-y-1">
                            <li>• Business strategy and planning</li>
                            <li>• Marketing campaign ideas</li>
                            <li>• Financial analysis and insights</li>
                            <li>• Process automation suggestions</li>
                            <li>• Customer service improvements</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end mb-4">
                      <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">YOU</span>
                      </div>
                      <div className="flex-1 max-w-md">
                        <div className="bg-gray-800 rounded-lg p-4">
                          <p className="text-gray-300 text-sm">
                            How can I help you grow your business today?
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-start">
                      <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">AI</span>
                      </div>
                      <div className="flex-1 max-w-md">
                        <div className="bg-gray-800 rounded-lg p-4">
                          <p className="text-white text-sm">
                            Based on your business metrics, I recommend focusing on customer retention this quarter. Your current churn rate is 15%, which is below the industry average of 25%. Implementing a customer success program could reduce churn by 40% and increase lifetime value.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeView === 'insights' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-dark border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Growth Opportunities</CardTitle>
                  <CardDescription>AI-powered insights for business growth</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { title: 'High-Value Services', description: 'Your consulting services have 60% profit margins. Consider expanding these offerings.', potential: '+$5,000/month' },
                    { title: 'Client Acquisition', description: 'Your website conversion rate is 3.2%, above industry average. Focus on SEO and content marketing.', potential: '+25 clients/month' },
                    { title: 'Operational Efficiency', description: 'Automating 3 key processes could save 15 hours/week in manual work.', potential: '+$3,000/month' }
                  ].map((insight, index) => (
                    <div key={index} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                      <h4 className="text-white font-medium mb-2">{insight.title}</h4>
                      <p className="text-gray-300 text-sm mb-2">{insight.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-emerald-400 font-bold">{insight.potential}</span>
                        <Badge variant="emerald" className="text-xs">High Priority</Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="glass-dark border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Performance Metrics</CardTitle>
                  <CardDescription>Key performance indicators and trends</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Customer Satisfaction</p>
                      <p className="text-2xl font-bold text-white">4.8/5.0</p>
                      <p className="text-emerald-400 text-sm">+0.3 from last month</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Average Order Value</p>
                      <p className="text-2xl font-bold text-white">$850</p>
                      <p className="text-emerald-400 text-sm">+12.5% YoY</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Project Completion Rate</p>
                      <p className="text-2xl font-bold text-white">94%</p>
                      <p className="text-emerald-400 text-sm">+5% from last quarter</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Monthly Recurring Revenue</p>
                      <p className="text-2xl font-bold text-white">$8,200</p>
                      <p className="text-emerald-400 text-sm">+18% YoY</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </OnboardingGuard>
  )
}
