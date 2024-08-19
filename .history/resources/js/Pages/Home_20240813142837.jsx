import ChatLayout from '@/Layouts/ChatLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
import ConversationHeader from '@/Components/App/ConversationHeader';
import MessageItem from '@/Components/App/MessageItem';
import MessageInput from '@/Components/App/MessageInput';
import { useEventBus } from '@/EventBus';
import axios from 'axios';

function Home({ selectedConversation = null, messages = null }) {
    const [localMessages, setLocalMessages] = useState([]);
    const [noMoreMessages, setNoMoreMessages] = useState(false);
    const loadMoreIntersect = useRef(null);
    const messagesCtrRef = useRef(null);
    const lastMessageRef = useRef(null);
    const { on } = useEventBus();

    // Handle incoming messages
    const messageCreated = (message) => {
        if (!selectedConversation) return;

        const isGroupMessage = selectedConversation.is_group && selectedConversation.id === message.group_id;
        const isUserMessage = selectedConversation.is_user &&
            (selectedConversation.id === message.sender_id || selectedConversation.id === message.receiver_id);

        if (isGroupMessage || isUserMessage) {
            setLocalMessages((prevMessages) => {
                const updatedMessages = [...prevMessages, message];
                const uniqueMessages = Array.from(new Set(updatedMessages.map(msg => msg.id)))
                    .map(id => updatedMessages.find(msg => msg.id === id));
                return uniqueMessages;
            });
        }
    };

    // Load older messages when scrolling
    const loadMoreMessages = useCallback(() => {
        if (!selectedConversation || noMoreMessages) return;

        const firstMessage = localMessages[0];
        axios
            .get(route("message.loadOlder", { id: firstMessage.id, conversation_id: selectedConversation.id }))
            .then(({ data }) => {
                if (data.data.length === 0) {
                    setNoMoreMessages(true);
                    return;
                }

                setLocalMessages((prevMessages) => {
                    const updatedMessages = [...data.data.reverse(), ...prevMessages];
                    const uniqueMessages = Array.from(new Set(updatedMessages.map(msg => msg.id)))
                        .map(id => updatedMessages.find(msg => msg.id === id));
                    return uniqueMessages;
                });
            });
    }, [localMessages, noMoreMessages, selectedConversation]);

    // Effect to handle new messages and scroll to bottom
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (messagesCtrRef.current) {
                messagesCtrRef.current.scrollTop = messagesCtrRef.current.scrollHeight;
            }
        }, 100);

        const offCreated = on('message.created', messageCreated);

        return () => {
            clearTimeout(timeoutId);
            offCreated();
        };
    }, [selectedConversation, localMessages]);

    // Effect to handle initial load of messages
    useEffect(() => {
        setLocalMessages(messages ? messages.data.reverse() : []);
    }, [messages, selectedConversation]);

    // Effect to handle scrolling and loading more messages
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((entry) => entry.isIntersecting && loadMoreMessages()),
            {
                rootMargin: "0px 0px 250px 0px",
            }
        );

        if (loadMoreIntersect.current) {
            observer.observe(loadMoreIntersect.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [loadMoreMessages]);

    // Effect to scroll the last message into view
    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [localMessages]);

    return (
        <>
            {!messages && (
                <div className="flex flex-col gap-8 justify-center items-center text-center h-full opacity-35">
                    <div className="text-2xl md:text-4xl p-16 text-slate-200">
                        Please select a conversation to see messages
                    </div>
                    <ChatBubbleLeftRightIcon className="w-32 h-32 inline-block" />
                </div>
            )}
            {messages && (
                <>
                    <ConversationHeader selectedConversation={selectedConversation} />
                    <div ref={messagesCtrRef} className="flex-1 overflow-y-auto p-5">
                        {localMessages.length === 0 && (
                            <div className="flex justify-center items-center h-full">
                                <div className="text-lg text-slate-200">No messages found</div>
                            </div>
                        )}
                        {localMessages.length > 0 && (
                            <div className="flex-1 flex flex-col">
                                <div ref={loadMoreIntersect}></div>
                                {localMessages.map((message, index) => (
                                    <div key={message.id} ref={index === localMessages.length - 1 ? lastMessageRef : null}>
                                        <MessageItem message={message} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <MessageInput conversation={selectedConversation} />
                </>
            )}
        </>
    );
}

Home.layout = (page) => {
    return (
        <AuthenticatedLayout user={page.props.auth.user}>
            <ChatLayout children={page} />
        </AuthenticatedLayout>
    );
};

export default Home;
