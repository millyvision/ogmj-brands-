'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth-store'
import { useOnboardingStore } from '@/store/onboarding-store'

interface OnboardingGuardProps {
  children: React.ReactNode
  requireOnboarding?: boolean
}

export default function OnboardingGuard({ children, requireOnboarding = true }: OnboardingGuardProps) {
  const router = useRouter()
  const { user, initialized } = useAuthStore()
  const { isCompleted } = useOnboardingStore()

  useEffect(() => {
    // Wait for auth to be initialized
    if (!initialized) return

    // Check if onboarding is required and user exists
    if (requireOnboarding && user && !isCompleted) {
      // Check if onboarding was already completed
      const completed = localStorage.getItem('ogmj-onboarding-completed')
      if (completed !== 'true') {
        router.push('/onboarding')
      }
    }
  }, [user, initialized, isCompleted, router, requireOnboarding])

  // If onboarding is not required or is completed, render children
  if (!requireOnboarding || isCompleted || !user) {
    return <>{children}</>
  }

  // Show loading state while checking
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white text-center">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent border-r-transparent animate-spin rounded-full"></div>
        <p className="mt-4">Setting up your workspace...</p>
      </div>
    </div>
  )
}
