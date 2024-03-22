import { useEffect } from 'react'
import { setToken } from '../store/auth'
import { closeLoader, openLoader } from '../store/loader'
import { useAppDispatch, useAppSelector } from '../common'

const useToken = () => {
  const dispatch = useAppDispatch()
  const { token } = useAppSelector((state) => state.auth)

  useEffect(() => {
    dispatch(openLoader())
    if (!token) {
      const tempToken = localStorage.getItem('token')
      if (tempToken) dispatch(setToken(tempToken))
    }
    dispatch(closeLoader())
  }, [dispatch, token])

  return token
}

export default useToken
