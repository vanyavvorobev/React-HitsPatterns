import { AxiosResponse } from "axios";

export const successInterceptor = (response: AxiosResponse) => {
	console.log(`[SUCCESS] ${response.config.method?.toUpperCase()} ${response.config.url} - Status: ${response.status}`);
}