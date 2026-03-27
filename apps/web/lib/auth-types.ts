export interface AuthUser {
  id: string
  email: string
  name?: string
  avatar_url?: string
  role?: 'user' | 'admin' | 'team_member'
  business_id?: string
  created_at: string
  updated_at: string
}

export interface AuthError extends Error {
  code?: string
  status?: number
}

export interface AuthResponse {
  user: AuthUser | null
  error: AuthError | null
}

export type AuthFunctionError = AuthError | null

export interface SignUpData {
  email: string
  password: string
  name: string
  business_name?: string
  business_type?: string
}

export interface SignInData {
  email: string
  password: string
}

export interface ResetPasswordData {
  email: string
}

export interface UpdatePasswordData {
  password: string
  token: string
}

export interface UpdateProfileData {
  name?: string
  avatar_url?: string
}
