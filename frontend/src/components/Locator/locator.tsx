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
let map: any
let circle
let geojson: any

const { BaseLayer, Overlay } = LayersControl

const Locator = () => {
  //const [map,setMap] = useState({})
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false)
  const [isStatsDrawerOpen, setIsStatsDrawerOpen] = useState(false)
  const geojsonDataRef = useRef<any>(null)
  const geojsonDataRef2 = useRef<any>(null)
  const geojsonDataRef3 = useRef<any>(null)
  const geojsonDataRef4 = useRef<any>(null)
  //const [geojsonData, setGeojsonData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
    console.log('created........................', e)
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
  }
  const _onEdited = (e: any) => {}
  const _onDeleted = (e: any) => {}

  const closeDrawer = () => {
    setIsDrawerOpen(false)
  }

  const handleCloseDrawer = () => {
    // Set the variable to false when the drawer is closed
    setRightDrawerOpen(false)
  }

  const fetchDogData = () => {
    fetch('/dog.json')
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

  const fetchSheterData = () => {
    fetch('/shelter.json')
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
        geojsonDataRef2.current = data
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching GeoJSON data:', error)
        setError(error.message)
        setLoading(false)
      })
  }

  const fetchCatData = () => {
    fetch('/Cat.json')
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
        geojsonDataRef3.current = data
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching GeoJSON data:', error)
        setError(error.message)
        setLoading(false)
      })
  }

  const fetchHamsterData = () => {
    fetch('/Hamster.json')
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
        geojsonDataRef4.current = data
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

  useEffect(() => {
    fetchSheterData()
    fetchDogData()
    fetchCatData()
    fetchHamsterData()
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
                pointToLayer={(feature: any, latlng: any) => {
                  const customIcon = shelterIcon
                  let markers = L.marker(latlng, { icon: customIcon })
                  markers.on('click', function (e) {
                    var position = markers.getLatLng()
                    console.log('position.................', position)
                    setRightDrawerOpen(true)
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
                  const customIcon = dogIcon
                  let markers = L.marker(latlng, { icon: customIcon })
                  markers.on('click', function (e) {
                    var position = markers.getLatLng()
                    console.log('position.................', position)
                    setRightDrawerOpen(true)
                  })
                  return markers
                }}
              />
            )}
          </Overlay>
          <Overlay checked name="Cat">
            {geojsonDataRef3.current && (
              <GeoJSON
                data={geojsonDataRef3.current}
                pointToLayer={(feature: any, latlng: any) => {
                  const customIcon = catIcon
                  let markers = L.marker(latlng, { icon: customIcon })
                  markers.on('click', function (e) {
                    var position = markers.getLatLng()
                    console.log('position.................', position)
                    setRightDrawerOpen(true)
                  })
                  return markers
                }}
              />
            )}
          </Overlay>
          <Overlay checked name="Hamster">
            {geojsonDataRef4.current && (
              <GeoJSON
                data={geojsonDataRef4.current}
                pointToLayer={(feature: any, latlng: any) => {
                  const customIcon = hamsterIcon
                  let markers = L.marker(latlng, { icon: customIcon })
                  markers.on('click', function (e) {
                    var position = markers.getLatLng()
                    console.log('position.................', position)
                    setRightDrawerOpen(true)
                  })
                  return markers
                }}
              />
            )}
          </Overlay>
        </LayersControl>

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
        <StatisticsBtn onClick={handleButtonClick} icon="" title="Click me!" />
      </MapContainer>

      <RightDrawer
        rightDrawerOpen={rightDrawerOpen}
        isRightDrawerClose={handleCloseDrawer}
        geojsonData={geojsonDataRef4.current}
      />
      <ChartsDrawer
        open={isStatsDrawerOpen}
        onClose={() => setIsStatsDrawerOpen(false)}
      />
      <BottomDrawer isVisible={isDrawerOpen} onClose={closeDrawer} />
    </Fragment>
  )
}
export default Locator
