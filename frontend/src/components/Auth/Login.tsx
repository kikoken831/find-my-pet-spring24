import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  TextField,
  Button,
  Typography,
  Link,
  Container,
  Grid,
  Paper,
  Box,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { AuthResponseModel, useLogin } from '../../store/auth/api'
import { setToken } from '../../store/auth'
import { useAppDispatch } from '../../common'
import useLoading from '../../hooks/useLoader'
import { GuestResponseModel, useGuestLogin } from '../../store/guest/api'
import { setUser } from '../../store/user'

const LoginPage = () => {
  const dispatch = useAppDispatch()
  const { handleSubmit, register } = useForm()
  const [
    login,
    {
      data: loginResponseData,
      status: loginRequestStatus,
      error: loginRequestError,
      isLoading: loginRequestLoading,
      reset: resetLoginRequestStatus,
    },
  ] = useLogin()

  const [
    guestLogin,
    {
      data: guestResponseData,
      status: guestRequestStatus,
      error: guestRequestError,
      isLoading: guestRequestLoading,
      reset: resetGuestRequestStatus,
    },
  ] = useGuestLogin()

  const onSubmit = (value: any) => {
    login(value)
  }

  const onGuestLogin = () => {
    guestLogin(null)
  }

  const setUserDetails = (user: AuthResponseModel | GuestResponseModel) => {
    dispatch(setToken(user.token))
    dispatch(setUser({ ...user }))
  }

  useEffect(() => {
    if (loginResponseData?.token) {
      setUserDetails(loginResponseData)
    }
  }, [
    loginResponseData,
    loginRequestStatus,
    loginRequestError,
    resetLoginRequestStatus,
    dispatch,
  ])

  useEffect(() => {
    if (guestResponseData?.token) {
      setUserDetails(guestResponseData)
    }
  }, [
    guestResponseData,
    guestRequestStatus,
    guestRequestError,
    resetGuestRequestStatus,
    dispatch,
  ])

  useLoading(loginRequestLoading || guestRequestLoading)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <>
        <Container component="main" maxWidth="sm">
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Box sx={{ my: 3 }}>
              <Typography variant="h6" gutterBottom>
                FindMyPet Login
              </Typography>

              <Grid item xs={12}>
                <TextField
                  required
                  label="Username"
                  fullWidth
                  variant="standard"
                  {...register('username')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Password"
                  fullWidth
                  variant="standard"
                  {...register('password')}
                />
              </Grid>
            </Box>

            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, ml: 1 }}
              fullWidth
            >
              Login
            </Button>
            <Typography variant="body2" style={{ marginTop: '1rem' }}>
              <Link component={RouterLink} to="/register">
                Register
              </Link>
              {' or '}
              <Link onClick={() => onGuestLogin()}>Continue as Guest</Link>
            </Typography>
          </Paper>
        </Container>
      </>
    </form>
  )
}

export default LoginPage
