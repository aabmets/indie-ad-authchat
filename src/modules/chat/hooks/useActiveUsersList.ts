import { useState, useEffect } from 'react';
import { RecordSubscription } from 'pocketbase';
import { usePocketBaseContext } from '@context';
import { FullUserRecord, LeanUserRecord } from '../types';

export function useActiveUsersList(): LeanUserRecord[] {
	const [activeUsersList, setActiveUsersList] = useState<LeanUserRecord[]>([]);
	const pb = usePocketBaseContext();

	function trimmedRecord(record: FullUserRecord): LeanUserRecord {
		return {
			id: record.id,
			username: record.username,
			isTyping: record.isTyping,
			active: record.active,
		};
	}

	function sortListAndSurfaceSelf(userRecords: LeanUserRecord[]): LeanUserRecord[] {
		userRecords.sort((a, b) => {
			return (
				a.username < b.username ? 1 :
				a.username > b.username ? -1 : 0
			);
		});
		let selfIndex = 0;
		const selfUsername = (pb.authStore.model as FullUserRecord).username;
		userRecords.forEach((record, index) => {
			if (record.username === selfUsername) {
				selfIndex = index;
			}
		});
		const selfRecord = userRecords.splice(selfIndex, 1);
		return [...selfRecord, ...userRecords];
	}

	function initActiveUsersList(): void {
		pb.collection('users').getFullList(undefined, {filter: 'active = true'})
			.then((records) => {
				console.log(records[0].avatar)
				const userRecords: LeanUserRecord[] = records.map(
					(record) => trimmedRecord(record as FullUserRecord)
				);
				const sortedAndSurfaced = sortListAndSurfaceSelf(userRecords);
				setActiveUsersList(sortedAndSurfaced);
			})
			.catch(() => null);
	}

	function updateUsersList(event: RecordSubscription<FullUserRecord>): void {
		setActiveUsersList((prevState) => {
			let recordIndex = 0;
			const changedRecord: LeanUserRecord = trimmedRecord(
				event.record as FullUserRecord
			);
			const includes = prevState.filter((userRecord, index) => {
				if (userRecord.username === changedRecord.username) {
					recordIndex = index;
					return true;
				}
				return false;
			}).length !== 0;

			const copy = prevState.slice();
			if (changedRecord.active && !includes) {
				copy.push(changedRecord);
			} else if (changedRecord.active && includes) {
				copy.splice(recordIndex, 1, changedRecord);
			} else if (!changedRecord.active && includes) {
				copy.splice(recordIndex, 1);
			}
			return sortListAndSurfaceSelf(copy);
		});
	}

	useEffect(() => {
		initActiveUsersList();
		const users = pb.collection('users');
		users.subscribe('*', updateUsersList)
			.catch(() => null);
		return () => {
			users.unsubscribe()
				.catch(() => null);
			return;
		};
	}, []);

	return activeUsersList;
};