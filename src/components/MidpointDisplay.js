import React from "react";
import { useSelector } from "react-redux";
import MidpointMap from "./MidpointMap";

function MidpointDisplay() {
  const { midpoint, nearbyPlaces, status } = useSelector(
    (state) => state.midpoint
  );

  return (
    <React.Fragment>
      <div>
        <h2>중간 지점을 찾았어요</h2>
        {status === "succeeded" && (
          <>
            <MidpointMap />
            <p>
              주소:{" "}
              {midpoint[0]?.road_address?.address_name ||
                midpoint[0]?.address?.address_name}
            </p>
          </>
        )}
      </div>
      <div>
        <h2>주변 장소 추천</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {nearbyPlaces.map((place, index) => (
            <li
              key={index}
              style={{
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* <img
                src={`https://via.placeholder.com/100?text=${place.category_name}`}
                alt={place.place_name}
                style={{ marginRight: "15px", borderRadius: "8px" }}
              /> */}
              <div>
                <a
                  href={place.place_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    textDecoration: "none",
                    color: "#007BFF",
                  }}
                >
                  {place.place_name}
                </a>
                <p>{place.road_address_name || place.address_name}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
}

export default MidpointDisplay;
