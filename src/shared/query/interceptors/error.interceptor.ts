import { AxiosError } from "axios";

export const errorInterceptor = (error: AxiosError) => {
	console.log(`[ERROR] ${error.config?.method?.toUpperCase()} ${error.config?.url} - Status: ${error.status}`);
}