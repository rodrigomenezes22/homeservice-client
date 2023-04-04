import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function LeafletMap(props) {


    console.log(props.lat);
    console.log(props.long);

    console.log(props);

    const position = [props.lat, props.long];

    if (!props.lat || !props.long) {
        return <div>Loading...</div>;
      }
    
      return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
    
          <Marker position={position}>
            <Popup>
              {props.name} {props.lastname}
              <br /> {props.city}.<br />
              <a href="#" target="_blank">
                Click here for directions
              </a>
            </Popup>
          </Marker>
        </MapContainer>
      );
    }
    

export default LeafletMap
