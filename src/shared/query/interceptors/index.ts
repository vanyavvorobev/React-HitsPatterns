import { authorizationInterceptor } from "./authorization.interceptor";
import { errorInterceptor } from "./error.interceptor";
import { successInterceptor } from "./success.interceptor";
import { unauthorizedInterceptor } from "./unauthorized.interceptor";

export const interceptors = {
	response: {
		success: [
			successInterceptor
		],
		error: [
			errorInterceptor,
			unauthorizedInterceptor
		]	
	},
	request: {
		success: [
			authorizationInterceptor
		],
		error: [
			errorInterceptor
		]
	}
}