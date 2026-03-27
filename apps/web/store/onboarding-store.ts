import { create } from 'zustand'

interface OnboardingStore {
  isCompleted: boolean
  data: {
    business_name: string
    business_type: string
    industry: string
    primary_goal: string
    priority_tools: string[]
  }
  setCompleted: (completed: boolean) => void
  setData: (data: any) => void
  reset: () => void
}

export const useOnboardingStore = create<OnboardingStore>((set, get) => ({
  isCompleted: false,
  data: {
    business_name: '',
    business_type: '',
    industry: '',
    primary_goal: '',
    priority_tools: []
  },

  setCompleted: (completed) => set({ isCompleted: completed }),
  
  setData: (data) => set({ data: { ...get().data, ...data } }),
  
  reset: () => set({
    isCompleted: false,
    data: {
      business_name: '',
      business_type: '',
      industry: '',
      primary_goal: '',
      priority_tools: []
    }
  })
}))
