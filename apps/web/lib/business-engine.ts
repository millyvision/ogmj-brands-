import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Business CRUD operations
export async function getBusiness(businessId: string) {
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('id', businessId)
    .single()

  if (error) throw error
  return data
}

export async function updateBusiness(businessId: string, updates: Partial<any>) {
  const { data, error } = await supabase
    .from('businesses')
    .update(updates)
    .eq('id', businessId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getBusinessSettings(businessId: string) {
  const { data, error } = await supabase
    .from('business_settings')
    .select('*')
    .eq('business_id', businessId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function updateBusinessSetting(businessId: string, key: string, value: any) {
  const { data, error } = await supabase
    .from('business_settings')
    .upsert({
      business_id: businessId,
      key,
      value,
      updated_at: new Date().toISOString()
    })
    .eq('business_id', businessId)
    .eq('key', key)
    .select()

  if (error) throw error
  return data
}

// Team member operations
export async function getTeamMembers(businessId: string) {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('business_id', businessId)
    .order('joined_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function inviteTeamMember(businessId: string, memberData: any) {
  const { data, error } = await supabase
    .from('team_members')
    .insert({
      ...memberData,
      business_id: businessId,
      status: 'pending',
      invited_at: new Date().toISOString(),
      created_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateTeamMemberRole(memberId: string, role: string) {
  const { data, error } = await supabase
    .from('team_members')
    .update({ role, updated_at: new Date().toISOString() })
    .eq('id', memberId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function removeTeamMember(memberId: string) {
  const { data, error } = await supabase
    .from('team_members')
    .delete()
    .eq('id', memberId)

  if (error) throw error
  return data
}

// Contact/Lead management
export interface Contact {
  id: string
  business_id: string
  name: string
  email: string
  phone?: string
  company?: string
  status: 'lead' | 'prospect' | 'client' | 'inactive'
  source: string
  value?: number
  tags: string[]
  notes?: string
  created_at: string
  updated_at: string
}

export async function getContacts(businessId: string) {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .eq('business_id', businessId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function createContact(businessId: string, contactData: Omit<Contact, 'id' | 'business_id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('contacts')
    .insert({
      ...contactData,
      business_id: businessId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateContact(contactId: string, updates: Partial<Contact>) {
  const { data, error } = await supabase
    .from('contacts')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', contactId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteContact(contactId: string) {
  const { data, error } = await supabase
    .from('contacts')
    .delete()
    .eq('id', contactId)

  if (error) throw error
  return data
}
