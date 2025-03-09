import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			staleTime: 60 * 1000,
			refetchOnWindowFocus: false
		},
		mutations: {
			retry: false
		}
	}
})