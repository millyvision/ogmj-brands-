'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@ogmj/ui'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ogmj/ui'
import { useAuthStore } from '@/store/auth-store'
import { updateUserProfile } from '@/lib/auth'
import type { OnboardingData } from '@/lib/onboarding-types'
import { BUSINESS_TYPES, INDUSTRIES, GOALS, TOOLS } from '@/lib/onboarding-data'

const steps = [
  { id: 'welcome', title: 'Welcome to OGMJ BRANDS', description: 'Let\'s set up your business for success' },
  { id: 'business-type', title: 'Business Type', description: 'Choose your business type to personalize your experience' },
  { id: 'business-details', title: 'Business Details', description: 'Tell us about your business' },
  { id: 'goals', title: 'Your Goals', description: 'What do you want to achieve?' },
  { id: 'tools', title: 'Priority Tools', description: 'Select the tools you need most' },
  { id: 'completion', title: 'All Set!', description: 'Your personalized dashboard is ready' }
]

export default function OnboardingPage() {
  const router = useRouter()
  const { user } = useAuthStore()
  const [currentStep, setCurrentStep] = useState(0)
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    business_name: '',
    business_type: 'service_provider',
    industry: '',
    primary_goal: '',
    sell_services: false,
    sell_products: false,
    sell_campaigns: false,
    priority_tools: []
  })
  const [loading, setLoading] = useState(false)

  const currentStepData = steps[currentStep]

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      await handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = async () => {
    setLoading(true)
    try {
      // Update user profile with onboarding data
      await updateProfile({
        name: user?.name || '',
        business_name: onboardingData.business_name,
        avatar_url: user?.avatar_url
      })

      // Store onboarding completion
      localStorage.setItem('ogmj-onboarding-completed', 'true')
      
      // Redirect to dashboard
      router.push('/dashboard')
    } catch (error) {
      console.error('Onboarding completion error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSkip = () => {
    localStorage.setItem('ogmj-onboarding-completed', 'true')
    router.push('/dashboard')
  }

  const updateOnboardingData = (key: keyof OnboardingData, value: any) => {
    setOnboardingData(prev => ({ ...prev, [key]: value }))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-3xl">OG</span>
            </div>
            <CardTitle className="text-3xl text-white mb-4">
              Welcome to OGMJ BRANDS
            </CardTitle>
            <CardDescription className="text-gray-300 text-lg mb-8">
              The most powerful all-in-one platform for entrepreneurs, creators, agencies, and service businesses to launch, run, and scale their entire operation from one intelligent dashboard.
            </CardDescription>
            <div className="space-y-4">
              <Button onClick={handleNext} className="premium premium-lg">
                Start Setup
              </Button>
              <Button onClick={handleSkip} variant="ghost" className="text-gray-400">
                Skip for now
              </Button>
            </div>
          </div>
        )

      case 1:
        return (
          <div className="space-y-6">
            <CardTitle className="text-2xl text-white mb-4">
              Choose Your Business Type
            </CardTitle>
            <CardDescription className="text-gray-300 mb-6">
              Select the type that best describes your business to personalize your OGMJ experience.
            </CardDescription>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {BUSINESS_TYPES.map((type) => (
                <Card 
                  key={type.id}
                  className={`cursor-pointer transition-all duration-200 hover:border-emerald-500/40 ${
                    onboardingData.business_type === type.id 
                      ? 'border-emerald-500 bg-emerald-500/10' 
                      : 'border-gray-700 hover:bg-gray-800'
                  }`}
                  onClick={() => updateOnboardingData('business_type', type.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{type.icon}</div>
                    <h3 className="text-lg font-semibold text-white mb-2">{type.name}</h3>
                    <p className="text-gray-300 text-sm">{type.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-between">
              <Button onClick={handlePrevious} variant="outline">
                Previous
              </Button>
              <Button onClick={handleNext} className="premium">
                Next
              </Button>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <CardTitle className="text-2xl text-white mb-4">
              Business Details
            </CardTitle>
            <CardDescription className="text-gray-300 mb-6">
              Tell us about your business to help us personalize your experience.
            </CardDescription>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  value={onboardingData.business_name}
                  onChange={(e) => updateOnboardingData('business_name', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none"
                  placeholder="My Business"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Industry
                </label>
                <select
                  value={onboardingData.industry}
                  onChange={(e) => updateOnboardingData('industry', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                >
                  <option value="">Select your industry</option>
                  {INDUSTRIES.map((industry) => (
                    <option key={industry.id} value={industry.id}>
                      {industry.icon} {industry.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-between">
              <Button onClick={handlePrevious} variant="outline">
                Previous
              </Button>
              <Button onClick={handleNext} className="premium">
                Next
              </Button>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <CardTitle className="text-2xl text-white mb-4">
              What Are Your Goals?
            </CardTitle>
            <CardDescription className="text-gray-300 mb-6">
              Select your primary goals to help us prioritize features and recommendations for your business.
            </CardDescription>
            <div className="space-y-4">
              {GOALS.map((goal) => (
                <Card 
                  key={goal.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    onboardingData.primary_goal === goal.id 
                      ? 'border-emerald-500 bg-emerald-500/10' 
                      : 'border-gray-700 hover:bg-gray-800'
                  }`}
                  onClick={() => updateOnboardingData('primary_goal', goal.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{goal.icon}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">{goal.name}</h3>
                        <p className="text-gray-300 text-sm">{goal.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-between">
              <Button onClick={handlePrevious} variant="outline">
                Previous
              </Button>
              <Button onClick={handleNext} className="premium">
                Next
              </Button>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <CardTitle className="text-2xl text-white mb-4">
              Priority Tools
            </CardTitle>
            <CardDescription className="text-gray-300 mb-6">
              Select the tools you need most. We'll prioritize these in your dashboard.
            </CardDescription>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TOOLS.map((tool) => (
                <Card 
                  key={tool.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    onboardingData.priority_tools.includes(tool.id) 
                      ? 'border-emerald-500 bg-emerald-500/10' 
                      : 'border-gray-700 hover:bg-gray-800'
                  }`}
                  onClick={() => {
                    const updated = onboardingData.priority_tools.includes(tool.id)
                      ? onboardingData.priority_tools.filter(id => id !== tool.id)
                      : [...onboardingData.priority_tools, tool.id]
                    updateOnboardingData('priority_tools', updated)
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{tool.icon}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">{tool.name}</h3>
                        <p className="text-gray-300 text-sm">{tool.description}</p>
                        <div className="mt-2">
                          <span className="inline-block px-2 py-1 bg-gray-700 rounded text-xs text-gray-400">
                            {tool.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-between">
              <Button onClick={handlePrevious} variant="outline">
                Previous
              </Button>
              <Button onClick={handleNext} className="premium">
                Complete Setup
              </Button>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2L7 17l5.586-5.586a2 2 0 00-2.828 0L4.172 4.172a2 2 0 00-2.828 0z" />
              </svg>
            </div>
            <CardTitle className="text-3xl text-white mb-4">
              All Set! 🎉
            </CardTitle>
            <CardDescription className="text-gray-300 text-lg mb-6">
              Your personalized OGMJ BRANDS dashboard is ready. We've configured everything based on your preferences.
            </CardDescription>
            <div className="space-y-4">
              <div className="glass-dark p-6 rounded-lg border-gray-800">
                <h4 className="text-lg font-semibold text-white mb-3">Your Business Setup:</h4>
                <div className="space-y-2 text-gray-300">
                  <p><strong>Business Type:</strong> {BUSINESS_TYPES.find(t => t.id === onboardingData.business_type)?.name}</p>
                  <p><strong>Industry:</strong> {INDUSTRIES.find(i => i.id === onboardingData.industry)?.name}</p>
                  <p><strong>Primary Goal:</strong> {GOALS.find(g => g.id === onboardingData.primary_goal)?.name}</p>
                  <p><strong>Priority Tools:</strong> {onboardingData.priority_tools.length} selected</p>
                </div>
              </div>
              <Button 
                onClick={handleComplete} 
                className="premium premium-lg w-full" 
                disabled={loading}
              >
                {loading ? 'Setting up your dashboard...' : 'Go to Dashboard'}
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">Setup Your Business</h1>
            <Button onClick={handleSkip} variant="ghost" className="text-gray-400">
              Skip Setup
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                  index <= currentStep ? 'bg-emerald-500' : 'bg-gray-700'
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>{currentStepData.title}</span>
          </div>
        </div>

        {/* Step Content */}
        <Card className="glass-dark border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">{currentStepData.title}</CardTitle>
            <CardDescription>{currentStepData.description}</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            {renderStep()}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
