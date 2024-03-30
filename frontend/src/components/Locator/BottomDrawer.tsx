import React, { useState, ChangeEvent } from 'react'
import L from 'leaflet'
import Drawer from '@mui/material/Drawer'
import TextField from '@mui/material/TextField'
import { styled } from '@mui/system'
import Radio from '@mui/joy/Radio'
import RadioGroup from '@mui/joy/RadioGroup'
import {
  Typography,
  Link,
  Button,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Box,
  FormControlLabel,
  FormLabel,
} from '@mui/material'
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
  Lost_Date: string
  Age: String
  Weight: String
  category: String
}

interface BottomDrawerProps {
  isVisible: boolean
  onClose: () => void
  markerPos: any
  fetchAllData: () => void
  iconCateogry: String
}

const BottomDrawer: React.FC<BottomDrawerProps> = ({
  isVisible,
  onClose,
  markerPos,
  fetchAllData,
  iconCateogry,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    Lost_Date: '',
    Age: '',
    Weight: '',
    category: iconCateogry,
  })

  const insertElement = () => {
    var xml = `<wfs:Transaction  xmlns:wfs="http://www.opengis.net/wfs" xmlns:gml="http://www.opengis.net/gml" xmlns:myworkspace="myworkspace" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs https://localhost:8060/geoserver/schemas/wfs/1.0.0/WFS-basic.xsd myworkspace https://localhost:8060/geoserver/myworkspace/wfs" service="WFS" version="1.0.0">`

    xml += '<wfs:Insert handle="WebGIS">'
    xml += '<myworkspace:Hamster_Merge>'
    xml += '<myworkspace:the_geom>'
    xml += '<gml:Point srsName="http://www.opengis.net/gml/srs/epsg.xml#4326">'
    xml +=
      '<gml:coordinates decimal="." cs="," ts="">' +
      markerPos.lng +
      ',' +
      markerPos.lat +
      '</gml:coordinates>'
    xml += '</gml:Point>'
    xml += '</myworkspace:the_geom>'
    xml += '<myworkspace:Name>' + formData.name + '</myworkspace:Name>'
    xml +=
      '<myworkspace:Lost_Date>' +
      formData.Lost_Date +
      '</myworkspace:Lost_Date>'
    xml += '<myworkspace:Age>' + formData.Age + '</myworkspace:Age>'
    xml += '<myworkspace:Weight>' + formData.Weight + '</myworkspace:Weight>'
    xml += '<myworkspace:Category>' + iconCateogry + '</myworkspace:Category>'
    xml += '</myworkspace:Hamster_Merge>'
    xml += '</wfs:Insert>'
    xml += '</wfs:Transaction>'

    fetch('/geoserver/wfs', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml',
      },
      body: xml,
    })
      .then((response) => {
        // Handle response (e.g., check for success or failure)
        alert('New Report is Filed!!!')
        fetchAllData()
      })
      .catch((error) => {
        console.error('Error inserting feature:', error)
      })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    //console.log('Form submitted:', formData)
    insertElement()
    onClose()
  }

  return (
    <StyledDrawer anchor="bottom" open={isVisible} onClose={onClose}>
      <StyledForm onSubmit={handleSubmit}>
        <Grid container direction="row" alignItems="center">
          <Grid container item padding={1}>
            <Typography component="h1" variant="h5" align="center">
              Lost/Found Pet Form
            </Typography>
          </Grid>
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
          name="Lost_Date"
          value={formData.Lost_Date}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          label="Weight"
          name="Weight"
          value={formData.Weight}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          label="Age"
          name="Age"
          value={formData.Age}
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
