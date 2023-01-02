import { Button } from 'react-bootstrap';
import { usePocketBaseContext } from '@context';
import { FullUserRecord } from '@chat';

export function LogoutButton<P extends object>(buttonProps: P): JSX.Element {
	const pb = usePocketBaseContext();

	function logout() {
		const id = (pb.authStore.model as FullUserRecord).id;
		pb.collection('users').update(id, { active: false })
			.catch(() => null)
			.finally(() => pb.authStore.clear())
	}

	const buttonTextStyle = {
		display: 'inline-block',
		transform: 'translateY(-1px)',
		fontWeight: 600,
	}

	return (
		<Button {...buttonProps} variant='outline-secondary' onClick={logout}>
			<span style={buttonTextStyle}>Log out</span>
		</Button>
	)
}