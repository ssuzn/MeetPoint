import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

function MidpointMap() {
    const mapContainer = useRef(null);
    const { midpointCoord } = useSelector((state) => state.midpoint);

    useEffect(() => {
        // Kakao Maps API 로드 확인
        if (!window.kakao || !window.kakao.maps) {
          console.error('Kakao Maps API가 로드되지 않았습니다.');
          return;
        }
        
        // midpointCoord 있을 때만 지도 생성
        if (midpointCoord) {
          const { lat, lng } = midpointCoord;
          console.log("mid:", midpointCoord);

          const mapOption = {
            center: new window.kakao.maps.LatLng(lat, lng),
            level: 4,
          };

          // 지도 생성
          const map = new window.kakao.maps.Map(mapContainer.current, mapOption);

          // 중간 지점 마커 추가
          new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(lat, lng),
            map: map,
          });
        }
    }, [midpointCoord]);


  return <div ref={mapContainer} style={{ width: "100%", height: "400px" }} />;
}

export default MidpointMap;