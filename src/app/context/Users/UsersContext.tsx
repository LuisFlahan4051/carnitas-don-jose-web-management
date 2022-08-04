import {ReactElement, createContext, useContext, useState} from 'react'
import type {UserSimplified} from '../../Types'
import {URIGRAPHQL} from '../../../apollo/client'
import {useSystemContext} from '../System/SystemContext'

export const UsersContext = createContext({})

export const useUsersContext = () => {
	const context = useContext(UsersContext)
	if (!context)
		throw new Error('useUser must be used within a UserContextProvider')

	return context
}

export function UsersContextProvider(props: {children: ReactElement}) {
	const {setDarkTheme}: any = useSystemContext()

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
		const query = `
			query users {
                users {
                    id
                    username
                    name
                    lastname
                    phone
                    mail
                }
            }
		`

		const response = await fetch(URIGRAPHQL, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({query}),
		})

		const {data} = await response.json()

		const usersList: UserSimplified[] = data?.users ?? []

		setUsersList(usersList)
	}
	// ----------------------------
	const [usersNames, setUsersNames] = useState([''])
	async function getUsersNames() {
		const query = `
			query users {
                users {
                    name
                }
            }
		`

		const response = await fetch(URIGRAPHQL, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({query}),
		})

		const {data} = await response.json()

		const usersNames: UserSimplified[] = (await data?.users) ?? []

		setUsersNames(
			usersNames.map(user => {
				return user.name ?? ''
			})
		)
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
		const query = `
			query{
				validateUser(username: "${loginData.username}", password: "${loginData.password}")
			}
		`
		const response = await fetch(URIGRAPHQL, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({query}),
		})

		const {data} = await response.json()

		return data?.validateUser ?? ''
	}

	async function saveSession(userId: string) {
		const query = `
          query{
            userById(id:"${userId}"){
              id
              username
              name
              lastname
              phone
			  mail
              darktheme
            }
          }
        `
		const response = await fetch(URIGRAPHQL, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({query}),
		})

		const {data} = await response.json()
		const user: UserSimplified = data.userById

		const storage = window.sessionStorage
		const local = window.localStorage

		setCurrentUser({
			id: user.id ?? '',
			username: user.username ?? '',
			name: user.name ?? '',
			lastname: user.lastname ?? '',
			phone: user.phone ?? '',
			mail: user.mail ?? '',
			darktheme: user.darktheme ? 'true' : 'false',
		})

		if (data.userById.darktheme === true) {
			setDarkTheme(true)
			storage.setItem('darkTheme', 'true')
		} else {
			setDarkTheme(false)
			storage.removeItem('darkTheme')
		}
		storage.setItem('darkTheme', data.userById.darktheme)
		storage.setItem('idCurrentUser', user.id || '')
		storage.setItem('usernameCurrentUser', user.username || '')

		local.setItem('darkTheme', data.userById.darktheme)
		local.setItem('idCurrentUser', user.id || '')
		local.setItem('usernameCurrentUser', user.username || '')
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
				usersList,
				usersNames,
				loginData,
				getUsersList,
				getUsersNames,
				validateUser,
				saveSession,
				closeSession,
			}}
		>
			{props.children}
		</UsersContext.Provider>
	)
}
