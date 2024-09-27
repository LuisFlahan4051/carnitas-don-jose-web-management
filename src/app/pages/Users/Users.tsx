import './Users.scss'
import FindUsers from '../../components/FindUsers/FindUsers'
import {useUsersContext} from '../../context/Users/UsersContext'
import {useEffect, useState} from 'react'
import {User} from '../../generated/types/4-users'
import profilePic from '../../../../profile.jpg'

export default function Users() {
	//TODO: don't user usernamesList, make an entire usersList.
	const {getUsersList}: any = useUsersContext()
	const [usersList, setUsersList] = useState([] as User[])
	useEffect(() => {
		getUsersListHandler()
	}, [])

	async function getUsersListHandler() {
		const newUsersList = await getUsersList()
		setUsersList(newUsersList)
	}

	function handleDisplayNewUser() {
		const displayNewUser = document.getElementById('display__new_user')

		if (displayNewUser?.classList.contains('visible')) {
			displayNewUser?.classList.remove('visible')
			displayNewUser?.classList.add('hidden')
		} else {
			displayNewUser?.classList.remove('hidden')
			displayNewUser?.classList.add('visible')
		}
	}

	return (
		<div className='Users'>
			<FindUsers UsersList={usersList} onAddUser={handleDisplayNewUser} />

			<div className='users__info'>
				<div className='info_target'>
					<form action=''>
						<label htmlFor=''>Nombres:</label>
						<input type='text' />
						<label htmlFor=''>Apellidos:</label>
						<input type='text' />
						<label htmlFor=''>Nombre de usuario:</label>
						<input type='text' />
						<label htmlFor=''>Contraseña:</label>
						<input type='password' />
						<label htmlFor=''>Verificado:</label>
						<input type='checkbox' />
						<label htmlFor=''>Imagen de perfil:</label>
						<input type='file' name='' id='' />
						<label htmlFor=''>Advertencia:</label>
						<input type='checkbox' name='' id='' />
						<label htmlFor=''>Tema obscuro:</label>
						<input type='checkbox' name='' id='' />
						<label htmlFor=''>Contracto Activo:</label>
						<input type='checkbox' name='' id='' />
						<label htmlFor=''>Dirección:</label>
						<input type='text' />
						<label htmlFor=''>Fecha de nacimiento:</label>
						<input type='date' />
						<label htmlFor=''>Grado de estudios:</label>
						<select name='' id=''></select>
						<label htmlFor=''>Estado civil:</label>
						<select name='' id=''></select>
						<label htmlFor=''>CURP:</label>
						<input type='text' name='' id='' />
						<label htmlFor=''>RFC:</label>
						<input type='text' name='' id='' />
						<label htmlFor=''>Numero de INE:</label>
						<input type='text' name='' id='' />
						<label htmlFor=''>Valoración:</label>
						<input type='range' name='' id='' />
						<label htmlFor=''>Cualidades:</label>
						<textarea name='' id=''></textarea>
						<label htmlFor=''>Defectos:</label>
						<textarea name='' id=''></textarea>
						<label htmlFor=''>Sucursal de contratación:</label>
						<select name='' id=''></select>
						<label htmlFor=''>Sucursal designada:</label>
						<select name='' id=''></select>
					</form>
				</div>
			</div>

			<div className='display__new_user hidden' id='display__new_user'>
				<div className='new_user__target'>
					<form action=''>
						<div className='form__row'>
							<div className='new_user__picture' onClick={() => {}}>
								<img src={profilePic} alt='uploadHere' draggable='false' />
							</div>
						</div>
						<div className='form__row'>
							<div className='form__column'>
								<label htmlFor=''>Nombres:</label>
								<input type='text' />
							</div>
							<div className='form__column'>
								<label htmlFor=''>Apellidos:</label>
								<input type='text' />
							</div>
						</div>
						<div className='form__row'>
							<div className='form__column'>
								<label htmlFor='username'>Nombre de usuario:</label>
								<input type='text' />
							</div>
							<div className='form__column'>
								<label htmlFor='password'>Contraseña:</label>
								<input type='password' name='' id='' />
							</div>
						</div>

						<div className='form__row'>
							<div className='form__column'>
								<label htmlFor=''>Sucursal de contratación:</label>
								<select name='' id=''>
									<option value='val1'>val1</option>
									<option value='val1'>val1</option>
									<option value='val1'>val1</option>
									<option value='val1'>val1</option>
									<option value='val1'>val1</option>
								</select>
							</div>
							<div className='form__column'>
								<label htmlFor=''>Sucursal designada:</label>
								<select name='' id=''>
									<option value='val1'>val1</option>
									<option value='val1'>val1</option>
									<option value='val1'>val1</option>
									<option value='val1'>val1</option>
									<option value='val1'>val1</option>
								</select>
							</div>
						</div>
						<div className='form__row'>
							<div className='new_user__button accept'>Aceptar</div>
							<div
								className='new_user__button cancel'
								onClick={handleDisplayNewUser}
							>
								Cancelar
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
