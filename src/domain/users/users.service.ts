import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { queryInstances } from "../../shared/query/query.instance"

type UserResponse = {
	id: string,
	fullName: string,
	email: string,
	role: string,
	isBanned: boolean
}

export const useUsersService = () => {
	const queryClient = useQueryClient();

	const { data: users, isLoading: isUsersLoading } = useQuery({
		queryKey: ["all-users"],
		queryFn: () => queryInstances.account.get<UserResponse[]>("api/user/users/list")
	});
	const { mutateAsync: ban, isPending: isBanPending } = useMutation({
		mutationFn: (userId: string) => queryInstances.account.post(`auth/ban/${userId}`)
	});
	const { mutateAsync: unban, isPending: isUnbanPending } = useMutation({
		mutationFn: (userId: string) => queryInstances.account.delete(`auth/unban/${userId}`)
	});

	const invalidateUsers = () => {
		queryClient.invalidateQueries({queryKey: ["all-users"]});
	}

	const banUser = (userId: string) => {
		ban(userId).then(invalidateUsers);
	}

	const unbanUser = (userId: string) => {
		unban(userId).then(invalidateUsers);
	}

	return {
		users: users?.data,
		isUsersLoading,
		banUser,
		isBanPending,
		unbanUser,
		isUnbanPending
	}
}