import { combineReducers } from "@reduxjs/toolkit";
import api from "../rtk/api";
import taskSlice from "./taskSlice";

const rootReducers = combineReducers({
	task: taskSlice,
	[api.reducerPath]: api.reducer,
});

export default rootReducers;
