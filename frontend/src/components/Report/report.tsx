import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {
  AppBar,
  Container,
  Toolbar,
  Paper,
  TextField,
  Grid,
  Typography,
  Link,
  Button,
  Box,
  Select,
  MenuItem,
  FormGroup,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormLabel,
  RadioGroup,
  Radio,
} from '@mui/material'

import { styled } from '@mui/material/styles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'

const Report = () => {
  const { handleSubmit, register } = useForm()

  const onSubmit = (value: any) => {
    alert(JSON.stringify(value))
  }

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  })

  const navigateTo = useNavigate()

  const scrollToTarget = () => {
    navigateTo('/reportHistory')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <React.Fragment>
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Grid container item spacing={1}>
              <Button
                component="label"
                role={undefined}
                tabIndex={-1}
                startIcon={<LibraryBooksIcon />}
                onClick={scrollToTarget}
              ></Button>

              <Typography component="h1" variant="h5" align="center">
                Lost/Found Pet Form
              </Typography>
            </Grid>
            <Box sx={{ my: 3 }}>
              <Typography variant="h6" gutterBottom>
                Pet Info
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    label="Date Lost/Found"
                    fullWidth
                    variant="standard"
                    {...register('firstName')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    label="Type of Pet (Dog, Cat, etc.)"
                    fullWidth
                    variant="standard"
                    {...register('firstName')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    label="Breed of Pet"
                    fullWidth
                    variant="standard"
                    {...register('lastName')}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    label="Age of pet"
                    fullWidth
                    variant="standard"
                    {...register('address')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    label="Size of Pet"
                    fullWidth
                    variant="standard"
                    {...register('address')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    label="City where pet was lost or found"
                    fullWidth
                    variant="standard"
                    {...register('address')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormLabel sx={{ textAlign: 'left' }}>
                    Intersection nearest where pet was lost or found. PLEASE USE
                    ONLY TWO INTERSECTING STREETS (example: Main St/3rd St)
                  </FormLabel>
                  <TextField
                    required
                    label="Intersection"
                    fullWidth
                    variant="standard"
                    {...register('address')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormLabel sx={{ textAlign: 'left' }}>
                    Picture of Pet - A good picture, preferably a full body of
                    your pet is important for flyers and on our posts. PLEASE
                    crop out any distractions such as people, children furniture
                    and other pets. (Please make sure the file is in image
                    format (JPG) and less than 2000kb)
                  </FormLabel>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Image
                    <VisuallyHiddenInput type="file" />
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    label="Contact Name"
                    fullWidth
                    variant="standard"
                    {...register('address')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    label="Contact Phone"
                    fullWidth
                    variant="standard"
                    {...register('address')}
                  />
                </Grid>
              </Grid>
            </Box>

            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, ml: 1 }}
              fullWidth
            >
              Submit
            </Button>
          </Paper>
        </Container>
      </React.Fragment>
    </form>
  )
}

export default Report
