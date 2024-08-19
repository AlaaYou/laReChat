import { router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import TextInput from "@/Components/TextInput.jsx";
import { PencilSquareIcon } from "@heroicons/react/16/solid/index.js";
import ConversationItem from "@/Components/App/ConversationItem.jsx";
import { useEventBus } from "@/EventBus.jsx";
import GroupModal from "@/Components/App/GroupModal.jsx";

const ChatLayout = ({ children }) => {
    const page = usePage();
    const conversations = page.props.conversations;
    const selectedConversation = page.props.selectedConversation;
    const [localConversations, setLocalConversations] = useState([]);
    const [sortedConversations, setSortedConversations] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState({});
    const [showGroupModal, setShowGroupModal] = useState(false);
    const { on, emit } = useEventBus();
    const isUserOnline = (userId) => onlineUsers[userId];

    const onSearch = (ev) => {
        const search = ev.target.value.toLowerCase();
        setLocalConversations(conversations.filter((conversation) =>
            conversation.name.toLowerCase().includes(search)
        ));
    };

    const messageCreated = (message) => {
        setLocalConversations((oldUsers) => oldUsers.map((u) => {
            if (
                message.receiver_id &&
                !u.is_group &&
                (u.id == message.sender_id || u.id == message.receiver_id)
            ) {
                u.last_message = message.message;
                u.last_message_date = message.created_at;
                return u;
            }
            if (
                message.group_id &&
                u.is_group &&
                u.id == message.group_id
            ) {
                u.last_message = message.message;
                u.last_message_date = message.created_at;
                return u;
            }
            return u;
        }));
        // Show notification for received messages
        if (Notification.permission === "granted") {
            new Notification("New message", {
                body: message.message,
            });
        }
    };

    const messageDeleted = ({ prevMessage }) => {
        if (!prevMessage) return;
        messageCreated(prevMessage);
    };

    const showNotification = (message) => {
        if (Notification.permission === "granted") {
            new Notification("New message", {
                body: message,
            });
        }
    };

    useEffect(() => {
        if (Notification.permission === "default") {
            Notification.requestPermission();
        }
        Echo.channel(`user.${page.props.auth.user.id}`)
            .listen('NewMessageNotification', (event) => {
                showNotification(event.message.message);
            });

        const offCreated = on('message.created', messageCreated);
        const offDeleted = on('message.deleted', messageDeleted);
        const offModalShow = on('GroupModal.show', (group) => {
            setShowGroupModal(true);
        });

        const offGroupDelete = on("group.deleted", ({ id, name }) => {
            setLocalConversations((oldConversations) =>
                oldConversations.filter((con) => con.id != id)
            );
            emit('toast.show', `Group ${name} was deleted successfully.`);
            if (!selectedConversation || (selectedConversation.is_group && selectedConversation.id == id)) {
                router.visit(route('dashboard'));
            }
        });

        return () => {
            offCreated();
            offDeleted();
            offModalShow();
            offGroupDelete();
        };
    }, [on]);

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
        Echo.join('online')
            .here((users) => {
                const onlineUsersObj = Object.fromEntries(
                    users.map((user) => [user.id, user])
                );
                setOnlineUsers((previousOnlineUsers) => ({
                    ...previousOnlineUsers,
                    ...onlineUsersObj,
                }));
            })
            .joining((user) =>
                setOnlineUsers((previousUsers) => {
                    const newUsers = { ...previousUsers, [user.id]: user };
                    return newUsers;
                })
            )
            .leaving((user) =>
                setOnlineUsers((previousUsers) => {
                    const { [user.id]: removedUser, ...rest } = previousUsers;
                    return rest;
                })
            );
    }, []);

    return (
        <div className="flex h-full">
            <aside className="w-80 border-r border-gray-300">
                <div className="p-4">
                    <TextInput
                        placeholder="Search conversations..."
                        onChange={onSearch}
                        className="w-full mb-4"
                    />
                    {sortedConversations.map((conversation) => (
                        <ConversationItem
                            key={conversation.id}
                            conversation={conversation}
                            isOnline={isUserOnline(conversation.id)}
                        />
                    ))}
                </div>
            </aside>
            <div className="flex-1">
                {children}
            </div>
            {showGroupModal && (
                <GroupModal onClose={() => setShowGroupModal(false)} />
            )}
        </div>
    );
};

export default ChatLayout;
