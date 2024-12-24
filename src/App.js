
import './App.css';

import SearchIcon from './Assests/search 1.png'
import clearIcon from './Assests/clear sun 1.png'
import cloudIcon from './Assests/cloud 1.png'
import drizzleIcon from './Assests/drizzle 1.png'
import rainIcon from './Assests/rain 1.png'
import windIcon from './Assests/wind 1.png'
import snowIcon from './Assests/snow 1.png'
import humidityIcon from './Assests/humidity 1.png'
import { useState } from 'react';

const WeatherDetails = ({ icon, temp, city, country, lat, log, humidity, wind }) => {
    return (
        <>
           
                <div className='sun-image'>
                    <img src={icon} alt="clearsun" />
                </div>
                <div className="temp">{temp}*C</div>
                <div className="location">{city}</div>
                <div className="country">{country}</div>
                <div className="cord">
                    <div>
                        <span className='lattitude'>lattitude</span>
                        <span>{lat}</span>
                    </div>
                    <div>
                        <span className='longitude'>longitude</span>
                        <span>{log}</span>
                    </div>
                </div>
                <div className="data-container">
                    <div className="element">
                        <img src={humidityIcon} alt="humidity" className='icon' />
                        <div className="data">
                            <div className="humidity-persent">{humidity}%</div>
                            <div className="text">Humidity</div>
                        </div>
                    </div>
                    <div className="element">
                        <img src={windIcon} alt="wind" className='iconn' />
                        <div className="data">
                            <div className="wind-persent">{wind} km/h</div>
                            <div className="text">Wind Speed</div>
                        </div>
                    </div>
                </div>
        </>
    )
}



function App() {

    let api_key = '0a8b82a11b62849a6e3fdd74825591c1';

    const [icon, seticon] = useState(snowIcon)
    const [temp, settemp] = useState(0)
    const [city, setcity] = useState('')
    const [country, setcountry] = useState('')
    const [lat, setlat] = useState(0)
    const [log, setlog] = useState(0)
    const [humidity, sethumidity] = useState(0)
    const [wind, setwind] = useState(0)
    const [text, settext] = useState('')
    const [cityNotFound, setcityNotFound] = useState(false)
    const [loadind, setloading] = useState(false)
    const [error, seterror] = useState(null)

    const weatherIconMap = {
        '01d': clearIcon,
        '01n': clearIcon,
        '02d': cloudIcon,
        '02n': cloudIcon,
        '03d': drizzleIcon,
        '03n': drizzleIcon,
        '04d': drizzleIcon,
        '04n': drizzleIcon,
        '09d': rainIcon,
        '09n': rainIcon,
        '10d': rainIcon,
        '10n': rainIcon,
        '13d': snowIcon,
        '13n': snowIcon,
    }

    const search = async () => {
        setloading(true)

        let urllink = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`;

        try {
            let res = await fetch(urllink)
            let data = await res.json();
            // console.log(data)
            if (data === '404') {
                console.error('City not found')
                setcityNotFound(true)
                setloading(false)
                return;
            }

            sethumidity(data.main.humidity)
            setwind(data.wind.speed)
            settemp(Math.floor(data.main.temp))
            setcity(data.name)
            setcountry(data.sys.country)
            setlat(data.coord.lat)
            setlog(data.coord.lon)

            const weatherIconCode = data.weather[0].icon;
            seticon(weatherIconMap[weatherIconCode] || clearIcon)
            setcityNotFound(false)

        } catch (error) {
            console.error('An error message is :', error.message)
        } finally {
            setloading(false)
        }
    }



    const handleCity = (e) => {
        settext(e.target.value);
    }

    const handlekeydown = (e) => {
        if (e.key === 'Enter') {
            search();
        }
    }

    return (
        <>
            <div className='container'>
                <div className='input-container'>
                    <input type="text" className='cityinput'
                        placeholder='Search City' onChange={handleCity} onKeyDown={handlekeydown} value={text} />
                    <div className='search-icon' >
                        <img src={SearchIcon} alt="search" className='image' onClick={() => search()} />
                    </div>
                </div>

                {loadind && <div className="loading_message">Loading...</div>}
                {error && <div className="error_mesage"></div>}
                {cityNotFound && <div className="city_not_found">City not found...</div>}

                {!loadind && !cityNotFound && <WeatherDetails icon={icon} temp={temp} city={city}
                    country={country} lat={lat} log={log} humidity={humidity} wind={wind} />}
                <div className="copyright">
                    &copy; Designed by <span>VIGNESHWARAN M (B.E)</span>
                </div>
            </div>
        </>
    )
}


export default App;
