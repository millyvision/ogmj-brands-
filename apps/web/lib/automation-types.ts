export interface Workflow {
  id: string
  business_id: string
  name: string
  description?: string
  status: 'draft' | 'active' | 'paused' | 'error' | 'completed'
  trigger: WorkflowTrigger
  actions: WorkflowAction[]
  conditions?: WorkflowCondition[]
  schedule?: WorkflowSchedule
  settings: {
    error_handling: 'stop' | 'continue' | 'retry'
    retry_count?: number
    timeout_minutes?: number
    notifications: {
      on_success: boolean
      on_failure: boolean
      on_start: boolean
      channels: ('email' | 'slack' | 'webhook' | 'sms')[]
    }
  }
  execution_history: WorkflowExecution[]
  created_at: string
  updated_at: string
  created_by: string
  last_executed?: string
  next_execution?: string
}

export interface WorkflowTrigger {
  type: 'manual' | 'schedule' | 'webhook' | 'event' | 'form_submission' | 'email_received' | 'api_call' | 'file_uploaded' | 'date_time'
  config: {
    // Manual trigger
    manual?: {}
    
    // Schedule trigger
    schedule?: {
      frequency: 'once' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom'
      start_date?: string
      end_date?: string
      timezone?: string
      days_of_week?: number[]
      day_of_month?: number
      time?: string
    }
    
    // Webhook trigger
    webhook?: {
      url: string
      method: 'POST' | 'GET'
      headers?: Record<string, string>
      authentication?: {
        type: 'none' | 'basic' | 'bearer' | 'api_key'
        credentials?: string
      }
    }
    
    // Event trigger
    event?: {
      source: 'analytics' | 'crm' | 'ecommerce' | 'email' | 'social' | 'ads' | 'custom'
      event_name: string
      filters?: Record<string, any>
    }
    
    // Form submission trigger
    form?: {
      form_id: string
      filters?: Record<string, any>
    }
    
    // Email received trigger
    email?: {
      filters?: {
        from?: string
        subject?: string
        contains?: string
        has_attachments?: boolean
      }
    }
    
    // API call trigger
    api?: {
      endpoint: string
      method: 'GET' | 'POST' | 'PUT' | 'DELETE'
      headers?: Record<string, string>
      authentication?: {
        type: 'none' | 'basic' | 'bearer' | 'api_key'
        credentials?: string
      }
      expected_response?: {
        status_code?: number
        body_contains?: string
        headers?: Record<string, string>
      }
    }
    
    // File uploaded trigger
    file?: {
      source: 'uploads' | 'external'
      filters?: {
        file_type?: string
        min_size?: number
        max_size?: number
        folder?: string
      }
    }
    
    // Date/time trigger
    date_time?: {
      type: 'specific' | 'recurring'
      date?: string
      time?: string
      recurring_pattern?: {
        frequency: 'daily' | 'weekly' | 'monthly' | 'yearly'
        interval?: number
        days_of_week?: number[]
        day_of_month?: number
      }
    }
  }
}

export interface WorkflowAction {
  id: string
  type: 'send_email' | 'create_record' | 'update_record' | 'delete_record' | 'call_api' | 'send_webhook' | 'create_task' | 'update_task' | 'send_notification' | 'upload_file' | 'generate_document' | 'run_script' | 'conditional_logic' | 'delay' | 'loop' | 'transform_data' | 'filter_data' | 'human_approval'
  name: string
  description?: string
  config: {
    // Send email action
    send_email?: {
      to: string[]
      cc?: string[]
      bcc?: string[]
      subject: string
      body?: string
      template_id?: string
      variables?: Record<string, any>
      attachments?: string[]
      priority?: 'low' | 'normal' | 'high'
    }
    
    // Create/update/delete record actions
    create_record?: {
      table: string
      data: Record<string, any>
      return_record?: boolean
    }
    update_record?: {
      table: string
      filters: Record<string, any>
      updates: Record<string, any>
      return_record?: boolean
    }
    delete_record?: {
      table: string
      filters: Record<string, any>
      confirm_required?: boolean
    }
    
    // API call action
    call_api?: {
      url: string
      method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
      headers?: Record<string, string>
      body?: any
      authentication?: {
        type: 'none' | 'basic' | 'bearer' | 'api_key'
        credentials?: string
      }
      timeout?: number
      expected_response?: {
        status_code?: number
        body_contains?: string
        headers?: Record<string, string>
      }
      store_response?: string
    }
    
    // Send webhook action
    send_webhook?: {
      url: string
      method: 'POST' | 'GET'
      headers?: Record<string, string>
      body?: any
      authentication?: {
        type: 'none' | 'basic' | 'bearer' | 'api_key'
        credentials?: string
      }
      timeout?: number
    }
    
    // Create/update task action
    create_task?: {
      title: string
      description?: string
      assignee?: string
      due_date?: string
      priority?: 'low' | 'medium' | 'high' | 'urgent'
      tags?: string[]
    }
    update_task?: {
      filters: Record<string, any>
      updates: Record<string, any>
    }
    
    // Send notification action
    send_notification?: {
      channels: ('email' | 'slack' | 'sms' | 'push' | 'in_app')[]
      message: string
      recipients?: string[]
      priority?: 'low' | 'medium' | 'high'
    }
    
    // Upload file action
    upload_file?: {
      source_path?: string
      destination?: string
      file_name?: string
      overwrite?: boolean
    }
    
    // Generate document action
    generate_document?: {
      template_id?: string
      format: 'pdf' | 'docx' | 'xlsx' | 'csv'
      data?: Record<string, any>
      output_path?: string
      email_to?: string[]
    }
    
    // Run script action
    run_script?: {
      language: 'javascript' | 'python' | 'shell' | 'sql'
      code: string
      environment?: Record<string, string>
      timeout?: number
    }
    
    // Conditional logic action
    conditional_logic?: {
      conditions: WorkflowCondition[]
      true_actions: string[] // Action IDs
      false_actions: string[] // Action IDs
    }
    
    // Delay action
    delay?: {
      duration: number
      unit: 'seconds' | 'minutes' | 'hours' | 'days'
    }
    
    // Loop action
    loop?: {
      iterations: number
      actions: string[] // Action IDs
      item_variable?: string
    }
    
    // Transform data action
    transform_data?: {
      input_variable?: string
      transformation: {
        type: 'map' | 'filter' | 'reduce' | 'sort' | 'format' | 'calculate' | 'lookup' | 'join' | 'split'
        config?: Record<string, any>
      }
      output_variable?: string
    }
    
    // Filter data action
    filter_data?: {
      input_variable?: string
      conditions: WorkflowCondition[]
      output_variable?: string
    }
    
    // Human approval action
    human_approval?: {
      approvers: string[]
      message?: string
      timeout_hours?: number
      reminder_interval?: number
    }
  }
}

export interface WorkflowCondition {
  field: string
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'greater_equal' | 'less_equal' | 'contains' | 'not_contains' | 'starts_with' | 'ends_with' | 'in' | 'not_in' | 'is_empty' | 'is_not_empty' | 'regex'
  value: any
  logical_operator?: 'and' | 'or'
}

export interface WorkflowSchedule {
  enabled: boolean
  timezone: string
  executions: {
    next_run?: string
    last_run?: string
    frequency?: string
  }
}

export interface WorkflowExecution {
  id: string
  workflow_id: string
  status: 'running' | 'completed' | 'failed' | 'cancelled'
  started_at: string
  completed_at?: string
  duration_seconds?: number
  trigger_data?: any
  input_data?: any
  output_data?: any
  error?: string
  logs: ExecutionLog[]
  actions_executed: ActionExecution[]
}

export interface ExecutionLog {
  timestamp: string
  level: 'info' | 'warning' | 'error' | 'debug'
  message: string
  data?: any
}

export interface ActionExecution {
  action_id: string
  status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped'
  started_at?: string
  completed_at?: string
  duration_seconds?: number
  input_data?: any
  output_data?: any
  error?: string
}

export interface WorkflowTemplate {
  id: string
  name: string
  description?: string
  category: 'marketing' | 'sales' | 'operations' | 'hr' | 'finance' | 'customer_service' | 'it' | 'custom'
  tags: string[]
  workflow: Workflow
  usage_count: number
  rating?: number
  is_public: boolean
  created_by: string
  created_at: string
  updated_at: string
}

export interface WorkflowConnection {
  id: string
  business_id: string
  name: string
  type: 'oauth' | 'api_key' | 'webhook' | 'database' | 'file_system' | 'email' | 'sms' | 'custom'
  service: {
    name: string
    logo_url?: string
    description?: string
    authentication_type: string
    base_url?: string
    version?: string
  }
  config: {
    credentials?: Record<string, string>
    settings?: Record<string, any>
    permissions?: string[]
    rate_limits?: {
      requests_per_hour?: number
      requests_per_day?: number
    }
  }
  is_active: boolean
  last_verified?: string
  created_at: string
  updated_at: string
}
