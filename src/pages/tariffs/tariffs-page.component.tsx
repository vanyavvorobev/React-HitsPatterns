import { TariffCardComponent } from "../../components/tariff-card/tariff-card.component";
import { useTariffsService } from "../../domain/tariffs/tariffs.service";
import "./tariffs-page.component.css";

export const TariffsPageComponent = () => {
	const { tariffs } = useTariffsService();

	return (
		<div className="tariff-page-component">
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
			<div className="tariff-page-component__divider"/>
			<div>

			</div>
		</div>
	)
}