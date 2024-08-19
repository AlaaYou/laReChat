import { useCallback, useEffect, useRef, useState } from 'react';
import { useEventBus } from '@/EventBus';
import axios from 'axios';
import ConversationHeader from '@/Components/App/ConversationHeader';
import MessageItem from '@/Components/App/MessageItem';
import MessageInput from '@/Components/App/MessageInput';

function ChatLayout({ children, selectedConversation, messages }) {
    const [localMessages, setLocalMessages] = useState([]);
    const [noMoreMessages, setNoMoreMessages] = useState(false);
    const messagesCtrRef = useRef(null);
    const lastMessageRef = useRef(null);
    const { on } = useEventBus();

    // Handle new messages
    const messageCreated = (message) => {
        if (
            selectedConversation &&
            ((selectedConversation.is_group && selectedConversation.id == message.group_id) ||
            (selectedConversation.is_user && (selectedConversation.id === message.sender_id || selectedConversation.id == message.receiver_id)))
        ) {
            setLocalMessages((prevMessages) => [...prevMessages, message]);
        }
    };

    // Load more messages
    const loadMoreMessages = useCallback(() => {
        if (noMoreMessages) return;

        const firstMessage = localMessages[0];
        axios
            .get(route("message.loadOlder", firstMessage.id))
            .then(({ data }) => {
                if (data.data.length === 0) {
                    setNoMoreMessages(true);
                    return;
                }
                setLocalMessages((prevMessages) => [...data.data.reverse(), ...prevMessages]);
            });
    }, [localMessages, noMoreMessages]);

    // Scroll to bottom
    const scrollToBottom = () => {
        if (messagesCtrRef.current) {
            messagesCtrRef.current.scrollTop = messagesCtrRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
        
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((entry) => entry.isIntersecting && loadMoreMessages()),
            { rootMargin: "0px 0px 250px 0px" }
        );

        if (messagesCtrRef.current) {
            observer.observe(messagesCtrRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [localMessages, selectedConversation]);

    useEffect(() => {
        setLocalMessages(messages ? messages.data.reverse() : []);
    }, [messages]);

    useEffect(() => {
        scrollToBottom();
        const offCreated = on('message.created', messageCreated);
        setNoMoreMessages(false);
        return () => {
            offCreated();
        };
    }, [selectedConversation]);

    return (
        <div>
            <ConversationHeader selectedConversation={selectedConversation} />
            <div
                ref={messagesCtrRef}
                className="message-container flex-1 p-5"
            >
                {localMessages.length === 0 && (
                    <div className="flex justify-center items-center h-full">
                        <div className="text-lg text-slate-200">
                            No messages found
                        </div>
                    </div>
                )}
                {localMessages.length > 0 && (
                    <div className="flex-1 flex flex-col">
                        {localMessages.map((message, index) => (
                            <div key={message.id} ref={index === localMessages.length - 1 ? lastMessageRef : null}>
                                <MessageItem message={message} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <MessageInput conversation={selectedConversation} />
        </div>
    );
}

export default ChatLayout;
