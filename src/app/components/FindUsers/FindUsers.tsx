import './FindUsers.scss'
import btnRow from './imgs/btnRow.svg'
import addIcon from './imgs/addIcon.svg'
import editIcon from './imgs/EditFileIcon.svg'
import trash from './imgs/trash.svg'
import {useState} from 'react'
import {User} from '../../generated/types/4-users'
import profilePicture from '../../assets/icons/GenericProfilePicture.svg'
export default function FindUsers(props: {
	UsersList: User[]
	onAddUser: () => void
	onDelete: () => void
	onEdit: () => void
}) {
	const [search, setSearch] = useState('')

	const UsersList: User[] = []
	props.UsersList.map(user => {
		const mainEmail = user.user_mails ? user.user_mails[0] : ''
		if (
			(search !== '' && user.username?.includes(search)) ||
			user.username?.includes(search.toLocaleLowerCase()) ||
			user.name?.includes(search) ||
			user.name?.includes(search[0].toLocaleUpperCase() + search.slice(1)) ||
			user.lastname?.includes(search) ||
			user.lastname?.includes(
				search[0].toLocaleUpperCase() + search.slice(1)
			) ||
			mainEmail.includes(search)
		) {
			UsersList.push(user)
		}
		return null
	})

	function UsuarioButton(props: {usuario: string; id: string}) {
		return (
			<button
				className='users_button'
				type='button'
				onClick={() => console.log(props.id)}
			>
				<img src={profilePicture} alt='User Picture' />
				<p>{props.usuario[0].toLocaleUpperCase() + props.usuario.slice(1)}</p>
			</button>
		)
	}

	return (
		<div className='users__finder'>
			<div className='finder_inputUsername'>
				<input
					className='inputUsername_input'
					type='text'
					placeholder='Usuario'
					onChange={e => setSearch(e.target.value)}
				/>

				<div className='inputUsername_buttons'>
					<button className='inputUsername_back'>
						<img className='back_img' src={btnRow} alt='Row' />
					</button>

					<button className='inputUsername_next'>
						<img className='next_img' src={btnRow} alt='Row' />
					</button>
				</div>
			</div>

			<div className='finder_selector'>
				<div className='selector_users'>
					<div className='users_buttons'>
						{search
							? UsersList.map((user, index) => (
									<UsuarioButton
										usuario={user.username ?? ''}
										id={user.id.id ?? ''}
										key={index}
									/>
							  ))
							: props.UsersList.map((user, index) => (
									<UsuarioButton
										usuario={user.username ?? ''}
										id={user.id.id ?? ''}
										key={index}
									/>
							  ))}
					</div>
				</div>

				<div className='selector_options'>
					<div className='option option_add-user' onClick={props.onAddUser}>
						<img className='option_icon' src={addIcon} alt='Add User' />
					</div>
					<div className='option option_add-user' onClick={props.onEdit}>
						<img className='option_icon' src={editIcon} alt='Add User' />
					</div>
					<div className='option option_add-user' onClick={props.onDelete}>
						<img className='option_icon' src={trash} alt='Add User' />
					</div>
				</div>
			</div>
		</div>
	)
}
