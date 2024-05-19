// Very vaguely from https://www.freecodecamp.org/news/how-to-build-a-santa-tracker-app-with-next-js-react-leaflet/

import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import Leaflet from 'leaflet/dist/leaflet.js';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './santaTracker.css';
import { santaDestinations } from './santaDestinations';
import xmasTree from './tree-marker-icon.png';
import present from './gift-marker-icon-2x.png';
import santa from './santa-marker-icon-2x.png';
import Midpoint from '@turf/midpoint';
import * as Turf from '@turf/turf';
import { LatLng } from 'leaflet';
import { GeodesicLine } from 'leaflet.geodesic';

export default function SantaTracker() {
  const [santaData, setSantaData] = useState<santaDestinations>();
  const [currentYear, setCurrentYear] = useState<number>();
  const [currentDate, setCurrentDate] = useState(new Date(Date.now()));
  //   const [currentDate] = useState(new Date('2024-12-25T02:34:30.115Z'));
  const [santaLocation, setSantaLocation] = useState<number[]>();
  const [santaPath, setSantaPath] = useState<LatLng[]>();
  const [map, setMap] = useState();

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
    // Update every 30 seconds
    setInterval(() => setCurrentDate(new Date(Date.now())), 30000);
  }, []);

  const getItemDate = (itemDate: number) => {
    const tmpDate = new Date(itemDate);
    if (currentYear) {
      tmpDate.setFullYear(currentYear);
    }
    return tmpDate;
  };

  const getIcon = (departureDate: Date) => {
    const santaWasHere = currentDate.getTime() - departureDate.getTime() > 0;
    if (santaWasHere) {
      return present;
    }
    return xmasTree;
  };

  useEffect(() => {
    if (santaData) {
      const santaArrivalFiltered = santaData.destinations.filter(
        (d) => getItemDate(d.arrival).getTime() < currentDate.getTime()
      );

      const santaDepartureFiltered = santaData.destinations.filter(
        (d) => getItemDate(d.departure).getTime() > currentDate.getTime()
      );
      if (
        santaArrivalFiltered.length > 0 &&
        santaDepartureFiltered.length > 0
      ) {
        const santaArrival = santaArrivalFiltered.reduce((a, b) => {
          return new Date(a.arrival).getTime() > new Date(b.arrival).getTime()
            ? a
            : b;
        });

        const santaDeparture = santaDepartureFiltered.reduce((a, b) => {
          return new Date(a.arrival).getTime() < new Date(b.arrival).getTime()
            ? a
            : b;
        });

        setSantaLocation(
          Midpoint(
            Turf.point([santaArrival.location.lat, santaArrival.location.lng]),
            Turf.point([
              santaDeparture.location.lat,
              santaDeparture.location.lng,
            ])
          ).geometry.coordinates
        );
      }

      // Get Santa's path
      setSantaPath(
        santaData?.destinations?.map((item) => {
          return new LatLng(item.location.lat, item.location.lng).wrap();
        })
      );
    }
  }, [santaData]);

  useEffect(() => {
    if (map && santaPath && santaPath?.length > 0) {
      new GeodesicLine(santaPath, {
        weight: 2,
        color: 'red',
      }).addTo(map);
    }
  }, [map, santaPath]);

  return (
    <div className="leaflet-container">
      <MapContainer
        center={[0, 0]}
        zoom={1}
        scrollWheelZoom={false}
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {santaData?.destinations?.map((item) => (
          <Marker
            key={item.id}
            position={[item.location.lat, item.location.lng]}
            icon={Leaflet.icon({
              iconUrl: getIcon(getItemDate(item.departure)),
              iconRetinaUrl: getIcon(getItemDate(item.departure)),
              iconSize: [41, 41],
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
