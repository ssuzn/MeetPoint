import React from 'react'

function MidpointDisplay({ midpoint }) {
  return (
    <div>
        <h2>중간 지점:</h2>
        <p>위도: {midpoint.lat.toFixed(6)}</p>
        <p>경도: {midpoint.lng.toFixed(6)}</p>
    </div>
  );
}

export default MidpointDisplay;