// 중간 지점 계산 함수
export const calMidpoint = (coord1, coord2) => {
    return {
        lat: (coord1.lat + coord2.lat) / 2,
        lng: (coord1.lng + coord2.lng) / 2,
    };
};