import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  token: string | null
}

const initialState: AuthState = {
  token: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state: AuthState, action: PayloadAction<string | null>) => {
      if (action.payload) {
        localStorage.setItem('token', action.payload)
        state.token = action.payload
      }
    },
    logout: () => {
      localStorage.removeItem('token')
      return initialState
    },
  },
})

export const { setToken, logout } = authSlice.actions

export const authAction = authSlice.actions

export default authSlice.reducer
