import './App.css'
import { AuthorizationProvider } from '../domain/authorization/authorization.provider'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../shared/query/query.client'
import { AppRoutesComponent } from './routes/app-routes.component'

function App() {

	return (
		<QueryClientProvider client={queryClient}>
			<AuthorizationProvider>
				<AppRoutesComponent/>
			</AuthorizationProvider>
		</QueryClientProvider>
	)
}

export default App
