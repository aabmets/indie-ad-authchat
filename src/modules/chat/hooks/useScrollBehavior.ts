import { useRef, useState, useEffect } from 'react';
import { useEventListener } from 'usehooks-ts';
import { MessagesListState } from '@chat';
import { ScrollBehaviorState } from '@chat';
import appConfig from 'app.config';

export function useScrollBehavior(messagesListState: MessagesListState): ScrollBehaviorState {
	const { messagesList, fetchOlderMessages } = messagesListState;
	const { chatContentLoaderHeight, chatScrolledUpOffset } = appConfig.style;
	const [showResetButton, setResetButtonStatus] = useState<boolean>(false);
	const [moreMessages, setMoreMessages] = useState<boolean>(true);
	const [scrollOffset, setScrollOffset] = useState<number>(0);
	const [isBusy, setBusy] = useState<boolean>(false);
	const scrollRef = useRef<HTMLDivElement | null>(null);

	function resetScrollState() {
		const element = scrollRef.current;
		if (element) {
			element.scrollTop = element.scrollHeight - element.clientHeight;
			setResetButtonStatus(false);
		}
	}

	useEventListener('scroll', (event) => {
		const el = event.target as HTMLDivElement;
		if (el.scrollTop === 0 && moreMessages) {
			setScrollOffset(el.scrollHeight - el.clientHeight);
			fetchOlderMessages();
			setBusy(true);
		} else {
			const bottomPosition = el.scrollHeight - el.clientHeight;
			const hasScrolledUp = el.scrollTop < (bottomPosition - chatScrolledUpOffset);
			if (hasScrolledUp && !showResetButton) {
				setResetButtonStatus(true);
			} else if (showResetButton && !hasScrolledUp) {
				setResetButtonStatus(false);
			}
		}
	}, scrollRef);

	useEffect(() => {
		const el = scrollRef.current;
		if (el && !isBusy && !showResetButton) {
			el.scrollTop = el.scrollHeight - el.clientHeight;
			setScrollOffset(el.scrollTop);
		} else if (el && isBusy) {
			el.scrollTop = el.scrollHeight - el.clientHeight - scrollOffset - chatContentLoaderHeight;
			if (el.scrollTop === 0) {
				setMoreMessages(false);
			}
			setBusy(false);
		}
	}, [messagesList]);

	return { 
		scrollRef, 
		showResetButton, 
		noMoreMessages: !moreMessages, 
		resetScrollState,
	};
}