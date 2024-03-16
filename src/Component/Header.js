import { useState, useEffect } from "react";

export default function Header({ onSearch, onRegionChange, darkMode, toggleDarkMode }) {
  const [query, setQuery] = useState('');
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setRegions(["All", ...new Set(data.map(country => country.region))]);
      })
      .catch((error) => console.error("Error fetching regions:", error));
  }, []);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    onSearch(inputValue);
  };

  const handleRegionFilter = (region) => {
    onRegionChange(region);
  };

  return (
    <div style={{ height: "150px", width: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "15px",
          backgroundColor: darkMode ? "#333" : "transparent",
          color: darkMode ? "#fff" : "#000",
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        <h2>Where in the world ?</h2>
        <button onClick={toggleDarkMode}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "15px",
        }}
      >
        <input
          type="text"
          placeholder="Search for country"
          style={{
            padding: "8px",
            width: "300px",
            outlineColor: "#eee",
            borderRadius: "8px",
            border: "1px solid #eee",
            backgroundColor: darkMode ? "#333" : "#fff",
            color: darkMode ? "#fff" : "#000",
          }}
          value={query}
          onChange={handleInputChange}
        />
        <div className="dropdown">
          <button
            className="btn btn-light dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Filter country by region
          </button>
          <ul
            className="dropdown-menu"
            style={{
              backgroundColor: darkMode ? "#333" : "#fff",
              color: darkMode ? "#fff" : "#000",
            }}
          >
            {regions.map((region, index) => (
              <li key={index} >
                <button
                  className="dropdown-item"
                  onClick={() => handleRegionFilter(region)}
                >
                  {region}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
