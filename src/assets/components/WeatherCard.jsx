const Weathercard = ({ weather, refreshedAt, refreshError }) => {
  if (!weather) {
    return null;
  }

  const updatedText = refreshedAt
    ? new Intl.DateTimeFormat(undefined, {
        hour: 'numeric',
        minute: '2-digit',
      }).format(refreshedAt)
    : 'just now';

  return (
    <div className="weather-card">
      <h2>{[weather.name, weather.sys?.country].filter(Boolean).join(', ')}</h2>

      <img
        src={`https://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}@2x.png`}
        alt={weather.weather?.[0]?.description}
        loading="lazy"
      />

      <h3>{Math.round(weather.main?.temp)}°F</h3>

      <p>
        <strong>{weather.weather?.[0]?.main}</strong>
      </p>

      <p>{weather.weather?.[0]?.description}</p>
      <p className="weather-updated">
        Live conditions · Updated {updatedText}
      </p>
      {refreshError && (
        <p className="weather-refresh-error">
          Could not refresh; showing the last update.
        </p>
      )}

      <div className="weather-details" aria-label="Weather details">
        <section className="weather-detail">
          <span className="weather-detail-label">Feels like</span>
          <strong>{Math.round(weather.main?.feels_like)}°F</strong>
        </section>
        <section className="weather-detail">
          <span className="weather-detail-label">Humidity</span>
          <strong>{weather.main?.humidity}%</strong>
        </section>
        <section className="weather-detail">
          <span className="weather-detail-label">Wind</span>
          <strong>{weather.wind?.speed} m/s</strong>
        </section>
        <section className="weather-detail">
          <span className="weather-detail-label">Cloud cover</span>
          <strong>{weather.clouds?.all}%</strong>
        </section>
      </div>
    </div>
  );
};

export default Weathercard;