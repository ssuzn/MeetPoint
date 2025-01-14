import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import midPointReducer from "./midPointSlice";
import loadingReducer from "./loadingSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        midpoint: midPointReducer,
        loading: loadingReducer,
    },
});

export default store;