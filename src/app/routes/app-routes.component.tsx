import React from "react"
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom"
import { HeaderComponent } from "../../components/header/header.component"
import { LoginPageComponent } from "../../pages/login/login-page.component"
import { useAuthorizationContext } from "../../domain/authorization/authorization.provider"
import { useProfileService } from "../../domain/profile/profile.service"
import { SpinnerComponent } from "../../shared/ui/spinner/spinner.component"


const UsersPageComponent = React.lazy(() => import("../../pages/users/users-page.component"));
const TariffsPageComponent = React.lazy(() => import("../../pages/tariffs/tariffs-page.component"));

const PrivateRoutes = () => {
	const { isAuth, refreshUser } = useAuthorizationContext();
	const { profileInfo } = useProfileService(localStorage.getItem("user-id"));

	React.useEffect(() => {
		if(isAuth === undefined && profileInfo) {
			refreshUser();
		}
	}, [isAuth, profileInfo])

	if(isAuth === undefined) {
		return (
			<div className="root__content-wrapper">
				<SpinnerComponent/>
			</div>
		)
	} 
	else return isAuth ? <Outlet/> : <Navigate to="login" replace/>
}

export const AppRoutesComponent = () => {

	return (
		<BrowserRouter>
			<HeaderComponent/>
			<div className='root__content-wrapper'>
				<React.Suspense fallback={<SpinnerComponent/>}>
					<Routes>
						<Route path="/" element={<Navigate to="users" replace/>}/>
						<Route path="login" element={<LoginPageComponent/>}/>
							<Route element={<PrivateRoutes/>}>
								<Route path="register" element={<div>register</div>}/>
								<Route path="accounts" element={<div>accounts</div>}/>
								<Route path="tariff" element={<TariffsPageComponent/>}/>
								<Route path="loans" element={<div>loans</div>}/>
								<Route path="users/:userId?" element={<UsersPageComponent/>}/>
							</Route>
					</Routes>
				</React.Suspense>
			</div>
		</BrowserRouter>
	)
}