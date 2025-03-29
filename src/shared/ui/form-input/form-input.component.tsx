import React from "react";
import "./form-input.component.css";

type FormInputProps = {
	label: string,
	placeholder?: string,
	type?: React.HTMLInputTypeAttribute,
	error?: string
}

export const FormInputComponent: React.FC<FormInputProps> = (props) => {
	const {
		label,
		placeholder = "type . . . .",
		type,
		error
	} = props;

	const handleErrorInputClass = () => error ? "form-item__input_error" : "";

	return (
		<div className="form-item">
			<label className="form-item__label">{label}</label>
			<input 
				{...props}
				type={type} 
				placeholder={placeholder} 
				className={`form-item__input ${handleErrorInputClass()}`}
			/>
			<p className="form-item__error">{error}</p>
		</div>
	)
}