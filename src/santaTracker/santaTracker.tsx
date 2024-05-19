import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
// import Leaflet from 'leaflet/dist/leaflet.js';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import santaCss from './santaTracker.module.css';
import './santaTracker.css';
import { santaDestinations } from './santaDestinations';

export default function SantaTracker() {
  const [santaData, setSantaData] = useState<santaDestinations>();

  useEffect(() => {
    fetch(
      'https://firebasestorage.googleapis.com/v0/b/santa-tracker-firebase.appspot.com/o/route%2Fsanta_en.json?alt=media&2018b'
    )
      .then((res) => res.json())
      .then((data) => {
        setSantaData(data);
        console.log(data);
      });
  }, []);

  return (
    <div className="leaflet-container">
      <MapContainer center={[0, 0]} zoom={1} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {santaData?.destinations?.map(({ id, location, city, region }) => (
          <Marker key={id} position={[location.lat, location.lng]}>
            <Popup>
              {city}, {region}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
