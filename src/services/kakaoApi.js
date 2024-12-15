import axios from "axios";

const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;

// 주소를 좌표로 변환
export const getCoordinates = async (address) => {
    try{
        const response = await axios.get(
            `https://dapi.kakao.com/v2/local/search/address.json`,
            {
                params: { query: address },
                headers: {
                    Authorization: `KakaoAK ${KAKAO_API_KEY}`,
                },
            }  
        );
    
        const { documents } = response.data;
        if (documents.length === 0) {
            throw new Error("해당 주소를 찾을 수 없습니다.");
        }
    
        // 좌표 반환
        // x: 경도 (lng), y: 위도 (lat)
        const { x, y } = documents[0];
        return { lat: parseFloat(y), lng: parseFloat(x) };
    } catch (error) {
        console.error("Kakao API 호출 오류: ", error);
    }
};

/**
 * 키워드로 장소 검색 (자동완성)
 * @param {string} keyword - 검색할 키워드 (역 이름, 건물 이름 등)
 */
export const searchPlaceByKeyword = async (keyword) => {
    try {
        const response = await axios.get(
            `https://dapi.kakao.com/v2/local/search/keyword.json`,
            {
                params: { query: keyword },
                headers: {
                    Authorization: `KakaoAK ${KAKAO_API_KEY}`,
                },
            }
        );

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