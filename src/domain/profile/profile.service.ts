import { useQuery } from "@tanstack/react-query"
import { queryInstances } from "../../shared/query/query.instance";

type ProfileResponse = {
	id: string,
	email: string,
	fullName: string,
	birthDate: {
		value: string
	},
	joinedAt: string,
	roles: string[]
}

export const useProfileService = () => {

	const { data: profileInfo, isLoading } = useQuery({
		queryKey: ["my-profile"],
		queryFn: () => queryInstances.account.get<ProfileResponse>(`api/user/${localStorage.getItem("user-id")}`),
		enabled: localStorage.getItem("user-id") !== null
	});

	const editUserProfile = () => {

	}

	return {
		profileInfo: profileInfo?.data,
		isLoading: isLoading,
		editUserProfile,
	}
}