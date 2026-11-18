import { useState } from "react";

const SearchBar = ({ onSearch, disabled = false }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(city.trim());
  };

  return (
    <form className="weather-search" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a city (e.g. Cebu City, Argao)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        disabled={disabled}
        required
      />
      <button type="submit" disabled={disabled || !city.trim()}>
        {disabled ? 'Searching…' : 'Get weather'}
      </button>
    </form>
  );
};

export default SearchBar;