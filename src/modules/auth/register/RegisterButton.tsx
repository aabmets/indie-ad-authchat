import { Fragment, useState } from 'react';
import { Button, Modal, ModalProps } from 'react-bootstrap';
import { RegisterForm } from './form/RegisterForm';
import { FormStateProvider } from './context';
import { FormState } from './types';

export function RegisterButton<P extends object>(buttonProps: P): JSX.Element {
	const [isBusy, setBusy] = useState<boolean>(false);
	const [opened, setOpened] = useState<boolean>(false);
	
	const openModal = () => setOpened(true);
	const closeModal = () => setOpened(false);

	function preventCloseWhenBusy(event: KeyboardEvent) {
		isBusy ? event.preventDefault() : null;
	}

	const modalProps = {
		show: opened,
		onHide: closeModal,
		backdrop: 'static',
		fullscreen: 'sm-down',
		onEscapeKeyDown: preventCloseWhenBusy,
	} satisfies ModalProps;

	const formState: FormState = {
		isBusy: () => isBusy,
		setBusy: () => setBusy(true),
		setIdle: () => setBusy(false),
		close: closeModal,
	}

	const buttonTextStyle = {
		display: 'inline-block',
		transform: 'translateY(-1px)',
		fontWeight: 600,
	}

	return (
		<Fragment>
			<Button {...buttonProps} variant='danger' onClick={openModal}>
				<span style={buttonTextStyle}>Register</span>
			</Button>
			<Modal {...modalProps} >
				<Modal.Header closeButton={!isBusy}>
					<Modal.Title>Register Account</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<FormStateProvider value={formState}>
						<RegisterForm />
					</FormStateProvider>
				</Modal.Body>
			</Modal>
		</Fragment>
	)
}