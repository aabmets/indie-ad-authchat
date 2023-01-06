import { Button, Image } from 'react-bootstrap';
import styles from './ScrollResetButton.module.css';
import downArrow from '/downward-arrow.png';

interface Props {
	callback: () => void;
}

export function ScrollResetButton({ callback }: Props): JSX.Element {
	return (
		<div className={styles.btnContainer}>
			<div className={styles.centerAlign}>
				<div>
					<Button size='sm' variant='primary' onClick={callback} className={styles.buttonBody}>
						<div className={styles.buttonText}>Back to newest</div>
					</Button>
					<div className={styles.centerAlign}>
						<Image src={downArrow} alt='' className={styles.downArrow}/>
					</div>
				</div>
			</div>
		</div>
	);
}