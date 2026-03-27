'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ogmj/ui'
import { Button } from '@ogmj/ui'
import { Input } from '@ogmj/ui'
import { Badge } from '@ogmj/ui'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ogmj/ui'
import { useAuthStore } from '@/store/auth-store'
import { getBusiness, updateBusiness, getTeamMembers, inviteTeamMember } from '@/lib/business-engine'
import type { Business, TeamMember } from '@/lib/business-types'

export default function BusinessPage() {
  const { user } = useAuthStore()
  const [business, setBusiness] = useState<Business | null>(null)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState<'admin' | 'member'>('member')
  const [inviting, setInviting] = useState(false)

  useEffect(() => {
    if (user) {
      loadBusinessData()
    }
  }, [user])

  const loadBusinessData = async () => {
    try {
      setLoading(true)
      const [businessData, teamData] = await Promise.all([
        getBusiness(user?.business_id || ''),
        getTeamMembers(user?.business_id || '')
      ])
      setBusiness(businessData)
      setTeamMembers(teamData)
    } catch (error) {
      console.error('Error loading business data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInviteTeamMember = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inviteEmail || !user?.business_id) return

    setInviting(true)
    try {
      await inviteTeamMember(user.business_id, {
        email: inviteEmail,
        role: inviteRole,
        user_id: '', // Will be filled when user accepts invite
      })
      setInviteEmail('')
      setInviteRole('member')
      // Reload team members
      const updatedTeam = await getTeamMembers(user.business_id)
      setTeamMembers(updatedTeam)
    } catch (error) {
      console.error('Error inviting team member:', error)
    } finally {
      setInviting(false)
    }
  }

  const handleUpdateBusiness = async (field: string, value: any) => {
    if (!business || !user?.business_id) return

    try {
      const updated = await updateBusiness(user.business_id, { [field]: value })
      setBusiness(updated)
    } catch (error) {
      console.error('Error updating business:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent border-r-transparent animate-spin rounded-full"></div>
          <p className="mt-4">Loading business data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Business Management</h1>
          <Badge variant="emerald" className="text-sm">
            {business?.type?.replace('_', ' ').toUpperCase() || 'SERVICE PROVIDER'}
          </Badge>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-dark border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Business Information</CardTitle>
                  <CardDescription>Manage your business details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Business Name
                    </label>
                    <Input
                      value={business?.name || ''}
                      onChange={(e) => handleUpdateBusiness('name', e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      value={business?.description || ''}
                      onChange={(e) => handleUpdateBusiness('description', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Website
                    </label>
                    <Input
                      value={business?.website || ''}
                      onChange={(e) => handleUpdateBusiness('website', e.target.value)}
                      placeholder="https://example.com"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-dark border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Business Metrics</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Team Size</p>
                      <p className="text-2xl font-bold text-white">{business?.team_size || 0}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Monthly Revenue</p>
                      <p className="text-2xl font-bold text-white">
                        ${business?.revenue?.toLocaleString() || '0'}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Founded</p>
                      <p className="text-lg font-semibold text-white">
                        {business?.founded_date ? new Date(business.founded_date).getFullYear() : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Industry</p>
                      <p className="text-lg font-semibold text-white">
                        {business?.industry || 'Not specified'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="glass-dark border-gray-800 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-white">Team Members</CardTitle>
                  <CardDescription>Manage your team and permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">
                              {member.user_id ? member.user_id.slice(0, 2).toUpperCase() : 'IN'}
                            </span>
                          </div>
                          <div>
                            <p className="text-white font-medium">
                              {member.user_id ? 'Team Member' : 'Invited User'}
                            </p>
                            <p className="text-gray-400 text-sm">
                              {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant={member.status === 'active' ? 'success' : member.status === 'pending' ? 'warning' : 'error'}
                            className="text-xs"
                          >
                            {member.status}
                          </Badge>
                          {member.status === 'active' && (
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-dark border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Invite Team Member</CardTitle>
                  <CardDescription>Add team members to collaborate</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleInviteTeamMember} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        placeholder="team@example.com"
                        className="bg-gray-800 border-gray-700 text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Role
                      </label>
                      <select
                        value={inviteRole}
                        onChange={(e) => setInviteRole(e.target.value as 'admin' | 'member')}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                      >
                        <option value="member">Member</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full premium" 
                      disabled={inviting}
                    >
                      {inviting ? 'Inviting...' : 'Send Invite'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="glass-dark border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Business Settings</CardTitle>
                <CardDescription>Configure your business preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white mb-4">General Settings</h3>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={business?.settings?.notifications || false}
                          onChange={(e) => handleUpdateBusiness('settings', {
                            ...business?.settings,
                            notifications: e.target.checked
                          })}
                          className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-emerald-500 focus:ring-emerald-500 focus:ring-2"
                        />
                        <span className="text-gray-300">Email Notifications</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={business?.settings?.auto_backup || false}
                          onChange={(e) => handleUpdateBusiness('settings', {
                            ...business?.settings,
                            auto_backup: e.target.checked
                          })}
                          className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-emerald-500 focus:ring-emerald-500 focus:ring-2"
                        />
                        <span className="text-gray-300">Automatic Backups</span>
                      </label>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white mb-4">Security Settings</h3>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={business?.settings?.two_factor_auth || false}
                          onChange={(e) => handleUpdateBusiness('settings', {
                            ...business?.settings,
                            two_factor_auth: e.target.checked
                          })}
                          className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-emerald-500 focus:ring-emerald-500 focus:ring-2"
                        />
                        <span className="text-gray-300">Two-Factor Authentication</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={business?.settings?.api_access || false}
                          onChange={(e) => handleUpdateBusiness('settings', {
                            ...business?.settings,
                            api_access: e.target.checked
                          })}
                          className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-emerald-500 focus:ring-emerald-500 focus:ring-2"
                        />
                        <span className="text-gray-300">API Access</span>
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <Card className="glass-dark border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Billing & Subscription</CardTitle>
                <CardDescription>Manage your subscription and billing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">Current Plan</h3>
                      <p className="text-emerald-400">
                        {business?.metadata?.subscription_plan?.toUpperCase() || 'FREE'}
                      </p>
                    </div>
                    <Badge variant="emerald" className="text-sm">
                      {business?.metadata?.billing_cycle?.toUpperCase() || 'MONTHLY'}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-lg">Starter</CardTitle>
                      <CardDescription>Perfect for small businesses</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">$49<span className="text-lg text-gray-400">/mo</span></div>
                      <Button className="w-full" variant="outline">Upgrade</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-emerald-500 bg-emerald-500/10">
                    <CardHeader>
                      <CardTitle className="text-lg">Pro</CardTitle>
                      <CardDescription>Most popular choice</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <Badge variant="emerald" className="mb-2">CURRENT PLAN</Badge>
                      <div className="text-3xl font-bold text-white mb-2">$99<span className="text-lg text-gray-400">/mo</span></div>
                      <Button className="w-full" variant="outline">Manage</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-lg">Enterprise</CardTitle>
                      <CardDescription>For large organizations</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">$299<span className="text-lg text-gray-400">/mo</span></div>
                      <Button className="w-full" variant="outline">Contact Sales</Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
