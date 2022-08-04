import {ReactElement, createContext, useContext, useState} from 'react'

export const SystemContext = createContext({})

export const useSystemContext = () => {
	const context = useContext(SystemContext)
	if (!context)
		throw new Error('useUser must be used within a UserContextProvider')

	return context
}

export function SystemContextProvider(props: {children: ReactElement}) {
	const [darkTheme, setDarkTheme] = useState(
		window.sessionStorage.getItem('darkTheme') === 'false'
			? false
			: !!window.matchMedia('(prefers-color-scheme: dark)').matches
	)
	return (
		<SystemContext.Provider value={{darkTheme, setDarkTheme}}>
			{props.children}
		</SystemContext.Provider>
	)
}
