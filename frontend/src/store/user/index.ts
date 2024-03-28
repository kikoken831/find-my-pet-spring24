import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RoleType } from '../../common/constants'

interface UserState {
  id: number
  username: string
  name: string
  isGuest: boolean
  token: string
  roles: RoleType[]
  createdAt: Date
  updatedAt: Date
}

const initialState: UserState = {
  id: -1,
  username: '',
  name: '',
  token: '',
  isGuest: false,
  roles: [],
  createdAt: null as unknown as Date,
  updatedAt: null as unknown as Date,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (_: UserState, action: PayloadAction<UserState>) => {
      return { ...action.payload }
    },
  },
})

export const { setUser } = userSlice.actions

export const userAction = userSlice.actions

export default userSlice.reducer
