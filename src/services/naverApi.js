import axios from "axios";
import { formatDuration } from "../utils/timeUtils";

const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = process.env.REACT_APP_NAVER_CLIENT_SECRET;

// 자동차 소요시간
export const getDrivingTime = async (origin, destination) => {
    console.log("origin: ", origin);
    console.log("destination:  ", destination);
    try {
        const response = await axios.get(
            `/map-direction/v1/driving`,
            {
                params: {
                start: `${origin.lng},${origin.lat}`,
                goal: `${destination.lng},${destination.lat}`,
                },
                headers: {
                    "X-NCP-APIGW-API-KEY-ID": NAVER_CLIENT_ID,
                    "X-NCP-APIGW-API-KEY": NAVER_CLIENT_SECRET,
                },
            }
        );

        // 실시간 최적 경로 시간 (밀리초 단위)
        const duration = response.data.route?.traoptimal[0]?.summary?.duration;
        // 분 단위로 변환
        return duration ? formatDuration(duration) : null;
    } catch (error) {
        console.error("네이버 자동차 경로 탐색 오류: ", error);
        return null;
    }
};