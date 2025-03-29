import React from "react"
import { useProfileService } from "../../domain/profile/profile.service"
import { SpinnerComponent } from "../../shared/ui/spinner/spinner.component"
import "./user-form.component.css";
import { FormInputComponent } from "../../shared/ui/form-input/form-input.component";
import { useForm } from "react-hook-form";

type UserForm = {
	email: string,
	password: string,
	fullName: string,
	birthDate: string,
}
type UserFormProps = {
	userId?: string,
}

const translateRole = (role: string) => {
	switch(role) {
		case "Administrator": return "Администратор";
		case "DefaultUser": return "Пользователь";
		default: return role;
	}
}

export const UserFormComponent: React.FC<UserFormProps> = ({
	userId,
}) => {
	const { profileInfo, isLoading, editUserProfile } = useProfileService(userId);
	const {
		register,
		handleSubmit,
		formState:{ errors },
		setError
	} = useForm<UserForm>();

	const getTitle = () => (userId && profileInfo) ? profileInfo.fullName : "Новый пользователь";

	if(userId && isLoading) return <SpinnerComponent/>
	return (
		<form onSubmit={handleSubmit(() => {})} className="user-form-component">
			<p className="user-form-component__title">{getTitle()}</p>
			
			<div className="user-form-component__content">
				{ !userId && <FormInputComponent
					label="ФИО"
					placeholder="John Doe"
					{...register("fullName", {
						required: "ФИО обязательно",
						pattern: {
							value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
							message: "Неверный формат email",
						}
					})}
				/> }
				<FormInputComponent
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
				/>
				{ !userId && <>
					<FormInputComponent
						label="Пароль"
						placeholder="uMpP`x1/d&Ux48b]qk_<"
						type="password"
						{...register("password", {
							required: "Пароль обязателен",
							minLength: {
								value: 6,
								message: "Минимальная длина пароля: 6 символов",
							}
						})}
						error={errors.password?.message}
					/>
					<FormInputComponent
						label="Дата рождения"
						placeholder="14.04.2004"
						type="password"
						{...register("password", {
							required: "Дата рождения обязательна",
						})}
						error={errors.password?.message}
					/> 
				</>}
				{ userId && <p className="user-form-component__caption">Роли: <b>{profileInfo?.roles.map(translateRole).join(", ")}</b></p>}

				<button 
					disabled={false} 
					className="primary-button" 
					type="submit"
				>{ false ? <SpinnerComponent/> : "Войти"}</button>
			</div>
		</form>
	)
}