import { useEffect } from 'react'
import { useAppDispatch } from '../common'
import { closeLoader, openLoader } from '../store/loader'

const useLoading = (isFetchingOrLoading: boolean) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isFetchingOrLoading) {
      dispatch(openLoader())
    } else {
      dispatch(closeLoader())
    }
  }, [isFetchingOrLoading, dispatch])
}

export default useLoading
