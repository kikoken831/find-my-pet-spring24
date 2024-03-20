import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BACKEND_SERVICE_URL } from '../../common'
import { RoleType } from '../../common/constants'
import RequestMiddleware from '../middleware'

interface AuthResponseModel {
  id: number
  username: string
  name: string
  token: string
  roles: RoleType[]
  createdAt: Date
  updatedAt: Date
}

const authApi = createApi({
  reducerPath: 'authApi',
  endpoints: (builders) => ({
    login: builders.mutation<
      AuthResponseModel,
      { username: string; password: string }
    >({
      query: ({ username, password }) => ({
        url: '/',
        body: { username, password },
        method: 'POST',
      }),
    }),
  }),
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_SERVICE_URL}/auth/`,
    fetchFn: RequestMiddleware,
  }),
})

export const { useLoginMutation: useLogin } = authApi
export default authApi
