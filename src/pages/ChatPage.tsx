import { Fragment } from 'react';
import { useMediaQuery } from 'react-responsive';
import { ResponsiveChatWindow } from '@chat';
import { MobileChatWindow } from '@chat';
import appConfig from 'app.config';

function ChatPage(): JSX.Element {
	const size = appConfig.style.mobileScreenMaxWidth;
	const isMobile = useMediaQuery({ query: `(max-width: ${size}px)` });

	return (
		<Fragment>
			{isMobile ? <MobileChatWindow/> : <ResponsiveChatWindow/>}
		</Fragment>
	);
}

export default ChatPage;