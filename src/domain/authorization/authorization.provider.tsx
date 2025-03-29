import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { queryInstances } from "../../shared/query/query.instance";
import { addUnauthorizedCallback } from "../../shared/query/interceptors/unauthorized.interceptor";

const storageKeys = {
	accessToken: "access-token",
	refreshToken: "refresh-token",
	userId: "user-id"
}

type RegisterParams = {
	email: string,
	password: string,
	fullName: string,
	birthDate: string
}

type LoginParams = {
	email: string,
	password: string
}
type LoginResponse = {
	accessToken: string,
	refreshToken: string,
	userId: string
}
type RefreshResponse = {
	accessToken: string,
	refreshToken: string,
	userId: string
}

type AuthorizationContextType = {
	isAuth?: boolean,
	registerUser: (registerParams: RegisterParams) => Promise<void>,
	isRegisterPending: boolean,
	loginUser: (loginParams: LoginParams) => Promise<void>,
	isLoginPending: boolean,
	logoutUser: () => Promise<void>,
	isLogoutPending: boolean,
	refreshUser: () => Promise<void>,
	isRefreshPending: boolean
}

const AuthorizationContext = React.createContext<AuthorizationContextType>({
	isAuth: undefined,
	registerUser: async () => {},
	isRegisterPending: false,
	loginUser: async () => {},
	isLoginPending: false,
	logoutUser: async () => {},
	isLogoutPending: false,
	refreshUser: async () => {},
	isRefreshPending: false
});

export const useAuthorizationContext = () => {
	const context = React.useContext(AuthorizationContext);
	if(!context) throw Error("use authorization context error");
	return context;
}

export const AuthorizationProvider: React.FC<{children: React.ReactNode}> = ({
	children
}) => {
	const queryClient = useQueryClient();
	const [ isAuth, setIsAuth ] = React.useState<boolean | undefined>(undefined);
	const { mutateAsync: register, isPending: isRegisterPending } = useMutation({
		mutationFn: (registerParams: RegisterParams) => queryInstances.account.post("auth/register", registerParams)
	});
	const { mutateAsync: login, isPending: isLoginPending } = useMutation({
		mutationFn: (loginParams: LoginParams) => queryInstances.account.post<LoginResponse>("auth/login", loginParams)
	});
	const { mutateAsync: logout, isPending: isLogoutPending } = useMutation({
		mutationFn: () => queryInstances.account.post("auth/logout")
	});
	const { mutateAsync: refresh, isPending: isRefreshPending } = useMutation({
		mutationFn: () => queryInstances.account.post<RefreshResponse>("auth/refresh", {
			accessToken: localStorage.getItem(storageKeys.accessToken),
			refreshToken: localStorage.getItem(storageKeys.refreshToken)
		})
	});

	const clearAuthorization = () => {
		setIsAuth(false);
		queryClient.clear();
		localStorage.removeItem(storageKeys.accessToken);
		localStorage.removeItem(storageKeys.refreshToken);
		localStorage.removeItem(storageKeys.userId);
	}

	const fillAuthorization = (tokens: LoginResponse) => {
		setIsAuth(true);
		localStorage.setItem(storageKeys.accessToken, tokens.accessToken);
		localStorage.setItem(storageKeys.refreshToken, tokens.refreshToken);
		localStorage.setItem(storageKeys.userId, tokens.userId);
	}

	const onUnauthorized = () => {
		refresh().then((response) => {
			fillAuthorization(response.data);
		}).catch(clearAuthorization);
	}

	const registerUser = async (registerParams: RegisterParams) => {
		return register(registerParams).then(() => {
			loginUser({
				email: registerParams.email,
				password: registerParams.password
			});
		})
	}

	const loginUser = async (loginParams: LoginParams) => {
		return login(loginParams).then((response) => {
			fillAuthorization(response.data);
		})
	}

	const logoutUser = async () => {
		return logout().then(() => {
			clearAuthorization()
		})
	}

	const refreshUser = async () => {
		return refresh().then((response) => {
			fillAuthorization(response.data);
		})
	}

	const value = React.useMemo(() => ({
		isAuth: isAuth,
		registerUser,
		isRegisterPending,
		loginUser,
		isLoginPending,
		logoutUser,
		isLogoutPending,
		refreshUser,
		isRefreshPending,
	}), [isAuth, registerUser, isRegisterPending, loginUser, isLoginPending, logoutUser, isLogoutPending, refreshUser, isRefreshPending]);

	React.useEffect(() => {
		addUnauthorizedCallback(onUnauthorized);
	}, []);

	return (
		<AuthorizationContext.Provider value={value}>
			{children}
		</AuthorizationContext.Provider>
	)
}