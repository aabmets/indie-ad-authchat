import { Fragment } from 'react';
import { Spinner } from 'react-bootstrap';
import { ChatContentLoaderProps } from '@chat';
import appConfig from 'app.config';

type Wrapper = { children: JSX.Element | JSX.Element[] };

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

	const Wrapper = ({ children }: Wrapper) =>
		<div style={loaderStyle}>{children}</div>;

	if (noMoreMessages) {
		return (
			<Wrapper>
				<span style={loaderTextStyle}>No more messages.</span>
			</Wrapper>
		);
	} else if (noMessagesYet) {
		return (
			<Wrapper>
				<span style={loaderTextStyle}>No messages yet.</span>
			</Wrapper>
		)
	} else if (isFetching) {
		return (
			<Wrapper>
				<Spinner animation='border' variant='primary' role='status'/>
			</Wrapper>
		);
	} else {
		return <Fragment />
	}
}