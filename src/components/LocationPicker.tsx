import React, { useState } from 'react';
import axios from 'axios';

function LocationPicker({ onLocationSelect }) {
  const [placeId, setPlaceId] = useState('');

  const getPlaceIdFromCoordinates = async (lat, lng) => {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyC8DqhIL75NxsCeZWlmeZ_XBfyDdvfToOE`);
      const foundPlaceId = response.data.results[0]?.place_id;
      setPlaceId(foundPlaceId); // تحديث حالة placeId بالقيمة المُسترجعة
      onLocationSelect({ lat, lng, placeId: foundPlaceId });
    } catch (error) {
      console.error('Error fetching place ID:', error);
    }
  };

  const handleLocationRequest = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          getPlaceIdFromCoordinates(latitude, longitude);
        },
        (error) => {
          console.error('Error getting the geolocation: ', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div>
      <button onClick={handleLocationRequest}>Get Current Location</button>
      <div>
        {/* حقل الإدخال لعرض placeId */}
        <input type="text" value={placeId} readOnly />
      </div>
    </div>
  );
}

export default LocationPicker;
