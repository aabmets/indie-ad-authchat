import { useState } from 'react';
import { Image, Navbar, Offcanvas } from 'react-bootstrap';
import { useDeviceDetector } from '@hooks';
import { LogoutButton } from '@auth';
import { UsersList } from '@chat';
import logo from '/logo-responsive.png';
import styles from './Header.module.css';

export function Header() {
	const [show, setShow] = useState<boolean>(false);
	const { isMobile, isSuperNarrow } = useDeviceDetector();

	const open = () => setShow(true);
	const close = () => setShow(false);

	const placement = isSuperNarrow ? 'top' : 'end';
	const offCanvasStyle = {
		width: isSuperNarrow ? '100%' : '70%',
		height: '100%',
	}

	return (
		<div className={styles.header}>
			<Image src={logo} className={styles.header__logo}/>
			{isMobile ?
				<Navbar expand={false}>
					<Navbar.Toggle onClick={open}/>
					<Offcanvas show={show} onHide={close} placement={placement} style={offCanvasStyle}>
						<Offcanvas.Header closeButton>
          					<Offcanvas.Title>
								<LogoutButton className={styles.header__button}/>
							</Offcanvas.Title>
        				</Offcanvas.Header>
              			<Offcanvas.Body>
							<UsersList/>
             			</Offcanvas.Body>
            		</Offcanvas>
				</Navbar>
			: <LogoutButton className={styles.header__button}/>}
		</div>
	);
}