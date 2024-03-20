import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from '../store/auth'
import authApi from './auth/api'

const appReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
})

const store = configureStore({
  reducer: appReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
