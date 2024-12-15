import React, { useState, useRef } from "react";
import styled from "styled-components";
import { getAddress, searchPlaceByKeyword } from "../services/kakaoApi";
import { setLoading, clearLoading } from "../redux/loadingSlice";
import { useDispatch } from "react-redux";

function LocationInput({ locations, onLocationChange }) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeInputIndex, setActiveInputIndex] = useState(null);
  const inputRefs = useRef([]);

  const dispatch = useDispatch();

  // 자동완성 박스 위치
  const [inputBoxStyle, setInputBoxStyle] = useState({});

  // input 포커스 핸들러
  const handleFocus = (index) => {
    setActiveInputIndex(index);
    setShowSuggestions(true);
    setSuggestions([]);

    // 현재 row의 두 input 길이 계산
    const rowIndex = Math.floor(index / 2);
    const inputRef1 = inputRefs.current[rowIndex * 2];
    const inputRef2 = inputRefs.current[rowIndex * 2 + 1];

    if (inputRef1 && inputRef2) {
      // 각 input의 위치와 크기 반환
      const rect1 = inputRef1.getBoundingClientRect();
      const rect2 = inputRef2.getBoundingClientRect();

      setInputBoxStyle({
        left: `${rect1.left + window.scrollX}px`,
        width: `${rect2.right - rect1.left}px`,
      });
    } else if (inputRef1) {
      const rect1 = inputRef1.getBoundingClientRect();
      setInputBoxStyle({
        left: `${rect1.left + window.scrollX}px`,
        width: `${rect1.width}px`,
      });
    }
  };

  // input 변경 핸들러
  const handleInputChange = async (e, index) => {
    const query = e.target.value;
    onLocationChange(index, query);

    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }

    try {
      const results = await searchPlaceByKeyword(query);
      setSuggestions(results);
    } catch (error) {
      console.error("키워드 검색 중 오류: ", error);
    }
  };

  // 위치 선택 핸들러
  const handleSelect = (selectedAddress) => {
    if (activeInputIndex !== null) {
      onLocationChange(activeInputIndex, selectedAddress);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // 현재 위치 가져오기
  const handleGetCurrentLocation = (index) => {
    dispatch(setLoading("현재 위치를 가져오는중"));

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

                onLocationChange(index, address);
                

            } else {
              alert("현재 위치를 찾을 수 없습니다.");
            }
          } catch (error) {
            console.error("현재 위치 변환 중 오류: ", error);
          } finally {
            dispatch(clearLoading());
          }
        },
        (error) => {
          console.error("현재 위치를 가져오는 데 실패했습니다:", error);
          dispatch(clearLoading());
        }
      );
    } else {
      alert("이 브라우저에서는 현재 위치 기능을 지원하지 않습니다.");
      dispatch(clearLoading());
    }
  };

  return (
    <React.Fragment>
      <Container>
        {locations.map((location, index) => (
          <InputRow key={Math.floor(index / 2)}>
            {index % 2 === 0 && (
              <>
                <InputBox>
                  <Input
                    ref={(e) => (inputRefs.current[index] = e)}
                    type="text"
                    placeholder="위치를 입력해주세요"
                    value={location}
                    onChange={(e) => handleInputChange(e, index)}
                    onFocus={() => handleFocus(index)}
                    autoComplete="off"
                  />

                  <CurrentButton
                    type="button"
                    onClick={() => handleGetCurrentLocation(index)}
                  >
                    <svg
                      fill="#000000"
                      width="17px"
                      height="17px"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="#222222"
                      strokeWidth="1"
                    >
                      <path d="M21.9870679,13 C21.7356474,17.8487018 17.8487018,21.7356474 13,21.9870679 L13,23.5 C13,23.7761424 12.7761424,24 12.5,24 C12.2238576,24 12,23.7761424 12,23.5 L12,21.9870679 C7.15129822,21.7356474 3.26435264,17.8487018 3.01293206,13 L1.5,13 C1.22385763,13 1,12.7761424 1,12.5 C1,12.2238576 1.22385763,12 1.5,12 L3.01293206,12 C3.26435264,7.15129822 7.15129822,3.26435264 12,3.01293206 L12,1.5 C12,1.22385763 12.2238576,1 12.5,1 C12.7761424,1 13,1.22385763 13,1.5 L13,3.01293206 C17.8487018,3.26435264 21.7356474,7.15129822 21.9870679,12 L23.5,12 C23.7761424,12 24,12.2238576 24,12.5 C24,12.7761424 23.7761424,13 23.5,13 L21.9870679,13 L21.9870679,13 Z M12.5,21 C17.1944204,21 21,17.1944204 21,12.5 C21,7.80557963 17.1944204,4 12.5,4 C7.80557963,4 4,7.80557963 4,12.5 C4,17.1944204 7.80557963,21 12.5,21 Z M12.5,17 C10.0147186,17 8,14.9852814 8,12.5 C8,10.0147186 10.0147186,8 12.5,8 C14.9852814,8 17,10.0147186 17,12.5 C17,14.9852814 14.9852814,17 12.5,17 Z M12.5,16 C14.4329966,16 16,14.4329966 16,12.5 C16,10.5670034 14.4329966,9 12.5,9 C10.5670034,9 9,10.5670034 9,12.5 C9,14.4329966 10.5670034,16 12.5,16 Z" />
                    </svg>
                  </CurrentButton>
                </InputBox>
                {locations[index + 1] !== undefined && (
                  <InputBox>
                    <Input
                      ref={(e) => (inputRefs.current[index + 1] = e)}
                      type="text"
                      placeholder="위치를 입력해주세요."
                      value={locations[index + 1]}
                      onChange={(e) => handleInputChange(e, index + 1)}
                      onFocus={() => handleFocus(index + 1)}
                      autoComplete="off"
                    />
                    <CurrentButton
                      type="button"
                      onClick={() => handleGetCurrentLocation(index)}
                    >
                      <svg
                        fill="#000000"
                        width="17px"
                        height="17px"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="#222222"
                        strokeWidth="1"
                      >
                        <path d="M21.9870679,13 C21.7356474,17.8487018 17.8487018,21.7356474 13,21.9870679 L13,23.5 C13,23.7761424 12.7761424,24 12.5,24 C12.2238576,24 12,23.7761424 12,23.5 L12,21.9870679 C7.15129822,21.7356474 3.26435264,17.8487018 3.01293206,13 L1.5,13 C1.22385763,13 1,12.7761424 1,12.5 C1,12.2238576 1.22385763,12 1.5,12 L3.01293206,12 C3.26435264,7.15129822 7.15129822,3.26435264 12,3.01293206 L12,1.5 C12,1.22385763 12.2238576,1 12.5,1 C12.7761424,1 13,1.22385763 13,1.5 L13,3.01293206 C17.8487018,3.26435264 21.7356474,7.15129822 21.9870679,12 L23.5,12 C23.7761424,12 24,12.2238576 24,12.5 C24,12.7761424 23.7761424,13 23.5,13 L21.9870679,13 L21.9870679,13 Z M12.5,21 C17.1944204,21 21,17.1944204 21,12.5 C21,7.80557963 17.1944204,4 12.5,4 C7.80557963,4 4,7.80557963 4,12.5 C4,17.1944204 7.80557963,21 12.5,21 Z M12.5,17 C10.0147186,17 8,14.9852814 8,12.5 C8,10.0147186 10.0147186,8 12.5,8 C14.9852814,8 17,10.0147186 17,12.5 C17,14.9852814 14.9852814,17 12.5,17 Z M12.5,16 C14.4329966,16 16,14.4329966 16,12.5 C16,10.5670034 14.4329966,9 12.5,9 C10.5670034,9 9,10.5670034 9,12.5 C9,14.4329966 10.5670034,16 12.5,16 Z" />
                      </svg>
                    </CurrentButton>
                  </InputBox>
                )}
              </>
            )}
          </InputRow>
        ))}
      </Container>

      {showSuggestions && (
        <SuggestionsContainer style={inputBoxStyle}>
          <SuggestionsTitle>
            <P>위치 검색</P>
            <CloseSection onClick={() => setShowSuggestions(false)}>
              <svg
                width="15px"
                height="15px"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 1.5L13.5 13.5M1.5 13.5L13.5 1.5"
                  stroke="#000000"
                />
              </svg>
            </CloseSection>
          </SuggestionsTitle>

          <SuggestionsDesc>
            <Desc>주소를 입력해주세요.</Desc>
          </SuggestionsDesc>

          {suggestions.length > 0 && (
            <SuggestionsList>
              {suggestions.map((item, idx) => (
                <SuggestionItem
                  key={idx}
                  onClick={() => handleSelect(item.address_name)}
                >
                  <SuggestionBox>
                    <SuggestionTitleBox>
                      <LocationSection>
                        <svg
                          width="18px"
                          height="18px"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 2c-4.4 0-8 3.6-8 8 0 5.4 7 11.5 7.3 11.8.2.1.5.2.7.2.2 0 .5-.1.7-.2.3-.3 7.3-6.4 7.3-11.8 0-4.4-3.6-8-8-8zm0 17.7c-2.1-2-6-6.3-6-9.7 0-3.3 2.7-6 6-6s6 2.7 6 6-3.9 7.7-6 9.7zM12 6c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
                            fill="#0D0D0D"
                          />
                        </svg>
                      </LocationSection>
                      <SuggestionTitle>{item.place_name}</SuggestionTitle>
                    </SuggestionTitleBox>
                    <SuggestionAddress>{item.address_name}</SuggestionAddress>
                  </SuggestionBox>
                </SuggestionItem>
              ))}
            </SuggestionsList>
          )}
        </SuggestionsContainer>
      )}
    </React.Fragment>
  );
}

export default LocationInput;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

export const InputBox = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  border: 1px solid #d9d9dc;
  border-radius: 8px;
  color: transparent;
  padding: 10px;
`;

export const Input = styled.input`
  border: 0;
  background: transparent;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 5px;
  outline: none;
  width: 100%;
  font-size: 15px;
  font-weight: 600;

  &::placeholder {
    font-size: 16px;
    font-weight: 400;
  }
`;

export const CurrentButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

export const SuggestionsContainer = styled.div`
  position: absolute;
  z-index: 1000;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: 500px;
  overflow-y: auto;
`;

export const SuggestionTitle = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #222225;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 6px;
`;

export const CloseSection = styled.button`
  position: absolute;
  right: 16px;
  top: 3px;
  cursor: pointer;
  border: none;
  background: transparent;
`;

export const P = styled.p`
  font-size: 17px;
  font-weight: 700;
  color: #222225;
`;

export const SuggestionsDesc = styled.div`
  border-bottom: 1px solid #e9e9ec;
  padding: 3px 15px;
`;

export const Desc = styled.p`
  font-size: 14px;
  opacity: 0.7;
  color: #222225;
`;

export const SuggestionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const SuggestionItem = styled.li`
  padding: 0 18px;
  cursor: pointer;
  border-bottom: 1px solid #e9e9ec;

  &:hover {
    background: #f0f0f0;
  }
`;

export const SuggestionBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SuggestionTitleBox = styled.div`
  display: flex;
  flex-direction: row;
`;

export const LocationSection = styled.div`
  position: relative;
  top: 20px;
  right: 5px;
`;

export const SuggestionsTitle = styled.div`
  border-bottom: 1px solid #e9e9ec;
  padding: 0 15px;
  position: relative;
`;

export const SuggestionAddress = styled.p`
  font-size: 15px;
  color: #77777a;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 3px;
`;
