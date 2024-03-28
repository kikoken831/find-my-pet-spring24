import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BACKEND_SERVICE_URL } from '../../common'
import { RoleType } from '../../common/constants'
import RequestMiddleware from '../middleware'

export interface AuthResponseModel {
  id: number
  username: string
  name: string
  token: string
  isGuest: boolean
  roles: RoleType[]
  createdAt: Date
  updatedAt: Date
}

const userApi = createApi({
  reducerPath: 'userApi',
  endpoints: (builders) => ({
    detail: builders.mutation<AuthResponseModel, { token: string }>({
      query: ({ token }) => ({
        url: '/user/retrieve-info',
        body: { token },
        method: 'POST',
      }),
    }),
  }),
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_SERVICE_URL}/`,
    fetchFn: RequestMiddleware,
  }),
})

export const { useDetailMutation } = userApi
export default userApi
