import { useState, useRef } from 'react';

export interface FormFieldState {
	ref: React.RefObject<HTMLInputElement>;
	error: string;
	isError: () => boolean;
	setError: (msg: string) => void;
	clearError: () => void;
	getValue: () => string;
}

export function useFormFieldState(): FormFieldState {
	const [error, setError] = useState<string>('');
	const ref = useRef<HTMLInputElement>(null);
	return { 
		ref, 
		error, 
		isError: () => error !== '',
		setError: (msg: string) => setError(msg), 
		clearError: () => setError(''),
		getValue: () => ref.current?.value || '', 
	};
}