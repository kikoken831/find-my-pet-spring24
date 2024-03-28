import React from 'react'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

interface RightDrawerProps {
  rightDrawerOpen: boolean
  isRightDrawerClose: () => void
  geojsonData: any[]
}

const RightDrawer: React.FC<RightDrawerProps> = ({
  rightDrawerOpen,
  isRightDrawerClose,
  geojsonData,
}) => {
  const userList = [
    {
      id: 1,
      name: 'W-Underdogs',
      telephone: '123-456-7890',
      weight: '20 kg',
      address: '476 Whitehall St SW',
      image: '/w_underdogs.jpg',
    },
    {
      id: 2,
      name: 'Furkids Midtown ATL',
      telephone: '987-654-3210',
      weight: '15 kg',
      address: '650 Ponce De Leon Ave',
      image: '/furkids.jpg',
    },
    {
      id: 3,
      name: 'CANINE CELLMATES',
      telephone: '+16785282200',
      weight: '8 kg',
      address: '981 Howell Mill Rd',
      image: '/caine',
    },
  ]
  console.log('geojsonData......................', geojsonData)
  return (
    <Drawer anchor="right" open={rightDrawerOpen} onClose={isRightDrawerClose}>
      <div style={{ width: '100%', padding: '7px' }}>
        <h2>Nearby Animal Shelter</h2>
        <List>
          {userList.map((user: any, index: number) => (
            <React.Fragment key={user.id}>
              <ListItem disablePadding>
                <img
                  src={user.image}
                  alt={user.name}
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
                  }}
                  primary={user.name}
                  secondary={
                    <>
                      <Typography variant="subtitle2" sx={{ padding: '1px' }}>
                        Telephone: {user.telephone}
                      </Typography>
                      <Typography variant="body2" sx={{ padding: '1px' }}>
                        Weight: {user.weight}
                      </Typography>
                      <Typography variant="body2" sx={{ padding: '1px' }}>
                        Address: {user.address}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              {index !== userList.length - 1 && <Divider sx={{ my: 2 }} />}
            </React.Fragment>
          ))}
        </List>
      </div>
    </Drawer>
  )
}

export default RightDrawer
