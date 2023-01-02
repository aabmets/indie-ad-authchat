import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { PocketBaseProvider } from '@context';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<PocketBaseProvider>
			<App />
		</PocketBaseProvider>
	</React.StrictMode>
)