import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function DetailPage() {
  const { countryName } = useParams(); // Get the countryName parameter from the URL
  const [countryData, setCountryData] = useState(null); // State to hold country data

  useEffect(() => {
    // Fetch additional information about the country using the country name
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API returns an array with one object for the country
        setCountryData(data[0]); // Set the country data in state
      })
      .catch((error) => console.error('Error fetching country data:', error));
  }, [countryName]); // Fetch data whenever countryName changes

  if (!countryData) {
    return <div>Loading...</div>; // Display loading message while data is being fetched
  }

  // Once data is fetched, render the details of the country
  return (
    <>
      <Link to="/" style={{ textDecoration: 'none',  }}>
        <button style={{
          boxShadow  :" 0px 4px 8px rgba(0 , 0 , 0 , 0.1)",
          padding :"5px",
          margin : "20px",
          border : "1px solid #eee",
          borderRadius :"8px"
        }}>Go Back to Home</button>
      </Link>
      <div style={{ display: 'flex', width: '100%' }}>
        <div style={{ width: '50%' }}>
          <div
            className="image-container"
            style={{
              backgroundImage: `url(${countryData.flags.png})`,
              backgroundSize: 'cover',
              height: '100%', // Adjust height as needed
            }}
          />
        </div>
        <div style={{ width: '50%', padding: '20px' }}>
  <h1>{countryData.name.common}</h1>
  <p>Population: {countryData.population}</p>
  <p>Region: {countryData.region}</p>
  <p>Capital: {countryData.capital}</p>
  <p>Top Level Domain: {countryData.tld}</p>
  {countryData.subregion && <p>Sub Region: {countryData.subregion}</p>}
  {countryData.languages && (
    <div style={{
      display :"flex"
    }}>
      <h2>Languages:</h2>
      <ul style={{ listStyleType: 'none', margin: '0', padding: '0' }}>
        {Object.values(countryData.languages).map((language, index) => (
          <li key={index} style={{ display: 'inline-block', marginRight: '10px',
          marginBottom: '5px',
          padding: '8px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', }}>{language}</li>
        ))}
      </ul>
    </div>
  )}
  {countryData.borders && (
    <div style={{
      display :"flex"
    }}>
      <h2>Borders:</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {countryData.borders.map((border, index) => (
          <span
            key={index}
            style={{
              marginRight: '5px',
              marginBottom: '5px',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            {border}
          </span>
        ))}
      </div>
    </div>
  )}
</div>

      </div>
    </>
  );
}
