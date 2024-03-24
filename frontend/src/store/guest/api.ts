import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BACKEND_SERVICE_URL } from '../../common'
import { RoleType } from '../../common/constants'
import RequestMiddleware from '../middleware'

export interface GuestResponseModel {
  id: number
  username: string
  name: string
  token: string
  isGuest: boolean
  roles: RoleType[]
  createdAt: Date
  updatedAt: Date
}

const guestApi = createApi({
  reducerPath: 'guestApi',
  endpoints: (builders) => ({
    guestLogin: builders.mutation<GuestResponseModel, null>({
      query: () => ({
        url: '/user/guest', // Endpoint for guest login
        method: 'POST',
      }),
    }),
  }),
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_SERVICE_URL}`, // Assuming the guest endpoint is under the same base URL
    fetchFn: RequestMiddleware,
  }),
})

export const { useGuestLoginMutation: useGuestLogin } = guestApi
export default guestApi
