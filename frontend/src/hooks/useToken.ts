import { useEffect } from 'react'
import { setToken } from '../store/auth'
import { closeLoader, openLoader } from '../store/loader'
import { useAppDispatch, useAppSelector } from '../common'
import { useDetailMutation } from '../store/user/api'
import { setUser } from '../store/user'

const useToken = () => {
  const dispatch = useAppDispatch()
  const { token } = useAppSelector((state) => state.auth)

  const [detail] = useDetailMutation()

  useEffect(() => {
    dispatch(openLoader())
    if (!token) {
      const tempToken = localStorage.getItem('token')
      if (tempToken) {
        dispatch(setToken(tempToken))
        detail({ token: tempToken })
          .unwrap()
          .then((userDetails) => {
            dispatch(setUser({ ...userDetails }))
          })
      }
    }
    dispatch(closeLoader())
  }, [dispatch, token])

  return token
}

export default useToken
