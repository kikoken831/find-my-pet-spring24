import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from '../store/auth'

const appReducer = combineReducers({
  auth: authReducer,
})

const store = configureStore({
  reducer: appReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
