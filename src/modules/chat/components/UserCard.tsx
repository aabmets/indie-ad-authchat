import { Image } from 'react-bootstrap';
import { TypingIndicator } from './TypingIndicator';

export interface UserCardProps {
	username: string;
	icon: string;
	isSelf: boolean;
	isTyping: boolean;
}

export function UserCard({username, icon, isSelf, isTyping}: UserCardProps): JSX.Element {
	return (
		<div style={{display: 'flex', alignItems: 'center', paddingBottom: '10px'}}>
			<Image src={icon} style={{height: '1.5rem', paddingRight: '7px'}} />
			<span style={isSelf ? {fontWeight: '600'} : {fontWeight: '400'}}>
				{username}
			</span>
			{isTyping ? 
				<TypingIndicator />
			: null}
		</div>
	)
}