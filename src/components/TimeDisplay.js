import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getDrivingTime } from "../services/naverApi";
import { useSelector } from "react-redux";
import { FaCar } from "react-icons/fa";
function TimeDisplay() {
  const [travelTime, setTravelTime] = useState([]);
  const { locations, midpoint } = useSelector((state) => state.midpoint);

  useEffect(() => {
    const getTravelTime = async () => {
      if (!midpoint.coord) return;

      const times = await Promise.all(
        locations.map(async (location, index) => {
          if (!location.coord)
            return { index: index + 1, drivingTime: "위치를 찾을 수 없습니다" };
          const drivingTime = await getDrivingTime(
            location.coord,
            midpoint.coord
          );

          return {
            index: index + 1,
            drivingTime,
          };
        })
      );

      setTravelTime(times);
    };

    getTravelTime();
  }, [locations, midpoint]);

  return (
    <Container>
      <TimeList>
        {travelTime.length > 0 ? (
          travelTime.map((time) => (
            <TimeItem key={time.index}>
              <IconWrapper>
                <FaCar />
              </IconWrapper>
              <TimeDetails>
                <LocationLabel>{`위치 ${time.index}`}</LocationLabel>
                <DrivingTime>{time.drivingTime || "N/A"}</DrivingTime>
              </TimeDetails>
            </TimeItem>
          ))
        ) : (
          <NoData>소요시간 데이터를 불러오는 중...</NoData>
        )}
      </TimeList>
    </Container>
  );
}

export default TimeDisplay;

export const Container = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #e3e3e3;
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

export const TimeList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const TimeItem = styled.li`
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #e3e3e3;

  &:last-child {
    border-bottom: none;
  }
`;

export const IconWrapper = styled.div`
  background-color: #007bff;
  color: #fff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  margin-right: 15px;
`;

export const TimeDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LocationLabel = styled.span`
  font-size: 16px;
  color: #555;
`;

export const DrivingTime = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #222;
  margin-top: 5px;
`;

export const NoData = styled.p`
  text-align: center;
  font-size: 16px;
  color: #777;
`;
