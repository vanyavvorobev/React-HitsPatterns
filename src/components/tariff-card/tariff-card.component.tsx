import { useTariffsService } from "../../domain/tariffs/tariffs.service";
import "./tariff-card.component.css";

type TariffCardProps = {
	id: string,
	name: string,
	interestRate: number
}

export const TariffCardComponent: React.FC<TariffCardProps> = ({
	id,
	name,
	interestRate
}) => {
	const { deleteTariff, isDeleteTariffPending } = useTariffsService();
	
	return (
		<div className="tariff-card-component soft-shadow">
			<div>
				<p>{name}</p>
				<p>{interestRate}</p>
			</div>
			<button className="default-button">✖</button>
		</div>
	)
}