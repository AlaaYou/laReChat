import ConversationItem from "@/Components/App/ConversationItem";
import TextInput from "@/Components/TextInput";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

const ChatLayout = ({ children }) => {
    const page = usePage();
    const conversations = page.props.conversations;
    const selectedConversation = page.props.selectedConversation;
    const [localConversations, setLocalConversations] = useState([]);
    const [sortedConversations, setSortedConversations] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState({});

    const isUserOnline = (userId) => onlineUsers[userId];

    const onSearch = (ev) => {
        const search = ev.target.value.toLowerCase();
        setLocalConversations(
            conversations.filter((conversation) =>
                conversation.name.toLowerCase().includes(search)
            )
        );
    };

    useEffect(() => {
        setSortedConversations(
            localConversations.sort((a, b) => {
                if (a.blocked_at && b.blocked_at) {
                    return a.blocked_at > b.blocked_at ? 1 : -1;
                } else if (a.blocked_at) {
                    return 1;
                } else if (b.blocked_at) {
                    return -1;
                }
                if (a.last_message_date && b.last_message_date) {
                    return b.last_message_date.localeCompare(a.last_message_date);
                } else if (a.last_message_date) {
                    return -1;
                } else if (b.last_message_date) {
                    return 1;
                } else {
                    return 0;
                }
            })
        );
    }, [localConversations]);

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
                console.error("error", error);
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
                    <div className="flex-1 mt-2 overflow-y-auto">
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
                className={`flex-1 bg-gray-900 text-white overflow-auto ${
                    selectedConversation ? 'flex' : 'hidden sm:flex'
                }`}
            >
                {children}
            </div>
        </div>
    );
};

export default ChatLayout;
