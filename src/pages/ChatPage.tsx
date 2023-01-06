import { useDeviceDetector } from '@hooks';
import { MessageInput, Header } from '@chat';
import { ChatBox, UsersList } from '@chat';
import styles from './ChatPage.module.css';

function ChatPage(): JSX.Element {
	const { isMobile } = useDeviceDetector();
	return (
		<div className={styles.screenContainer}>
			<div className={styles.chatWindow}>
				<Header />
				<div className={styles.chatContent}>
					<ChatBox />
					{!isMobile ?
						<UsersList />
					: null}
				</div>
				<div className={styles.inputField}>
					<MessageInput />
				</div>
			</div>
		</div>
	);
}

export default ChatPage;