import { usePocketBaseContext } from '@context';
import { UserCard, FullUserRecord } from '@chat';
import { useActiveUsersList } from '@chat';
import othersAvatar from '/others-avatar.png';
import selfAvatar from '/self-avatar.png';
import styles from './UsersList.module.css';

function UsersList(): JSX.Element {
	const pb = usePocketBaseContext();
	const activeUsers = useActiveUsersList();

	const selfUsername = (pb.authStore.model as FullUserRecord).username;

	return (
		<div className={styles.usersList__container}>
			<div className={styles.usersList__header}>
				<div>
					<span className={styles.usersList__headerText}>ACTIVE USERS: </span>
					<span className={styles.usersList__headerCount}>{activeUsers.length}</span>
				</div>
			</div>
			<div className={styles.usersList__content}>
				{activeUsers.map((record) => {
					const isSelf = (record.username === selfUsername);
					const icon = (isSelf ? selfAvatar : othersAvatar);
					return (
						<UserCard 
							key={record.id}
							username={record.username} 
							isTyping={record.isTyping}
							isSelf={isSelf} 
							icon={icon} 
						/>
					);
				})}
			</div>
		</div>
	);
}

export default UsersList;