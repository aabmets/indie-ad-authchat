import { Image } from 'react-bootstrap';
import { RegisterButton, LoginButton } from '@auth';
import { useMediaQuery } from 'react-responsive';
import logoResponsive from '/logo-responsive.png';
import logoMobile from '/logo-mobile.png';
import styles from './AuthPage.module.css';
import appConfig from 'app.config';

function AuthPage(): JSX.Element {
	const size = appConfig.style.mobileScreenMaxWidth;
	const isMobile = useMediaQuery({ query: `(max-width: ${size}px)` });
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