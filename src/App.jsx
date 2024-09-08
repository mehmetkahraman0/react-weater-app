import React, { useEffect, useState } from 'react';
import './App.css'
import { FaWind } from "react-icons/fa6";
import clear_sky from "./assets/01d.png";
import clear_sky_n from "./assets/01n.png";
import few_clouds from "./assets/02d.png";
import few_clouds_n from "./assets/02n.png";
import scattered_clouds from "./assets/03d.png";
import scattered_clouds_n from "./assets/03n.png";
import broken_clouds from "./assets/04d.png";
import broken_clouds_n from "./assets/04n.png";
import shower_rain from "./assets/09d.png";
import shower_rain_n from "./assets/09n.png";
import rain from "./assets/10d.png";
import rain_n from "./assets/10n.png";
import thunderstorm from "./assets/11d.png";
import thunderstorm_n from "./assets/11n.png";
import snow from "./assets/13d.png";
import snow_n from "./assets/13n.png";
import mist from "./assets/50d.png";
import mist_n from "./assets/50n.png";

function App() {
  const [searchCityName, setSearchCityName] = useState("turkey");
  const [weaterData, setWeaterData] = useState({});

  const allIcons = {
    "01d": clear_sky,
    "01n": clear_sky_n,
    "02d": few_clouds,
    "02n": few_clouds_n,
    "03d": scattered_clouds,
    "03n": scattered_clouds_n,
    "04d": broken_clouds,
    "04n": broken_clouds_n,
    "09d": shower_rain,
    "09n": shower_rain_n,
    "10d": rain,
    "10n": rain_n,
    "11d": thunderstorm,
    "11n": thunderstorm_n,
    "13d": snow,
    "13n": snow_n,
    "50d": mist,
    "50n": mist_n,
  }

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid={your API key}`;
      console.log(url)
      const response = await fetch(url);
      const data = await response.json()
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_sky
      setWeaterData({
        country: data.sys.country,
        location: data.name,
        temp: Math.floor(data.main.temp),
        humidity: data.main.humidity,
        icon: icon,
        windSpeed: data.wind.speed,
      })
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    search("turkey");
  },[])


  console.log(weaterData)
  return (
    <>
      <div className="weater-container">
        <div className="search-bar">
          <div className="ui-input-container">
            <input
              required=""
              placeholder="Enter City Name ..."
              className="ui-input"
              type="text"
              value={searchCityName}
              onChange={(e) => setSearchCityName(e.target.value)}
            />
            <button type='submit' onClick={() => search(searchCityName)} className='search-button'>Search</button>
            <div className="ui-input-underline"></div>
            <div className="ui-input-highlight"></div>
            <div className="ui-input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="weater-content">
          <div className='weater-icon-div'>
            <img className='weater-icon' src={weaterData.icon} />
          </div>
          <div className='info-weater-div'>
            <div className="weater-main">
              <p>{weaterData.country} / {weaterData.location}</p>
              <p>{weaterData.temp} °C</p>
            </div>
            <div className="weater-info">
              <p>{weaterData.humidity}%<br />Humadity</p>
              <div>
                <p>
                  <FaWind /> {weaterData.windSpeed} <br /> Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
