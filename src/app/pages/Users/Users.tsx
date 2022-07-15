import './Users.scss'
export default function Users() {
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
					<div className='selector_users'></div>
					<div className='selector_options'>
						<div className='option_add-user'>Usuarios</div>
					</div>
				</div>
			</div>
			<div className='users__info'>
				<div className='info_target'></div>
			</div>
		</div>
	)
}
