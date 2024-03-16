import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export default function Card({ link, name, pop, region, capital, id, darkMode }) {
  return (
    <Link to={`/detail/${name}`} style={{ textDecoration: 'none', color: 'inherit' }}> {/* Wrap Card with Link */}
      <div className={`card ${darkMode ? 'dark-mode' : ''}`}>
        <img className="card-img" src={link} alt={name} />
        <h2>{name}</h2>
        <ul>
          <li><span>Population:</span> {pop}</li>
          <li><span>Region:</span> {region}</li>
          <li><span>Capital:</span> {capital}</li>
        </ul>
      </div>
    </Link>
  );
}
