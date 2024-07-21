import React, { useCallback } from "react";
import {
	useGetPaginatedDataQuery,
	useGetTaskQuery,
	useRemoveTaskMutation,
} from "../rtk/api";
import { useDispatch } from "react-redux";
import { editTask, getCurrentPageNumber } from "../redux/taskSlice";
import { useState } from "react";
import { useEffect } from "react";
// import { useMemo } from "react";

const ITEMS_PER_PAGE = 5;

const DisplayTasks = () => {
	let { data: allData } = useGetTaskQuery();
	const TOTAL_ITEMS = allData?.length;
	console.log(allData?.length);

	let [pageNumber, setPageNumber] = useState(1);
	let { data, isLoading, isError, isFetching } =
		useGetPaginatedDataQuery(pageNumber);

	let [removeTask] = useRemoveTaskMutation();

	let dispatch = useDispatch();

	let totalPages = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE);

	const generateButton = useCallback(() => {
		let paginatedButtons = [];
		for (let i = 1; i <= totalPages; i++) {
			paginatedButtons.push(
				<button
					key={i}
					className="paginatedBtn"
					style={{ cursor: "pointer" }}
					onClick={() => setPageNumber(i)}
				>
					{i}
				</button>
			);
		}
		return paginatedButtons;
	}, [allData]);

	useEffect(() => {
		dispatch(getCurrentPageNumber(pageNumber));
	}, [pageNumber]);

	// if (isFetching) return <h2>Fetching...</h2>;
	if (isLoading) return <h2>Loading...</h2>;

	if (isError) return <h2>Error...</h2>;

	if (!data && !allData && data.length === 0)
		return <h2>Data is Not Available...</h2>;
	console.log(data);

	return (
		<>
			<div className="content">
				<h1 className="content__title">Displaying Content For Testing</h1>
				<ul className="content__list">
					{[...data].reverse().map((elm) => (
						<li key={elm.id} className="content__list-item">
							<div className="content__item-details">
								<dl className="content__definition-list">
									<dt className="content__term">FirstName: {elm.firstName}</dt>
									<dt className="content__term">LastName: {elm.lastName}</dt>
									<dt className="content__term">Age: {elm.age}</dt>
									<dt className="content__term">City: {elm.city}</dt>
									<dt className="content__term">Job: {elm.job}</dt>
									<div className="content__button-group">
										<button
											className="content__button content__button--edit"
											onClick={() => dispatch(editTask(elm))}
										>
											edit
										</button>
										<button
											className="content__button content__button--remove"
											onClick={() =>
												removeTask({ id: elm.id, meta: pageNumber })
											}
										>
											remove
										</button>
									</div>
								</dl>
							</div>
						</li>
					))}
				</ul>
				{isFetching && (
					<span className="content__fetching">Fetching......</span>
				)}
				<div className="content__generate-button">{generateButton()}</div>
			</div>
		</>
	);
};

export default DisplayTasks;
