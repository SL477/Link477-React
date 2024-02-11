import classes from './weather.module.css';
import { useEffect, useState } from 'react';

interface weatherData {
    id: string;
    description: string;
    icon: string;
    main: string;
}

export default function Weather() {
    const [errorMsg, setErrorMsg] = useState('');
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);
    const [weather, setWeather] = useState<weatherData[]>([]);
    const [temp, setTemp] = useState(0);
    // const [feelsLike, setFeelsLike] = useState(0);
    // const [tempMin, setTempMin] = useState(0);
    // const [tempMax, setTempMax] = useState(0);
    // const [pressure, setPressure] = useState(0);
    // const [humidity, setHumidity] = useState(0);
    // const [windSpeed, setWindSpeed] = useState(0);
    // const [windDeg, setWindDeg] = useState(0);
    // const [sunrise, setSunrise] = useState(0);
    // const [sunset, setSunset] = useState(0);
    const [location, setLocation] = useState('');
    const [country, setCountry] = useState('');
    const [isC, setIsC] = useState(true);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }
        else {
            setErrorMsg('Geolocation isn\'t supported');
        }
    }, []);

    const showPosition = (position: GeolocationPosition) => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
        const url = `https://weather-proxy.freecodecamp.rocks/api/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
        fetch(url, {credentials: 'same-origin'})
        .then(response => response.json())
        .then(data => {
            setWeather(data['weather']);
            setTemp(data['main'].temp);
            // setFeelsLike(data['main'].feels_like);
            // setTempMin(data['main'].temp_min);
            // setTempMax(data['main'].temp_max);
            // setPressure(data['main'].pressure);
            // setHumidity(data['main'].humidity);
            // setWindSpeed(data['main'].speed);
            // setWindDeg(data['main'].deg);
            // setSunrise(data['main'].sunrise);
            // setSunset(data['main'].sunset);
            setLocation(data['name']);
            setCountry(data['sys'].country);
        })
        .catch(ex => console.error(ex));
    };

    return (
        <div className={`${classes.weatherBox} ${classes.body}`}>
            {errorMsg === ''? (
                <>
                    <h3>FreeCodeCamp Weather App</h3>
                    <p>Latitude: {lat.toFixed(2)}</p>
                    <p>Longitude: {lon.toFixed(2)}</p>
                    <p>{location}, {country}</p>
                    {weather.map(w => (
                        <div key={w.id}>
                            <p className='cap'>
                                {w.description}
                            </p>
                            <img src={w.icon} alt={w.main}/>
                        </div>))}
                    <p>Temperature: {isC? `${temp.toFixed(2)}°C` : `${((temp * (9 / 5)) + 32).toFixed(2)}°F`}</p>
                    <button type='button' className='btn btn-info' onClick={() => setIsC(!isC)}>Switch Units</button>
                </>
            ) : (<p>{errorMsg}</p>)}
        </div>
    );
}
