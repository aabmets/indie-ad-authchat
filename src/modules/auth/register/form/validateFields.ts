import validator from 'password-validator'; // also used as username validator
import { FormFields } from '../types';
import appConfig from 'app.config';

type ValidatorResults = {
    message: string,
	[key: string]: any,
}[];

export function validateFields(formFields: FormFields): boolean {
	const { uname, pw1, pw2 } = formFields;
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
		.has().not().spaces(undefined, 'Username cannot contain any spaces.') 
	const unameErrors = unameSchema.validate(unameValue, { details: true }) as ValidatorResults;

	// display only the first error
	if (unameErrors.length > 0) {
		uname.setError(unameErrors[0].message);
		isValid = false;
	}

	// validate the first password
	const pw1Value = pw1.getValue();
	const minPw = auth.minPasswordLength;
	const maxPw = auth.maxPasswordLength;
	const pw1Schema = new validator();
	const equal = () => unameValue === pw1Value;
	pw1Schema
		.is().min(minPw, `Password must be at least ${minPw} characters long.`)
		.is().max(maxPw, `Password cannot be longer than ${maxPw} characters.`)
		.has().uppercase(1, 'Password must contain at least one uppercase character.')
		.has().lowercase(1, 'Password must contain at least one lowercase character.')
		.has().digits(1, 'Password must contain at least one number.')
		.has().not().spaces(undefined, 'Password cannot contain any spaces.') 
		.is().not().usingPlugin(equal, 'Password cannot be the same as the username.')
	const pw1Errors = pw1Schema.validate(pw1Value, { details: true }) as ValidatorResults;
	
	// display only the first error
	if (pw1Errors.length > 0) {
		pw1.setError(pw1Errors[0].message);
		isValid = false;
	}

	// validate the second password
	const pw2Value = pw2.getValue();
	if (pw2Value !== pw1Value) {
		pw2.setError('Passwords do not match.');
		isValid = false;
	}
	
	return isValid;
}