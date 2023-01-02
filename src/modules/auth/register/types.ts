import { FormFieldState } from '@auth';

export interface FormState {
	isBusy: () => boolean;
	setBusy: () => void;
	setIdle: () => void;
	close: () => void;
}

export interface FormFields {
	uname: FormFieldState;
	pw1: FormFieldState;
	pw2: FormFieldState;
}