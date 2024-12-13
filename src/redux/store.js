import { configureStore } from "@reduxjs/toolkit";
import midPointReducer from "./midPointSlice";
import loadingReducer from "./loadingSlice";

const store = configureStore({
    reducer: {
        midpoint: midPointReducer,
        loading: loadingReducer,
    },
});

export default store;