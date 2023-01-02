import { Button, Form, InputGroup, Spinner } from 'react-bootstrap';
import { useFormSubmitHandler } from './useFormSubmitHandler';
import { useFormStateContext } from '../context';
import { useFormFieldState } from '@auth';

export function LoginForm(): JSX.Element {
	const form = useFormStateContext();
	const uname = useFormFieldState();
	const pw = useFormFieldState();
	
	const formSubmitHandler = useFormSubmitHandler({ uname, pw });

	return (
		<Form onSubmit={(e) => formSubmitHandler(e)}>
			<Form.Group className='mb-3' controlId='formUserName'>
				<Form.Label>Username</Form.Label>
				<InputGroup hasValidation>
					<InputGroup.Text id='inputGroupPrepend'>@</InputGroup.Text>
					<Form.Control 
						autoFocus
						ref={uname.ref}
						onChange={uname.clearError}
						isInvalid={uname.isError()}
						disabled={form.isBusy()}
						placeholder='Your username'
						type='text'
					/>
					<Form.Control.Feedback type='invalid'>
						{uname.error}
					</Form.Control.Feedback>
				</InputGroup>
			</Form.Group>

			<Form.Group className='mb-3' controlId='formPassword'>
				<Form.Label>Password</Form.Label>
				<Form.Control 
					ref={pw.ref}
					onChange={pw.clearError}
					isInvalid={pw.isError()}
					disabled={form.isBusy()}
					placeholder='Your password'
					type='password' 
				/>
				<Form.Control.Feedback type='invalid'>
					{pw.error}
				</Form.Control.Feedback>
			</Form.Group>

			<div style={{paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
				<Button variant='secondary' type='button' disabled={form.isBusy()} onClick={form.close}>
					Back
				</Button>
				<div style={{display: 'flex', alignItems: 'flex-end'}}>
					{form.isBusy() ?
						<span style={{paddingRight: '15px', transform: 'scale(0.8)'}}>
							<Spinner animation='border' variant='primary' />
						</span>
					: null}
					<Button variant='primary' type='submit' disabled={form.isBusy()}>
						Submit
					</Button>
				</div>
			</div>
		</Form>
	)
}