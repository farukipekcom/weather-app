import React, { useEffect, useCallback, useState } from "react";
import "../App.css";
import Moment from "react-moment";
import { useCity } from "../context/CityContext";
function Home() {
  const [weather, setWeather] = useState([]);
  const [daily, setDaily] = useState();
  const [loading, setLoading] = useState(false);
  const { city } = useCity();
  const [plaka, setPlaka] = useState(0);
  useEffect(() => {
    async function fetchWeather() {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${city[plaka].lat}&lon=${city[plaka].lon}&lang=tr&exclude=hourly,minutely,current&units=metric&appid=4d6c282fa70b60dbd1411981f867b160`
      );
      const responseJson = await response.json();
      setWeather(responseJson.daily);
    }
    async function fetchDailyWeather() {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city[plaka].lat}&lon=${city[plaka].lon}&units=metric&appid=4d6c282fa70b60dbd1411981f867b160`
      );
      const responseJson = await response.json();
      setDaily(responseJson);
      setLoading(true);
    }
    fetchDailyWeather();
    fetchWeather();
  }, [plaka]);

  const handleChange = useCallback((e) => {
    setPlaka(e.target.value - 1);
  }, []);

  const degree = (deger) => {
    deger = deger % 360;
    if (11.25 <= deger && deger < 33.75) {
      return "NNE";
    } else if (33.75 <= deger && deger < 56.25) {
      return "NE";
    } else if (56.25 <= deger && deger < 78.75) {
      return "ENE";
    } else if (78.75 <= deger && deger < 101.25) {
      return "E";
    } else if (101.25 <= deger && deger < 123.75) {
      return "ESE";
    } else if (123.75 <= deger && deger < 146.25) {
      return "SE";
    } else if (146.25 <= deger && deger < 168.75) {
      return "SSE";
    } else if (168.75 <= deger && deger < 191.25) {
      return "S";
    } else if (191.25 <= deger && deger < 213.75) {
      return "SSW";
    } else if (213.75 <= deger && deger < 236.25) {
      return "SW";
    } else if (236.25 <= deger && deger < 258.75) {
      return "WSW";
    } else if (258.75 <= deger && deger < 281.25) {
      return "W";
    } else if (281.25 <= deger && deger < 303.75) {
      return "WNW";
    } else if (303.75 <= deger && deger < 326.25) {
      return "NW";
    } else if (326.25 <= deger && deger < 348.75) {
      return "NNW";
    } else {
      return "N";
    }
  };
  const humidity = (deger) => {
    if (0 <= deger && deger < 40) {
      return "Low 🙂";
    } else if (40 <= deger && deger < 55) {
      return "Normal 😋";
    } else {
      return "High 😫";
    }
  };
  const visibility = (deger) => {
    if (0 <= deger && deger < 3) {
      return "Fog";
    } else if (3 <= deger && deger < 6) {
      return "Poor";
    } else {
      return "Good";
    }
  };
  const meter = (deger) => {
    return (deger = deger / 1000);
  };
  return (
    <div className="app">
      <div className="select">
        <select onChange={handleChange}>
          {city.map((item) => (
            <option key={item.id} value={item.id} defaultValue={7}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="title">
        <span className="title-text">Seçilen Şehir:</span> {city[plaka].name}
      </div>
      <div className="container">
        {weather.map((item) => {
          return (
            <div className="card" key={item.dt}>
              <div className="date">
                <Moment unix format="ddd DD/MM">
                  {item.dt}
                </Moment>
              </div>
              <img src={`../${item.weather[0].icon}.png`} alt="../" />
              <div className="degree">
                <span className="max">{parseInt(item.temp.max)}°</span> /{" "}
                <span className="min">{parseInt(item.temp.min)}°</span>
              </div>
              <div className="description">{item.weather[0].description}</div>
            </div>
          );
        })}
      </div>
      <div className="today__highlights">
        <h2>Today's Highlights</h2>
      </div>
      <div className="container">
        {loading ? (
          <>
            <div className="box">
              <div className="box__title">Wind Status</div>
              <div className="box__details">{daily.wind.speed} km/h</div>
              <div className="box__bottom">
                <img src="../direction.svg" alt="" />
                <span className="degree">{degree(daily.wind.deg)}</span>
              </div>
            </div>

            <div className="box">
              <div className="box__title">Humidity</div>
              <div className="box__details">{daily.main.humidity}</div>
              <div className="box__bottom">
                <span className="degree">{humidity(daily.main.humidity)}</span>
              </div>
            </div>

            <div className="box">
              <div className="box__title">Visibility</div>
              <div className="box__details">{meter(daily.visibility)} km</div>
              <div className="box__bottom">
                <span className="degree">{visibility(daily.visibility)}</span>
              </div>
            </div>
            <div className="box">
              <div className="box__title">Sunrise / Sunset</div>
              <div className="box__details">
                🔆{" "}
                <Moment unix format="h:mm A">
                  {daily.sys.sunrise}
                </Moment>
              </div>
              <div className="box__details">
                🌑{" "}
                <Moment unix format="h:mm A">
                  {daily.sys.sunset}
                </Moment>
              </div>
            </div>
          </>
        ) : (
          "yükleniyor"
        )}
      </div>
    </div>
  );
}

export default React.memo(Home);
