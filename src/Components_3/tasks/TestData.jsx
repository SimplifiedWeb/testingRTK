import React from "react";
// import { useEffect } from "react";
import { useGetPaginatedDataQuery } from "../rtk/api";

const TestData = () => {
	let data = useGetPaginatedDataQuery(2);
	console.log(data);
	// useEffect(() => {
	// 	let getData = async () => {
	// 		let result = await getPaginatedData();
	// 		console.log(result);
	// 	};
	// 	getData();
	// }, []);
	return <></>;
};

export default TestData;
