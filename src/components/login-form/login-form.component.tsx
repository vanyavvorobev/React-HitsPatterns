import React from "react";
import { FormItemComponent } from "../../shared/ui/form-item/form-item.component"
import "./login-fomr.component.css";
import { useForm } from "react-hook-form";
import { SpinnerComponent } from "../../shared/ui/spinner/spinner.component";

type LoginForm = {
	email: string,
	password: string
}
type LoginFormError = {
	email?: string,
	password?: string
}

type LoginFormProps = {
	onSubmit: (values: LoginForm) => void,
	error?: LoginFormError,
	isPending: boolean,
}

export const LoginFormComponent: React.FC<LoginFormProps> = ({
	onSubmit,
	error,
	isPending
}) => {
	const {
		register,
		handleSubmit,
		formState:{ errors },
		setError
	} = useForm<LoginForm>();

	React.useEffect(() => {
		if(error?.email) {
			setError("email", {
				type: "manual",
				message: error.password
			});
		}
		if(error?.password) {
			setError("password", {
				type: "manual",
				message: error.password
			});
		}
	}, [error, setError]);
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="login-form-component">
			<FormItemComponent
				label="Email"
				placeholder="example@gmail.com"
				type="email"
				{...register("email", {
					required: "Email обязателен",
					pattern: {
						value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
						message: "Неверный формат email",
					}
				})}
				error={errors.email?.message}
			/>
			<FormItemComponent
				label="Пароль"
				placeholder="uMpP`x1/d&Ux48b]qk_<"
				type="password"
				{...register("password", {
					required: "Пароль обязателен",
					minLength: {
						value: 6,
						message: "минимальная длина пароля: 6 символов",
					}

				})}
				error={errors.password?.message}
			/>
			<button 
				disabled={isPending} 
				className="primary-button" 
				type="submit"
			>{ isPending ? <SpinnerComponent/> : "Войти"}</button>
		</form>
	)
}
