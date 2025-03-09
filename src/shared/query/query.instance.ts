import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { interceptors } from "./interceptors";

const settings = import.meta.env;

const baseUrls = {
	core: settings.VITE_CORE_URL,
	account: settings.VITE_ACCOUNT_URL,
	loan: settings.VITE_LOAN_URL
}

const createInstance = (url: string) => {
	const instance = axios.create({ baseURL: url });

	const onResponse = (response: AxiosResponse): AxiosResponse => {
		interceptors.response.success.forEach(it => it(response));
		return response;
	}
	const onResponseError = (error: AxiosError): Promise<AxiosError> => {
		interceptors.response.error.forEach(it => it(error));
		return Promise.reject(error);
	}

	const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
		interceptors.request.success.forEach(it => config = it(config))
		return config;
	}
	const onRequestError = (error: AxiosError) => {
		interceptors.request.error.forEach(it => it(error));
		return Promise.reject(error);
	} 

	instance.interceptors.response.use(onResponse, onResponseError);
	instance.interceptors.request.use(onRequest, onRequestError);
	return instance;
}

export const queryInstances = {
	core: createInstance(baseUrls.core),
	account: createInstance(baseUrls.account),
	loan: createInstance(baseUrls.loan)
};