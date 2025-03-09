import { useMutation, useQuery } from "@tanstack/react-query"
import { queryInstances } from "../../shared/query/query.instance"

type AvailableTariffResponse = {
	id: string,
	name: string,
	interestRate: number
}

type CreateTariffParams = {
	name: string,
	interestRate: number
}

type DeleteTariffParams = {
	id: string
}

export const useTariffsService = () => {

	const { data: tariffs, isLoading: isTariffsLoading } = useQuery({
		queryKey: ["available-tariffs"],
		queryFn: () => queryInstances.loan.get<AvailableTariffResponse[]>("api/loan-employee/tariff")
	});
	const { mutateAsync: createTariff, isPending: isCreateTariffPending } = useMutation({
		mutationFn: (tariffParams: CreateTariffParams) => queryInstances.loan.post("api/loan-employee/tariff", tariffParams)
	});
	const { mutateAsync: deleteTariff, isPending: isDeleteTariffPending } = useMutation({
		mutationFn: (params: DeleteTariffParams) => queryInstances.loan.delete(`api/loan-employee/tariff/${params.id}`)
	});

	const handleCreateTariff = (tariffParams: CreateTariffParams) => {
		createTariff(tariffParams);
	} 

	const handleDeleteTariff = (id: string) => {
		deleteTariff({ id });
	}

	return {
		tariffs: tariffs?.data,
		isTariffsLoading,
		createTariff: handleCreateTariff,
		isCreateTariffPending,
		deleteTariff: handleDeleteTariff,
		isDeleteTariffPending
	}
}