import { useEffect, useRef, useState } from 'react';
import SearchBar from './Searchbar';
import WeatherCard from './WeatherCard';
import { getWeather } from '../../services/Weathercard';
import './chatbot.css';

const WeatherPage = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [refreshError, setRefreshError] = useState('');
  const [refreshedAt, setRefreshedAt] = useState(null);
  const isRefreshing = useRef(false);

  const searchWeather = async (searchCity) => {
    const trimmedCity = searchCity.trim();
    if (!trimmedCity) {
      return;
    }

    setCity(trimmedCity);
    setIsLoading(true);
    setError('');
    setRefreshError('');
    try {
      const currentWeather = await getWeather(trimmedCity);
      setWeather(currentWeather);
      setRefreshedAt(Date.now());
    } catch (requestError) {
      setWeather(null);
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Unable to load weather right now.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!weather?.name) {
      return undefined;
    }

    const intervalId = window.setInterval(async () => {
      if (isRefreshing.current) {
        return;
      }

      isRefreshing.current = true;
      try {
        const latestWeather = await getWeather(weather.name);
        setWeather(latestWeather);
        setRefreshedAt(Date.now());
        setRefreshError('');
      } catch {
        setRefreshError('Could not refresh; showing the last update.');
      } finally {
        isRefreshing.current = false;
      }
    }, 5 * 60 * 1000);

    return () => window.clearInterval(intervalId);
  }, [weather?.name]);

  return (
    <section className="weather-page-card">
      <div className="weather-page-header">
        <div>
          <p className="panel-eyebrow">LOCAL CONDITIONS</p>
          <h2>Current weather</h2>
          <p>Live conditions from OpenWeather.</p>
        </div>
        <span className="weather-header-icon" aria-hidden="true">☀</span>
      </div>
      <SearchBar onSearch={searchWeather} disabled={isLoading} />
      {isLoading && <p className="weather-status">Checking weather for {city}…</p>}
      {error && <p className="weather-status weather-error">{error}</p>}
      {weather ? (
        <WeatherCard
          weather={weather}
          refreshedAt={refreshedAt}
          refreshError={refreshError}
        />
      ) : (
        !isLoading &&
        !error && (
          <p className="weather-empty">
            Enter a city above to see the current weather.
          </p>
        )
      )}
    </section>
  );
};

export default WeatherPage;
