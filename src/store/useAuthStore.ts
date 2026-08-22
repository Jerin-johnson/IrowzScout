import { create } from "zustand";

interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  resumeCompleted: boolean;
}

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  setUser: (user: AuthUser | null) => void;
  setResumeCompleted: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user, isLoading: false }),
  setResumeCompleted: (value) =>
    set((state) => ({
      user: state.user ? { ...state.user, resumeCompleted: value } : null,
    })),
  setLoading: (value) => set({ isLoading: value }),
  clear: () => set({ user: null, isLoading: false }),
}));
