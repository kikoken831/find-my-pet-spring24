// ChartsDrawer.tsx
import React from 'react'
import { Drawer } from '@mui/material'
import ReactEcharts from 'echarts-for-react'

interface ChartsDrawerProps {
  open: boolean
  onClose: () => void
}

const ChartsDrawer: React.FC<ChartsDrawerProps> = ({ open, onClose }) => {
  const titleStyle = {
    fontSize: 12, // Adjust the font size as needed
  }
  const barWidth = 35
  const option1 = {
    title: {
      text: 'Reported Lost Pets By Month in Atlanta',
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
        data: [120, 200, 150],
        type: 'bar',
        barWidth,
      },
    ],
  }

  const option2 = {
    title: {
      text: 'Reported Found Pets By Month in Atlanta',
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
        name: 'Found Pets',
        data: [150, 230, 224],
        type: 'bar',
        barWidth,
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
