import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Client Management
export async function getClients(businessId: string, filters?: {
  status?: string
  search?: string
  tags?: string[]
}) {
  let query = supabase
    .from('clients')
    .select('*')
    .eq('business_id', businessId)
    .order('created_at', { ascending: false })

  if (filters?.status) {
    query = query.eq('status', filters.status)
  }

  if (filters?.search) {
    query = query.or(`name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,company.ilike.%${filters.search}%`)
  }

  if (filters?.tags && filters.tags.length > 0) {
    query = query.contains('tags', filters.tags)
  }

  const { data, error } = await query
  if (error) throw error
  return data || []
}

export async function getClient(clientId: string) {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', clientId)
    .single()

  if (error) throw error
  return data
}

export async function createClient(businessId: string, clientData: any) {
  const { data, error } = await supabase
    .from('clients')
    .insert({
      ...clientData,
      business_id,
      status: 'lead',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateClient(clientId: string, updates: any) {
  const { data, error } = await supabase
    .from('clients')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', clientId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteClient(clientId: string) {
  const { data, error } = await supabase
    .from('clients')
    .delete()
    .eq('id', clientId)

  if (error) throw error
  return data
}

// Order Management
export async function getOrders(businessId: string, filters?: {
  client_id?: string
  status?: string
  search?: string
}) {
  let query = supabase
    .from('orders')
    .select(`
      *,
      client:client_id(name, email, company)
    `)
    .eq('business_id', businessId)
    .order('created_at', { ascending: false })

  if (filters?.client_id) {
    query = query.eq('client_id', filters.client_id)
  }

  if (filters?.status) {
    query = query.eq('status', filters.status)
  }

  if (filters?.search) {
    query = query.or(`order_number.ilike.%${filters.search}%,client.name.ilike.%${filters.search}%`)
  }

  const { data, error } = await query
  if (error) throw error
  return data || []
}

export async function getOrder(orderId: string) {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      client:client_id(name, email, company),
      items:order_items(*)
    `)
    .eq('id', orderId)
    .single()

  if (error) throw error
  return data
}

export async function createOrder(businessId: string, orderData: any) {
  const { data, error } = await supabase
    .from('orders')
    .insert({
      ...orderData,
      business_id,
      order_number: generateOrderNumber(),
      status: 'draft',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateOrder(orderId: string, updates: any) {
  const { data, error } = await supabase
    .from('orders')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', orderId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteOrder(orderId: string) {
  const { data, error } = await supabase
    .from('orders')
    .delete()
    .eq('id', orderId)

  if (error) throw error
  return data
}

// Invoice Management
export async function getInvoices(businessId: string, filters?: {
  client_id?: string
  status?: string
  search?: string
}) {
  let query = supabase
    .from('invoices')
    .select(`
      *,
      client:client_id(name, email, company)
    `)
    .eq('business_id', businessId)
    .order('created_at', { ascending: false })

  if (filters?.client_id) {
    query = query.eq('client_id', filters.client_id)
  }

  if (filters?.status) {
    query = query.eq('status', filters.status)
  }

  if (filters?.search) {
    query = query.or(`invoice_number.ilike.%${filters.search}%,client.name.ilike.%${filters.search}%`)
  }

  const { data, error } = await query
  if (error) throw error
  return data || []
}

export async function createInvoice(businessId: string, invoiceData: any) {
  const { data, error } = await supabase
    .from('invoices')
    .insert({
      ...invoiceData,
      business_id,
      invoice_number: generateInvoiceNumber(),
      status: 'draft',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateInvoice(invoiceId: string, updates: any) {
  const { data, error } = await supabase
    .from('invoices')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', invoiceId)
    .select()
    .single()

  if (error) throw error
  return data
}

// Project Management
export async function getProjects(businessId: string, filters?: {
  client_id?: string
  status?: string
  search?: string
}) {
  let query = supabase
    .from('projects')
    .select(`
      *,
      client:client_id(name, email, company)
    `)
    .eq('business_id', businessId)
    .order('created_at', { ascending: false })

  if (filters?.client_id) {
    query = query.eq('client_id', filters.client_id)
  }

  if (filters?.status) {
    query = query.eq('status', filters.status)
  }

  if (filters?.search) {
    query = query.ilike('name', `%${filters.search}%`)
  }

  const { data, error } = await query
  if (error) throw error
  return data || []
}

export async function createProject(businessId: string, projectData: any) {
  const { data, error } = await supabase
    .from('projects')
    .insert({
      ...projectData,
      business_id,
      status: 'planning',
      progress: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateProject(projectId: string, updates: any) {
  const { data, error } = await supabase
    .from('projects')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', projectId)
    .select()
    .single()

  if (error) throw error
  return data
}

// Utility functions
function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  return `ORD-${timestamp}`
}

function generateInvoiceNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  return `INV-${timestamp}`
}
