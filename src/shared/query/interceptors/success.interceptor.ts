import { AxiosResponse } from "axios";

export const successInterceptor = (response: AxiosResponse) => {
	console.log(
		`%c[SUCCESS]%c ${response.config.method?.toUpperCase()} ${response.config.url} - Status: ${response.status}`, 
		'color: green; font-weight: bold;', 
		'color: inherit; font-weight: normal;'
	);
}