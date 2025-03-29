import React from "react"
import "./user-card.component.css";
import { useParams } from "react-router-dom";

type UserCardProps = {
	id: string,
	fullName: string,
	email: string,
	role: string,
	isBanned: boolean
}

const translateRole = (role: string) => {
	switch(role) {
		case "Administrator": return "Администратор";
		case "DefaultUser": return "Пользователь";
		default: return role;
	}
}

export const UserCardComponent: React.FC<UserCardProps> = ({
	id,
	fullName,
	email,
	role,
	isBanned,
}) => {
	const { userId } = useParams();

	return (
		<div className={`user-card-component ${ id === userId ? "soft-active-shadow" : "soft-shadow" }`}>
			<div className="user-card-component__content">
				<p className="user-card-component__title">{fullName}</p>
				<p className="user-card-component__caption">Email: <b>{email}</b></p>
				<p className="user-card-component__caption">Роль: <b>{translateRole(role)}</b></p>
			</div>
			{/* <div>
				<button 
					title="Удалить тариф" 
					className="default-button" 
					onClick={handleDeleteTariff}
				>{ isDeleteTariffPending ? <SpinnerComponent/> : "✖" }</button>
			</div> */}
		</div>
	)
}