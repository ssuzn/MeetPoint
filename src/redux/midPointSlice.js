import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCoordinates, getNearbyPlaces } from "../services/kakaoApi";
import { calMidpoint } from "../utils/calMidpoint";

// 비동기 액션
// 중간 지점과 주변 장소 가져오는 함수
export const getMidpointInfo = createAsyncThunk(
  "midpoint, getMidpointInfo",
  async ({ location1, location2, category }) => {
    const coord1 = await getCoordinates(location1);
    const coord2 = await getCoordinates(location2);
    const midpoint = calMidpoint(coord1, coord2);
    const nearbyPlaces = await getNearbyPlaces(category, midpoint.lat, midpoint.lng);
    return { midpoint, nearbyPlaces };
  }
);

const midpointSlice = createSlice({
    name: "midpoint",
    initialState: {
        location1: "",
        location2: "",
        category: "",
        midpoint: null,
        nearbyPlaces: [],
        status: "idle",
        error: null,
    },
  // 동기 액션 정의
  reducers: {
    setLocation1: (state, action) => {
      state.location1 = action.payload;
    },
    setLocation2: (state, action) => {
      state.location2 = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    clear: (state) => {
      state.location1 = "";
      state.location2 = "";
      state.category = "";
      state.midpoint = null;
      state.nearbyPlaces = [];
      state.status = "idle";
      state.error = null;
    },
  },

  // 비동기 액션 처리
  extraReducers: (builder) => {
    builder
      .addCase(getMidpointInfo.pending, (state) => {
        state.status = "loading";
      })
      // 성공
      .addCase(getMidpointInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.midpoint = action.payload.midpoint;
        state.nearbyPlaces = action.payload.nearbyPlaces;
      })
      // 실패
      .addCase(getMidpointInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setLocation1, setLocation2, setCategory } = midpointSlice.actions;
export default midpointSlice.reducer;