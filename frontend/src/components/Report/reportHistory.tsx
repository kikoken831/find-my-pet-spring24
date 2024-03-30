import React, { useState, useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useForm } from 'react-hook-form'
import { styled } from '@mui/material/styles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { useLocation } from 'react-router-dom'
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

const getFeatureObject = () => {
  // Retrieve the serialized feature from local storage
  const serializedFeature: any = localStorage.getItem('feature')
  // Parse the serialized string back into an object
  const feature = JSON.parse(serializedFeature)
  return feature
}

function HistoryRendering() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'))
  const [formData] = useState({
    date: '04-17-2022',
    petType: 'Dog',
    petBreed: 'Chihuahua',
    city: 'Atlanta',
    intersection: 'El Camino&Rengstorff',
    contactName: 'Kate',
    contactPhone: '650-450-6426',
  })

  const [feature, setFeature] = useState(getFeatureObject())

  console.log('feature............', feature.properties)

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          width: '92%',
          height: '100%',
          marginTop: '15px',
          marginLeft: '15px',
        }}
      >
        <DemoContainer components={['DatePicker']}>
          <DatePicker
            label="Find Record"
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
        </DemoContainer>
      </Box>

      <form>
        <React.Fragment>
          <Container component="main" maxWidth="sm">
            <Paper
              variant="outlined"
              sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
            >
              <Box sx={{ my: 0 }}>
                <Typography variant="h6" gutterBottom>
                  Pet Info
                </Typography>
                <Grid container spacing={3}>
                  <Box
                    sx={{
                      width: '92%',
                      height: '100%',
                      marginTop: '20px',
                      marginLeft: '25px',
                    }}
                  >
                    <img src="/tank.jpg" alt="" width="200" height="200" />
                  </Box>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      label="Date Lost/Found"
                      fullWidth
                      variant="standard"
                      value={feature.properties.Lost_Date}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      label="Type of Pet (Dog, Cat, etc.)"
                      fullWidth
                      variant="standard"
                      value={feature.properties.Category}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      label="lat/lng where pet was lost"
                      fullWidth
                      variant="standard"
                      value={feature.geometry.coordinates}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      label="Age of pet"
                      fullWidth
                      variant="standard"
                      value={feature.properties.Age}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      label="Contact Person"
                      fullWidth
                      variant="standard"
                      value={formData.contactName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      label="Phone Number"
                      fullWidth
                      variant="standard"
                      value={formData.contactPhone}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Container>
        </React.Fragment>
      </form>
    </LocalizationProvider>
  )
}

export default HistoryRendering
