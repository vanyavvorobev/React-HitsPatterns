import { AxiosError } from "axios";

export const errorInterceptor = (error: AxiosError) => {
	console.log(
		`%c[ERROR]%c ${error.config?.method?.toUpperCase()} ${error.config?.url} - Status: ${error.status}`, 
		'color: red; font-weight: bold;', 
		'color: inherit; font-weight: normal;'
	);
}