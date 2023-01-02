import { MessageInput } from '@chat';
import UsersList from './UsersList';
import ChatBox from './ChatBox';
import Header from './Header';
import styles from './ResponsiveChatWindow.module.css';

export function ResponsiveChatWindow(): JSX.Element {
	return (
		<div className={styles.screenContainer}>
			<div className={styles.chatWindow}>
				<Header />
				<div className={styles.chatContent}>
					<ChatBox />
					<UsersList />
				</div>
				<div className={styles.inputField}>
					<MessageInput />
				</div>
			</div>
		</div>
	);
}