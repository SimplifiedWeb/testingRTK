import React from "react";
import { Field, useField } from "formik";

const CustomInputs = ({ id, label, ...props }) => {
	let [field, meta] = useField(props);

	return (
		<>
			<div className="custom-input">
				<label className="custom-input__label" htmlFor={label}>
					{label}
				</label>
				<Field id={id} {...props} {...field} className="custom-input__field" />
				{meta.error && meta.touched ? (
					<span className="custom-input__error">{meta.error}</span>
				) : null}
			</div>
		</>
	);
};

export default CustomInputs;
