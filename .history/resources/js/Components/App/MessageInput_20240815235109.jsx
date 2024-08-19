import {useState} from "react";
import {
    PaperAirplaneIcon,
    FaceSmileIcon,
    HandThumbUpIcon,
    PaperClipIcon,
    PhotoIcon,
    XCircleIcon,
    CameraIcon
} from "@heroicons/react/24/solid/index.js";
import NewMessageInput from "@/Components/App/NewMessageInput.jsx";
import EmojiPicker from "emoji-picker-react";
import {Popover} from "@headlessui/react";
import {isAudio, isImage} from "@/helpers.jsx";
import AttachmentPreview from "@/Components/App/AttachmentPreview.jsx";
import CustomAudioPlayer from "@/Components/App/CustomAudioPlayer.jsx";
import AudioRecorder from "@/Components/App/AudioRecorder.jsx";
import {useEventBus} from "@/EventBus.jsx";;
import CustomMediaRecorder from "@/Components/App/CustomMediaRecorder.jsx";

const MessageInput = ({conversation = null}) => {
    const [newMessage, setNewMessage] = useState("");
    const [inputErrorMessage, setInputErrorMessage] = useState("");
    const [messageSending, setMessageSending] = useState(false);
    const [chosenFiles, setChosenFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    // const {emit} = useEventBus();

    const onFileChange = (ev) =>{
        const files = ev.target.files;

        const updatedFiles = [...files].map((file) => {
            return {
                file : file,
                url : URL.createObjectURL(file),
            };
        })
        ev.target.value = null;

        setChosenFiles((prevFiles) => {
            return [...prevFiles, ...updatedFiles];
        });
    }

    const onSendClick = () => {
        // emit('toast.show', 'Message sent successfully')
        if(messageSending){
            return;
        }

        if(newMessage.trim() === "" && chosenFiles.length === 0){
            setInputErrorMessage("Please provide a message or upload attachments");
            setTimeout(()=> {
                setInputErrorMessage("")
            },3000)
            return;
        }

        const formData = new FormData();
        chosenFiles.forEach((file) => {
            formData.append("attachments[]", file.file)
        })
        formData.append('message', newMessage)
        if(conversation.is_user){
            formData.append("receiver_id", conversation.id)
        } else if(conversation.is_group) {
            formData.append("group_id", conversation.id)
        }
        setMessageSending(true)
        axios.post(route("message.store"), formData, {
            onUploadProgress : (progressEvent) => {
                const progress = Math.round(
                    (progressEvent.loaded / progressEvent.total) * 100
                );
                setUploadProgress(progress)
            }
        }).then((response) => {
            setNewMessage("")
            setMessageSending(false)
            setUploadProgress(0)
            setChosenFiles([]);
        }).catch((error) => {
            console.log(error)
            setMessageSending(false)
            setChosenFiles([])
            const message = error?.response?.data?.message
            setInputErrorMessage(message || "An error occurred while sending message")
        })
    }

    const onLikeClick = () => {
        if (messageSending){
            return;
        }
        const data = {
            message : "👍",
        }
        if(conversation.is_user){
            data["receiver_id"]= conversation.id
        } else if(conversation.is_group) {
            data["group_id"] = conversation.id
        }

        axios.post(route("message.store"), data)
    }

    const recordedAudioReady = (file, url) => {
      setChosenFiles((prevFiles) => [...prevFiles ,{ file, url }])
    }
    const recordedMediaReady = (file, url) => {
      setChosenFiles((prevFiles) => [...prevFiles ,{ file, url }])
    }


return (
    <div className="flex flex-wrap items-start border-t border-slate-700 py-3">
        <div className="order-2 flex-1 xs:flex-none xs:order-1 py-2">
            <button className={"p-1 text-gray-400 hover:text-gray-300 relative"}>
                <PaperClipIcon className={"w-6"}/>
                <input
                    type="file"
                    onChange={onFileChange}
                    multiple
                    className={"absolute left-0 top-0 right-0 bottom-0 z-20 opacity-0 cursor-pointer"}
                />
            </button>

            <button className={"p-1 text-gray-400 hover:text-gray-300 relative"}>
                <PhotoIcon className={"w-6"}/>
                <input
                    type="file"
                    onChange={onFileChange}
                    multiple
                    accept="image/*"
                    className={"absolute left-0 top-0 right-0 bottom-0 z-20 opacity-0 cursor-pointer"}
                />
            </button>
            <CustomMediaRecorder fileReady={recordedMediaReady} />
            <AudioRecorder fileReady={recordedAudioReady}/>
        </div>

        <div className="order-1 px-3 xs:p-0 min-w-[220px] basis-full xs:basis-0
         xs:order-2 flex-1 relative">
            <div className="flex">
                <NewMessageInput
                    value={newMessage}
                    onSend={onSendClick}
                    onChange={(ev) => setNewMessage(ev.target.value)}
                />
                <button
                    onClick={onSendClick}
                    disabled={messageSending}
                    className="btn btn-info rounded-l-none">
                    {/*{messageSending && (*/}
                    {/*    <span className="loading loading-spinner loading-xs"></span>*/}
                    {/*)}*/}
                    <PaperAirplaneIcon className="w-6"/>
                    <span className="hidden sm:inline">Send</span>
                </button>
            </div>
            {!!uploadProgress && (
                <progress className="progress progress-info w-full"
                    value={uploadProgress}
                    max="100"
                ></progress>
            )}

            {inputErrorMessage && (
                <p className="text-xs text-red-400">{inputErrorMessage}</p>
            )}

            <div className="flex flex-wrap gap-1 mt-2">
                {chosenFiles.map((file) => (

                    <div
                        key={file.file.name}
                        className={`relative flex justify-between cursor-pointer`
                            + (!isImage(file.file) ? " w-[240px" : "")
                    }>
                        {isImage(file.file)  && (
                            <img
                                src={file.url}
                                className="w-16 h-16 object-cover"/>
                        )}

                        {isAudio(file.file) && (
                            <CustomAudioPlayer
                                file={file}
                                showVolume={false}/>
                        )}

                        {!isImage(file.file) && !isAudio(file.file) && (
                            <AttachmentPreview file ={file} />
                        )}

                        <button onClick={() => {
                            setChosenFiles(
                                chosenFiles.filter(
                                    (f)=> {
                                        f.file.name !== file.file.name
                                })
                            )
                        }}
                        className="absolute w-6 h-6 rounded-full bg-gray-800 -right-2 -top-2
                        text-gray-300 hover:text-gray-100 z-10">
                            <XCircleIcon className="w-6" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
        <div className="order-3 xs:order-3 p-2 flex">
            <Popover className="relative">
                <Popover.Button className="p-1 text-gray-400 hover:text-gray-300">
                    <FaceSmileIcon className="h-6 w-6"/>
                </Popover.Button>
                <Popover.Panel className="absolute z-10 right-0 bottom-full">
                    <EmojiPicker theme="dark" onEmojiClick={(ev) => {
                       setNewMessage(newMessage + ev.emoji)
                    }}></EmojiPicker>
                </Popover.Panel>
            </Popover>
            <button onClick={onLikeClick} className="p-1 text-gray-400 hover:text-gray-300">
                <HandThumbUpIcon className="h-6 w-6"/>
            </button>
        </div>
    </div>
);
}

export default MessageInput;
