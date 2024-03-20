import { useAppDispatch, useAppSelector } from '../common'
import { setToken } from '../store/auth'

const useToken = () => {
  const { token } = useAppSelector((state) => state.auth)

  const dispatch = useAppDispatch()

  if (!token) {
    const tempToken = localStorage.getItem('token')
    if (tempToken) dispatch(setToken(tempToken))
  }

  return token
}

export default useToken
