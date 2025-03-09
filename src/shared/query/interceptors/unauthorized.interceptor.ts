import { AxiosError } from "axios";

type Callback = () => void;

const unauthorizedCallbacks: Callback[] = [];

export const addUnauthorizedCallback = (callback: Callback) => {
	unauthorizedCallbacks.push(callback);
}

export const unauthorizedInterceptor = (error: AxiosError) => {
	if(error.response?.status === 401) {
		unauthorizedCallbacks.forEach(it => it());		
	}
}