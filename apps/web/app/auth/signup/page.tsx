'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@ogmj/ui'
import { Input } from '@ogmj/ui'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ogmj/ui'
import { signUp } from '@/lib/auth'
import type { SignUpData } from '@/lib/auth-types'

export default function SignUpPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<SignUpData>({
    email: '',
    password: '',
    name: '',
    business_name: '',
    business_type: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await signUp(formData)
      setSuccess(true)
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Card className="w-full max-w-md glass-dark border-gray-800">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-emerald-400">
              Welcome to OGMJ BRANDS
            </CardTitle>
            <CardDescription className="text-gray-300">
              Your account has been created successfully!
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-300 mb-4">
              Redirecting to your dashboard...
            </p>
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent border-r-transparent animate-spin rounded-full"></div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <Card className="w-full max-w-md glass-dark border-gray-800">
        <CardHeader className="text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">OG</span>
          </div>
          <CardTitle className="text-2xl text-white">
            Create Your Account
          </CardTitle>
          <CardDescription className="text-gray-300">
            Join thousands of entrepreneurs building their empire with OGMJ BRANDS
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-300">
                Full Name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-300">
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-300">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="business_name" className="text-sm font-medium text-gray-300">
                Business Name (Optional)
              </label>
              <Input
                id="business_name"
                name="business_name"
                type="text"
                placeholder="My Business"
                value={formData.business_name}
                onChange={handleChange}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="business_type" className="text-sm font-medium text-gray-300">
                Business Type (Optional)
              </label>
              <select
                id="business_type"
                name="business_type"
                value={formData.business_type}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="">Select your business type</option>
                <option value="service">Service Provider</option>
                <option value="agency">Digital Agency</option>
                <option value="ecommerce">E-commerce</option>
                <option value="creator">Content Creator</option>
                <option value="consultant">Consultant</option>
                <option value="freelancer">Freelancer</option>
              </select>
            </div>

            <Button 
              type="submit" 
              className="w-full premium" 
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{' '}
              <Link href="/auth/signin" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
