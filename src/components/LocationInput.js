import React, { useState } from 'react';
import { getAddress, searchPlaceByKeyword } from '../services/kakaoApi';

function LocationInput({ label, value, onChange, onSelect }) {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = async (e) => {
    const query = e.target.value;
    onChange(e);

    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);

    try {
      const results = await searchPlaceByKeyword(query);
      setSuggestions(results);
    } catch (error) {
      console.error("자동완성 API 호출 오류: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 선택된 옵션 적용
  const handleSelect = (selectedAddress) => {
    onSelect(selectedAddress);
    setSuggestions([]);
  };

  // 현재 위치 가져오기
  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const results = await getAddress(longitude, latitude);

            if (results.length > 0) {
              const document = results[0];

              // 도로명 주소 있으면 사용, 없으면 지번 주소 사용
              const address = document.road_address
              ? document.road_address.address_name
              : document.address.address_name;
              
              onSelect(address);
            } else {
              alert("현재 위치를 찾을 수 없습니다.");
            }
          } catch (error) {
            console.error("현재 위치 변환 중 오류: ", error);
          }
        },
        (error) => {
          console.error('현재 위치를 가져오는 데 실패했습니다:', error);
        }
      );
    } else {
      alert('이 브라우저에서는 현재 위치 기능을 지원하지 않습니다.');
    }
}

  return (
    <React.Fragment>
      <div>
          <input 
              type="text"
              placeholder={`${label} 위치를 입력해주세요.`}
              value={value}
              onChange={handleInputChange}
          />
          <button type='button' onClick={handleGetCurrentLocation}>
            현재 위치로 검색
          </button>
      </div>
  
      {isLoading && <p>로딩중...</p>}

      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((item, index) => (
            <li
            key={index}
            onClick={() => handleSelect(item.address_name)}
            >
              {item.place_name} ({item.address_name})
            </li>
          ))}
        </ul>
      )}
    </React.Fragment>
  );
}

export default LocationInput;