import { useState, useEffect } from 'react';
import { RecordSubscription } from 'pocketbase';
import { usePocketBaseContext } from '@context';
import { FullMessageRecord } from '@chat';
import { LeanMessageRecord } from '@chat';
import { MessagesListState } from '@chat';
import appConfig from 'app.config';

export function useMessagesList(): MessagesListState {
	const { networkRequestDelay } = appConfig.chat;
	const [messagesList, setMessagesList] = useState<LeanMessageRecord[]>([]);
	const [isFetching, setFetching] = useState<boolean>(false);
	const pb = usePocketBaseContext();
	
	function trimmedRecord(record: FullMessageRecord): LeanMessageRecord {
		return {
			id: record.id,
			username: record.username,
			message: record.message,
			created: record.created,
		};
	}

	function fetchOlderMessages(): void {
		setFetching(true);
		setTimeout(() => {
			const lastDate = messagesList[0].created;
			const queryParams = {
				filter: `created < '${lastDate}'`, 
				sort: '-created'
			}
			pb.collection('messages').getList(1, 20, queryParams)
				.then((resp) => {
					const messageRecords: LeanMessageRecord[] = resp.items.map(
						(record) => trimmedRecord(record as FullMessageRecord)
					);
					messageRecords.reverse();
					setMessagesList((prevState) => 
						[...messageRecords, ...prevState]
					);
				})
				.catch(() => null)
				.finally(() => setFetching(false));
		}, networkRequestDelay);
	}

	function initMessagesList(): void {
		let date = new Date();
		date.setSeconds(date.getSeconds() + 2);
		const queryParams = { 
			filter: `created <= '${date.toISOString()}'`, 
			sort: '-created'
		};
		setFetching(true);
		setTimeout(() => {
			pb.collection('messages').getList(1, 20, queryParams)
				.then((resp) => {
					const messageRecords: LeanMessageRecord[] = resp.items.map(
						(record) => trimmedRecord(record as FullMessageRecord)
					);
					setMessagesList(messageRecords.reverse());
				})
				.catch(() => null)
				.finally(() => setFetching(false));
		}, networkRequestDelay);
	}

	function updateMessagesList(event: RecordSubscription<FullMessageRecord>): void {
		setMessagesList((prevState) => {
			const newEntry = trimmedRecord(event.record);
			return [...prevState, newEntry];
		});
	}

	useEffect(() => {
		initMessagesList();
		const messages = pb.collection('messages');
		messages.subscribe('*', updateMessagesList).catch(() => null);
		return () => { // cannot return a Promise
			messages.unsubscribe().catch(() => null);
			return;
		};
	}, []);

	return { messagesList, fetchOlderMessages, isFetching };
}