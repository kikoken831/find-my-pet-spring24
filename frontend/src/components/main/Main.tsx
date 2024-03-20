import { logout } from '../../store/auth'
import { useAppDispatch } from '../../common'

const Main = () => {
  const dispatch = useAppDispatch()
  const onLogout = () => {
    localStorage.removeItem('token')
    dispatch(logout())
  }

  return (
    <div>
      Main
      <button onClick={() => onLogout()}>logout</button>
    </div>
  )
}

export default Main
