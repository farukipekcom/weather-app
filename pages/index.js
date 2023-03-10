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
      <div className="main-right"></div>
    </div>
  );
}
