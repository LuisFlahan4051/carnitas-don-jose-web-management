import './Users.scss'
import type {User} from '../../Types'
import FindUsers from '../../components/FindUsers/FindUsers'

export default function Users(props: {UsersList: User[]}) {
	return (
		<div className='Users'>
			<FindUsers UsersList={props.UsersList} />
			<div className='users__info'>
				<div className='info_target'></div>
			</div>
		</div>
	)
}
