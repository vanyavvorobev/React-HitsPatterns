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

export const useProfileService = (userId?: string | null) => {

	const { data: profileInfo, isLoading } = useQuery({
		queryKey: ["get-profile", userId],
		queryFn: () => queryInstances.account.get<ProfileResponse>(`api/user/${userId}`),
		enabled: userId !== undefined && userId !== null
	});

	const editUserProfile = () => {

	}

	return {
		profileInfo: profileInfo?.data,
		isLoading: isLoading,
		editUserProfile,
	}
}