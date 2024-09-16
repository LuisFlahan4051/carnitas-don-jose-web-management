import {
	ReactElement,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react'
import {URIAPI} from '../../../apollo/client'

const SystemContext = createContext({})
// this is just a wrapper for throw an error
export function useSystemContext() {
	const context = useContext(SystemContext)
	if (!context)
		throw new Error(
			'useSystemContext must be used within a useSystemContextProvider binding the index.tsx file'
		)

	return context
}

export function SystemContextProvider(props: {children: ReactElement}) {
	// ---------------------- current user logged ------------------
	const [darkTheme, setDarkTheme] = useState(
		window.sessionStorage.getItem('darkTheme') === 'false'
			? false
			: !!window.matchMedia('(prefers-color-scheme: dark)').matches
	)

	const [currentUser, setCurrentUser] = useState({})

	// ------------------- List of usernames --------------------
	const [usernamesList, setUsernamesList] = useState([])
	async function getUsersList() {
		const response = await fetch(
			URIAPI + '/users?admin_username=main&admin_password=main&root=true',
			{
				method: 'GET',
				headers: {'Content-Type': 'application/json'},
			}
		)

		const data: [] = await response.json()
		const usernames: [] = []
		data.map(({username}) => usernames.push(username))
		setUsernamesList(usernames)
	}
	useEffect(() => {
		getUsersList()
	}, [])

	return (
		<SystemContext.Provider
			value={{
				darkTheme,
				setDarkTheme,
				usernamesList,
				currentUser,
				setCurrentUser,
			}}
		>
			{props.children}
		</SystemContext.Provider>
	)
}
