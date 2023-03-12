export default function Home() {
  return (
    <div className="main">
      <div className="main-left">
        <div className="main-left-header">
          <div className="main-left-header-left">
            <div className="main-left-header-left-date">24 July, 2022</div>
            <div className="main-left-header-left-city">İstanbul</div>
            <div className="main-left-header-left-country">Turkey</div>
          </div>
          <div className="main-left-header-right">
            <div className="main-left-header-right-time">2:44 PM</div>
          </div>
        </div>
        <div className="main-left-center">
          <div className="main-left-center-degree">20</div>
          <div className="main-left-center-mark">°</div>
        </div>
        <div className="main-left-footer">
          <div className="main-left-footer-list">
            <div className="main-left-footer-list-item">
              <div className="main-left-footer-list-item-icon">
                <img src="wind.svg" alt="Wind" /></div>
              <div className="main-left-footer-list-item-details">
                <div className="main-left-footer-list-item-details-heading">Wind</div>
                <div className="main-left-footer-list-item-details-value">12 km/h</div>
              </div>
            </div>
            <div className="main-left-footer-list-item">
              <div className="main-left-footer-list-item-icon">
                <img src="humidity.svg" alt="Humidity" /></div>
              <div className="main-left-footer-list-item-details">
                <div className="main-left-footer-list-item-details-heading">Humidity</div>
                <div className="main-left-footer-list-item-details-value">24 %</div>
              </div>
            </div>
            <div className="main-left-footer-list-item">
              <div className="main-left-footer-list-item-icon">
                <img src="rain.svg" alt="Humidity" /></div>
              <div className="main-left-footer-list-item-details">
                <div className="main-left-footer-list-item-details-heading">Rain Chance</div>
                <div className="main-left-footer-list-item-details-value">30 %</div>
              </div>
            </div>
            <div className="main-left-footer-list-item">
              <div className="main-left-footer-list-item-icon">
                <img src="uv.svg" alt="Humidity" /></div>
              <div className="main-left-footer-list-item-details">
                <div className="main-left-footer-list-item-details-heading">UV Index</div>
                <div className="main-left-footer-list-item-details-value">4.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-right">
        <div className="main-right-today">
          <div className="main-right-today-heading">Today</div>
          <div className="main-right-today-hours">
            <div className="main-right-today-hours-hour">
              <div className="main-right-today-hours-hour-time">3 PM</div>
              <div className="main-right-today-hours-hour-icon">
                <img src="sun.svg" alt="Sun" />
              </div>
              <div className="main-right-today-hours-hour-degree">24°</div>
            </div>
            <div className="main-right-today-hours-hour">
              <div className="main-right-today-hours-hour-time">3 PM</div>
              <div className="main-right-today-hours-hour-icon">
                <img src="sun.svg" alt="Sun" />
              </div>
              <div className="main-right-today-hours-hour-degree">24°</div>
            </div>
            <div className="main-right-today-hours-hour">
              <div className="main-right-today-hours-hour-time">3 PM</div>
              <div className="main-right-today-hours-hour-icon">
                <img src="sun.svg" alt="Sun" />
              </div>
              <div className="main-right-today-hours-hour-degree">24°</div>
            </div>
            <div className="main-right-today-hours-hour">
              <div className="main-right-today-hours-hour-time">3 PM</div>
              <div className="main-right-today-hours-hour-icon">
                <img src="sun.svg" alt="Sun" />
              </div>
              <div className="main-right-today-hours-hour-degree">24°</div>
            </div>
          </div>
        </div>
        <div className="main-right-week">
          <div className="main-right-week-day">
            <div className="main-right-week-day-details">
              <div className="main-right-week-day-details-day">Sunday</div>
              <div className="main-right-week-day-details-date">25 July</div>
            </div>
            <div className="main-right-week-day-degree">12° / 24°</div>
            <div className="main-right-week-day-icon">
              <img src="sun.svg" alt="Sun" />
            </div>
          </div>
          <div className="main-right-week-day">
            <div className="main-right-week-day-details">
              <div className="main-right-week-day-details-day">Monday</div>
              <div className="main-right-week-day-details-date">26 July</div>
            </div>
            <div className="main-right-week-day-degree">18° / 29°</div>
            <div className="main-right-week-day-icon">
              <img src="sun.svg" alt="Sun" />
            </div>
          </div>
          <div className="main-right-week-day">
            <div className="main-right-week-day-details">
              <div className="main-right-week-day-details-day">Tuesday</div>
              <div className="main-right-week-day-details-date">27 July</div>
            </div>
            <div className="main-right-week-day-degree">16° / 28°</div>
            <div className="main-right-week-day-icon">
              <img src="sun.svg" alt="Sun" />
            </div>
          </div>
          <div className="main-right-week-day">
            <div className="main-right-week-day-details">
              <div className="main-right-week-day-details-day">Wednesday</div>
              <div className="main-right-week-day-details-date">28 July</div>
            </div>
            <div className="main-right-week-day-degree">14° / 22°</div>
            <div className="main-right-week-day-icon">
              <img src="sun.svg" alt="Sun" />
            </div>
          </div>
          <div className="main-right-week-day">
            <div className="main-right-week-day-details">
              <div className="main-right-week-day-details-day">Thursday</div>
              <div className="main-right-week-day-details-date">29 July</div>
            </div>
            <div className="main-right-week-day-degree">21° / 34°</div>
            <div className="main-right-week-day-icon">
              <img src="sun.svg" alt="Sun" />
            </div>
          </div>
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
