export function getMessageCardTitle(username: string, created: string): string {
	const date = new Date(created);
	const tzo = date.getTimezoneOffset();
	date.setMinutes(date.getMinutes() - tzo);
	let dateArray = date.toUTCString().split(' ');
	dateArray.shift();
	dateArray.pop();
	dateArray = [...dateArray.splice(0, 3), '-', ...dateArray];
	return `Said by ${username} on:\n${dateArray.join(' ')}`;
}