import React from 'react';
import 'leaflet/dist/leaflet.css';
// import Leaflet from 'leaflet/dist/leaflet.js';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import santaCss from './santaTracker.module.css';
import './santaTracker.css';

export default function SantaTracker() {
  return (
    <div className="leaflet-container">
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>CSS Popup</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
