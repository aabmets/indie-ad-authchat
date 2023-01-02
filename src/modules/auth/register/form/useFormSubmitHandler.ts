import { ClientResponseError } from 'pocketbase';
import { validateFields } from './validateFields';
import { useFormStateContext } from '../context';
import { usePocketBaseContext } from '@context';
import { FormFields } from '../types';
import appConfig from 'app.config';

type FormEvent = React.FormEvent<HTMLFormElement>;
type FormSubmitHandler = (e: FormEvent) => void;

export function useFormSubmitHandler(formFields: FormFields): FormSubmitHandler {
	const pb = usePocketBaseContext();
	const form = useFormStateContext();
	const { uname, pw1, pw2 } = formFields;
	const { auth } = appConfig;

	const notifyUnameError = () => uname.setError('Username already exists.');
	const alertLogin = () => alert('New account created successfully, please log in.');
	const alertError = () => alert('Something went wrong, please try again.');

	return (e: FormEvent) => {
		e.preventDefault();
		if (validateFields(formFields)) {
			form.setBusy();
			setTimeout(() => {
				const username = uname.getValue();
				const password = pw1.getValue();
				const passwordConfirm = pw2.getValue();
				pb.collection('users').create({ username, password, passwordConfirm })
					.then(() => {
						pb.collection('users').authWithPassword(username, password)
							.then((resp) => {
								const id = resp.record.id;
								pb.collection('users').update(id, { active: true })
									.catch(alertError);
							})
							.catch(() => {
								alertLogin();
								form.setIdle();
								form.close();
							});
					})
					.catch((error: ClientResponseError) => {
						form.setIdle();
						if (error.status === 400) {
							notifyUnameError();
						} else {
							alertError();
							form.close();
						}
					});
			}, auth.formSubmitDelay);
		}
	}
}