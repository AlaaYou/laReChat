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
        setLocalConversations(conversations.filter((conversation) => {
            return conversation.name.toLowerCase().includes(search);
        }));
    };

    const messageCreated = (message) => {
        setLocalConversations((oldUsers) => {
            return oldUsers.map((u) => {
                if (
                    message.receiver_id &&
                    !u.is_group &&
                    (u.id == message.sender_id || u.id == message.receiver_id)
                ) {
                    u.last_message = message.message;
                    u.last_message_date = message.created_at;
                    return u;
                }

                // for a group
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
            });
        });

        
        if (Notification.permission === "granted") {
            new Notification("New message", {
                body: message.message,
            });
        }
    };

    const messageDeleted = ({ prevMessage }) => {
        if (!prevMessage) {
            return;
        }
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
            setLocalConversations((oldConversations) => {
                return oldConversations.filter((con) => con.id != id);
            });

            emit('toast.show', `Group ${name} was deleted successfully.`);

            if (!selectedConversation
                || (selectedConversation.is_group && selectedConversation.id == id)) {
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
                    return b.last_message_date.localeCompare(
                        a.last_message_date
                    );
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
                    users.map((user) => [user.id, user]));

                setOnlineUsers((previousOnlineUsers) => {
                    return { ...previousOnlineUsers, ...onlineUsersObj };
                });
            })
            .joining((user) =>
                setOnlineUsers((previousUsers) => {
                    const updatedUsers = { ...previousUsers };
                    updatedUsers[user.id] = user;
                    return updatedUsers;
                })
            )
            .leaving((user) =>
                setOnlineUsers((previousUsers) => {
                    const updatedUsers = { ...previousUsers };
                    delete updatedUsers[user.id];
                    return updatedUsers;
                })
            )
            .error((error) => console.log('error', error));

        return () => {
            Echo.leave('online');
        };
    }, []);

    return (
        <>
            <div className="flex-1 w-full flex overflow-hidden">
                <div className={`transition-all w-full sm:w-[220px] md:w-[300px] bg-slate-800
                flex-col flex overflow-hidden ${selectedConversation ? '-ml-[100%] sm:ml-0' : ''}`}>
                    <div className="flex items-center justify-between text-gray-200 py-2 px-3 text-xl font-medium">
                        My Conversations
                        <div className="tooltip tooltip-left" data-tip={'Create New Group'}>
                            <button
                                onClick={(ev) => setShowGroupModal(true)}
                                className="text-gray-400 hover:text-gray-200"
                            >
                                <PencilSquareIcon className="w-4 h-4 inline-block ml-2" />
                            </button>
                        </div>
                    </div>
                    <div className="p-3">
                        <TextInput
                            onKeyUp={onSearch}
                            placeholder="Filter Users"
                            className="w-full">

                        </TextInput>
                    </div>
                    <div className="flex-1 overflow-auto">
                        {sortedConversations && sortedConversations.map((conversation) => (
                            <ConversationItem
                                key={`${conversation.is_group ? "group_" : "user_"}${conversation.id}`}
                                conversation={conversation}
                                online={!!isUserOnline(conversation.id)}
                                selectedConversation={selectedConversation}>
                            </ConversationItem>
                        ))}
                    </div>
                </div>
                <div className="flex-1 flex flex-col overflow-hidden">
                    {children}
                </div>
            </div>
            <GroupModal
                show={showGroupModal}
                onClose={() => setShowGroupModal(false)}
            />
        </>
    );
};

export default ChatLayout;
