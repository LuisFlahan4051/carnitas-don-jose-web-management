import {ReactElement, createContext, useContext, useState} from 'react'
import {URIAPI} from '../../../apollo/client'
import {User} from '../../generated/types/4-users'

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
	function setDarkThemeHandler(state: boolean) {
		setDarkTheme(state)
	}

	const [currentUser, setCurrentUser] = useState({} as User)

	async function initSession(username: string, password: string) {
		const response = await fetch(URIAPI + '/my/profile', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({username, password}),
		})

		if (response.ok) {
			const data = await response.json()
			const newUser: User = await data
			setCurrentUser(newUser)
			setDarkTheme(newUser.darktheme)
			window.sessionStorage.setItem('usernameCarnitas', username)
			window.sessionStorage.setItem('passwordCarnitas', password)
		}
	}

	function closeSession() {
		window.sessionStorage.clear()
		setCurrentUser({} as User)
	}

	return (
		<SystemContext.Provider
			value={{
				darkTheme,
				setDarkThemeHandler,
				currentUser,
				setCurrentUser,
				initSession,
				closeSession,
			}}
		>
			{props.children}
		</SystemContext.Provider>
	)
}
