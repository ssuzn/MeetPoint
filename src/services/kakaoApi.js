import axios from "axios";

const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;

// 주소를 좌표로 변환
export const getCoordinates = async (address) => {
    try {
        const response = await axios.get(
          `https://dapi.kakao.com/v2/local/search/address.json`,
          {
            params: { query: address }, // query 파라미터에 주소를 전달
            headers: {
              Authorization: `KakaoAK ${KAKAO_API_KEY}`, // 카카오 API 키 추가
            },
          }
        );
    
        const { documents } = response.data;
    
        if (!documents || documents.length === 0) {
          throw new Error("해당 주소를 찾을 수 없습니다.");
        }
    
        console.log("Kakao API Response:", documents[0]);
    
        // 좌표 반환 (x: 경도, y: 위도)
        const { x, y } = documents[0];
        console.log("x, y:", x, y);
        return { lat: parseFloat(y), lng: parseFloat(x) };
      } catch (error) {
        console.error("Kakao API 호출 오류: ", error);
        throw error; // 오류를 상위 함수로 전달
      }
    };

/**
 * 키워드로 장소 검색 (자동완성)
 * @param {string} keyword - 검색할 키워드 (역 이름, 건물 이름 등)
 */
export const searchPlaceByKeyword = async (keyword) => {
    try {
        console.log("검색어:", keyword); // 검색어 로그
        const response = await axios.get(
            `https://dapi.kakao.com/v2/local/search/keyword.json`,
            {
                params: { query: keyword },
                headers: {
                    Authorization: `KakaoAK ${KAKAO_API_KEY}`,
                },
            }
        );

        console.log("API 응답:", response.data); // 응답 로그
        return response.data.documents;
    } catch (error) {
        console.error("Kakao 검색 API 호출 오류: ", error);
        throw error;
    }
};

/**
 * 좌표를 주소로 변환 (현재 위치용)
 */
export const getAddress = async (lng, lat) => {
    console.log('Latitude:', lat);
    console.log('Longitude:', lng);
    try {
        const response = await axios.get(
            `https://dapi.kakao.com/v2/local/geo/coord2address.json`,
            {
                params: { x: lng, y: lat },
                headers: {
                    Authorization: `KakaoAK ${KAKAO_API_KEY}`,
                },
            }
        );
        console.log(response.data);
        return response.data.documents;
    } catch (error) {
        console.error("Kakao API 호출 오류: ", error);
    }
};

/**
 * 중간 지점 주변의 식당, 카페, 문화시설, 관광명소 검색
 * @param {string} categoryCode - 카테고리 코드 (FD6: 음식점, CE7: 카페, CT1: 문화시설, AT4: 관광명소)
 * @param {number} lat - 중간 지점의 위도
 * @param {number} lng - 중간 지점의 경도
 */
export const getNearbyPlaces = async (categoryCode, lat, lng) => {
    try {
        const response = await axios.get(
            `https://dapi.kakao.com/v2/local/search/category.json`,
            {
                params: {
                    category_group_code: categoryCode,
                    x: lng,
                    y: lat,
                    radius: 2000, // 2km 반경 제한
                    sort: "distance", // 거리순 정렬
                },
                headers: {
                    Authorization: `KakaoAK ${KAKAO_API_KEY}`,
                },
            }
        );

        // 검색된 장소 목록 반환
        return response.data.documents;
    } catch (error) {
        console.error("Kakao API 호출 오류: ", error);
        throw error;
    }
};

// 가까운 지하철역 이름 가져오기
export const getNearestSubway = async (lat, lng) => {
    try {
        const response = await axios.get(
            "https://dapi.kakao.com/v2/local/search/keyword.json", {
                params: {
                    query: "지하철역",
                    x: lng,
                    y: lat,
                    radius: 1000, // 1km 반경
                    sort: "distance",
                },
                headers: {
                    Authorization: `KakaoAK ${KAKAO_API_KEY}`,
                },
            });

            const stations = response.data.documents;

            if (stations.length > 0) {
                return stations[0].place_name;
            } else {
                return "1km 반경에 지하철역을 찾을 수 없습니다.";
            } 
    } catch (error) {
        console.error("지하찰역 검색 API 호출 오류: ", error);
        return "오류가 발생했습니다.";
    }
};

export const getTransitTime = async (origin, destination) => {
    try {
      const response = await axios.get(
        `https://apis-navi.kakaomobility.com/v1/directions/transit`,
        {
          params: {
            origin: `${origin.lng},${origin.lat}`,
            destination: `${destination.lng},${destination.lat}`,
          },
          headers: {
            Authorization: `KakaoAK ${KAKAO_API_KEY}`,
          },
        }
      );

      console.log(response.data);
  
      // 소요시간 (초 단위)
      const duration = response.data.routes[0]?.summary?.duration;
      return duration ? Math.ceil(duration / 60) : null;
    } catch (error) {
      console.error("카카오 대중교통 경로 탐색 오류: ", error);
      return null;
    }
  };