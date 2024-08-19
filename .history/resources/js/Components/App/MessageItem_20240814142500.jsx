import { usePage } from "@inertiajs/react";
import ReactMarkdown from "react-markdown";
import React from "react";
import UserAvatar from "./UserAvatar";
import { formatMessageDatelong } from "@/helpers";
import MessageAttachments from "./MessageAttachments";

const MessageItem = ({ message , attachmentClick}) => {
    const { id: currentUserId } = usePage().props.auth.user;

    return (
        <div className={`chat ${message.sender_id === currentUserId ? "chat-end" : "chat-start"}`}>
            <UserAvatar user={message.sender} />
            <div className="chat-header">
                {message.sender_id !== currentUserId ? message.sender.name : ""}
                <time className="text-xs opacity-50 ml-2">
                    {formatMessageDatelong(message.created_at)}
                </time>
            </div>
            <div 
                className={`chat-bubble ${message.sender_id === currentUserId ? "chat-bubble-info" : ""}`}
            >
                <div className="chat-message">
                    <div className="chat-message-content">
                        <ReactMarkdown>{message.message}</ReactMarkdown>
                    </div>
                    <div>
                        <MessageAttachments
                            attachments={message.attachments}
                            attachmentClick={attachmentClick}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageItem;