// ChartsDrawer.tsx
import React, { useEffect, useState } from 'react'
import { Drawer } from '@mui/material'
import ReactEcharts from 'echarts-for-react'

interface ChartsDrawerProps {
  open: boolean
  onClose: () => void
  geojsonData: any
}

const ChartsDrawer: React.FC<ChartsDrawerProps> = ({
  open,
  onClose,
  geojsonData,
}) => {
  const [catArr, setCatArr] = useState([])
  const [dogArr, setDogArr] = useState([])
  const [hamsterArr, setHamsterArr] = useState([])
  const [yearArr, setYearArr] = useState([])

  useEffect(() => {
    // Filter the GeoJSON features when the component mounts
    if (geojsonData) {
      setDogArr(
        geojsonData.features.filter(
          (item: any) => item.properties.Category === 'Dog',
        ),
      )

      setCatArr(
        geojsonData.features.filter(
          (item: any) => item.properties.Category === 'cat',
        ),
      )

      setHamsterArr(
        geojsonData.features.filter(
          (item: any) => item.properties.Category === 'Hamster',
        ),
      )
    }
  }, [geojsonData])

  // Tooltip formatter function
  const tooltipFormatter = (params: any) => {
    const { name, value } = params[0]
    return `${name}: ${value}`
  }

  const titleStyle = {
    fontSize: 12, // Adjust the font size as needed
  }
  const barWidth = 35
  const option1 = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // Use axis pointer for better hover effect
        type: 'shadow', // Use shadow to display tooltip
      },
      formatter: tooltipFormatter, // Custom formatter function
    },
    title: {
      text: 'Total Reported Lost Pets in Atlanta',
      textStyle: titleStyle,
    },
    xAxis: {
      type: 'category',
      data: ['Cats', 'Dogs', 'Hamsters'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Lost Pets',
        data: [catArr.length, dogArr.length, hamsterArr.length],
        type: 'bar',
        barWidth,
      },
    ],
  }

  const option2 = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // Use axis pointer for better hover effect
        type: 'shadow', // Use shadow to display tooltip
      },
      formatter: tooltipFormatter, // Custom formatter function
    },
    title: {
      text: 'Reported Lost Pets By Year in Atlanta',
      textStyle: titleStyle,
    },
    xAxis: {
      type: 'category',
      data: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Found Pets',
        data: [4, 5, 21, 22, 10, 23, 5],
        type: 'bar',
        barWidth: '18',
      },
    ],
  }

  return (
    <Drawer open={open} onClose={onClose} anchor="right">
      {/* Drawer Content */}
      <div style={{ paddingLeft: '10px', marginBottom: '10px' }}>
        <h2>Statistics</h2>
      </div>

      <div style={{ width: '100%', paddingLeft: '20px' }}>
        <ReactEcharts
          option={option1}
          style={{ height: '300px', width: '300px' }}
        />
        <ReactEcharts
          option={option2}
          style={{ height: '300px', width: '300px', marginTop: '16px' }}
        />
      </div>
    </Drawer>
  )
}

export default ChartsDrawer
