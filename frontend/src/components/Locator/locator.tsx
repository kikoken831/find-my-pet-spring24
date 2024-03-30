import 'leaflet/dist/leaflet.css'

import React, { FC, useEffect, useState, Fragment, useRef } from 'react'
import L from 'leaflet'
import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  Circle,
  GeoJSON,
  LayersControl,
  useMapEvents,
  useMap,
} from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'
import 'leaflet-draw/dist/leaflet.draw.css'
import BottomDrawer from './BottomDrawer'
import './styles.css'
import { set } from 'react-hook-form'
import RightDrawer from './RightDrawer'
import StatisticsBtn from './StatisticsBtn'
import ChartsDrawer from './ChartsDrawer'

export interface MapDefaultProps {}

const { BaseLayer, Overlay } = LayersControl

const Locator = () => {
  //const [map,setMap] = useState({})
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false)
  const [isStatsDrawerOpen, setIsStatsDrawerOpen] = useState(false)
  const [markerPos, setMarkerPos] = useState({})
  const geojsonDataRef = useRef<any>(null)
  const geojsonDataRef2 = useRef<any>(null)
  const geojsonDataRef3 = useRef<any>(null)
  const geojsonDataRef4 = useRef<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [iconCateogry, setIconCateogry] = useState('')

  const dogIcon = new L.Icon({
    className: 'custom-marker-icon',
    iconUrl: 'doggie.png',
    iconSize: [38, 45], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  })

  const shelterIcon = new L.Icon({
    className: 'custom-marker-icon',
    iconUrl: 'dog_shelter.png',
    iconSize: [38, 45], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  })

  const catIcon = new L.Icon({
    className: 'custom-marker-icon',
    iconUrl: 'cat.png',
    iconSize: [32, 32], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  })

  const hamsterIcon = new L.Icon({
    className: 'custom-marker-icon',
    iconUrl: 'hamster.png',
    iconSize: [33, 35], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  })

  const _onCreate = (e: any) => {
    //console.log('created........................', e)
    const { layerType, layer } = e
    const { map } = layer

    var content =
      '<h2>Lost Notice</h2>' +
      '<img width="123" height="100"  src="./tank.jpg"></img>' +
      '<div style="line-height: 0px;margin-top:10px">Lost date：17/2/2024</div>' +
      '<p style="line-height: 0px;">Name：Tank</p>' +
      '<p style="line-height: 0px;">Age：3</p>' +
      '<p style="line-height: 0px;">Weight：30lbs</p>' +
      '<p style="line-height: 0px;">Report location：</p>' +
      '<a >123 El Camino St</a>' +
      '<p></p>' +
      '<span style="margin-right: 3px;">See More:</span>' +
      '<a href="/reportHistory">Details</a>'

    const markerObj = e.target._targets
    const markers = Object.keys(e.target._targets)

    const latest_marker = parseInt(markers[markers.length - 1])

    const curr_marker = markerObj[latest_marker]

    //curr_marker.bindPopup(content).openPopup()
    setIsDrawerOpen((prevIsDrawerOpen) => !prevIsDrawerOpen)

    //add features and send to geoserver
    setMarkerPos(e.layer._latlng)
    layer.removeFrom(layer._map)
  }

  const closeDrawer = () => {
    setIsDrawerOpen(false)
  }

  const handleCloseDrawer = () => {
    // Set the variable to false when the drawer is closed
    setRightDrawerOpen(false)
  }

  const fetchShelterData = () => {
    fetch(`./shelter.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch GeoJSON data')
        }
        return response.json()
      })
      .then((data) => {
        console.log('Fetched GeoJSON data:', data) // Log the fetched data
        if (!data || !data.features || data.features.length === 0) {
          throw new Error('GeoJSON data is empty or does not contain features')
        }
        geojsonDataRef.current = data
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching GeoJSON data:', error)
        setError(error.message)
        setLoading(false)
      })
  }

  const fetchAllData = () => {
    fetch(
      `/geoserver/myworkspace/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=myworkspace%3AHamster_Merge&maxFeatures=300&outputFormat=application%2Fjson`,
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch GeoJSON data')
        }
        return response.json()
      })
      .then((data) => {
        console.log('Fetched geoserver GeoJSON data:.....', data) // Log the fetched data
        if (!data || !data.features || data.features.length === 0) {
          throw new Error('GeoJSON data is empty or does not contain features')
        }
        geojsonDataRef2.current = data
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching GeoJSON data:', error)
        setError(error.message)
        setLoading(false)
      })
  }

  const handleButtonClick = () => {
    console.log('Button clicked!')
    setIsStatsDrawerOpen(!isStatsDrawerOpen)
  }

  const MyComponent = () => {
    const map = useMapEvents({
      click: (e: any) => {
        const addBtn = e.originalEvent.target.className
        const { lat, lng } = e.latlng
        if (addBtn == 'InsertDog') {
          setIconCateogry('Dog')
          handleInsertClick(e, map, dogIcon)
        }
        if (addBtn == 'InsertCat') {
          setIconCateogry('cat')
          handleInsertClick(e, map, catIcon)
        }
        if (addBtn == 'InsertHamster') {
          setIconCateogry('Hamster')
          handleInsertClick(e, map, hamsterIcon)
        }
      },
    })
    return null
  }

  const handleInsertClick = (e: any, map: any, iconImg: any) => {
    map.addEventListener('click', function handleMouseMove(e: any) {
      const { lat, lng } = e.latlng
      setMarkerPos(e.latlng)
      const customIcon = iconImg

      const market = L.marker([lat, lng], { icon: customIcon })
      market.addTo(map)

      if (market) {
        setIsDrawerOpen((prevIsDrawerOpen) => !prevIsDrawerOpen)

        //map.removeLayer(market)
        map.removeEventListener('click', handleMouseMove)
      }
    })
  }

  useEffect(() => {
    fetchShelterData()
    fetchAllData()
  }, [])
  return (
    <Fragment>
      <MapContainer
        id="map-default"
        center={[33.749, -84.38798]}
        zoom={11.2}
        style={{ height: '94vh', width: '100wh', position: 'relative' }}
        dragging={true}
        zoomControl={true}
      >
        <MyComponent />
        <LayersControl position="topleft">
          <BaseLayer checked name="Open Street Map">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </BaseLayer>
          <BaseLayer name="Terrain">
            <TileLayer url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg" />
          </BaseLayer>
          <Overlay checked name="Animal Shelter">
            {geojsonDataRef.current && (
              <GeoJSON
                data={geojsonDataRef.current}
                key="my-geojson"
                pointToLayer={(feature: any, latlng: any) => {
                  const customIcon = shelterIcon
                  let markers = L.marker(latlng, { icon: customIcon })
                  markers.on('click', function (e) {
                    // setRightDrawerOpen(true)
                  })
                  return markers
                }}
              />
            )}
          </Overlay>
          <Overlay checked name="Dog">
            {geojsonDataRef2.current && (
              <GeoJSON
                data={geojsonDataRef2.current}
                pointToLayer={(feature: any, latlng: any) => {
                  let markers: any
                  if (feature.properties.Category == 'Dog') {
                    const customIcon = dogIcon
                    markers = L.marker(latlng, { icon: customIcon })

                    markers.on('click', function (e: any) {
                      var position = markers.getLatLng()
                      var content = `<center><h2>Lost Pet Notice</h2>
                        <img width="123" height="100"  src="./tank.jpg"></img>
                        <div style="line-height: 0px;margin-top:10px">Category：${feature.properties.Category}</div>
                        <p style="line-height: 0px;">Name：${feature.properties.Name}</p>
                        <p style="line-height: 0px;">Age：${feature.properties.Age}</p>
                        <p style="line-height: 0px;">Weight：${feature.properties.Weight}</p>
                        <p style="line-height: 0px;">Latlng：${feature.geometry.coordinates}</p>
                        <p style="line-height: 0px;">Lost Date: ${feature.properties.Lost_Date}</p>
                        <span style="margin-right: 3px;">See More:</span>
                        <a href="/reportHistory">Details</a></center>`
                      markers.bindPopup(content).openPopup()

                      // setRightDrawerOpen(true)
                    })
                  }
                  return markers
                }}
              />
            )}
          </Overlay>
          <Overlay checked name="Cat">
            {geojsonDataRef2.current && (
              <GeoJSON
                data={geojsonDataRef2.current}
                pointToLayer={(feature: any, latlng: any) => {
                  let markers: any

                  if (feature.properties.Category == 'cat') {
                    const customIcon = catIcon
                    markers = L.marker(latlng, { icon: customIcon })
                    markers.on('click', function (e: any) {
                      var position = markers.getLatLng()
                      var content = `<center><h2>Lost Pet Notice</h2>
                        <img width="123" height="100"  src="./tank.jpg"></img>
                        <div style="line-height: 0px;margin-top:10px">Category：${feature.properties.Category}</div>
                        <p style="line-height: 0px;">Name：${feature.properties.Name}</p>
                        <p style="line-height: 0px;">Age：${feature.properties.Age}</p>
                        <p style="line-height: 0px;">Weight：${feature.properties.Weight}</p>
                        <p style="line-height: 0px;">Latlng：${feature.geometry.coordinates}</p>
                        <p style="line-height: 0px;">Lost Date: ${feature.properties.Lost_Date}</p>
                        <span style="margin-right: 3px;">See More:</span>
                        <a href="/reportHistory">Details</a></center>`
                      markers.bindPopup(content).openPopup()

                      //  setRightDrawerOpen(true)
                    })
                  }
                  return markers
                }}
              />
            )}
          </Overlay>
          <Overlay checked name="Hamster">
            {geojsonDataRef2.current && (
              <GeoJSON
                data={geojsonDataRef2.current}
                pointToLayer={(feature: any, latlng: any) => {
                  let markers: any

                  if (feature.properties.Category == 'Hamster') {
                    const customIcon = hamsterIcon
                    markers = L.marker(latlng, { icon: customIcon })

                    markers.on('click', function (e: any) {
                      var position = markers.getLatLng()
                      var content = `<center><h2>Lost Pet Notice</h2>
                        <img width="123" height="100"  src="./tank.jpg"></img>
                        <div style="line-height: 0px;margin-top:10px">Category：${feature.properties.Category}</div>
                        <p style="line-height: 0px;">Name：${feature.properties.Name}</p>
                        <p style="line-height: 0px;">Age：${feature.properties.Age}</p>
                        <p style="line-height: 0px;">Weight：${feature.properties.Weight}</p>
                        <p style="line-height: 0px;">Latlng：${feature.geometry.coordinates}</p>
                        <p style="line-height: 0px;">Lost Date: ${feature.properties.Lost_Date}</p>
                        <span style="margin-right: 3px;">See More:</span>
                        <a href="/reportHistory">Details</a></center>`
                      markers.bindPopup(content).openPopup()

                      // setRightDrawerOpen(true)
                    })
                  }
                  return markers
                }}
              />
            )}
          </Overlay>
        </LayersControl>
        {/*
        <FeatureGroup>
          <EditControl
            position="topright"
            onEdited={_onEdited}
            onCreated={_onCreate}
            onDeleted={_onDeleted}
            draw={{
              rectangle: false,
              circle: false,
              circlemarker: false,
              polygon: false,
              polyline: false,
              marker: {
                icon: dogIcon,
              },
            }}
          />
          <Circle center={[51.51, -0.06]} radius={200} />
        </FeatureGroup>
          */}
        <StatisticsBtn onClick={handleButtonClick} icon="" title="Click me!" />
        <button
          className="InsertBtn"
          style={{
            position: 'absolute',
            top: '50px',
            right: '10px',
            zIndex: 1000,
            backgroundColor: 'white',
            paddingTop: '4px',
            border: '1px solid #999',
            borderRadius: '5px',
            width: '35px',
            height: '33px',
            cursor: 'pointer',
          }}
        >
          <img
            src="./resize_doggie.png"
            alt="Custom Icon"
            className="InsertDog"
          />
        </button>
        <button
          className="InsertBtn"
          style={{
            position: 'absolute',
            top: '90px',
            right: '10px',
            zIndex: 1000,
            backgroundColor: 'white',
            paddingTop: '4px',
            border: '1px solid #999',
            borderRadius: '5px',
            width: '35px',
            height: '33px',
            cursor: 'pointer',
          }}
        >
          <img src="./resize_cat.png" alt="Custom Icon" className="InsertCat" />
        </button>
        <button
          className="InsertBtn"
          style={{
            position: 'absolute',
            top: '130px',
            right: '10px',
            zIndex: 1000,
            backgroundColor: 'white',
            paddingTop: '4px',
            border: '1px solid #999',
            borderRadius: '5px',
            width: '35px',
            height: '33px',
            cursor: 'pointer',
          }}
        >
          <img
            src="./resize_hamster.png"
            alt="Custom Icon"
            className="InsertHamster"
          />
        </button>
      </MapContainer>

      <RightDrawer
        rightDrawerOpen={rightDrawerOpen}
        isRightDrawerClose={handleCloseDrawer}
        geojsonData={geojsonDataRef4.current}
      />
      <ChartsDrawer
        open={isStatsDrawerOpen}
        onClose={() => setIsStatsDrawerOpen(false)}
        geojsonData={geojsonDataRef2.current}
      />
      <BottomDrawer
        isVisible={isDrawerOpen}
        onClose={closeDrawer}
        markerPos={markerPos}
        fetchAllData={fetchAllData}
        iconCateogry={iconCateogry}
      />
    </Fragment>
  )
}
export default Locator
