import { Image } from 'react-bootstrap';
import { useDeviceDetector } from '@hooks';
import { RegisterButton, LoginButton } from '@auth';
import logoResponsive from '/logo-responsive.png';
import logoMobile from '/logo-mobile.png';
import styles from './AuthPage.module.css';

function AuthPage(): JSX.Element {
	const { isMobile } = useDeviceDetector();
	const logo = isMobile ? logoMobile : logoResponsive;

	return (
		<div className={styles.container}>
			<div>
				<Image src={logo} className={styles.logo}/>
				<div className={styles.authBtnGroup}>
					<LoginButton className={styles.authBtn}/>
					<RegisterButton className={styles.authBtn}/>
				</div>
			</div>
		</div>
	);
}

export default AuthPage;