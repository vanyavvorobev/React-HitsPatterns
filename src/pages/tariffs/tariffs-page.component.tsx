import { TariffCardComponent } from "../../components/tariff-card/tariff-card.component";
import { TariffFormComponent } from "../../components/tariff-form/tariff-form.component";
import { useTariffsService } from "../../domain/tariffs/tariffs.service";
import "./tariffs-page.component.css";

type TariffForm = {
	name: string,
	interestRate: number
}

const TariffsPageComponent = () => {
	const { tariffs, createTariff, isCreateTariffPending, invalidateTariffs } = useTariffsService();

	const handleSubmit = (values: TariffForm) => {
		createTariff(values).then(invalidateTariffs);
	}

	return (
		<div className="tariff-page-component">
			<div className="tariff-page-component__wrapper">
				<h3 className="tariff-page-component__title">Текущие тарифы</h3>
				<div className="tariff-page-component__list">
					{tariffs?.map(it => (
						<TariffCardComponent 
							key={it.id} 
							id={it.id} 
							name={it.name} 
							interestRate={it.interestRate}
						/>
					))}
				</div>
			</div>
			<div className="tariff-page-component__divider"/>
			<div className="tariff-page-component__wrapper">
				<h3 className="tariff-page-component__title">Создать тариф</h3>
					<TariffFormComponent
						onSubmit={handleSubmit}

						isPending={isCreateTariffPending}
					/>
			</div>
		</div>
	)
}

export default TariffsPageComponent;