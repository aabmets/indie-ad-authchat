import validator from 'password-validator';
import { FormFields } from '../types';
import appConfig from 'app.config';

type ValidatorResults = {
    message: string,
	[key: string]: any,
}[];

export function validateFields(formFields: FormFields): boolean {
	const { uname, pw } = formFields;
	const { auth } = appConfig;
	let isValid = true;

	// validate the username
	const unameValue = uname.getValue();
	const minUname = auth.minUsernameLength;
	const maxUname = auth.maxUsernameLength;
	const unameSchema = new validator();
	unameSchema
		.is().min(minUname, `Username must be at least ${minUname} characters long.`)
		.is().max(maxUname, `Username cannot be longer than ${maxUname} characters.`)
	const unameErrors = unameSchema.validate(unameValue, { details: true }) as ValidatorResults;

	// display only the first error
	if (unameErrors.length > 0) {
		uname.setError(unameErrors[0].message);
		isValid = false;
	}

	// validate the password
	const pwValue = pw.getValue();
	const minPw = auth.minPasswordLength;
	const maxPw = auth.maxPasswordLength;
	const pwSchema = new validator();
	pwSchema
		.is().min(minPw, `Password must be at least ${minPw} characters long.`)
		.is().max(maxPw, `Password cannot be longer than ${maxPw} characters.`)
	const pwErrors = pwSchema.validate(pwValue, { details: true }) as ValidatorResults;
	
	// display only the first error
	if (pwErrors.length > 0) {
		pw.setError(pwErrors[0].message);
		isValid = false;
	}
	
	return isValid;
}