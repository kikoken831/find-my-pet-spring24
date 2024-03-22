import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface LoadingState {
  isLoading: boolean
}

const initialState: LoadingState = {
  isLoading: true,
}

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setLoader: (state: LoadingState, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    openLoader: () => {
      return { isLoading: true }
    },
    closeLoader: () => {
      return { isLoading: false }
    },
  },
})

export const { openLoader, closeLoader, setLoader } = loaderSlice.actions

export const loaderAction = loaderSlice.actions

export default loaderSlice.reducer
