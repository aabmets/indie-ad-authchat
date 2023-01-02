// app configuration settings

const appConfig = {
	style: {
		mobileScreenMaxWidth: 500,
		superNarrowMaxWidth: 300,
	},
	pocketBase: {
		serverAddress: 'http://127.0.0.1:8090',
	},
	auth: {
		minUsernameLength: 5,
		maxUsernameLength: 12,
		minPasswordLength: 8,
		maxPasswordLength: 40,
		formSubmitDelay: 500,
	},
	chat: {
		messageFetchDelay: 200,
	}
}

export default appConfig;