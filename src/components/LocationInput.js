import React, { useState, useRef } from "react";
import { getAddress, searchPlaceByKeyword } from "../services/kakaoApi";
import styled from "styled-components";

function LocationInput({ label, value, onChange, onSelect }) {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);

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
    setShowSuggestions(false);
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
          console.error("현재 위치를 가져오는 데 실패했습니다:", error);
        }
      );
    } else {
      alert("이 브라우저에서는 현재 위치 기능을 지원하지 않습니다.");
    }
  };

  // 자동완성 박스
  const handleFocus = (inputRef) => {
    setShowSuggestions(true);
    setShowSuggestions([]);
  };

  return (
    <React.Fragment>
      <Container>
        <InputContainer>
          <InputBox>
            <Input
            ref={inputRef1}
              type="text"
              placeholder="첫번째 위치 입력"
              value={value.input1}
              onChange={handleInputChange}
              autoComplete="off"
              onFocus={() => handleFocus(inputRef1)}
            />
            <CurrentButton type="button" onClick={handleGetCurrentLocation}>
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

          <InputBox>
          <Input
              ref={inputRef2}
              type="text"
              placeholder="두 번째 위치 입력"
              value={value.input2}
              onChange={handleInputChange}
              onFocus={() => handleFocus(inputRef2)}
              autoComplete="off"
            />
            <CurrentButton type="button" onClick={handleGetCurrentLocation}>
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
        </InputContainer>
      </Container>

        {/* {isLoading && <p>로딩중...</p>} */}

        {/* 자동완성 박스 */}
        <SuggestionsContainer>
          {showSuggestions && (
            <SuggestionsBox>
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

              <SuggestionsListSection>
                {suggestions.length > 0 && (
                  <SuggestionsList>
                    {suggestions.map((item, index) => (
                      <Suggestions
                        key={index}
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
                          <SuggestionAddress>
                            {item.address_name}
                          </SuggestionAddress>
                        </SuggestionBox>
                      </Suggestions>
                    ))}
                  </SuggestionsList>
                )}
              </SuggestionsListSection>
            </SuggestionsBox>
          )}
        </SuggestionsContainer>
      {/* </Container> */}
    </React.Fragment>
  );
}

export default LocationInput;

const Container = styled.div`
  width: -webkit-fill-available;
`;

const InputContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const InputBox = styled.div`
  width: 100%;
  display: flex;
  border: 1px solid #d9d9dc;
  border-radius: 8px;
  color: transparent;
  padding: 10px;
`;

const CurrentButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Input = styled.input`
  border: 0;
  background: transparent;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 5px;
  outline: none;
  width: -webkit-fill-available;
  font-size: 15px;
  font-weight: 600;

  &::placeholder {
    font-size: 16px;
    font-weight: 400;
  }
`;

const SuggestionsContainer = styled.div`
  position: absolute;
  z-index: 100;
  background: #fff;
  top: 64px;
  width: -webkit-fill-available;
`;

const SuggestionsBox = styled.div`
  border: 1px solid #939396;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  z-index: 100;
`;

const SuggestionTitleBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const LocationSection = styled.div`
  position: relative;
  top: 20px;
  right: 5px;
`;
const SuggestionsTitle = styled.div`
  border-bottom: 1px solid #e9e9ec;
  padding: 0 15px;
  position: relative;
`;

const CloseSection = styled.button`
  position: absolute;
  right: 16px;
  top: 18px;
  cursor: pointer;
  border: none;
  background: transparent;
`;

const P = styled.p`
  font-size: 17px;
  font-weight: 700;
  color: #222225;
`;

const SuggestionsDesc = styled.div`
  border-bottom: 1px solid #e9e9ec;
  padding: 3px 15px;
`;

const Desc = styled.p`
  font-size: 14px;
  opacity: 0.7;
  color: #222225;
`;

const SuggestionsListSection = styled.div`
  margin: 0;
  padding: 0;
`;

const SuggestionsList = styled.ul`
  list-style: none;
  width: 100%;
  padding: 0;
  margin: auto;
`;

const Suggestions = styled.li`
  cursor: pointer;
  padding: 7px 20px;
  border-bottom: 1px solid #e9e9ec;
`;

const SuggestionBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const SuggestionTitle = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #222225;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 6px;
`;

const SuggestionAddress = styled.p`
  font-size: 15px;
  color: #77777a;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 3px;
`;
