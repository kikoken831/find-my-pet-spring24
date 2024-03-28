import { useAppDispatch, useAppSelector } from '../../common'
import { logout } from '../../store/auth'

const Main = () => {
  const dispatch = useAppDispatch()

  const user = useAppSelector((state) => state.user)

  const onLogout = () => {
    dispatch(logout())
  }

  return (
    <div>
      Welcome {user.name} {user.isGuest && '(Guest)'}
      <button onClick={() => onLogout()}>logout</button>
    </div>
  )
}

export default Main
