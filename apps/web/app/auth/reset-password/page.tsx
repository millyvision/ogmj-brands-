'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@ogmj/ui'
import { Input } from '@ogmj/ui'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ogmj/ui'
import { updatePassword } from '@/lib/auth'
import type { UpdatePasswordData } from '@/lib/auth-types'

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState<UpdatePasswordData>({
    password: '',
    token: searchParams.get('token') || '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [validToken, setValidToken] = useState(true)

  useEffect(() => {
    if (!formData.token) {
      setValidToken(false)
      setError('Invalid or missing reset token')
    }
  }, [formData.token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validToken) return

    setLoading(true)
    setError(null)

    try {
      await updatePassword(formData)
      setSuccess(true)
      setTimeout(() => {
        router.push('/auth/signin')
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

  if (!validToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Card className="w-full max-w-md glass-dark border-gray-800">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-red-400">
              Invalid Reset Link
            </CardTitle>
            <CardDescription className="text-gray-300">
              The password reset link is invalid or has expired
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-400 mb-4">
              Please request a new password reset link or contact support.
            </p>
            <Button 
              onClick={() => router.push('/auth/forgot-password')}
              className="premium"
            >
              Request New Reset Link
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Card className="w-full max-w-md glass-dark border-gray-800">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-emerald-400">
              Password Reset Successful
            </CardTitle>
            <CardDescription className="text-gray-300">
              Your password has been updated successfully
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7l-4 4m0 6l4-4m0 6v6a3 3 0 00-3 3H6a3 3 0 00-3-3V7a3 3 0 003-3z" />
              </svg>
            </div>
            <p className="text-gray-300 mb-4">
              Your password has been successfully updated!
            </p>
            <p className="text-gray-400 text-sm">
              Redirecting to sign in page...
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
            Set New Password
          </CardTitle>
          <CardDescription className="text-gray-300">
            Enter your new password below
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
              <label htmlFor="password" className="text-sm font-medium text-gray-300">
                New Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full premium" 
              disabled={loading}
            >
              {loading ? 'Updating Password...' : 'Update Password'}
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
