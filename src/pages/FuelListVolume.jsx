import React, { useState, useEffect } from 'react';
import { fetchVolumeBased } from '../api/volumeBased';
import {calculateDollarSavings} from '../utils/savings';
import '../styles/FuelList.css';

const FuelListVolume = ({ userLocation }) => {
  const [stations, setStations] = useState([]);
  const [fuelAmount, setFuelAmount] = useState("");
  const [efficiency, setEfficiency] = useState("");
  const [submittedAmount, setSubmittedAmount] = useState(null);
  const [submittedEfficiency, setSubmittedEfficiency] = useState(null);


  useEffect(() => {
    if (userLocation && submittedAmount !== null && submittedEfficiency !== null) {
      fetchVolumeBased(userLocation, submittedAmount, submittedEfficiency)
        .then((data) => {
          const filtered = data.filter(station => station.fuel_volume !== null);
          const sorted = [...filtered].sort((a, b) => b.fuel_volume - a.fuel_volume);
          const nearest = filtered.reduce((a, b) => a.distance < b.distance ? a: b);

          const refPrice = nearest.price;

          const updated = sorted.map((station) => {
            const savings = calculateDollarSavings(refPrice, station.price, station.fuel_volume);
            const isReference = station.address === nearest.address;
            return { ...station, savings, isReference };
          });

          setStations(updated);
        })
        .catch((err) => {
          console.error("Failed to fetch volume-based data:", err);
        });
    }
  }, [userLocation, submittedAmount, submittedEfficiency]);


  const handleSubmit = () => {
    setSubmittedAmount(parseFloat(fuelAmount));
    setSubmittedEfficiency(parseFloat(efficiency));
  };

  const handleGetDirections = (lat, lng) => {
    const origin = `${userLocation.lat},${userLocation.lng}`;
    const destination = `${lat},${lng}`;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
    window.open(url, '_blank');
  };

  return (
    <div className="page-container">
      <h1 className="heading">Fuel Stations by Max Volume (Budget-based)</h1>

      {userLocation && (
        <div className="input-group">
          <label>
            $ Amount:
            <input
              type="number"
              value={fuelAmount}
              onChange={(e) => setFuelAmount(e.target.value)}
              placeholder="e.g. 40"
            />
          </label>

          <label>
            Efficiency (L/100km):
            <input
              type="number"
              value={efficiency}
              onChange={(e) => setEfficiency(e.target.value)}
              placeholder="e.g. 8.5"
            />
          </label>

          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}

      <ul className="station-list">
        {stations.map((station, index) => (
          <li key={index} className="station-card">
            <strong>{station.station_name}</strong>
            <div className="station-meta">{station.address} - ${station.price.toFixed(2)}</div>
            <div className="station-meta">
              Distance: {station.distance_text} ({station.duration_text})
            </div>
            <div className="station-volume">
              Max Volume: {station.fuel_volume.toFixed(2)} L
            </div>

            {station.isReference && (
              <div className="station-meta comparison-text">
                nearest station used for comparison
              </div>
            )}


            {station.savings && !station.isReference && (
              <div className="station-meta savings-text">
                Save ${station.savings} compared to nearest station
              </div>
            )}
            <button
              className="directions-button"
              onClick={() => handleGetDirections(station.lat, station.lng)}
            >
              Get Directions
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FuelListVolume;
