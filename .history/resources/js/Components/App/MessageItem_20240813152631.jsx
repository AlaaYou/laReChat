import { usePage } from "@inertiajs/react";
import ReactMarkdown from "react-markdown";
import React from "react";
import UserAvatar from "./UserAvatar";
import { formatMessageDatelong } from "@/helpers";

const MessageItem = ({ message }) => {
    const { id: currentUserId } = usePage().props.auth.user;

    return (
        <div className={`flex items-start ${message.sender_id === currentUserId ? "justify-end" : "justify-start"} mb-4`}>
            {message.sender_id !== currentUserId && <UserAvatar user={message.sender} />}
            <div className={`max-w-xs p-3 rounded-lg ${message.sender_id === currentUserId ? "bg-blue-500 text-white" : "bg-gray-200 text-black"} shadow-md`}>
                <div className={`font-semibold ${message.sender_id === currentUserId ? "text-white" : "text-black"}`}>
                    {message.sender_id !== currentUserId ? message.sender.name : ""}
                </div>
                <div className="text-xs text-gray-500">
                    {formatMessageDatelong(message.created_at)}
                </div>
                <div className="mt-1">
                    <ReactMarkdown>{message.message}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
};

export default MessageItem;