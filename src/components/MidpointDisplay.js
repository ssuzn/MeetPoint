import React from 'react';
import { useSelector } from 'react-redux';

function MidpointDisplay({ midpoint, nearbyPlaces }) {
  const { status } = useSelector((state) => state.midpoint);

  return (
    <React.Fragment>
      <div>
          <h2>중간 지점을 찾았어요</h2>
          { status === "succeeded" && (
            <p>주소: {midpoint[0]?.road_address?.address_name || midpoint[0]?.address?.address_name}</p>
          )}
      </div>
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
    </React.Fragment>
  );
}

export default MidpointDisplay;