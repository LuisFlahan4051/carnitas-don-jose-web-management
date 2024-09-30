import './Users.scss'
import FindUsers from '../../components/FindUsers/FindUsers'
import {useUsersContext} from '../../context/Users/UsersContext'
import {useEffect, useState} from 'react'
import {User} from '../../generated/types/4-users'
import profilePicture from '../../assets/icons/GenericProfilePicture.svg'
import statusProfile from '../../assets/icons/ActiveIcon.svg'
import editProfilePicture from '../../assets/icons/EditIcon.svg'

export default function Users() {
	//TODO: don't user usernamesList, make an entire usersList.
	const {getUsersList}: any = useUsersContext()
	const [usersList, setUsersList] = useState([] as User[])
	useEffect(() => {
		getUsersListHandler()
	}, [])

	const [displayMore, setDisplayMore] = useState(false)
	const [editable, setEditable] = useState(false)

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

	function handleDeleteSelection() {}

	function handleEditSelection() {
		setEditable(!editable)
	}

	return (
		<div className='Users'>
			<FindUsers
				UsersList={usersList}
				onAddUser={handleDisplayNewUser}
				onDelete={handleDeleteSelection}
				onEdit={handleEditSelection}
			/>

			<div className='users__info'>
				<div className={editable ? 'info_target' : 'info_target disable'}>
					<div className='target__display_profile_picture'>
						<div className='profile_picture'>
							<img
								className='profile_picture__status'
								src={statusProfile}
								alt='status'
							/>
							<img
								className='profile_picture__picture'
								src={profilePicture}
								alt='profile picture'
							/>
							<img
								style={editable ? {} : {display: 'none'}}
								className='profile_picture__button_edit'
								src={editProfilePicture}
								alt='editable button'
							/>
						</div>
					</div>
					<form action=''>
						<div className='user_info__form_group info__name'>
							<label htmlFor='name'>Nombres:</label>
							<input type='text' id='name' disabled={!editable} />
						</div>
						<div className='user_info__form_group info__lastname'>
							<label htmlFor='lastname'>Apellidos:</label>
							<input type='text' id='lastname' disabled={!editable} />
						</div>

						<div className='user_info__form_group info__username'>
							<label htmlFor='username'>Nombre de usuario:</label>
							<input type='text' id='username' disabled={!editable} />
						</div>
						<div className='user_info__form_group info__password'>
							<label htmlFor='password'>Contraseña:</label>
							<input type='password' id='password' disabled={!editable} />
						</div>

						<div className='user_info__form_group info__originBranch'>
							<label htmlFor='originBranch'>Sucursal de contratación:</label>
							<select id='originBranch' disabled={!editable}></select>
						</div>
						<div className='user_info__form_group info__currentBranch'>
							<label htmlFor='currentBranch'>Sucursal designada:</label>
							<select id='currentBranch' disabled={!editable}></select>
						</div>

						<div className='user_info__form_group info__checksArea'>
							<div className='form__row checkArea__group'>
								<label htmlFor='verified'>Verificado:</label>
								<input type='checkbox' id='verified' disabled={!editable} />
							</div>
							<div className='form__row checkArea__group'>
								<label htmlFor='warning'>Advertencia:</label>
								<input type='checkbox' id='warning' disabled={!editable} />
							</div>
							<div className='form__row checkArea__group'>
								<label htmlFor='activeContract'>Contrato Activo:</label>
								<input
									type='checkbox'
									id='activeContract'
									disabled={!editable}
								/>
							</div>
						</div>

						<div className='user_info__form_group info__valueRate'>
							<div className='form__row rate__group'>
								<label htmlFor='valueRate'>Valoración:</label>
								<input type='range' id='valueRate' disabled={!editable} />
							</div>
						</div>

						<div
							className='user_info__form_group info__cualities'
							style={displayMore ? {} : {display: 'none'}}
						>
							<label htmlFor='cualities'>Cualidades:</label>
							<textarea id='cualities' disabled={!editable}></textarea>
						</div>
						<div
							className='user_info__form_group info__defects'
							style={displayMore ? {} : {display: 'none'}}
						>
							<label htmlFor='defects'>Defectos:</label>
							<textarea id='defects' disabled={!editable}></textarea>
						</div>
						<div
							className='user_info__form_group info__birthdate'
							style={displayMore ? {} : {display: 'none'}}
						>
							<label htmlFor='birthdate'>Fecha de nacimiento:</label>
							<input type='date' id='birthdate' disabled={!editable} />
						</div>
						<div
							className='user_info__form_group info__address'
							style={displayMore ? {} : {display: 'none'}}
						>
							<label htmlFor='address'>Dirección:</label>
							<input type='text' id='address' disabled={!editable} />
						</div>

						<div
							className='user_info__form_group info__ids'
							style={displayMore ? {} : {display: 'none'}}
						>
							<label htmlFor='curp'>CURP:</label>
							<input type='text' id='curp' disabled={!editable} />
							<label htmlFor='rfc'>RFC:</label>
							<input type='text' id='rfc' disabled={!editable} />
							<label htmlFor='ine'>Numero de INE:</label>
							<input type='text' id='ine' disabled={!editable} />
						</div>

						<div
							className='user_info__form_group info__schoolarGrade'
							style={displayMore ? {} : {display: 'none'}}
						>
							<label htmlFor='schoolarGrade'>Grado de estudios:</label>
							<select id='schoolarGrade' disabled={!editable}></select>
						</div>
						<div
							className='user_info__form_group info__civilStatus'
							style={displayMore ? {} : {display: 'none'}}
						>
							<label htmlFor='civilStatus'>Estado civil:</label>
							<select id='civilStatus' disabled={!editable}></select>
						</div>
					</form>
					<div className='info__buttons'>
						<div
							className='info__see_more'
							onClick={() => setDisplayMore(!displayMore)}
						>
							{displayMore ? 'Ver menos' : 'Ver mas...'}
						</div>

						<div
							className='info__button accept'
							style={editable ? {} : {display: 'none'}}
						>
							Aceptar
						</div>
					</div>
				</div>
			</div>

			<div className='display__new_user hidden' id='display__new_user'>
				<div className='new_user__target'>
					<form action=''>
						<div className='form__row'>
							<div className='new_user__display_picture' onClick={() => {}}>
								<img
									className='new_user__picture'
									src={profilePicture}
									alt='uploadHere'
									draggable='false'
								/>
								<img
									className='new_user__button_edit'
									src={editProfilePicture}
									alt=''
								/>
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
