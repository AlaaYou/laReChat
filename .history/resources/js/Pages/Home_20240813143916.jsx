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
    const messagesCtrRef = useRef(null);
    const loadMoreIntersect = useRef(null);
    const { on } = useEventBus();

    const messageCreated = useCallback((message) => {
        if (selectedConversation) {
            if (selectedConversation.is_group && selectedConversation.id === message.group_id) {
                setLocalMessages((prevMessages) => [...prevMessages, message]);
            } else if (selectedConversation.is_user && (selectedConversation.id === message.sender_id || selectedConversation.id === message.receiver_id)) {
                setLocalMessages((prevMessages) => [...prevMessages, message]);
            }
        }
    }, [selectedConversation]);

    const loadMoreMessages = useCallback(() => {
        if (noMoreMessages || !messagesCtrRef.current) return;

        const firstMessage = localMessages[0];
        axios.get(route("message.loadOlder", firstMessage.id))
            .then(({ data }) => {
                if (data.data.length === 0) {
                    setNoMoreMessages(true);
                    return;
                }

                setLocalMessages((prevMessages) => [...data.data.reverse(), ...prevMessages]);
            });
    }, [localMessages, noMoreMessages]);

    useEffect(() => {
        const scrollToBottom = () => {
            if (messagesCtrRef.current) {
                messagesCtrRef.current.scrollTop = messagesCtrRef.current.scrollHeight;
            }
        };

        if (messagesCtrRef.current) {
            scrollToBottom();
        }

        const offCreated = on('message.created', messageCreated);
        setNoMoreMessages(false);
        return () => {
            offCreated();
        };
    }, [selectedConversation, on, messageCreated]);

    useEffect(() => {
        setLocalMessages(messages ? messages.data.reverse() : []);
    }, [messages]);

    useEffect(() => {
        if (messagesCtrRef.current) {
            const observer = new IntersectionObserver(
                (entries) => entries.forEach(
                    (entry) => entry.isIntersecting && loadMoreMessages()
                ),
                { rootMargin: "0px 0px 250px 0px" }
            );

            if (loadMoreIntersect.current) {
                observer.observe(loadMoreIntersect.current);
            }

            return () => {
                observer.disconnect();
            };
        }
    }, [localMessages, loadMoreMessages]);

    return (
        <>
            {!messages && (
                <div className="flex flex-col gap-8 justify-center items-center text-center h-full opacity-35">
                    <div className="text-2xl md:text-4xl p-16 text-slate-200 ">
                        Please select a conversation to see messages
                    </div>
                    <ChatBubbleLeftRightIcon className="w-32 h-32 inline-block" />
                </div>
            )}
            {messages && (
                <>
                    <ConversationHeader selectedConversation={selectedConversation} />
                    <div
                        ref={messagesCtrRef}
                        className="flex-1 overflow-y-auto p-5"
                    >
                        {localMessages.length === 0 && (
                            <div className="flex justify-center items-center h-full ">
                                <div className="text-lg text-slate-200">
                                    No messages found
                                </div>
                            </div>
                        )}
                        {localMessages.length > 0 && (
                            <div className="flex-1 flex flex-col">
                                <div ref={loadMoreIntersect}></div>
                                {localMessages.map((message) => (
                                    <div key={message.id}>
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
