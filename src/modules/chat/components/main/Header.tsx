import { LogoutButton } from '@auth';
import { Image } from 'react-bootstrap';
import logo from '/logo-responsive.png';
import styles from './Header.module.css';

export function Header() {
	return (
		<div className={styles.header}>
			<Image src={logo} className={styles.header__logo}/>
			<LogoutButton className={styles.header__button}/>
		</div>
	);
}