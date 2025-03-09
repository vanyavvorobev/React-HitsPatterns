import { InternalAxiosRequestConfig } from "axios";

export const authorizationInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
	const accessToken = localStorage.getItem("access-token");
	if(accessToken !== null) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}
	return config;
}