import { useNavigate } from "react-router-dom";
import { LoginFormComponent } from "../../components/login-form/login-form.component"
import { useAuthorizationContext } from "../../domain/authorization/authorization.provider";
import "./login-page.component.css";

type LoginForm = {
	email: string,
	password: string
}

export const LoginPageComponent = () => {
	const { loginUser, isLoginPending } = useAuthorizationContext();
	const navigate = useNavigate();

	const handleSubmit = (values: LoginForm) => {
		loginUser(values).then(() => {
			navigate("/users");
		})
	}

	return (
		<div className="login-page-component">
			<LoginFormComponent
				onSubmit={handleSubmit} 
				isPending={isLoginPending}
			/>
		</div>
	)
}