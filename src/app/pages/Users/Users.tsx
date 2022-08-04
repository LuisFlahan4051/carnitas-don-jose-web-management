import './Users.scss'
import type {UserSimplified} from '../../Types'
import FindUsers from '../../components/FindUsers/FindUsers'

export default function Users(props: {UsersList: UserSimplified[]}) {
	return (
		<div className='Users'>
			<FindUsers UsersList={props.UsersList} />
			<div className='users__info'>
				<div className='info_target'></div>
			</div>
		</div>
	)
}
