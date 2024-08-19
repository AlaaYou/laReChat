import { useEffect, useState } from "react";
import { PaperAirplaneIcon, FaceSmileIcon, HandThumbUpIcon, PaperClipIcon, PhotoIcon, XCircleIcon, CameraIcon } from "@heroicons/react/24/solid/index.js";
import NewMessageInput from "@/Components/App/NewMessageInput.jsx";
import EmojiPicker from "emoji-picker-react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { isAudio, isImage } from "@/helpers.jsx";
import AttachmentPreview from "@/Components/App/AttachmentPreview.jsx";
import CustomAudioPlayer from "@/Components/App/CustomAudioPlayer.jsx";
import AudioRecorder from "@/Components/App/AudioRecorder.jsx";
import { useEventBus } from "@/EventBus.jsx";
import CustomMediaRecorder from "@/Components/App/CustomMediaRecorder.jsx";

const MessageInput = ({ conversation = null }) => {
    const [newMessage, setNewMessage] = useState("");
    const [inputErrorMessage, setInputErrorMessage] = useState("");
    const [messageSending, setMessageSending] = useState(false);
    const [chosenFiles, setChosenFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const { emit } = useEventBus(); // Assuming you use event bus for notifications

    const onFileChange = (ev) => {
        const files = ev.target.files;
        const updatedFiles = [...files].map((file) => ({
            file: file,
            url: URL.createObjectURL(file),
        }));
        ev.target.value = null;
        setChosenFiles((prevFiles) => [...prevFiles, ...updatedFiles]);
    };

    const onSendClick = () => {
        if (messageSending) return;
        if (newMessage.trim() === "" && chosenFiles.length === 0) {
            setInputErrorMessage("Please provide a message or upload attachments");
            setTimeout(() => {
                setInputErrorMessage("");
            }, 3000);
            return;
        }

        const formData = new FormData();
        chosenFiles.forEach((file) => {
            formData.append("attachments[]", file.file);
        });
        formData.append('message', newMessage);
        if (conversation.is_user) {
            formData.append("receiver_id", conversation.id);
        } else if (conversation.is_group) {
            formData.append("group_id", conversation.id);
        }
        setMessageSending(true);
        axios.post(route("message.store"), formData, {
            onUploadProgress: (progressEvent) => {
                const progress = Math.round(
                    (progressEvent.loaded / progressEvent.total) * 100
                );
                setUploadProgress(progress);
            }
        }).then((response) => {
            setNewMessage("");
            setMessageSending(false);
            setUploadProgress(0);
            setChosenFiles([]);
            // Emit a toast notification for new message
            emit('toast.show', 'Message sent successfully!', 'success');
        }).catch((error) => {
            console.log(error);
            setMessageSending(false);
            setChosenFiles([]);
            const message = error?.response?.data?.message;
            setInputErrorMessage(message || "An error occurred while sending message");
            // Emit a toast notification for error
            emit('toast.show', 'Failed to send message.', 'error');
        });
    };

    const onLikeClick = () => {
        if (messageSending) return;
        const data = { message: "👍" };
        if (conversation.is_user) {
            data["receiver_id"] = conversation.id;
        } else if (conversation.is_group) {
            data["group_id"] = conversation.id;
        }
        axios.post(route("message.store"), data);
    };

    const recordedAudioReady = (file, url) => {
        setChosenFiles((prevFiles) => [...prevFiles, { file, url }]);
    };

    const recordedMediaReady = (file, url) => {
        setChosenFiles((prevFiles) => [...prevFiles, { file, url }]);
    };

    return (
        <div className="flex flex-wrap items-start border-t border-slate-700 py-3">
            {/* ...rest of your code */}
        </div>
    );
};

export default MessageInput;
