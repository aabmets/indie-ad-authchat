import { Fragment } from 'react';
import { Spinner } from 'react-bootstrap';
import appConfig from 'app.config';

interface ChatContentLoaderProps {
	noMoreMessages?: boolean;
	noMessagesYet?: boolean;
	isFetching?: boolean;
}

export function ChatContentLoader(props: ChatContentLoaderProps): JSX.Element {
	const { noMoreMessages, noMessagesYet, isFetching } = props;
	const { chatContentLoaderHeight } = appConfig.style;
	const paddingTop = 10;

	const loaderStyle = {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		paddingTop: `${paddingTop}px`,
		height: chatContentLoaderHeight,
	} satisfies React.CSSProperties;

	const loaderTextStyle = {
		fontSize: '0.85rem',
		fontWeight: 700, 
		alignSelf: 'center',
	} satisfies React.CSSProperties;

	if (noMoreMessages) {
		return (
			<div style={loaderStyle}>
				<span style={loaderTextStyle}>No more messages.</span>
			</div>
		);
	} else if (noMessagesYet) {
		return (
			<div style={loaderStyle}>
				<span style={loaderTextStyle}>No messages yet.</span>
			</div>
		)
	} else if (isFetching) {
		return (
			<div style={loaderStyle}>
				<Spinner animation='border' variant='primary' role='status'/>
			</div>
		);
	} else {
		return <Fragment />
	}
}