import { usePocketBaseContext } from '@context';
import { useMessagesList, useScrollBehavior } from '@chat';
import { FullUserRecord, ScrollResetButton } from '@chat';
import { MessageCard, ChatContentLoader } from '@chat';
import styles from './ChatBox.module.css';

export function ChatBox() {
	const { messagesList, fetchOlderMessages, isFetching } = useMessagesList();
	const { scrollRef, showResetButton, noMoreMessages, resetScrollState } = useScrollBehavior(
		{ messagesList, fetchOlderMessages, isFetching }
	);
	const pb = usePocketBaseContext();
	const selfUsername = (pb.authStore.model as FullUserRecord).username;
	let previousUsername = '';

	return (
		<div className={styles.chatBox}>
			<div className={styles.chatBoxMessages} ref={scrollRef}>
				<ChatContentLoader 
					noMessagesYet={messagesList.length === 0 && !isFetching}
					noMoreMessages={noMoreMessages}
					isFetching={isFetching}
				/>
				{messagesList.map((entry) => {
					const isSelf = (entry.username === selfUsername);
					const isChained = (entry.username === previousUsername);
					previousUsername = entry.username;
					return (
						<MessageCard 
							key={entry.id}
							username={entry.username} 
							message={entry.message}
							created={entry.created}
							isChained={isChained}
							isSelf={isSelf}
						/>
					);
				})}
			</div>
			{showResetButton ?
				<ScrollResetButton callback={resetScrollState}/>
			: null}
		</div>
	);
}