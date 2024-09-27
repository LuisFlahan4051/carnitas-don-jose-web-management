import {
	ReactElement,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react'
import {URIAPI} from '../../../apollo/client'
import {User} from '../../generated/types/4-users'
export const UsersContext = createContext({})

export const useUsersContext = () => {
	const context = useContext(UsersContext)
	if (!context)
		throw new Error('useUser must be used within a UserContextProvider')

	return context
}

export function UsersContextProvider(props: {children: ReactElement}) {
	// ----------------------------
	async function validateUser(username: string, password: string) {
		const response = await fetch(URIAPI + '/login', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({username, password}),
		})

		if (response.ok) {
			return 'Ok'
		}

		const message = await response.text()

		if (message.includes('incorrect password')) return 'IncorrectPassword'
		if (message.includes('user does not exist')) return 'NotExist'
		if (message.includes('user is deleted')) return 'Deleted'
		if (message.includes('user is not verified')) return 'NotVerified'

		return 'CanNotValidate'
	}

	// ------------------- List of usernames --------------------
	const [usernamesList, setUsernamesList] = useState([])
	async function getUsernamesList() {
		const response = await fetch(
			URIAPI + '/users?admin_username=main&admin_password=main&root=false',
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
		getUsernamesList()
	}, [])

	async function getUsersList(): Promise<User[]> {
		const response = await fetch(
			URIAPI + '/users?admin_username=main&admin_password=main&root=false',
			{
				method: 'GET',
				headers: {'Content-Type': 'application/json'},
			}
		)

		const data: User[] = await response.json()
		return data
	}

	return (
		<UsersContext.Provider
			value={{
				validateUser,
				usernamesList,
				getUsersList,
			}}
		>
			{props.children}
		</UsersContext.Provider>
	)
}
