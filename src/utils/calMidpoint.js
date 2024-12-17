// 중간 지점 계산 함수
export const calMidpoint = (coordinates) => {
    if (coordinates.length === 0) return null;

    let totalLat = 0;
    let totalLng = 0;

    coordinates.forEach((coord) => {
        totalLat += coord.lat;
        totalLng += coord.lng;
    });

    const midpointLat = totalLat / coordinates.length;
    const midpointLng = totalLng / coordinates.length;

    return { lat: midpointLat, lng: midpointLng };
};