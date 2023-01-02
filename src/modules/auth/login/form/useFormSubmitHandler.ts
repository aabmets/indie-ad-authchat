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
	const { uname, pw } = formFields;
	const { auth } = appConfig;

	const alertCredentials = () => alert('Invalid username and/or password.');
	const alertError = () => alert('Something went wrong, please try again.');

	return (e: FormEvent) => {
		e.preventDefault();
		if (validateFields({ uname, pw })) {
			form.setBusy();
			setTimeout(() => {
				const username = uname.getValue();
				const password = pw.getValue();
				pb.collection('users').authWithPassword(username, password)
					.then((resp) => {
						const id = resp.record.id;
						pb.collection('users').update(id, { active: true })
							.catch(alertError);
					})
					.catch((error: ClientResponseError) => {
						if (error.status === 400) {
							alertCredentials();
						} else {
							alertError();
						}
						form.setIdle();
					});
			}, auth.formSubmitDelay);
		}
	}
}