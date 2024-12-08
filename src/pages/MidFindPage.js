import React, { useState } from 'react'
import LocationInput from '../components/LocationInput';
import CategorySelector from '../components/CategorySelector';
import MidpointDisplay from '../components/MidpointDisplay';
import PlaceList from '../components/PlaceList';
import { getCoordinates, getNearbyPlaces } from '../services/kakaoApi';
import { calMidpoint } from '../utils/calMidpoint';

function MidFindPage() {
    const [location1, setLocation1] = useState("");
    const [location2, setLocation2] = useState("");
    const [category, setCategory] = useState("FD6"); // 기본값: 식당
    const [midpoint, setMidpoint] = useState(null);
    const [nearbyPlaces, setNearbyPlaces] = useState([]);
    const [status, setStatus] = useState("idle");
    const [error, setError] = useState(null);

    const handleFindMidpointInfo = async () => {
        setStatus("loading");
        setError(null);

        try {
            const coord1 = await getCoordinates(location1);
            const coord2 = await getCoordinates(location2);

            const midpointLocation = calMidpoint(coord1, coord2);
            setMidpoint(midpointLocation);

            const places = await getNearbyPlaces(category, midpointLocation.lat, midpointLocation.lng);
            setNearbyPlaces(places);

            setStatus("succeeded");
        } catch (error) {
            setError("중간 지점 및 주변 장소를 찾는데 실패했습니다.");
            setStatus("failed");
        }
    };

    return (
    <div>
        <h1>중간 지점 및 주변 장소 추천</h1>
        <LocationInput label="첫번째" value={location1} onChange={(e) => setLocation1(e.target.value)} onSelect={setLocation1} />
        <LocationInput label="두번째" value={location2} onChange={(e) => setLocation2(e.target.value)} onSelect={setLocation2} />

        <CategorySelector category={category} onChange={(e) => setCategory(e.target.value)} />

        <button onClick={handleFindMidpointInfo} disabled={status === "loading"}>
            {status === "loading" ? "로딩중..." : "검색"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {midpoint && <MidpointDisplay midpoint={midpoint} />}
        {nearbyPlaces.length > 0 && <PlaceList nearbyPlaces={nearbyPlaces} />}
    </div>
  )
}

export default MidFindPage;