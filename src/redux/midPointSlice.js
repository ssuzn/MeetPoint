import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAddress, getCoordinates, getNearbyPlaces, getNearestSubway } from "../services/kakaoApi";
import { calMidpoint } from "../utils/calMidpoint";

// 초기 상태
const initialState = {
  locations: ["", ""],
  selectedCategory: "FD6",
  midpoint: null, // 중간 지점 주소 
  midpointCoord: null,  // 중간 지점 좌표
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
      const coord1 = await getCoordinates(locations[0]);
      const coord2 = await getCoordinates(locations[1]);

      const midpointCoord = calMidpoint(coord1, coord2);
      const midpoint = await getAddress(midpointCoord.lng, midpointCoord.lat);
      const places = await getNearbyPlaces(selectedCategory, midpointCoord.lat, midpointCoord.lng);
      const nearestSubway = await getNearestSubway(midpointCoord.lat, midpointCoord.lng);

      return { midpointCoord, midpoint, places, nearestSubway };
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
      const { index, value } = action.payload;
      state.locations[index] = value;
    },
    addLocation: (state) => {
      state.locations.push("");
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
        state.midpointCoord = action.payload.midpointCoord;
        state.midpoint = action.payload.midpoint;
        state.nearbyPlaces = action.payload.places;
        state.nearestSubway = action.payload.nearestSubway;
      })
      // 실패
      .addCase(getMidpointInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setLocation, addLocation, setSelectedCategory , clearError } = midpointSlice.actions;
export default midpointSlice.reducer;