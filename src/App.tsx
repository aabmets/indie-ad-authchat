import { useState, Fragment } from 'react';
import { usePocketBaseContext } from '@context';
import AuthPage from './pages/AuthPage';
import ChatPage from './pages/ChatPage';
import './App.css';

function App(): JSX.Element {
	const pb = usePocketBaseContext();
	const [isAuthed, setAuthStatus] = useState<boolean>(pb.authStore.isValid);
	pb.authStore.onChange(() =>setAuthStatus(pb.authStore.isValid), false);

	return (
		<Fragment>
			{isAuthed ? <ChatPage/> : <AuthPage/>}
		</Fragment>
	);
}

export default App;