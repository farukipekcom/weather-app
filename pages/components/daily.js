export const daily = ({ dailyCondition, setHourWeather }) => {
  return dailyCondition.length === 4
    ? setHourWeather([...dailyCondition])
    : dailyCondition.length === 3
    ? setHourWeather([
        ...dailyCondition,
        ...data.forecast.forecastday[1].hour.slice(0, 1),
      ])
    : dailyCondition.length === 2
    ? setHourWeather([
        ...dailyCondition,
        ...data.forecast.forecastday[1].hour.slice(0, 2),
      ])
    : dailyCondition.length === 1
    ? setHourWeather([
        ...dailyCondition,
        ...data.forecast.forecastday[1].hour.slice(0, 3),
      ])
    : dailyCondition.length === 0
    ? setHourWeather([
        ...dailyCondition,
        ...data.forecast.forecastday[1].hour.slice(0, 4),
      ])
    : "";
};
