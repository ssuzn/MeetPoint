import React from 'react'

function PlaceList({ nearbyPlaces }) {
  return (
    <div>
        <h2>주변 장소 추천</h2>
        <ul>
            {nearbyPlaces.map((place, index) => (
                <li key={index}>
                    <strong>{place.place_name}</strong> - {place.road_address_name || place.address_name}
                </li>
            ))}
        </ul>
    </div>
  );
}

export default PlaceList;