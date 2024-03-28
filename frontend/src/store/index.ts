import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from '../store/auth'
import loaderReducer from '../store/loader'
import userReducer from '../store/user'
import authApi from './auth/api'
import guestApi from './guest/api'
import userApi from './user/api'

const appReducer = combineReducers({
  auth: authReducer,
  loader: loaderReducer,
  user: userReducer,
  [authApi.reducerPath]: authApi.reducer,
  [guestApi.reducerPath]: guestApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
})

const store = configureStore({
  reducer: appReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(guestApi.middleware)
      .concat(userApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
