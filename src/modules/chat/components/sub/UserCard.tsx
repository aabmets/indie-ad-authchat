import { Image } from 'react-bootstrap';
import { useDeviceDetector } from '@hooks';
import { TypingIndicator } from './TypingIndicator';

export interface UserCardProps {
	username: string;
	icon: string;
	isSelf: boolean;
	isTyping: boolean;
}

export function UserCard({username, icon, isSelf, isTyping}: UserCardProps): JSX.Element {
	const { isMobile } = useDeviceDetector();

	const userCardStyle = {
		display: 'flex', 
		alignItems: 'center', 
		paddingBottom: '10px',
	} satisfies React.CSSProperties;

	const imageStyle = {
		height: isMobile ? '2rem' : '1.5rem', 
		paddingRight: '7px',
	} satisfies React.CSSProperties;

	const textStyle = {
		fontSize: isMobile ? '1.5rem' : '1rem',
		fontWeight: isSelf ? '600' : '400',
	} satisfies React.CSSProperties;

	return (
		<div style={userCardStyle}>
			<Image src={icon} style={imageStyle} />
			<span style={textStyle}>
				{username}
			</span>
			{isTyping ? 
				<TypingIndicator />
			: null}
		</div>
	)
}