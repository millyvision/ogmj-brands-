'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ogmj/ui'
import { Button } from '@ogmj/ui'
import { Badge } from '@ogmj/ui'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ogmj/ui'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ogmj/ui'
import { useAuthStore } from '@/store/auth-store'
import { 
  getWorkflows, 
  createWorkflow, 
  executeWorkflow,
  getWorkflowTemplates,
  createWorkflowFromTemplate,
  getWorkflowAnalytics
} from '@/lib/automation-engine'
import type { Workflow, WorkflowTemplate } from '@/lib/automation-types'

export default function AutomationPage() {
  const { user } = useAuthStore()
  const [workflows, setWorkflows] = useState<Workflow[]>([])
  const [templates, setTemplates] = useState<WorkflowTemplate[]>([])
  const [analytics, setAnalytics] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('workflows')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null)

  useEffect(() => {
    if (user) {
      loadData()
    }
  }, [user, activeTab])

  const loadData = async () => {
    try {
      setLoading(true)
      if (activeTab === 'workflows') {
        const data = await getWorkflows(user?.business_id || '')
        setWorkflows(data)
      } else if (activeTab === 'templates') {
        const data = await getWorkflowTemplates(user?.business_id || '')
        setTemplates(data)
      } else if (activeTab === 'analytics') {
        const data = await getWorkflowAnalytics(user?.business_id || '')
        setAnalytics(data)
      }
    } catch (error) {
      console.error('Error loading automation data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleExecuteWorkflow = async (workflowId: string) => {
    try {
      await executeWorkflow(workflowId)
      await loadData()
    } catch (error) {
      console.error('Error executing workflow:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'gray'
      case 'active': return 'emerald'
      case 'paused': return 'yellow'
      case 'error': return 'red'
      case 'completed': return 'blue'
      default: return 'gray'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'draft': return 'Draft'
      case 'active': return 'Active'
      case 'paused': return 'Paused'
      case 'error': return 'Error'
      case 'completed': return 'Completed'
      default: return status
    }
  }

  const getTriggerIcon = (type: string) => {
    switch (type) {
      case 'manual': return '👆'
      case 'schedule': return '⏰'
      case 'webhook': return '🔗'
      case 'event': return '📊'
      case 'form_submission': return '📝'
      case 'email_received': return '📧'
      case 'api_call': return '🌐'
      case 'file_uploaded': return '📁'
      case 'date_time': return '📅'
      default: return '⚡'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent border-r-transparent animate-spin rounded-full"></div>
          <p className="mt-4">Loading automation...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Automation & Workflows</h1>
          <div className="flex space-x-4">
            <Button onClick={() => setShowCreateModal(true)} className="premium">
              Create Workflow
            </Button>
            <Button onClick={() => setShowTemplateModal(true)} variant="outline">
              Browse Templates
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="glass-dark border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Active Workflows</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-emerald-400">18</div>
              <div className="text-gray-400 text-sm">+3 this week</div>
            </CardContent>
          </Card>
          <Card className="glass-dark border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Total Executions</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-blue-400">1,567</div>
              <div className="text-gray-400 text-sm">+234 this month</div>
            </CardContent>
          </Card>
          <Card className="glass-dark border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Success Rate</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-yellow-400">90.8%</div>
              <div className="text-gray-400 text-sm">+2.1% this month</div>
            </CardContent>
          </Card>
          <Card className="glass-dark border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Time Saved</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-purple-400">156h</div>
              <div className="text-gray-400 text-sm">+12h this month</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="workflows">Workflows</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="executions">Executions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="workflows" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {workflows.map((workflow) => (
                <Card key={workflow.id} className="glass-dark border-gray-800 hover:border-emerald-500/40 transition-all duration-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{getTriggerIcon(workflow.trigger.type)}</div>
                        <div>
                          <CardTitle className="text-white line-clamp-1">{workflow.name}</CardTitle>
                          <CardDescription className="line-clamp-2">
                            {workflow.description}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant={getStatusColor(workflow.status) as any} className="text-xs">
                        {getStatusText(workflow.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2 text-gray-300 text-sm">
                      <span>Trigger:</span>
                      <span className="text-white font-medium">{workflow.trigger.type.replace('_', ' ').toUpperCase()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-300">
                        <span>Actions:</span>
                        <span className="text-white font-medium">{workflow.actions.length}</span>
                      </div>
                      <div className="text-sm text-gray-300">
                        <span>Last Run:</span>
                        <span className="text-white font-medium">
                          {workflow.last_executed ? new Date(workflow.last_executed).toLocaleDateString() : 'Never'}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedWorkflow(workflow)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="premium" 
                        size="sm"
                        onClick={() => handleExecuteWorkflow(workflow.id)}
                        disabled={workflow.status !== 'active'}
                      >
                        Run Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template) => (
                <Card key={template.id} className="glass-dark border-gray-800 hover:border-emerald-500/40 transition-all duration-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-white line-clamp-1">{template.name}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {template.description}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {template.category}
                        </Badge>
                        <div className="text-gray-400 text-sm">
                          {template.usage_count} uses
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm text-gray-300">
                      <span>Triggers:</span>
                      <span className="text-white font-medium ml-2">{template.workflow.trigger.type}</span>
                    </div>
                    <div className="text-sm text-gray-300">
                      <span>Actions:</span>
                      <span className="text-white font-medium ml-2">{template.workflow.actions.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {template.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-yellow-400 text-sm">
                        ⭐ {template.rating?.toFixed(1) || '4.5'}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {/* Preview template */}}
                      >
                        Preview
                      </Button>
                      <Button 
                        variant="premium" 
                        size="sm"
                        onClick={() => createWorkflowFromTemplate(user?.business_id || '', template.id)}
                      >
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="executions" className="space-y-6">
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Execution History</h3>
                <p className="text-gray-300">View detailed execution history and logs</p>
              </div>
              <Button className="premium">
                View Executions
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-dark border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Performance Overview</CardTitle>
                  <CardDescription>Workflow execution metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Success Rate</p>
                      <p className="text-2xl font-bold text-emerald-400">90.8%</p>
                      <p className="text-gray-400 text-sm">+2.1% this month</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Avg Execution Time</p>
                      <p className="text-2xl font-bold text-white">45.6s</p>
                      <p className="text-gray-400 text-sm">-5.2s this month</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Time Saved</p>
                      <p className="text-2xl font-bold text-blue-400">156h</p>
                      <p className="text-gray-400 text-sm">+12h this month</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Cost Savings</p>
                      <p className="text-2xl font-bold text-yellow-400">$2,345</p>
                      <p className="text-gray-400 text-sm">+$234 this month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-dark border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Most Used Workflows</CardTitle>
                  <CardDescription>Your most frequently executed workflows</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {analytics?.most_used_workflows?.map((workflow: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 border border-gray-700">
                      <div>
                        <h4 className="text-white font-medium">{workflow.name}</h4>
                        <div className="flex items-center space-x-4 text-gray-400 text-sm">
                          <span>Executions: {workflow.executions}</span>
                          <span>Success Rate: {workflow.success_rate}%</span>
                        </div>
                      </div>
                      <Badge variant="emerald" className="text-xs">
                        Top Performer
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
