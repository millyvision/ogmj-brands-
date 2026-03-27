import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { AuthUser } from '@/lib/auth-types'
import { getCurrentUser, onAuthStateChange } from '@/lib/auth'

interface AuthStore {
  user: AuthUser | null
  loading: boolean
  initialized: boolean
  setUser: (user: AuthUser | null) => void
  setLoading: (loading: boolean) => void
  signOut: () => Promise<void>
  initialize: () => Promise<void>
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      initialized: false,

      setUser: (user) => set({ user }),

      setLoading: (loading) => set({ loading }),

      signOut: async () => {
        set({ loading: true })
        try {
          const { signOut } = await import('@/lib/auth')
          await signOut()
          set({ user: null })
        } catch (error) {
          console.error('Sign out error:', error)
        } finally {
          set({ loading: false })
        }
      },

      initialize: async () => {
        const { initialized } = get()
        if (initialized) return

        set({ loading: true })
        
        try {
          // Get current user
          const user = await getCurrentUser()
          set({ user })

          // Set up auth state change listener
          const { onAuthStateChange } = await import('@/lib/auth')
          onAuthStateChange((user) => {
            set({ user })
          })
        } catch (error) {
          console.error('Auth initialization error:', error)
        } finally {
          set({ loading: false, initialized: true })
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        initialized: state.initialized,
      }),
    }
  )
)
