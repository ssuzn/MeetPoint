import { configureStore } from "@reduxjs/toolkit";
import midPointReducer from "./midPointSlice";

const store = configureStore({
    reducer: {
        midpoint: midPointReducer,
    },
});

export default store;