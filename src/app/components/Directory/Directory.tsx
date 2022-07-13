import {Link, useNavigate} from 'react-router-dom'
import './Directory.scss'

export default function Directory() {
	const locations = location.pathname
		.split('/')
		.slice(1, location.pathname.split('/').length)
	const navigate = useNavigate()
	return (
		<div className='Directory'>
			{locations.map((value: string, index: number) => {
				return (
					<div key={index} className='directory__location'>
						{index !== 0 ? <p className='location_row'>➤</p> : null}
						<Link
							className='location_name'
							onClick={() => {
								//navigate(`/${locations.slice(0, index + 1).join('/')}`)
							}}
							to={`/${locations.slice(0, index + 1).join('/')}`}
						>
							{value}
						</Link>
					</div>
				)
			})}
		</div>
	)
}
