import React from "react";
import { Formik, Form } from "formik";
import CustomInputs from "./CustomInputs";
import validations from "./validations";
import { useEffect } from "react";
import { useAddTaskMutation, useUpdateTaskMutation } from "../rtk/api";
import { useState } from "react";
import { useSelector } from "react-redux";

const InputTasks = () => {
	let { currentPageNumber } = useSelector((state) => state.task);
	let [editStates, setEditStates] = useState({
		firstName: "",
		lastName: "",
		age: "",
		price: "",
		job: "",
		city: "",
	});
	const [addTask] = useAddTaskMutation();
	const [updateTask] = useUpdateTaskMutation();
	const { editDetails } = useSelector((state) => state.task);

	useEffect(() => {
		if (editDetails) {
			setEditStates((prev) => ({
				...prev,
				...editDetails,
			}));
		}
	}, [editDetails]);

	let initialStates = {
		firstName: editStates.firstName || "",
		lastName: editStates.lastName || "",
		age: editStates.age || "",
		price: editStates.price || "",
		job: editStates.job || "",
		city: editStates.city || "",
	};

	const onSubmit = async (values, actions) => {
		actions.resetForm();

		if (editDetails) {
			setEditStates({
				firstName: "",
				lastName: "",
				age: "",
				price: "",
				job: "",
				city: "",
			});
			await updateTask({
				id: editDetails?.id,
				meta: currentPageNumber,
				...values,
			});
		} else {
			await addTask({
				meta: currentPageNumber,
				...values,
			});
			setEditStates({
				firstName: "",
				lastName: "",
				age: "",
				price: "",
				job: "",
				city: "",
			});
		}

		document.getElementById("targetInput")?.focus();
	};

	useEffect(() => {
		document.getElementById("targetInput")?.focus();
	}, []);

	return (
		<>
			<Formik
				initialValues={initialStates}
				validationSchema={validations}
				onSubmit={onSubmit}
				enableReinitialize
			>
				<Form className="form">
					<CustomInputs
						label={"FirstName"}
						placeholder={"Enter FirstName"}
						id={"targetInput"}
						name={"firstName"}
						className="form__input"
					/>
					<CustomInputs
						label={"LastName"}
						placeholder={"Enter lastName"}
						name={"lastName"}
						className="form__input"
					/>
					<CustomInputs
						label={"Age"}
						placeholder={"Enter Age"}
						name={"age"}
						className="form__input"
					/>
					<CustomInputs
						label={"City"}
						placeholder={"Enter city"}
						name={"city"}
						className="form__input"
					/>
					<CustomInputs
						label={"Price"}
						placeholder={"Enter price"}
						name={"price"}
						className="form__input"
					/>
					<CustomInputs
						label={"Select Position"}
						placeholder={"Enter position"}
						name={"job"}
						className="form__input"
					/>
					<button className="form__submit-button" type="submit">
						Submit
					</button>
				</Form>
			</Formik>
		</>
	);
};

export default InputTasks;
