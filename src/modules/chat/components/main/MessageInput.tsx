import { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { usePocketBaseContext } from '@context';
import { FullUserRecord } from '@chat';
import submitBtn from '/submit.png';

export function MessageInput() {
	const [message, setMessage] = useState<string>('');
	const pb = usePocketBaseContext();

	function submitHandler() {
		if (pb.authStore.isValid && message !== '') {
			const username = (pb.authStore.model as FullUserRecord).username;
			pb.collection('messages').create({ username, message })
				.then(() => {
					const record = (pb.authStore.model as FullUserRecord);
					pb.collection('users').update(record.id, { isTyping: false })
						.catch(() => null);
					setMessage('')
				})
				.catch(() => alert('Something went wrong, please try again.'));
		}
	}
	function onChangeHandler(newState: string) {
		const record = (pb.authStore.model as FullUserRecord);
		if (newState.length > 0 && !record.isTyping) {
			pb.collection('users').update(record.id, { isTyping: true })
				.catch(() => null);
		} else if (newState.length == 0 && record.isTyping) {
			pb.collection('users').update(record.id, { isTyping: false })
				.catch(() => null);
		}
		setMessage(newState);
	}

	const buttonStyle = {
		display: 'flex', 
		alignItems: 'center', 
		height: '2rem', 
		borderColor: '#c3cbd5'
	}

	return (
		<InputGroup style={{padding: '10px'}}>
			<Form.Control 
				value={message}
				placeholder='Your message...'
				onChange={(e) => onChangeHandler(e.currentTarget.value)}
				onKeyDown={(e) => (e.key === 'Enter' ? submitHandler() : null)}
				style={{height: '2rem'}} 
			/>
			<Button variant='outline-light' onClick={submitHandler} disabled={message === ''} style={buttonStyle}>
				<img src={submitBtn} alt='Submit' style={{height: '100%'}}/>
			</Button>
		</InputGroup>
	)
}