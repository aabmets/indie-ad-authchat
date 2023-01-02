import { Image } from 'react-bootstrap';
import { useDeviceDetector } from '@hooks';
import { getMessageCardTitle } from '@chat';
import othersAvatar from '/others-avatar.png';
import selfAvatar from '/self-avatar.png';
import blankAvatar from '/blank-avatar.png';

export interface MessageCardProps {
	username: string;
	message: string;
	created: string;
	isChained: boolean;
	isSelf: boolean;
}

export function MessageCard(props: MessageCardProps): JSX.Element {
	const { username, message, created, isChained, isSelf } = props;
	const icon = isChained ? blankAvatar : (isSelf ? selfAvatar : othersAvatar);
	const pix = (isChained ? '5px' : '10px');

	const cardHoverTitle = getMessageCardTitle(username, created);
	const { isMobile } = useDeviceDetector();

	const flexColumnStyle = {
		display: 'flex', 
		flexDirection: 'column',
	} satisfies React.CSSProperties;

	const flexRowStyle = {
		width: '100%', 
		display: 'flex',
		flexDirection: 'row',
		justifyContent: isSelf ? 'flex-end' : 'flex-start',
	} satisfies React.CSSProperties;

	const componentContainerStyle = {
		...flexRowStyle,
		padding: `${pix} 10px 0px 10px`,
	} satisfies React.CSSProperties;

	const textGroupStyle = {
		...flexColumnStyle, 
		width: '100%'
	} satisfies React.CSSProperties;

	const userNameStyle = {
		...flexRowStyle,
		fontWeight: isSelf ? 600 : 400,
	} satisfies React.CSSProperties;

	const userIconStyle = {
		width: '50px',
		height: (isChained ? 'auto' : '40px'),
		paddingRight: isSelf ? '0px' : '10px',
		paddingLeft: isSelf ? '10px' : '0px',
		marginTop: '3px',
	} satisfies React.CSSProperties;

	const messageBoxStyle = {
		maxWidth: isMobile ? '100%' : '70%',
		borderRadius: '10px',
		paddingRight: '15px',
		whiteSpace: 'normal',
		wordWrap: 'break-word',
		backgroundColor: '#decd9e',
	} satisfies React.CSSProperties;

	const messageTextStyle = {
		transform: 'translateX(7px)',
	} satisfies React.CSSProperties;

	return (
		<div style={componentContainerStyle}>
			{!isSelf ?
				<div style={flexColumnStyle}>
					<Image src={icon} style={userIconStyle}/>
				</div>
			: <Image src={blankAvatar} style={userIconStyle}/>}
			<div style={textGroupStyle}>
				{!isChained ?
					<div style={userNameStyle}>
						{username}
					</div>
				: null}
				<div style={flexRowStyle}>
					<div style={messageBoxStyle} title={cardHoverTitle}>
						<div style={messageTextStyle}>
							{message}
						</div>
					</div>
				</div>
			</div>
			{isSelf ?
				<div style={flexColumnStyle}>
					<Image src={icon} style={userIconStyle}/>
				</div>
			: <Image src={blankAvatar} style={userIconStyle}/>}
		</div>
	);
}