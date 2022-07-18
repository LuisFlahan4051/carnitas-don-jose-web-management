import './Users.scss'
export default function Users() {
	const users: string[] = ['luis', 'Marco', 'Kriss', 'ana', 'Dany']

	function UsuarioButton(props: {usuario: string}) {
		return (
			<button className='users_button'>
				<img src='../../../profile.jpg' alt='User Picture' />
				<p>{props.usuario[0].toLocaleUpperCase() + props.usuario.slice(1)}</p>
			</button>
		)
	}

	return (
		<div className='Users'>
			<div className='users__find'>
				<div className='find_username'>
					<input className='username_input' type='text' placeholder='Usuario' />
					<div className='username_buttons'>
						<button className='username_back'></button>
						<button className='username_next'></button>
					</div>
				</div>

				<div className='find_selector'>
					<div className='selector_users'>
						<div className='users_buttons'>
							{users.map(user => (
								<UsuarioButton usuario={user} key={user} />
							))}
						</div>
					</div>
					<div className='selector_options'>
						<div className='options_add-user'>options add user</div>
					</div>
				</div>
			</div>
			<div className='users__info'>
				<div className='info_target'></div>
			</div>
		</div>
	)
}
