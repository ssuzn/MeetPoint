import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name: "loading",
    initialState: {
        isLoading: false,
        message: "",
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = true;
            state.message = action.payload || "정보를 가져오는 중입니다";
        },
        clearLoading: (state, action) => {
            state.isLoading = false;
            state.message = "";
        },
    },
});

export const { setLoading, clearLoading } = loadingSlice.actions;
export default loadingSlice.reducer;