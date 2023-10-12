import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet'; // Import Leaflet library
import 'leaflet/dist/leaflet.css';

const Map = () => {
  const initialMapCenter = [51.505, -0.09];
  const [mapCenter, setMapCenter] = useState(initialMapCenter);
  const [markers, setMarkers] = useState([]);
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    // Simulate fetching markers from an API
    fetchMarkersFromAPI().then((data) => {
      setMarkers(data);
    });
  }, []);

  // Simulated API call to fetch markers
  const fetchMarkersFromAPI = async () => {
    return new Promise((resolve) => {
      // Simulated data for demonstration purposes
      const markersData = [
        { id: 1, lat: 51.505, lng: -0.09, type: 'restaurant', name: 'Restaurant A' },
        { id: 2, lat: 51.51, lng: -0.1, type: 'park', name: 'Park B' },
        { id: 3, lat: 51.515, lng: -0.095, type: 'store', name: 'Store C' },
        // Add more marker data as needed
      ];
      resolve(markersData);
    });
  };

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  const filteredMarkers = filterType === 'all' ? markers : markers.filter((marker) => marker.type === filterType);

  return (
    <MapContainer center={mapCenter} zoom={13} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <ZoomControl position="bottomright" />

      {/* Geolocation button */}
      <button
        className="geolocation-button"
        onClick={() => {
          navigator.geolocation.getCurrentPosition((position) => {
            setMapCenter([position.coords.latitude, position.coords.longitude]);
          });
        }}
      >
        Get My Location
      </button>

      {/* Filter markers by type */}
      <div className="filter-container">
        <label htmlFor="filterType">Filter by Type:</label>
        <select id="filterType" onChange={handleFilterChange} value={filterType}>
          <option value="all">All</option>
          <option value="restaurant">Restaurant</option>
          <option value="park">Park</option>
          <option value="store">Store</option>
          {/* Add more filter options as needed */}
        </select>
      </div>

      {/* Display filtered markers */}
      {filteredMarkers.map((marker) => (
        <Marker
          key={marker.id}
          position={[marker.lat, marker.lng]}
          icon={L.icon({
            iconUrl: getMarkerIconUrl(marker.type),
            iconSize: [32, 32],
          })}
        >
          <Popup>{marker.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

// Helper function to get marker icon URL based on type
const getMarkerIconUrl = (type) => {
  switch (type) {
    case 'restaurant':
      return '/images/park-icon.png'; 
    case 'park':
      return 'images/park-icon.png'; 
    case 'store':
      return 'images/store-icon.png'; 
    default:
      return '/default-icon.png'; 
  }
};

export default Map;
