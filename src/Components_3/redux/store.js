import { configureStore } from "@reduxjs/toolkit";
import api from "../rtk/api";
import rootReducers from "./rootReducer";

const store = configureStore({
	reducer: rootReducers,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
	// preloadedState: {},
});

export default store;
