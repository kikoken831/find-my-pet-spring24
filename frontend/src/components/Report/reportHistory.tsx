import React, { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useForm } from 'react-hook-form'
import { styled } from '@mui/material/styles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
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

const report_list = [
  {
    id: 1,
    text: '我是第一条数据',
  },
  {
    id: 2,
    text: '我是第二条数据',
  },
  {
    id: 3,
    text: '我是第三条数据',
  },
]
/*
<div>
<ul>
  {report_list.map((item) => {
    // if (item.id === 2) return
    return <li key={item.id}>{item.text}</li>
  })}
</ul>
</div>
*/

const HistoryRendering = () => {
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

  /*
  const [posts, setPosts] = useState([])

  useEffect(()=>{

  },[])  
  */

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
                      value={formData.date}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      label="Type of Pet (Dog, Cat, etc.)"
                      fullWidth
                      variant="standard"
                      value={formData.petType}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      label="Breed of Pet"
                      fullWidth
                      variant="standard"
                      value={formData.petBreed}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      label="City where pet was lost or found"
                      fullWidth
                      variant="standard"
                      value={formData.city}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      label="Age of pet"
                      fullWidth
                      variant="standard"
                      value={formData.intersection}
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
