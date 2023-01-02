import styles from './TypingIndicator.module.css';

export function TypingIndicator() {
	return (
		<div className={styles.tiContainer}>
			<div className={styles.tiBlock}>
				<div className={styles.tiDot} />
				<div className={styles.tiDot} />
				<div className={styles.tiDot} />
			</div>
		</div>
	)
}