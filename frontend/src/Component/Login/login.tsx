import React from 'react';
// import { makeStyles } from '@mui/material/styles';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Typography, Link, Container, Grid, Paper, Box, FormLabel, } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';



const LoginPage = () => {

    //   const handleSubmit = (event: { preventDefault: () => void; }) => {
    //     event.preventDefault();
    //     // Handle login logic 
    //   };
    const { handleSubmit, register } = useForm()

    const onSubmit = (value: any) => {
        alert(JSON.stringify(value))
        console.log("hello")
    }

    const navigateTo = useNavigate()

    const scrollToTarget = () => {
        navigateTo('/login')
    }

        return (

            <form onSubmit={handleSubmit(onSubmit)}>
                <React.Fragment>
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
                </React.Fragment>
            </form>

        );
        };

    export default LoginPage