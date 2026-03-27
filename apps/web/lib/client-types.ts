export interface Client {
  id: string
  business_id: string
  name: string
  email: string
  phone?: string
  company?: string
  address?: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  status: 'lead' | 'prospect' | 'active' | 'inactive' | 'churned'
  source: string
  value?: number
  tags: string[]
  notes?: string
  avatar_url?: string
  assigned_to?: string
  last_contact_date?: string
  total_orders: number
  total_revenue: number
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  business_id: string
  client_id: string
  order_number: string
  status: 'draft' | 'pending' | 'in_progress' | 'completed' | 'cancelled' | 'refunded'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  items: OrderItem[]
  subtotal: number
  tax: number
  discount: number
  total: number
  currency: string
  due_date?: string
  completed_date?: string
  paid_date?: string
  notes?: string
  internal_notes?: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  name: string
  description?: string
  type: 'service' | 'product' | 'custom'
  quantity: number
  unit_price: number
  total: number
  metadata?: {
    service_duration?: string
    product_sku?: string
    custom_fields?: Record<string, any>
  }
}

export interface Invoice {
  id: string
  business_id: string
  client_id: string
  order_id?: string
  invoice_number: string
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
  items: InvoiceItem[]
  subtotal: number
  tax: number
  discount: number
  total: number
  currency: string
  due_date: string
  paid_date?: string
  payment_method?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface InvoiceItem {
  id: string
  invoice_id: string
  name: string
  description?: string
  quantity: number
  unit_price: number
  total: number
}

export interface Project {
  id: string
  business_id: string
  client_id: string
  name: string
  description?: string
  status: 'planning' | 'in_progress' | 'review' | 'completed' | 'on_hold'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  start_date?: string
  due_date?: string
  completed_date?: string
  budget?: number
  actual_cost?: number
  progress: number
  assigned_to?: string
  tags: string[]
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  business_id: string
  project_id?: string
  client_id?: string
  title: string
  description?: string
  status: 'todo' | 'in_progress' | 'review' | 'completed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assigned_to?: string
  due_date?: string
  completed_date?: string
  estimated_hours?: number
  actual_hours?: number
  tags: string[]
  created_at: string
  updated_at: string
}
