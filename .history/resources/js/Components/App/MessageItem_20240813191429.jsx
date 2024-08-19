const MessageItem = ({ message }) => {
    const { id: currentUserId } = usePage().props.auth.user;

    return (
        <div className={`chat ${message.sender_id === currentUserId ? "chat-end" : "chat-start"}`}>
            <UserAvatar user={message.sender} />
            <div className="chat-header">
                {message.sender_id !== currentUserId && message.sender.name}
                <time className="text-xs opacity-50 ml-2">
                    {formatMessageDatelong(message.created_at)}
                </time>
            </div>
            <div 
                className={`chat-bubble ${message.sender_id === currentUserId ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
            >
                <ReactMarkdown>{message.message}</ReactMarkdown>
            </div>
        </div>
    );
};
