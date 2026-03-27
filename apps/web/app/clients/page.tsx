'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ogmj/ui'
import { Button } from '@ogmj/ui'
import { Input } from '@ogmj/ui'
import { Badge } from '@ogmj/ui'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ogmj/ui'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ogmj/ui'
import { useAuthStore } from '@/store/auth-store'
import { getClients, createClient, updateClient, deleteClient } from '@/lib/client-engine'
import type { Client } from '@/lib/client-types'

export default function ClientsPage() {
  const { user } = useAuthStore()
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: ''
    }
  })

  useEffect(() => {
    if (user) {
      loadClients()
    }
  }, [user, activeTab, statusFilter, searchTerm])

  const loadClients = async () => {
    try {
      setLoading(true)
      const filters: any = {}
      if (statusFilter) filters.status = statusFilter
      if (searchTerm) filters.search = searchTerm
      
      const data = await getClients(user?.business_id || '', filters)
      setClients(data)
    } catch (error) {
      console.error('Error loading clients:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user?.business_id) return

    try {
      await createClient(user.business_id, formData)
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        address: {
          street: '',
          city: '',
          state: '',
          zip: '',
          country: ''
        }
      })
      setShowCreateModal(false)
      await loadClients()
    } catch (error) {
      console.error('Error creating client:', error)
    }
  }

  const handleUpdateClient = async (clientId: string, updates: Partial<Client>) => {
    try {
      await updateClient(clientId, updates)
      await loadClients()
      setEditingClient(null)
    } catch (error) {
      console.error('Error updating client:', error)
    }
  }

  const handleDeleteClient = async (clientId: string) => {
    if (!confirm('Are you sure you want to delete this client?')) return

    try {
      await deleteClient(clientId)
      await loadClients()
    } catch (error) {
      console.error('Error deleting client:', error)
    }
  }

  const filteredClients = clients.filter(client => {
    if (activeTab === 'all') return true
    if (activeTab === 'leads') return client.status === 'lead'
    if (activeTab === 'prospects') return client.status === 'prospect'
    if (activeTab === 'active') return client.status === 'active'
    if (activeTab === 'inactive') return client.status === 'inactive'
    return true
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'lead': return 'blue'
      case 'prospect': return 'yellow'
      case 'active': return 'emerald'
      case 'inactive': return 'gray'
      case 'churned': return 'red'
      default: return 'gray'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'lead': return 'Lead'
      case 'prospect': return 'Prospect'
      case 'active': return 'Active'
      case 'inactive': return 'Inactive'
      case 'churned': return 'Churned'
      default: return status
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent border-r-transparent animate-spin rounded-full"></div>
          <p className="mt-4">Loading clients...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Clients & Orders</h1>
          <Button onClick={() => setShowCreateModal(true)} className="premium">
            Add Client
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="glass-dark border-gray-800 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <Input
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-gray-800 border-gray-700 text-white"
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="">All Statuses</SelectItem>
                  <SelectItem value="lead">Lead</SelectItem>
                  <SelectItem value="prospect">Prospect</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="churned">Churned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All ({clients.length})</TabsTrigger>
            <TabsTrigger value="leads">Leads ({clients.filter(c => c.status === 'lead').length})</TabsTrigger>
            <TabsTrigger value="prospects">Prospects ({clients.filter(c => c.status === 'prospect').length})</TabsTrigger>
            <TabsTrigger value="active">Active ({clients.filter(c => c.status === 'active').length})</TabsTrigger>
            <TabsTrigger value="inactive">Inactive ({clients.filter(c => c.status === 'inactive').length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredClients.map((client) => (
                <Card key={client.id} className="glass-dark border-gray-800 hover:border-emerald-500/40 transition-all duration-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {client.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <CardTitle className="text-white">{client.name}</CardTitle>
                          <CardDescription>{client.company || 'No company'}</CardDescription>
                        </div>
                      </div>
                      <Badge variant={getStatusColor(client.status) as any} className="text-xs">
                        {getStatusText(client.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2 text-gray-300 text-sm">
                      <span>📧</span>
                      <span>{client.email}</span>
                    </div>
                    {client.phone && (
                      <div className="flex items-center space-x-2 text-gray-300 text-sm">
                        <span>📱</span>
                        <span>{client.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="text-gray-300 text-sm">
                        <span>Total Orders:</span>
                        <span className="text-white font-medium ml-1">{client.total_orders || 0}</span>
                      </div>
                      <div className="text-gray-300 text-sm">
                        <span>Revenue:</span>
                        <span className="text-emerald-400 font-medium ml-1">${(client.total_revenue || 0).toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setEditingClient(client)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {/* Navigate to orders */}}
                      >
                        Orders
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Other tab contents would be similar, filtering by status */}
          <TabsContent value="leads">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredClients.filter(c => c.status === 'lead').map((client) => (
                <Card key={client.id} className="glass-dark border-gray-800 hover:border-blue-500/40 transition-all duration-200">
                  {/* Same card structure as above */}
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Create/Edit Client Modal */}
        {(showCreateModal || editingClient) && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl glass-dark border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">
                  {editingClient ? 'Edit Client' : 'Add New Client'}
                </CardTitle>
                <CardDescription>
                  {editingClient ? 'Update client information' : 'Add a new client to your business'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateClient} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Client Name *
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
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="bg-gray-800 border-gray-700 text-white"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Company
                      </label>
                      <Input
                        value={formData.company}
                        onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Address
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Street Address"
                        value={formData.address.street}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          address: { ...prev.address, street: e.target.value }
                        }))}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                      <Input
                        placeholder="City"
                        value={formData.address.city}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          address: { ...prev.address, city: e.target.value }
                        }))}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="State"
                        value={formData.address.state}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          address: { ...prev.address, state: e.target.value }
                        }))}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                      <Input
                        placeholder="ZIP Code"
                        value={formData.address.zip}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          address: { ...prev.address, zip: e.target.value }
                        }))}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-4 pt-4">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => {
                        setShowCreateModal(false)
                        setEditingClient(null)
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          company: '',
                          address: {
                            street: '',
                            city: '',
                            state: '',
                            zip: '',
                            country: ''
                          }
                        })
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="premium">
                      {editingClient ? 'Update Client' : 'Create Client'}
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
