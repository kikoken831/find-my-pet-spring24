import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import { AppDispatch, RootState } from '../store'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// export const BACKEND_SERVICE_URL = `${window.location.origin}/service`
export const BACKEND_SERVICE_URL = `http://localhost:5000`
