import React, { useState } from 'react'
import Drawer from '@mui/material/Drawer'
import TextField from '@mui/material/TextField'
import { styled } from '@mui/system'
import { Typography, Link, Button, Grid } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

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

const StyledDrawer = styled(Drawer)({
  height: '50%',
  width: '100%',
  padding: '16px', // You can adjust this value according to your preference
})

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px', // You can adjust this value according to your preference
})

const StyledButton = styled(Button)({
  marginTop: '16px', // You can adjust this value according to your preference
})

interface FormData {
  name: string
  email: string
}

interface BottomDrawerProps {
  isVisible: boolean
  onClose: () => void
}

const BottomDrawer: React.FC<BottomDrawerProps> = ({ isVisible, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('Form submitted:', formData)
    onClose()
  }

  return (
    <StyledDrawer anchor="bottom" open={isVisible} onClose={onClose}>
      <StyledForm onSubmit={handleSubmit}>
        <Grid container item padding={1}>
          <Typography component="h1" variant="h5" align="center">
            Lost/Found Pet Form
          </Typography>
        </Grid>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          label="Lost Date"
          name="email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          label="Weight"
          name="email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          label="Age"
          name="email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
        />
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
        <StyledButton variant="contained" color="primary" type="submit">
          Submit
        </StyledButton>
      </StyledForm>
    </StyledDrawer>
  )
}

export default BottomDrawer
