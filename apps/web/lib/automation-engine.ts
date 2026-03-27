import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Workflow Management
export async function getWorkflows(businessId: string, filters?: {
  status?: string
  category?: string
  search?: string
}) {
  let query = supabase
    .from('workflows')
    .select(`
      *,
      created_by_user:created_by(name, email)
    `)
    .eq('business_id', businessId)
    .order('created_at', { ascending: false })

  if (filters?.status) {
    query = query.eq('status', filters.status)
  }

  if (filters?.search) {
    query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
  }

  const { data, error } = await query
  if (error) throw error
  return data || []
}

export async function createWorkflow(businessId: string, workflowData: any) {
  const { data, error } = await supabase
    .from('workflows')
    .insert({
      ...workflowData,
      business_id,
      status: 'draft',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateWorkflow(workflowId: string, updates: any) {
  const { data, error } = await supabase
    .from('workflows')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', workflowId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function executeWorkflow(workflowId: string, triggerData?: any) {
  const { data, error } = await supabase
    .from('workflow_executions')
    .insert({
      workflow_id: workflowId,
      status: 'running',
      started_at: new Date().toISOString(),
      trigger_data: triggerData
    })
    .select()
    .single()

  if (error) throw error
  
  // Update workflow last execution time
  await supabase
    .from('workflows')
    .update({
      last_executed: new Date().toISOString(),
      next_execution: calculateNextExecution(workflowId)
    })
    .eq('id', workflowId)

  return data
}

// Workflow Execution Engine
export async function processWorkflowExecution(executionId: string) {
  const { data: execution, error } = await supabase
    .from('workflow_executions')
    .select(`
      *,
      workflow:workflows(*)
    `)
    .eq('id', executionId)
    .single()

  if (error) throw error

  try {
    // Process each action in the workflow
    for (const action of execution.workflow.actions) {
      await executeAction(action.id, execution)
    }

    // Mark execution as completed
    await supabase
      .from('workflow_executions')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
        duration_seconds: Math.floor((Date.now() - new Date(execution.started_at).getTime()) / 1000)
      })
      .eq('id', executionId)

  } catch (error) {
    // Mark execution as failed
    await supabase
      .from('workflow_executions')
      .update({
        status: 'failed',
        completed_at: new Date().toISOString(),
        error: error.message
      })
      .eq('id', executionId)
  }
}

async function executeAction(actionId: string, execution: any) {
  const { data: action, error } = await supabase
    .from('workflow_actions')
    .select('*')
    .eq('id', actionId)
    .single()

  if (error) throw error

  // Update action execution status
  await supabase
    .from('action_executions')
    .insert({
      action_id: actionId,
      execution_id: execution.id,
      status: 'running',
      started_at: new Date().toISOString()
    })

  try {
    switch (action.type) {
      case 'send_email':
        await executeSendEmail(action.config)
        break
      case 'create_record':
        await executeCreateRecord(action.config)
        break
      case 'update_record':
        await executeUpdateRecord(action.config)
        break
      case 'call_api':
        await executeCallAPI(action.config)
        break
      case 'send_webhook':
        await executeSendWebhook(action.config)
        break
      case 'create_task':
        await executeCreateTask(action.config)
        break
      case 'send_notification':
        await executeSendNotification(action.config)
        break
      case 'delay':
        await executeDelay(action.config)
        break
      case 'conditional_logic':
        await executeConditionalLogic(action.config, execution)
        break
      default:
        console.log(`Action type ${action.type} not implemented`)
    }

    // Mark action as completed
    await supabase
      .from('action_executions')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString()
      })
      .eq('action_id', actionId)
      .eq('execution_id', execution.id)

  } catch (error) {
    // Mark action as failed
    await supabase
      .from('action_executions')
      .update({
        status: 'failed',
        completed_at: new Date().toISOString(),
        error: error.message
      })
      .eq('action_id', actionId)
      .eq('execution_id', execution.id)
  }
}

// Action Implementations
async function executeSendEmail(config: any) {
  // Mock email sending - in production, integrate with email service
  console.log('Sending email:', config)
  
  await supabase
    .from('workflow_executions')
    .insert({
      execution_id: 'current', // This would be the actual execution ID
      action_id: 'email_action',
      status: 'completed',
      output_data: { email_sent: true, recipients: config.to }
    })
}

async function executeCreateRecord(config: any) {
  // Mock record creation - in production, create actual record
  console.log('Creating record:', config)
  
  await supabase
    .from(config.table)
    .insert(config.data)
}

async function executeUpdateRecord(config: any) {
  // Mock record update - in production, update actual record
  console.log('Updating record:', config)
  
  await supabase
    .from(config.table)
    .update(config.updates)
    .match(config.filters)
}

async function executeCallAPI(config: any) {
  // Mock API call - in production, make actual API call
  console.log('Calling API:', config)
  
  const response = await fetch(config.url, {
    method: config.method || 'POST',
    headers: config.headers,
    body: JSON.stringify(config.body)
  })
  
  return response.json()
}

async function executeSendWebhook(config: any) {
  // Mock webhook sending - in production, send actual webhook
  console.log('Sending webhook:', config)
  
  await fetch(config.url, {
    method: config.method || 'POST',
    headers: config.headers,
    body: JSON.stringify(config.body)
  })
}

async function executeCreateTask(config: any) {
  // Mock task creation - in production, create actual task
  console.log('Creating task:', config)
  
  await supabase
    .from('tasks')
    .insert({
      title: config.title,
      description: config.description,
      assignee: config.assignee,
      due_date: config.due_date,
      priority: config.priority,
      created_at: new Date().toISOString()
    })
}

async function executeSendNotification(config: any) {
  // Mock notification sending - in production, send actual notification
  console.log('Sending notification:', config)
  
  for (const channel of config.channels) {
    if (channel === 'email') {
      // Send email notification
    } else if (channel === 'slack') {
      // Send Slack notification
    } else if (channel === 'sms') {
      // Send SMS notification
    }
  }
}

async function executeDelay(config: any) {
  // Mock delay - in production, implement actual delay
  const duration = config.duration * (config.unit === 'seconds' ? 1000 : config.unit === 'minutes' ? 60000 : 3600000)
  await new Promise(resolve => setTimeout(resolve, duration))
}

async function executeConditionalLogic(config: any, execution: any) {
  // Mock conditional logic - in production, implement actual logic
  const conditionsMet = evaluateConditions(config.conditions, execution)
  
  const actionIds = conditionsMet ? config.true_actions : config.false_actions
  
  for (const actionId of actionIds) {
    await executeAction(actionId, execution)
  }
}

function evaluateConditions(conditions: any[], execution: any): boolean {
  // Mock condition evaluation - in production, implement actual logic
  return true // Simplified for demo
}

function calculateNextExecution(workflowId: string): string {
  // Mock next execution calculation - in production, calculate based on schedule
  const nextDate = new Date()
  nextDate.setDate(nextDate.getDate() + 1) // Next day for demo
  return nextDate.toISOString()
}

// Workflow Templates
export async function getWorkflowTemplates(businessId: string, filters?: {
  category?: string
  tags?: string[]
}) {
  let query = supabase
    .from('workflow_templates')
    .select('*')
    .eq('business_id', businessId)
    .eq('is_public', true)
    .order('usage_count', { ascending: false })

  if (filters?.category) {
    query = query.eq('category', filters.category)
  }

  if (filters?.tags && filters.tags.length > 0) {
    query = query.contains('tags', filters.tags)
  }

  const { data, error } = await query
  if (error) throw error
  return data || []
}

export async function createWorkflowFromTemplate(businessId: string, templateId: string, customizations?: any) {
  const { data: template, error } = await supabase
    .from('workflow_templates')
    .select('*')
    .eq('id', templateId)
    .single()

  if (error) throw error

  // Create workflow from template
  const workflowData = {
    name: template.name,
    description: template.description,
    trigger: template.workflow.trigger,
    actions: template.workflow.actions,
    settings: template.workflow.settings
  }

  // Apply customizations
  if (customizations) {
    Object.assign(workflowData, customizations)
  }

  return await createWorkflow(businessId, workflowData)
}

// Connections Management
export async function getWorkflowConnections(businessId: string) {
  const { data, error } = await supabase
    .from('workflow_connections')
    .select('*')
    .eq('business_id', businessId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function createWorkflowConnection(businessId: string, connectionData: any) {
  const { data, error } = await supabase
    .from('workflow_connections')
    .insert({
      ...connectionData,
      business_id,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) throw error
  return data
}

// Workflow Analytics
export async function getWorkflowAnalytics(businessId: string, dateRange?: {
  start: string
  end: string
}) {
  // Mock analytics data - in production, query actual analytics
  return {
    total_workflows: 24,
    active_workflows: 18,
    total_executions: 1567,
    successful_executions: 1423,
    failed_executions: 144,
    average_execution_time: 45.6,
    most_used_workflows: [
      { name: 'Customer Onboarding', executions: 234, success_rate: 98.7 },
      { name: 'Lead Follow-up', executions: 189, success_rate: 95.2 },
      { name: 'Invoice Generation', executions: 156, success_rate: 99.1 }
    ],
    execution_trends: [
      { date: '2024-01-01', executions: 45, success_rate: 96.5 },
      { date: '2024-01-02', executions: 52, success_rate: 97.1 },
      { date: '2024-01-03', executions: 48, success_rate: 95.8 }
    ],
    time_savings: {
      hours_saved_per_month: 156,
      estimated_cost_savings: 2345,
      automation_roi: 4.2
    }
  }
}
