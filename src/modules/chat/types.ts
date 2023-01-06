import { Record } from 'pocketbase';

export interface FullUserRecord extends Record {
	id: string;
	username: string;
	isTyping: boolean;
	active: boolean;
	[key: string]: any;
}

export interface FullMessageRecord extends Record {
	id: string;
	username: string;
	message: string;
	created: string;
	[key: string]: any;
}

export interface LeanUserRecord {
	id: string;
	username: string;
	isTyping: boolean;
	active: boolean;
}

export interface LeanMessageRecord {
	id: string;
	username: string;
	message: string;
	created: string;
}

export interface MessagesListState {
	messagesList: LeanMessageRecord[];
	fetchOlderMessages: () => void;
	isFetching: boolean;
}

export interface ScrollBehaviorState {
	scrollRef: React.MutableRefObject<HTMLDivElement | null>;
	showResetButton: boolean;
	noMoreMessages: boolean;
	resetScrollState: () => void;
}

export interface ChatContentLoaderProps {
	noMoreMessages?: boolean;
	noMessagesYet?: boolean;
	isFetching?: boolean;
}