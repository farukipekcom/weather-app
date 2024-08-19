import format from "date-fns/format";
import Moment from "react-moment";
import {useEffect, useState} from "react";
import hourly from "./components/hourly";
import axios from "axios";
import {ResponsiveLine} from "@nivo/line";
export default function Home() {
  const [data, setData] = useState(null);
  const [minmax, setMinMax] = useState();
  const [search, setSearch] = useState(null);
  const [city, setCity] = useState("antalya");
  const [suggest, setSuggest] = useState(undefined);
  const [isLoading, setIsLoading] = useState();
  const [active, setActive] = useState(false);
  const [hourWeather, setHourWeather] = useState([]);
  useEffect(() => {
    const fetchItems = async () => {
      const result = await axios(
        `https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API}&q=${city}&days=5&aqi=no&alerts=no`
      );
      setData(result.data);
      setIsLoading(true);
    };
    fetchItems();
    setActive(false);
  }, [city]);

  useEffect(() => {
    const fetchItems = async () => {
      const result = await axios(`https://api.weatherapi.com/v1/search.json?key=${process.env.NEXT_PUBLIC_WEATHER_API}&q=${suggest}`);
      setSearch(result.data);
    };
    fetchItems();
  }, [suggest]);
  const currentHour = isLoading && Number.parseInt(format(new Date(data.location.localtime), "H"));
  const dailyCondition = data?.forecast.forecastday[0].hour.slice(currentHour + 1, currentHour + 5);
  useEffect(() => {
    isLoading && hourly(data, dailyCondition, setHourWeather);
  }, [isLoading, city, data]);
  const onClick = (name) => {
    setCity(name);
  };
  const onChange = (e) => {
    e.preventDefault();
    if (e.target.value === "") {
      setSuggest(undefined);
    } else {
      setSuggest(e.target.value);
    }
  };

  const combinedArray = [];
  const dataTemp2 = [];
  const dataHour2 = [];
  let dongu = 0;
  let fark = (24 - currentHour) % 3;
  if (fark < 3) {
    for (let x = 0, i = currentHour; i < 24; x++, i = i + 3) {
      dataHour2.push(Number.parseInt(format(new Date(data?.forecast.forecastday[0].hour[i].time), "H")));
      dataTemp2.push(Number.parseInt(data?.forecast.forecastday[0].hour[i].temp_c));
      dongu = dongu + 1;
    }
    if (fark === 0) {
      for (let i = 0; i < (8 - dongu) * 3; i = i + 3) {
        dataHour2.push(i);
        dataTemp2.push(Number.parseInt(data?.forecast.forecastday[1].hour[i].temp_c));
      }
    } else {
      for (let i = 3 - fark; i < (8 - dongu) * 3; i = i + 3) {
        dataHour2.push(i);
        dataTemp2.push(Number.parseInt(data?.forecast.forecastday[1].hour[i].temp_c));
      }
    }
  } else {
    if (24 - currentHour <= 2) {
      for (let x = 0, i = currentHour; i < 24; x++, i = i + 3) {
        dataHour2.push(
          Number.parseInt(format(new Date(data?.forecast.forecastday[1].hour[i].time), "H")) +
            format(new Date(data?.forecast.forecastday[0].hour[1].time), "a")
        );
        dataTemp2.push(Number.parseInt(data?.forecast.forecastday[1].hour[i].temp_c));
      }
    }
  }

  for (var xyz = 0, i = 0; i < dataHour2.length; i++, xyz++) {
    combinedArray[xyz] = {x: dataHour2[i], y: dataTemp2[i]};
  }
  const deneme = [
    {
      id: "Graph",
      data: [
        {
          x: 1,
          y: 20,
        },
        {
          x: 2,
          y: 15,
        },
      ],
    },
  ];
  const xdeneme = [
    {
      id: "fake corp. A",
      data: combinedArray,
    },
  ];
  const bak = [];
  isLoading &&
    xdeneme[0].data.map((item) => {
      return bak.push(item.y);
    });
  return (
    <>
      {isLoading && (
        <div className="main">
          <div className="main-left">
            <div className="main-left-header">
              <div className="main-left-header-left">
                <div className="main-left-header-left-date">
                  <Moment format="MMMM DD, yyyy">{data.location.localtime}</Moment>
                </div>
                <div className="main-left-header-left-city">
                  {data.location.name}
                  <div className="searchBox">
                    <span onClick={() => setActive(!active)}>
                      <img src="/search.svg" alt="" />
                    </span>
                    {active && (
                      <div class="sorgu">
                        <input type="text" name="text" placeholder="Search for city" onChange={(e) => onChange(e)} />
                        <img
                          src="/close.svg"
                          alt=""
                          onClick={() => {
                            setActive(!active);
                            setSearch(null);
                          }}
                        />
                        <div className="search">
                          {search?.map((item) => {
                            return (
                              <div
                                className="city"
                                onClick={() => {
                                  onClick(item.name);
                                  setSearch(null);
                                }}>
                                {item.name + ", "}
                                <span className="country">{item.country}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="main-left-header-left-country">
                  {data.location.region === data.location.name ? "" : data.location.region + ", "}
                  {data.location.country}
                </div>
              </div>
              <div className="main-left-header-right">
                <div className="main-left-header-right-time">
                  <Moment format="hh:mm A">{data.location.localtime}</Moment>
                  <span>Last updated</span>
                </div>
              </div>
            </div>
            <div className="main-left-center">
              <div className="main-left-center-degree">{data.current.temp_c.toFixed()}</div>
              <div className="main-left-center-mark">°</div>
              <div className="main-left-center-status">{data.current.condition.text}</div>
            </div>
            <div className="main-left-footer">
              <div className="main-left-footer-list">
                <div className="main-left-footer-list-item">
                  <div className="main-left-footer-list-item-icon">
                    <img src="wind.svg" alt="Wind" />
                  </div>
                  <div className="main-left-footer-list-item-details">
                    <div className="main-left-footer-list-item-details-heading">Wind</div>
                    <div className="main-left-footer-list-item-details-value">{data.current.wind_kph} km/h</div>
                  </div>
                </div>
                <div className="main-left-footer-list-item">
                  <div className="main-left-footer-list-item-icon">
                    <img src="humidity.svg" alt="Humidity" />
                  </div>
                  <div className="main-left-footer-list-item-details">
                    <div className="main-left-footer-list-item-details-heading">Humidity</div>
                    <div className="main-left-footer-list-item-details-value">{data.current.humidity}%</div>
                  </div>
                </div>
                <div className="main-left-footer-list-item">
                  <div className="main-left-footer-list-item-icon">
                    <img src="rain.svg" alt="Humidity" />
                  </div>
                  <div className="main-left-footer-list-item-details">
                    <div className="main-left-footer-list-item-details-heading">Rain Chance</div>
                    <div className="main-left-footer-list-item-details-value">{data.forecast.forecastday[0].day.daily_chance_of_rain}%</div>
                  </div>
                </div>
                <div className="main-left-footer-list-item">
                  <div className="main-left-footer-list-item-icon">
                    <img src="uv.svg" alt="Humidity" />
                  </div>
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
                {isLoading &&
                  hourWeather.map((item, index) => {
                    return (
                      <div className="main-right-today-hours-hour" key={index}>
                        <div className="main-right-today-hours-hour-time">
                          <Moment format="h A">{item.time}</Moment>
                        </div>
                        <div className="main-right-today-hours-hour-icon">
                          <img src={"http:" + item.condition.icon} alt={item.condition.text} title={item.condition.text} />
                        </div>
                        <div className="main-right-today-hours-hour-degree">{item.temp_c.toFixed()}°</div>
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
                        {item.day.mintemp_c.toFixed()}° / {item.day.maxtemp_c.toFixed()}°
                      </div>
                      <div className="main-right-week-day-icon">
                        <img src={"http:" + item.day.condition.icon} alt={item.day.condition.text} title={item.day.condition.text} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="deneme">
              <ResponsiveLine
                curve="monotoneX"
                data={xdeneme}
                enableGridX={false}
                enableGridY={false}
                axisTop={null}
                axisRight={null}
                axisLeft={null}
                lineWidth={4}
                enableArea={true}
                axisBottom={{
                  orient: "bottom",
                  tickSize: 5,
                  tickPadding: 3,
                  tickRotation: 0,
                  legend: "transportation",
                  legendOffset: 36,
                  legendPosition: "middle",
                }}
                margin={{top: 10, right: 10, bottom: 20, left: 10}}
                xScale={{type: "point"}}
                yScale={{
                  type: "linear",
                  max: Math.max(...bak) + 3,
                  min: Math.min(...bak) - 3,
                  stacked: true,
                  reverse: false,
                }}
                yFormat=" >-.2f"
                pointSize={11}
                colors={"#FBB401"}
                pointBorderWidth={3}
                pointBorderColor={{from: "serieColor", modifiers: []}}
                enablePointLabel={true}
                pointLabel="y"
                pointLabelYOffset={-16}
                enableCrosshair={false}
                crosshairType="y"
                useMesh={false}
                legends={[]}
              />
            </div>
            <div className="main-right-sun">
              <div className="main-right-sun-heading">Sunrise & Sunset</div>
              <div className="main-right-sun-list">
                <div className="main-right-sun-item sunrise">
                  <div className="main-right-sun-item-icon">
                    <img src="sunrise.svg" alt="Sunrise" />
                  </div>
                  <div className="main-right-sun-item-details">
                    <div className="main-right-sun-item-details-heading">Sunrise</div>
                    <div className="main-right-sun-item-details-value">{data.forecast.forecastday[1].astro.sunrise}</div>
                  </div>
                </div>
                <div className="main-right-sun-item sunset">
                  <div className="main-right-sun-item-icon">
                    <img src="sunset.svg" alt="Sunset" />
                  </div>
                  <div className="main-right-sun-item-details">
                    <div className="main-right-sun-item-details-heading">Sunset</div>
                    <div className="main-right-sun-item-details-value">{data.forecast.forecastday[1].astro.sunset}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
