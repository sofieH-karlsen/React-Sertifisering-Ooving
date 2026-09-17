import { getAllCountries } from "./services/country-service";
import { useState } from "react";
import { useEffect } from "react";

export default function CountryList() {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const filteredCountries = [...countries]
    .sort((a, b) => {
      return a.name.localeCompare(b.name);
    })
    .filter((country) => country.name.toLowerCase().includes(filter.toLowerCase() ?? ""));

  useEffect(() => {
    async function fetchCountries() {
      const letters = await getAllCountries();
      setCountries(letters);
      setIsLoading(false);
    }
    fetchCountries();
  }, []);

  return (
    <div>
      <header>
        <h1>Country Selection</h1>
      </header>
      <div>
        <SearchInput filter={filter} onSearch={setFilter} />
        {isLoading ? (
          <p>Loading countries...</p>
        ) : (
          <CountryListComponent
            countries={filteredCountries}
            onFavorite={(country) => {
              setCountries(countries.map((c) =>
                 c.code === country.code ? { ...c, favorite: !c.favorite } : c)
              );
            }}
          />
        )}
      </div>
    </div>
  );
}

function CountryListComponent({ countries, onFavorite }) {
  return (
    <ul 
      style={{
        listStyle: "none",
        padding: "1rem",
        margin: 0,
        width: "300px",
        height: "300px",
        overflowY: "auto",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
      >
      {countries.map((country) => (
        <li
          key={country.code}
        >
          {country.name} {country.favorite ? "⭐️" : ""}
          <button onClick={() => onFavorite(country)}>
            {country.favorite ? "Un-star" : "Star"}
          </button>
        </li>
      ))}
    </ul>
  );
}

function SearchInput({ filter, onSearch }) {
  const [inputValue, setInputValue] = useState(filter);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onSearch(value);
  };

  return (
    <input
      type="text"
      placeholder="Enter country name"
      value={inputValue}
      onChange={handleChange}
    />
  );
}