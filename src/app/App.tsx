import './App.css'
import { HeaderComponent } from '../components/header/header.component'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthorizationProvider } from '../domain/authorization/authorization.provider'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../shared/query/query.client'
import { LoginPageComponent } from '../pages/login/login-page.component'
import { UsersPageComponent } from '../pages/users/users-page.component'
import { TariffsPageComponent } from '../pages/tariffs/tariffs-page.component'

function App() {

	return (
		<QueryClientProvider client={queryClient}>
			<AuthorizationProvider>
				<BrowserRouter>
					<HeaderComponent/>
					<div className='root__content-wrapper'>
						<Routes>
							<Route path="login" element={<LoginPageComponent/>}/>
							<Route path="register" element={<div>register</div>}/>
							<Route path="accounts" element={<div>accounts</div>}/>
							<Route path="tariff" element={<TariffsPageComponent/>}/>
							<Route path="loans" element={<div>loans</div>}/>
							<Route path="users" element={<UsersPageComponent/>}/>
						</Routes>
					</div>
				</BrowserRouter>
			</AuthorizationProvider>
		</QueryClientProvider>
	)
}

export default App
