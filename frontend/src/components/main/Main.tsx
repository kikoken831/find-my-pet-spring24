import React from 'react'
import { useSelector } from 'react-redux'
import { authSlice } from '../../store/auth'
import { useAppSelector } from '../../common'

const Main = () => {
  const token = useAppSelector((state) => state.auth.token)

  console.log(token)
  return <div>Main</div>
}

export default Main
