import {ReactElement, createContext, useContext, useState} from 'react'
import type {UserSimplified} from '../../Types'
import {URIAPI} from '../../../apollo/client'
export const UsersContext = createContext({})

export const useUsersContext = () => {
	const context = useContext(UsersContext)
	if (!context)
		throw new Error('useUser must be used within a UserContextProvider')

	return context
}

export function UsersContextProvider(props: {children: ReactElement}) {
	const initUsersList: UserSimplified[] = [
		{
			id: '',
			username: '',
			name: '',
			lastname: '',
			phone: '',
			mail: '',
			darktheme: false,
		},
	]
	const [usersList, setUsersList] = useState(initUsersList)
	async function getUsersList() {
		const response = await fetch(
			URIAPI + '/users?admin_username=main&admin_password=main&root=true',
			{
				method: 'GET',
				headers: {'Content-Type': 'application/json'},
			}
		)

		const {data} = await response.json()

		const usersList: UserSimplified[] = data?.users ?? []

		setUsersList(usersList)
	}
	// ----------------------------
	const [usersNames, setUsersNames] = useState([''])
	async function getUsersNames() {
		const response = await fetch(
			URIAPI + '/users?admin_username=root&admin_password=root&root=true',
			{
				method: 'GET',
				headers: {'Content-Type': 'application/json'},
			}
		)

		console.log(response)

		if (response.ok) {
			const data = await response.json()
			const usersNames: UserSimplified[] = data ?? []
			setUsersNames(
				usersNames.map(user => {
					return user.username ?? ''
				})
			)
		}
	}
	// ----------------------------

	const [loginData, setLoginData] = useState({
		username: '',
		password: '',
	})

	function setLoginDataWrapper(username: string, password: string) {
		setLoginData({
			username,
			password,
		})
	}

	function getSessionItem(item: string): string | null {
		return window.sessionStorage.getItem(`${item}User`)
			? window.sessionStorage.getItem(`${item}User`)
			: window.localStorage.getItem(`${item}User`)
	}
	const [currentUser, setCurrentUser] = useState({
		id: getSessionItem('idCurrent'),
		name: getSessionItem('nameCurrent'),
		lastname: getSessionItem('lastnameCurrent'),
		username: getSessionItem('usernameCurrent'),
		phone: getSessionItem('phoneCurrent'),
		mail: getSessionItem('mailCurrent'),
		darktheme: getSessionItem('darkthemeCurrent'),
	})

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

	function closeSession() {
		window.sessionStorage.clear()
		window.localStorage.clear()
		setCurrentUser({
			id: null,
			name: null,
			lastname: null,
			username: null,
			phone: null,
			mail: null,
			darktheme: null,
		})
		setLoginData({
			username: '',
			password: '',
		})
	}

	return (
		<UsersContext.Provider
			value={{
				validateUser,
			}}
		>
			{props.children}
		</UsersContext.Provider>
	)
}
