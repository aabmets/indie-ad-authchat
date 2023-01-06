// app configuration settings

const appConfig = {
	style: {
		chatScrolledUpOffset: 200,
		chatContentLoaderHeight: 42,
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
		networkRequestDelay: 200,
	}
}

export default appConfig;