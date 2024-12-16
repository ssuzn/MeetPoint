import React from "react";
import { useSelector } from "react-redux";
import MidpointMap from "./MidpointMap";
import styled from "styled-components";
import { FaSubway, FaMapMarkerAlt } from "react-icons/fa";

function MidpointDisplay() {
  const { midpoint, nearbyPlaces, nearestSubway, status } = useSelector(
    (state) => state.midpoint
  );

  return (
    <React.Fragment>
      <Container>
        <InfoBox>
          <SectionTitle>👀 중간 지점을 찾았어요</SectionTitle>
          {status === "succeeded" && (
            <>
              <MidpointMap />
              <IconText>
                <FaMapMarkerAlt />
                <span>
                  주소:{" "}
                  {midpoint[0]?.road_address?.address_name ||
                    midpoint[0]?.address?.address_name}
                </span>
              </IconText>
              <IconText>
                <FaSubway />
                <span>가까운 지하철역: {nearestSubway}</span>
              </IconText>
            </>
          )}
        </InfoBox>

        <InfoBox>
          <SectionTitle>👾 카테고리 별 장소를 추천해드릴게요</SectionTitle>
          <PlaceList>
            {nearbyPlaces.map((place, index) => (
              <PlaceItem key={index}>
                <div>
                  <PlaceLink
                    href={place.place_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {place.place_name}
                  </PlaceLink>
                  <PlaceAddress>
                    {place.road_address_name || place.address_name}
                  </PlaceAddress>
                </div>
              </PlaceItem>
            ))}
          </PlaceList>
        </InfoBox>
      </Container>
    </React.Fragment>
  );
}

export default MidpointDisplay;

const Container = styled.div`
  margin: 40px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const InfoBox = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const PlaceList = styled.ul`
  list-style: none;
  padding: 0;
`;

const PlaceItem = styled.li`
  display: flex;
  align-items: center;
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const PlaceLink = styled.a`
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
  color: #007bff;
  margin-bottom: 5px;

  &:hover {
    color: #0056b3;
  }
`;

const PlaceAddress = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const IconText = styled.span`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #444;
  padding: 10px 15px;
  border-radius: 8px;
  margin: 10px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: background 0.3s, box-shadow 0.3s;

  &:hover {
    background: #e6efff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  svg {
    width: 20px;
    height: 20px;
    margin-right: 12px;
    color: #007bff;
    flex-shrink: 0;
  }

  span {
    font-weight: 500;
    color: #333;
  }
`;
