import format from "date-fns/format";
import Moment from "react-moment";
import moment from 'moment';
import { useEffect, useState } from "react";
import condition from "./components/condition";
import hourly from "./components/hourly";
import axios from "axios";
export default function Home() {
var [date,setDate] = useState(new Date());
useEffect(() => {
    const timer = setInterval(()=>setDate((new Date())), 60000 )
    return function cleanup() {
        clearInterval(timer)
    }
},[setDate]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [hourWeather, setHourWeather] = useState([]);
  useEffect(() => {
    const fetchItems = async () => {
      const result = await axios(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API}&q=istanbul&days=5&aqi=no&alerts=no`);
      setData(result.data);
      setIsLoading(true);
    };
    fetchItems();
  }, []);
  const currentHour = isLoading &&  Number.parseInt(
    format(new Date(data.location.localtime), "H")
  );
  const dailyCondition = isLoading && data.forecast.forecastday[0].hour.slice(
    currentHour + 1,
    currentHour + 5
  );
  useEffect( () => {
      isLoading && hourly(dailyCondition,setHourWeather);
  },[isLoading]);

  return (
    <>{isLoading && <div className="main">
      <div className="main-left">
        <div className="main-left-header">
          <div className="main-left-header-left">
            <div className="main-left-header-left-date">
            <Moment format="MMMM DD, yyyy">{data.location.localtime}</Moment>
            </div>
            <div className="main-left-header-left-city">
              {data.location.name}
            </div>
            <div className="main-left-header-left-country">
              {data.location.region === data.location.name ? "" : data.location.region + ", "}{data.location.country}
            </div>
          </div>
          <div className="main-left-header-right">
            <div className="main-left-header-right-time">
            <Moment format="hh:mm A">{date}</Moment>
            </div>
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
                <img src="wind.svg" alt="Wind" />
              </div>
              <div className="main-left-footer-list-item-details">
                <div className="main-left-footer-list-item-details-heading">
                  Wind
                </div>
                <div className="main-left-footer-list-item-details-value">
                  {data.current.wind_kph} km/h
                </div>
              </div>
            </div>
            <div className="main-left-footer-list-item">
              <div className="main-left-footer-list-item-icon">
                <img src="humidity.svg" alt="Humidity" />
              </div>
              <div className="main-left-footer-list-item-details">
                <div className="main-left-footer-list-item-details-heading">
                  Humidity
                </div>
                <div className="main-left-footer-list-item-details-value">
                  {data.current.humidity} %
                </div>
              </div>
            </div>
            <div className="main-left-footer-list-item">
              <div className="main-left-footer-list-item-icon">
                <img src="rain.svg" alt="Humidity" />
              </div>
              <div className="main-left-footer-list-item-details">
                <div className="main-left-footer-list-item-details-heading">
                  Rain Chance
                </div>
                <div className="main-left-footer-list-item-details-value">
                  {data.forecast.forecastday[0].day.daily_chance_of_rain} %
                </div>
              </div>
            </div>
            <div className="main-left-footer-list-item">
              <div className="main-left-footer-list-item-icon">
                <img src="uv.svg" alt="Humidity" />
              </div>
              <div className="main-left-footer-list-item-details">
                <div className="main-left-footer-list-item-details-heading">
                  UV Index
                </div>
                <div className="main-left-footer-list-item-details-value">
                  {data.current.uv}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-right">
        <div className="main-right-today">
          <div className="main-right-today-heading">Today</div>
          <div className="main-right-today-hours">
            {isLoading &&
              hourWeather.map((item, index) => {
                return (
                  <div className="main-right-today-hours-hour" key={index}>
                    <div className="main-right-today-hours-hour-time">
                      <Moment format="h A">{item.time}</Moment>
                    </div>
                    <div className="main-right-today-hours-hour-icon">
                      <img src={condition(item.condition.code)} alt={item.condition.text} title={item.condition.text} />
                    </div>
                    <div className="main-right-today-hours-hour-degree">
                      {Number.parseInt(item.temp_c)}°
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="main-right-week">
          {data.forecast.forecastday.map((item, index) => {
            return (
              <div key={index}>
                <div className="main-right-week-day" key={index}>
                  <div className="main-right-week-day-details">
                    <div className="main-right-week-day-details-day">
                      <Moment format="dddd">{item.date}</Moment>
                    </div>
                    <div className="main-right-week-day-details-date">
                      <Moment format="MMMM DD">{item.date}</Moment>
                    </div>
                  </div>
                  <div className="main-right-week-day-degree">
                    {Number.parseInt(item.day.mintemp_c)}° /{" "}
                    {Number.parseInt(item.day.maxtemp_c)}°
                  </div>
                  <div className="main-right-week-day-icon">
                    <img src={condition(item.day.condition.code)} alt={item.day.condition.text} title={item.day.condition.text} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="main-right-sun">
          <div className="main-right-sun-heading">Sunrise & Sunset</div>
          <div className="main-right-sun-list">
            <div className="main-right-sun-item sunrise">
              <div className="main-right-sun-item-icon">
                <img src="sunrise.svg" alt="Sunrise" />
              </div>
              <div className="main-right-sun-item-details">
                <div className="main-right-sun-item-details-heading">
                  Sunrise
                </div>
                <div className="main-right-sun-item-details-value">
                  {data.forecast.forecastday[1].astro.sunrise}
                </div>
              </div>
            </div>
            <div className="main-right-sun-item sunset">
              <div className="main-right-sun-item-icon">
                <img src="sunset.svg" alt="Sunset" />
              </div>
              <div className="main-right-sun-item-details">
                <div className="main-right-sun-item-details-heading">
                  Sunset
                </div>
                <div className="main-right-sun-item-details-value">
                  {data.forecast.forecastday[1].astro.sunset}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    }</>
  );
}
// export async function getStaticProps() {
//   const res = await fetch(
//     `https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API}&q=charlotte&days=5&aqi=no&alerts=no`
//   );
//   const data = await res.json();
//   return {
//     props: {
//       data,
//     },
//   };
// }
// export async function getServerSideProps() {
//   const res = await fetch(
//     `https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API}&q=charlotte&days=5&aqi=no&alerts=no`
//   );
//   const data = await res.json()
//   return { props: { data } }
// }
