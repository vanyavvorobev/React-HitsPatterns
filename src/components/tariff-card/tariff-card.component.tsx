import { useTariffsService } from "../../domain/tariffs/tariffs.service";
import { SpinnerComponent } from "../../shared/ui/spinner/spinner.component";
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
	const { deleteTariff, isDeleteTariffPending, invalidateTariffs } = useTariffsService();
	
	const handleDeleteTariff = () => {
		deleteTariff(id).then(invalidateTariffs);
	}

	return (
		<div className="tariff-card-component soft-shadow">
			<div className="tariff-card-component__content">
				<p className="tariff-card-component__title">{name}</p>
				<p className="tariff-card-component__caption">Процентная ставка: <b>{interestRate}%</b></p>
			</div>
			<div>
				<button 
					title="Удалить тариф" 
					className="default-button" 
					onClick={handleDeleteTariff}
				>{ isDeleteTariffPending ? <SpinnerComponent/> : "✖" }</button>
			</div>
		</div>
	)
}