import { useEffect, useRef, useState } from "react";
import ConversationItem from "@/Components/App/ConversationItem";
import TextInput from "@/Components/TextInput";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { usePage } from "@inertiajs/react";
import { useEventBus } from "@/EventBus";

const ChatLayout = ({ children }) => {
    const page = usePage();
    const conversations = page.props.conversations;
    const selectedConversation = page.props.selectedConversation;
    const [localConversations, setLocalConversations] = useState([]);
    const [sortedConversations, setSortedConversations] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState({});
    const { on } = useEventBus();

    const isUserOnline = (userId) => onlineUsers[userId];

    const onSearch = (ev) => {
        const search = ev.target.value.toLowerCase();
        setLocalConversations(
            conversations.filter((conversation) =>
                conversation.name.toLowerCase().includes(search)
            )
        );
    };

    const containerRef = useRef(null);

    useEffect(() => {
        // Scroll to bottom when conversation or children change
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [children, selectedConversation]);

    const messageCreated = (message) => {
        setLocalConversations((oldConversations) => {
            return oldConversations.map((conversation) => {
                if (
                    (message.receiver_id && !conversation.is_group &&
                        (conversation.id === message.sender_id || conversation.id === message.receiver_id)) ||
                    (message.group_id && conversation.is_group && conversation.id === message.group_id)
                ) {
                    return {
                        ...conversation,
                        last_message: message.message,
                        last_message_date: message.created_at
                    };
                }
                return conversation;
            });
        });
    };

    useEffect(() => {
        setSortedConversations(
            localConversations.sort((a, b) => {
                if (a.blocked_at && b.blocked_at) {
                    return a.blocked_at > b.blocked_at ? 1 : -1;
                }
                if (a.blocked_at) {
                    return 1;
                }
                if (b.blocked_at) {
                    return -1;
                }
                if (a.last_message_date && b.last_message_date) {
                    return b.last_message_date.localeCompare(a.last_message_date);
                }
                if (a.last_message_date) {
                    return -1;
                }
                if (b.last_message_date) {
                    return 1;
                }
                return 0;
            })
        );
    }, [localConversations]);

    useEffect(() => {
        const offCreated = on("message.created", messageCreated);
        return () => {
            offCreated();
        };
    }, [on]);

    useEffect(() => {
        setLocalConversations(conversations);
    }, [conversations]);

    useEffect(() => {
        Echo.join("online")
            .here((users) => {
                const onlineUsersObj = Object.fromEntries(
                    users.map((user) => [user.id, user])
                );
                setOnlineUsers((prevOnlineUsers) => ({
                    ...prevOnlineUsers,
                    ...onlineUsersObj,
                }));
            })
            .joining((user) => {
                setOnlineUsers((prevOnlineUsers) => ({
                    ...prevOnlineUsers,
                    [user.id]: user,
                }));
            })
            .leaving((user) => {
                setOnlineUsers((prevOnlineUsers) => {
                    const updatedUsers = { ...prevOnlineUsers };
                    delete updatedUsers[user.id];
                    return updatedUsers;
                });
            })
            .error((error) => {
                console.error("Echo error:", error);
            });

        return () => {
            Echo.leave("online");
        };
    }, []);

    return (
        <div className="flex h-screen overflow-hidden bg-gray-900 text-white">
            {/* Conversation List */}
            <div
                className={`bg-slate-800 flex flex-col w-full sm:w-72 md:w-80 ${
                    selectedConversation ? 'hidden sm:flex' : 'flex'
                }`}
            >
                <div className="flex items-center justify-between py-2 px-3 text-xl font-medium border-b border-gray-700">
                    <span>My Conversations</span>
                    <div className="tooltip tooltip-left" data-tip="Create new Group">
                        <button className="text-gray-400 hover:text-gray-200">
                            <PencilSquareIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <div className="p-3 flex-1 overflow-y-auto">
                    <TextInput
                        onKeyUp={onSearch}
                        placeholder="Filter users and groups"
                        className="w-full bg-gray-700 text-white placeholder-gray-400"
                    />
                    <div className="mt-2">
                        {sortedConversations.map((conversation) => (
                            <ConversationItem
                                key={`${conversation.is_group ? "group_" : "user_"}${conversation.id}`}
                                conversation={conversation}
                                online={!!isUserOnline(conversation.id)}
                                selectedConversation={selectedConversation}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {/* Messages Area */}
            <div
                className={`flex flex-col flex-1 bg-gray-900 text-white ${
                    selectedConversation ? 'flex' : 'hidden sm:flex'
                }`}
            >
                {/* Messages Content */}
                <div ref={containerRef} className="flex-1 overflow-y-auto">
                    {/* Debugging: Check children */}
                    <div>{children}</div>
                </div>
            </div>
        </div>
    );
};

export default ChatLayout;
