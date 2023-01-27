import "./Weather.css";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import rainSVG from "../../assets/weather/rain.svg";
import thunderSVG from "../../assets/weather/thunderstorms.svg";
import snowSVG from "../../assets/weather/snow.svg";
import fogSVG from "../../assets/weather/fog.svg";
import drizzleSVG from "../../assets/weather/drizzle.svg";
import cloudsSVG from "../../assets/weather/cloudy.svg";
import clearDaySVG from "../../assets/weather/clear-day.svg";
import clearNightSVG from "../../assets/weather/clear-night.svg";
import { AuthContext } from "../../context/auth.context";
import moment from "moment";

function Weather() {
  const time = moment().hours();
  const { user } = useContext(AuthContext);
  
  const [data, setData] = useState({});
  const [svg, setSvg] = useState();

  const API_URL = "http://localhost:5005";
  const storedToken = localStorage.getItem("authToken");
  useEffect(() => {
    axios
      .get(`${API_URL}/users/${user._id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        let cityName = response.data.user.location;
        if(cityName.includes(' ')) {
          let index = cityName.indexOf(',')+1
          cityName = cityName.slice(0, index)
          cityName = cityName.replaceAll(' ', '%20')
          console.log(cityName)
        } else {
          cityName = response.data.user.location.split(",")[0];
        }
        const countryCode = response.data.user.location.split(",")[1].trim();
        //Call weather api
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}${countryCode}&appid=${process.env.REACT_APP_WEATHER_KEY}&units=metric`
          )
          .then((response) => {
            setData(response.data);
            checkCondition(response.data.weather[0].main);
          });
      });
  }, []);

  // const weatherCondition = data.weather ? data?.weather[0]?.main : "";

  const checkCondition = (weather) => {
    switch (weather) {
      case "Drizzle":
        setSvg(drizzleSVG);
        break;
      case "Rain":
        setSvg(rainSVG);
        break;
      case "Snow":
        setSvg(snowSVG);
        break;
      case "Clear":
        if (time >= 17 || time <= 7) {
          setSvg(clearNightSVG);
          break;
        } else {
          setSvg(clearDaySVG);
          break;
        }
      case "Fog":
      case "Mist":
        setSvg(fogSVG);
        break;
      case "Thunderstorm":
        setSvg(thunderSVG);
        break;
      case "":
        setSvg(null);
        break;
      default:
        setSvg(cloudsSVG);
        break;
    }
  };

  return (
    <div className="weatherApp">
      <div className="weatherContainer">
        <div className="weatherTop">
          <div className="weatherLocation">
            <h3 className="city">{data.name}</h3>
          
          <div className="weatherTemp">
            {data.main ? (
              <h1>{(data.main.temp).toFixed()} °C</h1>
            ) : null}
          </div>
          </div>
          <div className="weatherDescription">
            {data.weather ? <p>{data.weather[0].description}</p> : null}
          </div>
          <div>
            <img className="svgIcon" src={svg} alt="weather icon" />
          </div>
        </div>
        <div className="weatherBottom">
          <div className="feels">
            {data.main ? (
              <p className="bottom-details">{(data.main.feels_like).toFixed()}°</p>
            ) : null}
            <p className="bold">Feels Like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className="bottom-details vertical-line">{data.main.humidity}<span>%</span></p> : null}
            <p className="bold " >Humidity</p>
          </div>
          <div className="windSpeed">
            {data.wind ? <p className="bottom-details vertical-line">{data.wind.speed}<span> km/h</span></p> : null}
            <p className="bold vertical-line">Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
