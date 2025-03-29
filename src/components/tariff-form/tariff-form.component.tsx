import React from "react"
import { useForm } from "react-hook-form"
import { FormInputComponent } from "../../shared/ui/form-input/form-input.component"
import { SpinnerComponent } from "../../shared/ui/spinner/spinner.component"
import "./tariff-form.component.css";

type TariffForm = {
	name: string,
	interestRate: number
}
type TariffFormError = {
	name?: string,
	interestRate?: string
}

type TariffFormProps = {
	onSubmit: (values: TariffForm) => void,
	error?: TariffFormError,
	isPending: boolean
}

export const TariffFormComponent: React.FC<TariffFormProps> = ({
	onSubmit,
	error,
	isPending
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError
	} = useForm<TariffForm>();

	React.useEffect(() => {
		if(error?.name) {
			setError("name", {
				type: "manual",
				message: error.name
			});
		}
		if(error?.interestRate) {
			setError("interestRate", {
				type: "manual",
				message: error.interestRate
			});
		}
	}, [error, setError]);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="tariff-form-component">
			<FormInputComponent
				label="Название"
				placeholder="Разорительный"
				{...register("name", {
					required: "Название обязательно",
					minLength: {
						value: 3,
						message: "Минимальная длина названия: 3 символа"
					}
				})}
				error={errors.name?.message}
			/>
			<FormInputComponent
				label="Процентная ставка"
				placeholder="123"
				{...register("interestRate", {
					required: "Ставка обязательна",
					pattern: {
						value: /^(?:\d{1,2}|100)$/,
						message: "Процентная ставка должна быть числом от 0 до 100"
					}
				})}
				error={errors.interestRate?.message}
			/>
			<button
				disabled={isPending}
				className="primary-button"
				type="submit"
			>{ isPending ? <SpinnerComponent/> : "Добавить" }</button>
		</form>
	)
}