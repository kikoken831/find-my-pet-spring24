import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
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
import { useLogin } from '../../store/auth/api'
import { setToken } from '../../store/auth'
import { useAppDispatch } from '../../common'

const LoginPage = () => {
  const dispatch = useAppDispatch()
  const { handleSubmit, register } = useForm()
  const [
    login,
    {
      data: loginResponseData,
      status: loginRequestStatus,
      error: loginRequestError,
      reset: resetLoginRequestStatus,
    },
  ] = useLogin({
    fixedCacheKey: 'useLogin',
  })

  const onSubmit = (value: any) => {
    login(value)
  }

  useEffect(() => {
    if (loginResponseData?.token) dispatch(setToken(loginResponseData.token))
  }, [
    loginResponseData,
    loginRequestStatus,
    loginRequestError,
    resetLoginRequestStatus,
  ])

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
              <Link component={RouterLink} to="/">
                Continue as Guest
              </Link>
            </Typography>
          </Paper>
        </Container>
      </>
    </form>
  )
}

export default LoginPage
