import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
	reducerPath: "taskApi",
	tagTypes: ["Tasks"],
	baseQuery: fetchBaseQuery({
		baseUrl: "https://64fd9a32596493f7af7e5ae8.mockapi.io/",
		prepareHeaders: (header) => {
			header.set("Content-Type", "application/json");
			return header;
		},
	}),

	endpoints: (builder) => ({
		addTask: builder.mutation({
			query: ({ meta, ...data }) => ({
				url: "test",
				method: "POST",
				body: data,
			}),

			async onQueryStarted({ meta, ...data }, { dispatch, queryFulfilled }) {
				let newData = { id: Date.now(), ...data };
				let resultData = dispatch(
					api.util.updateQueryData("getPaginatedData", meta, (tasks) => {
						return [...tasks, newData];
					})
				);

				try {
					await queryFulfilled;
				} catch {
					resultData.undo();
				}
			},

			invalidatesTags: ["Tasks"],
		}),

		getTask: builder.query({
			query: () => "test",
			invalidatesTags: ["Tasks"],
		}),

		getTaskById: builder.query({
			query: (id) => `test/${id}`,
		}),

		updateTask: builder.mutation({
			query: ({ id, meta, ...data }) => {
				console.log(id, data);
				return {
					url: `test/${id}`,
					method: "PUT",
					body: data,
				};
			},

			async onQueryStarted(
				{ id, meta, ...data },
				{ dispatch, queryFulfilled }
			) {
				// let newData = { id: Date.now(), ...data };
				let updatedResultData = dispatch(
					api.util.updateQueryData("getPaginatedData", meta, (tasks) => {
						let index = tasks.findIndex((elm) => elm.id === id);
						if (index !== -1) {
							tasks[index] = { id, ...data };
						}
					})
				);
				try {
					await queryFulfilled;
				} catch {
					updatedResultData.undo();
				}
			},
			invalidatesTags: ["Tasks"],
		}),

		removeTask: builder.mutation({
			query: ({ id }) => ({
				url: `test/${id}`,
				method: "DELETE",
			}),

			async onQueryStarted({ id, meta }, { dispatch, queryFulfilled }) {
				const resultData = dispatch(
					api.util.updateQueryData("getPaginatedData", meta, (tasks) => {
						let index = tasks.findIndex((elm) => elm.id === id);
						if (index != -1) {
							tasks.splice(index, 1);
						}
					})
				);

				try {
					await queryFulfilled;
				} catch {
					resultData.undo();
				}
			},

			invalidatesTags: ["Tasks"],
		}),

		getPaginatedData: builder.query({
			query: (page) => `test?page=${page}&limit=5`,
			providesTags: ["Tasks"],
		}),
	}),
});

export const {
	useAddTaskMutation,
	useGetTaskByIdQuery,
	useGetTaskQuery,
	useRemoveTaskMutation,
	useUpdateTaskMutation,
	useGetPaginatedDataQuery,
} = api;

export default api;
