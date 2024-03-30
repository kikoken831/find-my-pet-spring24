import React, { useEffect, useState } from 'react'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import * as turf from '@turf/turf'

interface RightDrawerProps {
  rightDrawerOpen: boolean
  isRightDrawerClose: () => void
  markerPos: any
  shelterData: any
}

const RightDrawer: React.FC<RightDrawerProps> = ({
  rightDrawerOpen,
  isRightDrawerClose,
  markerPos,
  shelterData,
}) => {
  const [filterlist, setFilterlist] = useState([])

  // Calculate distance between two points using Turf.js

  const calculateDistance = (point1: any, point2: any) => {
    const from = turf.point([point1.lng, point1.lat])
    const to = turf.point([point2[0], point2[1]])
    return turf.distance(from, to, { units: 'kilometers' })
  }

  //Filter animal shelters within 10km of the selected marker
  const truncateAddress = (address: any) => {
    // Adjust the length as needed
    const maxLength = 30
    return address.length > maxLength
      ? `${address.substring(0, maxLength)}...`
      : address
  }

  useEffect(() => {
    if (shelterData) {
      const filteredShelters = shelterData.features.filter((shelter: any) => {
        if (Object.hasOwn(markerPos, 'lat')) {
          const shelterPos = shelter.geometry.coordinates
          //console.log('markerPos..........', markerPos)
          const distance = calculateDistance(markerPos, shelterPos)
          return distance <= 20 // Filter shelters within 10km
        }
        return false
      })

      setFilterlist(filteredShelters)

      console.log('filteredShelterslist..............', filteredShelters)
    }
  }, [shelterData, markerPos])

  return (
    <Drawer anchor="right" open={rightDrawerOpen} onClose={isRightDrawerClose}>
      <div style={{ width: '100%', padding: '7px' }}>
        <h2>Nearby Animal Shelter</h2>
        <List
          style={{
            width: '300px',
          }}
        >
          {filterlist.length > 0
            ? filterlist.map((item: any, index: number) => (
                <React.Fragment key={index}>
                  <ListItem disablePadding>
                    <img
                      src={item.properties.image}
                      alt={item.properties.image}
                      style={{
                        width: '100px',
                        height: '90px',
                        borderRadius: '50%',
                        marginRight: '1px',
                      }}
                    />

                    <ListItemText
                      style={{
                        marginLeft: '10px',
                        width: '100px',
                      }}
                      primary={item.properties.name}
                      secondary={
                        <>
                          <Typography
                            variant="subtitle2"
                            sx={{ padding: '1px' }}
                          >
                            Name: {item.properties.Name}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            sx={{ padding: '1px' }}
                          >
                            Telephone: {item.properties.Phone}
                          </Typography>
                          <Typography variant="body2" sx={{ padding: '1px' }}>
                            Website: {item.properties.Website}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              padding: '1px',
                              lineHeight: '1.2',
                              display: '-webkit-box',
                              WebkitBoxOrient: 'vertical',
                              WebkitLineClamp: 2,
                              overflow: 'hidden',
                            }}
                          >
                            Address: {truncateAddress(item.properties.Address)}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  {index !== filterlist.length - 1 && (
                    <Divider sx={{ my: 2 }} />
                  )}
                </React.Fragment>
              ))
            : 'No Shelter Within 20km of the Pet!!'}
        </List>
      </div>
    </Drawer>
  )
}

export default RightDrawer
