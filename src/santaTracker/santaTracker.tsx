import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
// import Leaflet from 'leaflet/dist/leaflet.js';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import santaCss from './santaTracker.module.css';
import './santaTracker.css';
import { santaDestinations } from './santaDestinations';

export default function SantaTracker() {
  const [santaData, setSantaData] = useState<santaDestinations>();
  const [currentYear, setCurrentYear] = useState<number>();

  useEffect(() => {
    fetch(
      'https://firebasestorage.googleapis.com/v0/b/santa-tracker-firebase.appspot.com/o/route%2Fsanta_en.json?alt=media&2018b'
    )
      .then((res) => res.json())
      .then((data) => {
        setSantaData(data);
        console.log(data);
      });
    const curDate = new Date(Date.now());
    setCurrentYear(curDate.getFullYear());
  }, []);

  const getItemDate = (itemDate: number) => {
    const tmpDate = new Date(itemDate);
    if (currentYear) {
      tmpDate.setFullYear(currentYear);
    }
    return tmpDate;
  };

  return (
    <div className="leaflet-container">
      <MapContainer center={[0, 0]} zoom={1} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {santaData?.destinations?.map((item) => (
          <Marker
            key={item.id}
            position={[item.location.lat, item.location.lng]}
          >
            <Popup>
              <strong>Location: </strong>
              {item.city}, {item.region}
              <br />
              <strong>Arrival: </strong>
              {getItemDate(item.arrival).toLocaleDateString()} @{' '}
              {getItemDate(item.arrival).toLocaleTimeString()}
              <br />
              <strong>Departure: </strong>{' '}
              {getItemDate(item.arrival).toLocaleDateString()} @{' '}
              {getItemDate(item.departure).toLocaleTimeString()}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
