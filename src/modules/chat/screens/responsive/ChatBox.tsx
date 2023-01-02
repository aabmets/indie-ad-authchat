import { Spinner } from 'react-bootstrap';
import { usePocketBaseContext } from '@context';
import { useMessagesList, useScrollBehavior } from '@chat';
import { FullUserRecord, ResetScrollButton } from '@chat';
import { MessageCard, NotificationCard } from '@chat';
import styles from './ChatBox.module.css';

function ChatBox() {
	const { messagesList, fetchOlderMessages, isFetching } = useMessagesList();
	const { scrollRef, showResetButton, noMoreMessages, resetScrollState} = useScrollBehavior(
		{ messagesList, fetchOlderMessages, isFetching }
	);
	const pb = usePocketBaseContext();
	const selfUsername = (pb.authStore.model as FullUserRecord).username;
	let previousUsername = '';

	return (
		<div className={styles.chatBoxContainer}>
			<div className={styles.chatBox} ref={scrollRef}>
				{messagesList.length === 0 && !isFetching ?
					<NotificationCard message={'No messages yet.'}/>
				: null}
				{noMoreMessages ?
					<NotificationCard message={'No more messages.'}/>
				: null}
				{isFetching ?
					<div className={styles.loaderWrapper}>
						<Spinner 
							animation='border' 
							variant='primary' 
							role='status' 
						/>
					</div>
				: null}
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
				<ResetScrollButton callback={resetScrollState}/>
			: null}
		</div>
	);
}

export default ChatBox;