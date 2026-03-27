'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ogmj/ui'
import { Button } from '@ogmj/ui'
import { Badge } from '@ogmj/ui'
import { useAuthStore } from '@/store/auth-store'

export default function PreviewPage() {
  const { user } = useAuthStore()
  const [activeSection, setActiveSection] = useState('overview')

  const features = {
    overview: [
      {
        title: '🏢 Business Management',
        description: 'Complete business operations management with team collaboration',
        status: 'completed',
        phase: 5,
        highlights: ['Team Management', 'Business Settings', 'Billing Management', 'Multi-user Support']
      },
      {
        title: '👥 Client & Order Management',
        description: 'Advanced CRM with order tracking and invoice generation',
        status: 'completed',
        phase: 6,
        highlights: ['Complete CRM', 'Order Tracking', 'Invoice Generation', 'Project Management']
      },
      {
        title: '📝 Content & Social Management',
        description: 'AI-powered content creation and multi-platform social media management',
        status: 'completed',
        phase: 7,
        highlights: ['AI Content Generation', 'Multi-Platform Social', 'Content Calendar', 'Advanced Analytics']
      },
      {
        title: '📢 Ads Manager',
        description: 'Enterprise-grade advertising management across all major platforms',
        status: 'completed',
        phase: 8,
        highlights: ['Multi-Platform Ads', 'AI Optimization', 'Budget Management', 'Performance Analytics']
      },
      {
        title: '📊 Analytics & Intelligence',
        description: 'AI-powered business intelligence with predictive analytics',
        status: 'completed',
        phase: 9,
        highlights: ['AI Insights', 'Predictive Analytics', 'Custom Dashboards', 'Advanced Segmentation']
      },
      {
        title: '⚡ Automation & Workflows',
        description: 'Visual workflow builder with 500+ pre-built templates',
        status: 'completed',
        phase: 10,
        highlights: ['Visual Workflow Builder', '500+ Templates', 'Multi-Platform Integration', 'Enterprise Security']
      }
    ],
    authentication: [
      {
        title: '🔐 Secure Authentication',
        description: 'Enterprise-grade authentication with multi-factor support',
        status: 'completed',
        phase: 3,
        highlights: ['Email/Password Auth', 'Social Login', 'Password Reset', 'Multi-Factor Auth']
      },
      {
        title: '👤 User Management',
        description: 'Complete user profile and session management',
        status: 'completed',
        phase: 3,
        highlights: ['Profile Management', 'Session Security', 'User Preferences', 'Activity Tracking']
      },
      {
        title: '🛡️ Security Features',
        description: 'Advanced security with encryption and monitoring',
        status: 'completed',
        phase: 3,
        highlights: ['Data Encryption', 'Activity Monitoring', 'Secure Sessions', 'Compliance Tools']
      }
    ],
    onboarding: [
      {
        title: '🎯 Smart Onboarding',
        description: 'Intelligent 5-step onboarding with AI recommendations',
        status: 'completed',
        phase: 4,
        highlights: ['Business Type Detection', 'AI Tool Recommendations', 'Goal-Based Setup', 'Personalized Experience']
      },
      {
        title: '📋 Business Setup',
        description: 'Comprehensive business information collection and setup',
        status: 'completed',
        phase: 4,
        highlights: ['Business Details', 'Industry Selection', 'Goal Setting', 'Tool Prioritization']
      },
      {
        title: '🚀 Quick Start',
        description: 'Get started in under 5 minutes with smart defaults',
        status: 'completed',
        phase: 4,
        highlights: ['Smart Defaults', 'One-Click Setup', 'Progressive Disclosure', 'Instant Value']
      }
    ],
    design: [
      {
        title: '🎨 Premium UI System',
        description: 'Glassmorphism design with premium dark theme',
        status: 'completed',
        phase: 2,
        highlights: ['Glassmorphism Effects', 'Premium Dark Theme', 'Smooth Animations', 'Responsive Design']
      },
      {
        title: '🧩 Component Library',
        description: '50+ reusable components with consistent design',
        status: 'completed',
        phase: 2,
        highlights: ['50+ Components', 'Consistent Design', 'TypeScript Support', 'Accessibility']
      },
      {
        title: '🎭 Design System',
        description: 'Complete design system with tokens and guidelines',
        status: 'completed',
        phase: 2,
        highlights: ['Design Tokens', 'Color System', 'Typography', 'Spacing System']
      }
    ],
    infrastructure: [
      {
        title: '🏗️ Modern Architecture',
        description: 'Next.js 15 with Turborepo monorepo structure',
        status: 'completed',
        phase: 1,
        highlights: ['Next.js 15', 'Turborepo', 'TypeScript', 'Supabase Backend']
      },
      {
        title: '📦 Package Management',
        description: 'Optimized package structure with shared libraries',
        status: 'completed',
        phase: 1,
        highlights: ['Monorepo Structure', 'Shared UI Package', 'Utils Library', 'Database Package']
      },
      {
        title: '⚡ Performance',
        description: 'Optimized for speed and scalability',
        status: 'completed',
        phase: 1,
        highlights: ['Code Splitting', 'Lazy Loading', 'Optimized Build', 'CDN Ready']
      }
    ]
  }

  const getStatusColor = (status: string) => {
    return status === 'completed' ? 'emerald' : 'yellow'
  }

  const getStatusText = (status: string) => {
    return status === 'completed' ? 'COMPLETED' : 'IN PROGRESS'
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-black to-blue-500/20"></div>
        <div className="relative z-10 px-6 py-24">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-6xl font-bold text-white mb-4">
                OGMJ BRANDS
              </h1>
              <p className="text-2xl text-emerald-400 mb-2">
                Complete Business Management Platform
              </p>
              <p className="text-lg text-gray-300 mb-8">
                10 Phases Complete • Enterprise Ready • AI-Powered
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Badge variant="emerald" className="text-lg px-4 py-2">
                ✅ Phase 1-10 Complete
              </Badge>
              <Badge variant="blue" className="text-lg px-4 py-2">
                🚀 Production Ready
              </Badge>
              <Badge variant="yellow" className="text-lg px-4 py-2">
                🤖 AI-Powered
              </Badge>
              <Badge variant="purple" className="text-lg px-4 py-2">
                🏢 Enterprise Grade
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="glass-dark border-gray-800">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-emerald-400 mb-2">10</div>
                  <div className="text-white font-medium mb-1">Phases Complete</div>
                  <div className="text-gray-400 text-sm">From Foundation to Automation</div>
                </CardContent>
              </Card>
              <Card className="glass-dark border-gray-800">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">50+</div>
                  <div className="text-white font-medium mb-1">UI Components</div>
                  <div className="text-gray-400 text-sm">Premium Glassmorphism Design</div>
                </CardContent>
              </Card>
              <Card className="glass-dark border-gray-800">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-yellow-400 mb-2">500+</div>
                  <div className="text-white font-medium mb-1">Automation Templates</div>
                  <div className="text-gray-400 text-sm">Pre-built Workflows</div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center space-x-6">
              <Button className="premium text-lg px-8 py-3">
                🚀 Launch Platform
              </Button>
              <Button variant="outline" className="text-lg px-8 py-3">
                📖 View Documentation
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Platform Features
          </h2>

          {/* Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.keys(features).map((section) => (
              <Button
                key={section}
                variant={activeSection === section ? 'default' : 'outline'}
                onClick={() => setActiveSection(section)}
                className="capitalize"
              >
                {section.replace('_', ' ')}
              </Button>
            ))}
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features[activeSection as keyof typeof features]?.map((feature, index) => (
              <Card key={index} className="glass-dark border-gray-800 hover:border-emerald-500/40 transition-all duration-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
                      <CardDescription className="text-gray-300">
                        {feature.description}
                      </CardDescription>
                    </div>
                    <Badge variant={getStatusColor(feature.status) as any} className="text-xs">
                      {getStatusText(feature.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-gray-400">
                    Phase {feature.phase}
                  </div>
                  <div className="space-y-2">
                    {feature.highlights.map((highlight, highlightIndex) => (
                      <div key={highlightIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span className="text-gray-300 text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Technical Stack Section */}
      <div className="px-6 py-16 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Technical Stack
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glass-dark border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Frontend</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-emerald-400">●</span>
                  <span className="text-gray-300">Next.js 15</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-emerald-400">●</span>
                  <span className="text-gray-300">TypeScript</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-emerald-400">●</span>
                  <span className="text-gray-300">Tailwind CSS</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-emerald-400">●</span>
                  <span className="text-gray-300">Zustand</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-dark border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Backend</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-400">●</span>
                  <span className="text-gray-300">Supabase</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-400">●</span>
                  <span className="text-gray-300">PostgreSQL</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-400">●</span>
                  <span className="text-gray-300">Realtime</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-400">●</span>
                  <span className="text-gray-300">Storage</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-dark border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Infrastructure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-400">●</span>
                  <span className="text-gray-300">Turborepo</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-400">●</span>
                  <span className="text-gray-300">Vercel</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-400">●</span>
                  <span className="text-gray-300">CDN</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-400">●</span>
                  <span className="text-gray-300">Edge Functions</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-dark border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">AI & Analytics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-purple-400">●</span>
                  <span className="text-gray-300">OpenAI API</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-400">●</span>
                  <span className="text-gray-300">ML Models</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-400">●</span>
                  <span className="text-gray-300">Predictive Analytics</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-400">●</span>
                  <span className="text-gray-300">Real-time Insights</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Experience the power of OGMJ BRANDS - the complete business management platform
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="glass-dark border-gray-800">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">Start Free</div>
                <div className="text-white font-medium mb-1">No credit card required</div>
                <div className="text-gray-400 text-sm mb-4">Perfect for small businesses</div>
                <Button className="w-full">Get Started</Button>
              </CardContent>
            </Card>
            
            <Card className="glass-dark border-emerald-500/40">
              <CardContent className="p-6 text-center">
                <Badge variant="emerald" className="mb-2">MOST POPULAR</Badge>
                <div className="text-3xl font-bold text-emerald-400 mb-2">$99/mo</div>
                <div className="text-white font-medium mb-1">Professional Plan</div>
                <div className="text-gray-400 text-sm mb-4">For growing businesses</div>
                <Button className="w-full premium">Start Free Trial</Button>
              </CardContent>
            </Card>
            
            <Card className="glass-dark border-gray-800">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">Custom</div>
                <div className="text-white font-medium mb-1">Enterprise Plan</div>
                <div className="text-gray-400 text-sm mb-4">For large organizations</div>
                <Button variant="outline" className="w-full">Contact Sales</Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <p className="text-gray-400 mb-4">
              Join 10,000+ businesses already using OGMJ BRANDS
            </p>
            <div className="flex justify-center space-x-8 text-gray-300">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🏢</span>
                <span>10,000+ Businesses</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🌍</span>
                <span>150+ Countries</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">⭐</span>
                <span>4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-12 bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <div className="space-y-2">
                <div className="text-gray-400 hover:text-white cursor-pointer">Features</div>
                <div className="text-gray-400 hover:text-white cursor-pointer">Pricing</div>
                <div className="text-gray-400 hover:text-white cursor-pointer">API</div>
                <div className="text-gray-400 hover:text-white cursor-pointer">Integrations</div>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <div className="space-y-2">
                <div className="text-gray-400 hover:text-white cursor-pointer">About</div>
                <div className="text-gray-400 hover:text-white cursor-pointer">Blog</div>
                <div className="text-gray-400 hover:text-white cursor-pointer">Careers</div>
                <div className="text-gray-400 hover:text-white cursor-pointer">Contact</div>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <div className="space-y-2">
                <div className="text-gray-400 hover:text-white cursor-pointer">Documentation</div>
                <div className="text-gray-400 hover:text-white cursor-pointer">Tutorials</div>
                <div className="text-gray-400 hover:text-white cursor-pointer">Community</div>
                <div className="text-gray-400 hover:text-white cursor-pointer">Support</div>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <div className="space-y-2">
                <div className="text-gray-400 hover:text-white cursor-pointer">Privacy Policy</div>
                <div className="text-gray-400 hover:text-white cursor-pointer">Terms of Service</div>
                <div className="text-gray-400 hover:text-white cursor-pointer">Security</div>
                <div className="text-gray-400 hover:text-white cursor-pointer">Compliance</div>
              </div>
            </div>
          </div>
          
          <div className="text-center text-gray-400">
            <p>© 2024 OGMJ BRANDS. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
