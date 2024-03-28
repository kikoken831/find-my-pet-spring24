import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import { DomUtil, Control, ControlPosition } from 'leaflet'
import BarChartIcon from '@mui/icons-material/BarChart'
import { SvgIcon } from '@mui/material'
import { renderToString } from 'react-dom/server'

interface StatisticsBtnProps {
  onClick?: () => void
  icon: string
  title: string
  // isStatsDrawerOpen: boolean
}

class StatisticsBtnControl extends Control {
  options: any

  constructor(options: any) {
    super(options)
    this.options = { ...options, position: 'topright' }
  }

  onAdd(map: L.Map) {
    const container = DomUtil.create('div', 'leaflet-bar leaflet-control')
    const button = DomUtil.create('button', '', container)

    button.innerHTML = `<i class="">${this.options.icon}</i>`
    button.title = this.options.title
    button.style.backgroundColor = 'white' // Apply white background color
    button.style.backgroundImage = "url('stats.jpg')"
    button.style.backgroundSize = 'cover'
    button.style.width = '31px'
    button.style.height = '29px'
    button.style.border = 'none'

    if (this.options.onClick) {
      button.addEventListener('click', this.options.onClick)
    }

    button.addEventListener('click', () => {
      this.options.onClick() // Call the onClick function passed as an option
    })

    return container
  }
}

function StatisticsBtn({ onClick, icon, title }: StatisticsBtnProps) {
  const map = useMap()

  useEffect(() => {
    const statisticsBtn = new StatisticsBtnControl({
      onClick,
      icon,
      title,
    })

    statisticsBtn.addTo(map)

    return () => {
      statisticsBtn.remove()
    }
  }, [map, onClick, icon, title])

  return null // Custom control doesn't render anything visible in the UI
}

export default StatisticsBtn
