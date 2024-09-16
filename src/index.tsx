import ReactDOM from 'react-dom/client'
import './index.scss'
import {URIAPI} from './apollo/client'
import Main from './app/Main'
import {SystemContextProvider} from './app/context/System/SystemContext'
import {UsersContextProvider} from './app/context/Users/UsersContext'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<SystemContextProvider>
		<UsersContextProvider>
			<Main URIAPI={URIAPI} />
		</UsersContextProvider>
	</SystemContextProvider>
)
