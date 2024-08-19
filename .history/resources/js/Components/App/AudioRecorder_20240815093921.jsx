import { MicrophoneIcon, StopCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const AudioRecorder = ()=>{
    const [recording,setRecording] = useState(false);
    return (
        <button className="p-1 text-gray-400 hover:text-gray-200">
            {recording && <StopCircleIcon className="w-6 text-red-600"/> }
            {!recording && <MicrophoneIcon className="w-6"/>}
        </button>
    )
}
export default AudioRecorder;