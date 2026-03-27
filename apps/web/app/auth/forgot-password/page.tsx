'use client'

import { useState } from 'react'
import { Button } from '@ogmj/ui'
import { Input } from '@ogmj/ui'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ogmj/ui'
import { resetPassword } from '@/lib/auth'
import type { ResetPasswordData } from '@/lib/auth-types'

export default function ForgotPasswordPage() {
  const [formData, setFormData] = useState<ResetPasswordData>({
    email: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await resetPassword(formData)
      setSuccess(true)
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
              Check Your Email
            </CardTitle>
            <CardDescription className="text-gray-300">
              Password reset instructions have been sent to your email!
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a12 12 0 01.67 0l-8 6v1.67a12 12 0 01.67 0l8 6V9a3 3 0 00-3-3H5a3 3 0 00-3 3v6a3 3 0 003 3h4a3 3 0 003-3V9a3 3 0 00-3-3z" />
              </svg>
            </div>
            <p className="text-gray-300 mb-4">
              We've sent password reset instructions to your email address.
            </p>
            <p className="text-gray-400 text-sm">
              Please check your inbox and follow the link to reset your password.
            </p>
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
            Reset Password
          </CardTitle>
          <CardDescription className="text-gray-300">
            Enter your email address and we'll send you a link to reset your password
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

            <Button 
              type="submit" 
              className="w-full premium" 
              disabled={loading}
            >
              {loading ? 'Sending Reset Link...' : 'Send Reset Link'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Remember your password?{' '}
              <a href="/auth/signin" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                Sign in
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
