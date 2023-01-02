interface Props {
	message: string;
}

export function NotificationCard({ message }: Props): JSX.Element {
	return (
		<div style={{width: '100%', height: '42px', display: 'flex', justifyContent: 'center'}}>
			<div style={{fontSize: '0.8rem', fontWeight: '700', alignSelf: 'center'}}>
				{message}
			</div>
		</div>
	)
}