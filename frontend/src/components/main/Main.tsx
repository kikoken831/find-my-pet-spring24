import { useAppDispatch } from '../../common'
import { logout } from '../../store/auth'

const Main = () => {
  const dispatch = useAppDispatch()
  const onLogout = () => {
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
