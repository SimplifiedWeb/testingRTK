import * as Yup from "yup";

const validations = Yup.object({
	firstName: Yup.string().trim().min(2).required("Add Your firstName"),
	lastName: Yup.string().trim().min(2).required("Add Your lastName"),
	city: Yup.string().trim().min(2).required("Add Your city"),
	age: Yup.string().trim().max(2).required("Enter Your Age"),
	price: Yup.string().trim().required("Enter Your Price"),
	job: Yup.string().trim().required("Select Your Job position"),
});

export default validations;
