import 'leaflet/dist/leaflet.css'

import React, { FC, useEffect } from 'react'
import L from 'leaflet'

export interface MapDefaultProps {}
let map

const Locator = () => {
  useEffect(() => {
    let container: any = L.DomUtil.get('map-default')
    if (container != null) {
      container._leaflet_id = null
    }

    map = L.map('map-default', {
      center: [33.749, -84.38798],
      zoom: 14.4,
    })
    L.tileLayer(`https://tile.openstreetmap.org/{z}/{x}/{y}.png`, {}).addTo(map)

    var dogIcon = L.icon({
      iconUrl: 'doggie.png',
      iconSize: [38, 45], // size of the icon
      shadowSize: [50, 64], // size of the shadow
      iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62], // the same for the shadow
      popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    })

    var dogIcon2 = L.icon({
      iconUrl: 'doggie2.png',
      iconSize: [38, 45], // size of the icon
      shadowSize: [50, 64], // size of the shadow
      iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62], // the same for the shadow
      popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    })

    var circle = L.marker([33.749, -84.38798], { icon: dogIcon }).addTo(map)
    var circle = L.marker([33.789, -84.38698], { icon: dogIcon }).addTo(map)
    var circle = L.marker([33.769, -84.38928], { icon: dogIcon }).addTo(map)
    var circle = L.marker([33.759, -84.38318], { icon: dogIcon }).addTo(map)
    var circle = L.marker([33.752, -84.38128], { icon: dogIcon }).addTo(map)
    var circle = L.marker([33.722, -84.38808], { icon: dogIcon }).addTo(map)
    var circle = L.marker([33.732, -84.38808], { icon: dogIcon }).addTo(map)
    var circle = L.marker([33.742, -84.38008], { icon: dogIcon }).addTo(map)

    circle.on('click', function (e) {
      var position = circle.getLatLng()

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

      circle.bindPopup(content).openPopup()
    })
  }, [])
  return (
    <div
      id="map-default"
      style={{
        width: '100vw',
        height: '100vh',
      }}
    ></div>
  )
}
export default Locator
