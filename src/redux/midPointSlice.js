import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAddress, getCoordinates, getNearbyPlaces, getNearestSubway } from "../services/kakaoApi";
import { calMidpoint } from "../utils/calMidpoint";

// 초기 상태
const initialState = {
  locations: [{ address: "", coord: null }, { address: "", coord: null }],
  selectedCategory: "FD6",
  midpoint: null, // 중간 지점 주소 
  nearbyPlaces: [],
  nearestSubway: "",
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null, // 에러 메시지 저장
};

// 비동기 액션
// 중간 지점과 주변 장소 가져오는 함수
export const getMidpointInfo = createAsyncThunk(
  "midpoint/getMidpointInfo",
  async (_, { getState, rejectWithValue }) => {
    const { locations, selectedCategory } = getState().midpoint;

    try {
      // 모든 위치에 대한 좌표
      const coords = await Promise.all(
        locations.map(async (location) => {
          if (location.address) {
            return await getCoordinates(location.address);
          }
          return null;
        })
      );

      const midpointCoord = calMidpoint(coords);
      const midpointAddress = await getAddress(midpointCoord.lng, midpointCoord.lat);

      const places = await getNearbyPlaces(selectedCategory, midpointCoord.lat, midpointCoord.lng);
      const nearestSubway = await getNearestSubway(midpointCoord.lat, midpointCoord.lng);

      return { midpoint: { coord: midpointCoord, address: midpointAddress }, places, nearestSubway };
      } catch (error) {
        return rejectWithValue("중간 지점 및 주변 장소를 찾는데 실패했습니다.");
      }
    }
);

const midpointSlice = createSlice({
  name: "midpoint",
  initialState,

  // 동기 액션 정의
  reducers: {
    setLocation: (state, action) => {
      const { index, address, coord } = action.payload;
      state.locations[index] = { address, coord: coord || null };
    },
    addLocation: (state) => {
      state.locations.push({ address: "", coord: null });
    },
    removeLocation: (state, action) => {
      if (state.locations.length > 2) {
        state.locations.splice(action.payload, 1); // 기본 2개를 제외한 위치만 삭제
      }
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },

  // 비동기 액션 처리
  extraReducers: (builder) => {
    builder
      .addCase(getMidpointInfo.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      // 성공
      .addCase(getMidpointInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.midpointCoord = action.payload.midpointCoord;
        state.midpoint = action.payload.midpoint;
        state.nearbyPlaces = action.payload.places;
        state.nearestSubway = action.payload.nearestSubway;
      })
      // 실패
      .addCase(getMidpointInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "오류가 발생했습니다. 다시 시도해주세요.";
      });
  },
});

export const { setLocation, addLocation, removeLocation, setSelectedCategory , clearError } = midpointSlice.actions;
export default midpointSlice.reducer;