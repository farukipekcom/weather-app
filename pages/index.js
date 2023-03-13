import format from 'date-fns/format'
import Moment from 'react-moment';
import {useEffect, useState} from 'react';
export default function Home({ data }) {
  const date = format(new Date(data.location.localtime), 'MMMM dd, yyyy');
  const time = format(new Date(data.location.localtime), 'HH:mm a');
  const currentHour = Number.parseInt(format(new Date(data.location.localtime), 'H'));
  const yeni = data.forecast.forecastday[0].hour.slice(currentHour + 1, currentHour + 5);
  const [hourWeather,setHourWeather] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  useEffect(() => {
    { yeni.length === 4 ? 
      setHourWeather([...yeni]) : yeni.length === 3 ? 
      setHourWeather([...yeni, ...data.forecast.forecastday[1].hour.slice(0, 1)]) : yeni.length === 2 ? 
      setHourWeather([...yeni, ...data.forecast.forecastday[1].hour.slice(0, 2)]) : yeni.length === 1 ? 
      setHourWeather([...yeni, ...data.forecast.forecastday[1].hour.slice(0, 3)]) : yeni.length === 0 ? 
      setHourWeather([...yeni, ...data.forecast.forecastday[1].hour.slice(0, 4)]) : "" }
    setIsLoading(true);
  }, []);
  return (
    <div className="main">
      <div className="main-left">
        <div className="main-left-header">
          <div className="main-left-header-left">
            <div className="main-left-header-left-date">{date}</div>
            <div className="main-left-header-left-city">{data.location.name}</div>
            <div className="main-left-header-left-country">{data.location.country}</div>
          </div>
          <div className="main-left-header-right">
            <div className="main-left-header-right-time">{time}</div>
          </div>
        </div>
        <div className="main-left-center">
          <div className="main-left-center-degree">{data.current.temp_c}</div>
          <div className="main-left-center-mark">°</div>
        </div>
        <div className="main-left-footer">
          <div className="main-left-footer-list">
            <div className="main-left-footer-list-item">
              <div className="main-left-footer-list-item-icon">
                <img src="wind.svg" alt="Wind" /></div>
              <div className="main-left-footer-list-item-details">
                <div className="main-left-footer-list-item-details-heading">Wind</div>
                <div className="main-left-footer-list-item-details-value">{data.current.wind_kph} km/h</div>
              </div>
            </div>
            <div className="main-left-footer-list-item">
              <div className="main-left-footer-list-item-icon">
                <img src="humidity.svg" alt="Humidity" /></div>
              <div className="main-left-footer-list-item-details">
                <div className="main-left-footer-list-item-details-heading">Humidity</div>
                <div className="main-left-footer-list-item-details-value">{data.current.humidity} %</div>
              </div>
            </div>
            <div className="main-left-footer-list-item">
              <div className="main-left-footer-list-item-icon">
                <img src="rain.svg" alt="Humidity" /></div>
              <div className="main-left-footer-list-item-details">
                <div className="main-left-footer-list-item-details-heading">Rain Chance</div>
                <div className="main-left-footer-list-item-details-value">{data.forecast.forecastday[0].day.daily_chance_of_rain} %</div>
              </div>
            </div>
            <div className="main-left-footer-list-item">
              <div className="main-left-footer-list-item-icon">
                <img src="uv.svg" alt="Humidity" /></div>
              <div className="main-left-footer-list-item-details">
                <div className="main-left-footer-list-item-details-heading">UV Index</div>
                <div className="main-left-footer-list-item-details-value">{data.current.uv}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-right">
        <div className="main-right-today">
          <div className="main-right-today-heading">Today</div>
          <div className="main-right-today-hours">
            {isLoading && hourWeather.map((item, index) => {
              return <div className="main-right-today-hours-hour" key={index}>
              <div className="main-right-today-hours-hour-time">
                <Moment format="h A">
                  {item.time}
                </Moment></div>
              <div className="main-right-today-hours-hour-icon">
                <img src="sun.svg" alt="Sun" />
              </div>
              <div className="main-right-today-hours-hour-degree">{item.temp_c}°</div>
            </div>
            })}
          </div>
        </div>
        <div className="main-right-week">
          {data.forecast.forecastday.map((item, index) => {
            return <div key={index}>
              <div className="main-right-week-day" key={index}>
                <div className="main-right-week-day-details">
                  <div className="main-right-week-day-details-day">
                    <Moment format="dddd">
                      {item.date}
                    </Moment>
                  </div>
                  <div className="main-right-week-day-details-date"><Moment format="MMMM DD">
                    {item.date}
                  </Moment></div>
                </div>
                <div className="main-right-week-day-degree">{Number.parseInt(item.day.mintemp_c)}° / {Number.parseInt(item.day.maxtemp_c)}°</div>
                <div className="main-right-week-day-icon">
                  <img src="sun.svg" alt="Sun" />
                </div>
              </div>
            </div>
          })}
        </div>
        <div className="main-right-sun">
          <div className="main-right-sun-heading">Sunrise & Sunset</div>
          <div className="main-right-sun-list">
            <div className="main-right-sun-item sunrise">
              <div className="main-right-sun-item-icon">
                <img src="sunrise.svg" alt="Sunrise" /></div>
              <div className="main-right-sun-item-details">
                <div className="main-right-sun-item-details-heading">Sunrise</div>
                <div className="main-right-sun-item-details-value">4:20 AM</div>
              </div>
            </div>
            <div className="main-right-sun-item sunset">
              <div className="main-right-sun-item-icon">
                <img src="sunset.svg" alt="Sunset" /></div>
              <div className="main-right-sun-item-details">
                <div className="main-right-sun-item-details-heading">Sunset</div>
                <div className="main-right-sun-item-details-value">4:20 AM</div>
              </div>
            </div></div>
        </div>
      </div>
    </div>
  );
}
export async function getStaticProps() {
  const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API}&q=istanbul&days=5&aqi=no&alerts=no`)
  const data = await res.json()
  return {
    props: {
      data,
    },
  }
}