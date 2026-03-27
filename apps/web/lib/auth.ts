import { supabase } from './supabase'
import type { 
  AuthUser, 
  AuthResponse, 
  SignUpData, 
  SignInData, 
  ResetPasswordData, 
  UpdatePasswordData,
  UpdateProfileData,
  AuthFunctionError
} from './auth-types'

class CustomAuthError extends Error {
  code?: string
  status?: number

  constructor(message: string, code?: string, status?: number) {
    super(message)
    this.code = code
    this.status = status
  }
}

export async function signUp(data: SignUpData): Promise<AuthResponse> {
  try {
    const { data: signUpData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
          role: 'user',
          business_name: data.business_name,
          business_type: data.business_type,
        }
      }
    })

    if (error) {
      throw new CustomAuthError(error.message, error.status?.toString(), error.status)
    }

    return { user: signUpData.user as AuthUser | null, error: null }
  } catch (error) {
    throw new CustomAuthError('An unexpected error occurred during sign up')
  }
}

export async function signIn(data: SignInData): Promise<AuthResponse> {
  try {
    const { data: signInData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) {
      throw new CustomAuthError(error.message, error.status?.toString(), error.status)
    }

    return { user: signInData.user as AuthUser | null, error: null }
  } catch (error) {
    throw new CustomAuthError('An unexpected error occurred during sign in')
  }
}

export async function signOut(): Promise<{ error: AuthFunctionError }> {
  try {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      throw new CustomAuthError(error.message, error.status?.toString(), error.status)
    }

    return { error: null }
  } catch (error) {
    throw new CustomAuthError('An unexpected error occurred during sign out')
  }
}

export async function resetPassword(data: ResetPasswordData): Promise<{ error: AuthFunctionError }> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(data.email)
    
    if (error) {
      throw new CustomAuthError(error.message, error.status?.toString(), error.status)
    }

    return { error: null }
  } catch (error) {
    throw new CustomAuthError('An unexpected error occurred during password reset')
  }
}

export async function updatePassword(data: UpdatePasswordData): Promise<{ error: AuthFunctionError }> {
  try {
    const { error } = await supabase.auth.updateUser({
      password: data.password
    })
    
    if (error) {
      throw new CustomAuthError(error.message, error.status?.toString(), error.status)
    }

    return { error: null }
  } catch (error) {
    throw new CustomAuthError('An unexpected error occurred during password update')
  }
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) {
      throw new CustomAuthError(error.message, error.status?.toString(), error.status)
    }

    if (!user) return null
    
    return {
      id: user.id,
      email: user.email || '',
      name: user.user_metadata?.name,
      avatar_url: user.user_metadata?.avatar_url,
      role: user.user_metadata?.role || 'user',
      business_id: user.user_metadata?.business_id,
      created_at: user.created_at,
      updated_at: user.updated_at
    }
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

export async function updateUserProfile(data: UpdateProfileData): Promise<{ error: AuthFunctionError }> {
  try {
    const { error } = await supabase.auth.updateUser({
      data: {
        name: data.name,
        avatar_url: data.avatar_url,
      }
    })
    
    if (error) {
      throw new CustomAuthError(error.message, error.status?.toString(), error.status)
    }

    return { error: null }
  } catch (error) {
    throw new CustomAuthError('An unexpected error occurred during profile update')
  }
}

export function onAuthStateChange(callback: (user: AuthUser | null) => void) {
  return supabase.auth.onAuthStateChange((event, session) => {
    if (!session?.user) {
      callback(null)
      return
    }

    const authUser: AuthUser = {
      id: session.user.id,
      email: session.user.email || '',
      name: session.user.user_metadata?.name,
      avatar_url: session.user.user_metadata?.avatar_url,
      role: session.user.user_metadata?.role || 'user',
      business_id: session.user.user_metadata?.business_id,
      created_at: session.user.created_at,
      updated_at: session.user.updated_at
    }
    
    callback(authUser)
  })
}
