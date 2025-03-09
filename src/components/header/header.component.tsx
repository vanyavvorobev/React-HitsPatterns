import React from "react"
import { Link } from "react-router-dom"
import "./header.component.css";
import { useAuthorizationContext } from "../../domain/authorization/authorization.provider";
import { useProfileService } from "../../domain/profile/profile.service";
import { SpinnerComponent } from "../../shared/ui/spinner/spinner.component";

const staticData = {
	navigation: [
		{ title: "Счета", slug: "accounts" },
		{ title: "Тарифы", slug: "tariff" },
		{ title: "Кредиты", slug: "loans" },
		{ title: "Пользователи", slug: "users" }
	],
	profile: { title: "Профиль", slug: "profile" }
}

type NavigationItemProps = {
	title: string,
	href: string,
}

const NavigationItem: React.FC<NavigationItemProps> = ({
	title,
	href
}) => {

	return (
		<Link className="default-button no-decoration" to={href}>
			{title}
		</Link>
	)
}

const AuthorizationComponent = () => {
	const { isAuth } = useAuthorizationContext();
	const { profileInfo, isLoading } = useProfileService();

	if(isLoading) {
		return <SpinnerComponent/>
	}
	else if(isAuth) {
		return <p className="header-component__user-name">{profileInfo?.fullName}</p>
	}
	else {
		return <NavigationItem title="Войти" href="login"/>
	}
}

export const HeaderComponent = () => {
	const { isAuth } = useAuthorizationContext();

	return (
		<div className="header-component default-shadow">
			<div></div>
			<nav className="header-component__navigation-menu">
				{isAuth && staticData.navigation.map(navItem => (
					<NavigationItem key={navItem.slug} title={navItem.title} href={`/${navItem.slug}`}/>
				))}
			</nav>
			<div className="header-component__authorization">
				<AuthorizationComponent/>
			</div>
		</div>
	)
}