import React, { useState, useEffect } from 'react';
import { fetchDistanceOnly } from '../api/distanceOnly';
import '../styles/FuelList.css';

const FuelListDistance = ({ userLocation }) => {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    if (userLocation) {
      fetchDistanceOnly(userLocation)
        .then((data) => {
          const sorted = data
            .filter(station => station.distance !== null)
            .sort((a, b) => a.distance - b.distance);
          setStations(sorted);
        })
        .catch((err) => {
          console.error("Failed to fetch distances:", err);
        });
    }
  }, [userLocation]);

  return (
    <div className="page-container">
      <h1 className="heading">Fuel Stations Sorted by Distance</h1>

      <ul className="station-list">
        {stations.map((station, index) => (
          <li key={index} className="station-card">
            <strong>{station.station_name}</strong> - {station.address} - ${station.price.toFixed(2)}
            <div className="station-meta">
              Distance: {station.distance_text} ({station.duration_text})
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FuelListDistance;
