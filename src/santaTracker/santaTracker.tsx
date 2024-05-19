// Very vaguely from https://www.freecodecamp.org/news/how-to-build-a-santa-tracker-app-with-next-js-react-leaflet/

import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import Leaflet from 'leaflet/dist/leaflet.js';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import santaCss from './santaTracker.module.css';
import './santaTracker.css';
import { santaDestinations } from './santaDestinations';
import xmasTree from './tree-marker-icon.png';
import present from './gift-marker-icon-2x.png';
import santa from './santa-marker-icon-2x.png';
import Midpoint from '@turf/midpoint';
import * as Turf from '@turf/turf';

export default function SantaTracker() {
  const [santaData, setSantaData] = useState<santaDestinations>();
  const [currentYear, setCurrentYear] = useState<number>();
  //   const [currentDate] = useState(new Date(Date.now()));
  const [currentDate] = useState(new Date('2024-12-25T02:34:30.115Z'));
  const [santaLocation, setSantaLocation] = useState<number[]>();

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

  const getIcon = (arrivalDate: Date, departureDate: Date) => {
    const santaWasHere = currentDate.getTime() - departureDate.getTime() > 0;
    // const santaIsHere =
    //   currentDate.getTime() - arrivalDate.getTime() > 0 && !santaWasHere;

    // if (santaIsHere) {
    //   return santa;
    // }
    if (santaWasHere) {
      return present;
    }
    return xmasTree;
  };

  useEffect(() => {
    if (santaData) {
      const santaArrival = santaData.destinations
        .filter((d) => getItemDate(d.arrival).getTime() < currentDate.getTime())
        .reduce((a, b) => {
          return new Date(a.arrival).getTime() > new Date(b.arrival).getTime()
            ? a
            : b;
        });
      const santaDeparture = santaData.destinations
        .filter(
          (d) => getItemDate(d.departure).getTime() > currentDate.getTime()
        )
        .reduce((a, b) => {
          return new Date(a.arrival).getTime() < new Date(b.arrival).getTime()
            ? a
            : b;
        });
      //.sort((a, b) => (new Date(a.arrival)).getTime() - (new Date(b.arrival)).getTime());
      setSantaLocation(
        Midpoint(
          Turf.point([santaArrival.location.lat, santaArrival.location.lng]),
          Turf.point([santaDeparture.location.lat, santaDeparture.location.lng])
        ).geometry.coordinates
      );
    }
  }, [santaData]);

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
            icon={Leaflet.icon({
              iconUrl: getIcon(
                getItemDate(item.arrival),
                getItemDate(item.departure)
              ),
              iconRetinaUrl: getIcon(
                getItemDate(item.arrival),
                getItemDate(item.departure)
              ),
              iconSize: [41, 41],
              //   className:
              //     getIcon(
              //       getItemDate(item.arrival),
              //       getItemDate(item.departure)
              //     ) === santa
              //       ? 'iconSantaIsHere'
              //       : '',
            })}
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
        {santaLocation && santaLocation[0] && santaLocation[1] ? (
          <Marker
            position={[santaLocation[0], santaLocation[1]]}
            icon={Leaflet.icon({
              iconUrl: santa,
              iconRetinaUrl: santa,
              iconSize: [41, 41],
              className: 'iconSantaIsHere',
            })}
          ></Marker>
        ) : (
          ''
        )}
      </MapContainer>
    </div>
  );
}
