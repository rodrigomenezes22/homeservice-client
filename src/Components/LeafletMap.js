import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function LeafletMap(props) {
    const position = [53.563114243993994, 10.033672421180798];
  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position}>
      <Popup>
        {props.name} {props.lastname}<br /> {props.city}.<br /> 

        <a href="#" target='_blank' >Click here for directions</a>
      </Popup>
    </Marker>
  </MapContainer>
  )
}

export default LeafletMap
