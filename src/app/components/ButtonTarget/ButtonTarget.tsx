import './ButtonTarget.scss'

export default function ButtonTarget(props: {title: string; icon: any}) {
	return (
		<button title={props.title} className='ButtonTarget'>
			{props.icon !== null ? (
				<img src={props.icon} alt={props.title} className='ButtonTarget_icon' />
			) : (
				props.title
			)}
		</button>
	)
}
