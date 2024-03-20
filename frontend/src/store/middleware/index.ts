import { toast } from 'react-toastify'

const RequestMiddleware = async (
  input: RequestInfo,
  init?: RequestInit,
): Promise<Response> => {
  await RequestUrlMiddleware(input, init)
  return RequestHeaderMiddleware(input, init)
}

const RequestUrlMiddleware = async (input: RequestInfo, init?: RequestInit) => {
  const { url } = input as Request

  if (!url.includes('localhost:8000')) {
    console.error('you are requesting from an invalid port number (e.g. 3000).')
    toast.error('Unable to send the request')
  }
}

const RequestHeaderMiddleware = async (
  input: RequestInfo,
  init?: RequestInit,
): Promise<Response> => {
  const token = localStorage.getItem('token')

  if (!token) {
    const response = await fetch(input, { ...init })
    if (response.ok) {
      const responseData = await response.json()
      const tokenFromResponse = responseData.token
      if (tokenFromResponse) {
        localStorage.setItem('token', tokenFromResponse)
      }
    }
    return response
  }

  return await fetch(input, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
}

export default RequestMiddleware
