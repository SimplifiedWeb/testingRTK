import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
	name: "task",
	initialState: {
		editDetails: null,
		currentPageNumber: 1,
	},

	reducers: {
		editTask: (state, action) => {
			state.editDetails = action.payload;
		},

		getCurrentPageNumber: (state, action) => {
			console.log(action.payload);
			state.currentPageNumber = action.payload;
		},
	},
});

export const { editTask, getCurrentPageNumber } = taskSlice.actions;
export default taskSlice.reducer;
