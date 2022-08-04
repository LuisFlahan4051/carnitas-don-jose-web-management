import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import {URIGRAPHQL} from './apollo/client'
import Main from './app/Main'
import {UsersContextProvider} from './app/context/Users/UsersContext'
import {SystemContextProvider} from './app/context/System/SystemContext'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<SystemContextProvider>
			<UsersContextProvider>
				<Main URIGRAPHQL={URIGRAPHQL} />
			</UsersContextProvider>
		</SystemContextProvider>
	</React.StrictMode>
)
