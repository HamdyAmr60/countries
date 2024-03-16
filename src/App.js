// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './Component/Card';
import Header from './Component/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DetailPage from './DetailPage'; // Import BrowserRouter, Routes, and Route

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [darkMode, setDarkMode] = useState(false); // State for dark mode

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setFilteredData(data); // Initialize filtered data with all countries
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    if (region === 'All') {
      setFilteredData(data); // Reset to all countries if "All" is selected
    } else {
      const filtered = data.filter(country => country.region === region);
      setFilteredData(filtered);
    }
  };

  const handleSearch = (query) => {
    const filtered = data.filter(country => country.name.common.toLowerCase().includes(query.toLowerCase()));
    setFilteredData(filtered);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode); // Toggle dark mode state
    document.body.classList.toggle('dark-mode'); // Toggle dark-mode class on the body
  };

  return (
    <Router>
      <div>
        {/* Render the Header component outside of the Routes */}
        <Header onRegionChange={handleRegionChange} onSearch={handleSearch} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className='app'>
          <Routes>
            {/* Route for displaying cards */}
            <Route path="/" element={filteredData.map((country, index) => (
              <Card
                key={index}
                link={country.flags.png}
                name={country.name.common}
                pop={country.population}
                region={country.region}
                capital={country.capital}
                id={country.cca2}
                darkMode={darkMode} // Pass dark mode as a prop to the Card component
              />
            ))} />
            {/* Route for detail page */}
            <Route path="/detail/:countryName" element={<DetailPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
