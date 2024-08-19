import { useState, useRef, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { CameraIcon } from "@heroicons/react/24/solid";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {useEventBus} from "@/EventBus.jsx";

const CustomMediaRecorder = ({ fileReady }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [timer, setTimer] = useState(0);
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const chunks = useRef([]);
    const captureCanvasRef = useRef(null);
    const [recordedVideoUrl, setRecordedVideoUrl] = useState(null);
    const {emit} = useEventBus();

    useEffect(() => {
        if (isOpen) {
            startPreview();
        } else {
            stopPreview();
        }
    }, [isOpen]);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setIsRecording(false);
        setTimer(0);
        setRecordedVideoUrl(null);  // Change here
        if (mediaRecorder) mediaRecorder.stop();
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
        }
    };

    const startPreview = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });
            streamRef.current = stream;
            videoRef.current.srcObject = stream;
        } catch (error) {
            emit('toast.show','Error accessing camera: '+ error, 'danger');
        }
    };

    const stopPreview = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
        }
    };

    const handleCapture = () => {
        const canvas = captureCanvasRef.current;
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
            const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
            const url = URL.createObjectURL(file);
            fileReady(file, url);
            closeModal();
        }, 'image/jpeg');
    };

    const handleRecord = () => {
        if (isRecording) {
            mediaRecorder.stop();
            setIsRecording(false);
        } else {
            startRecording();
        }
    };

    const startRecording = () => {
        setIsRecording(true);
        const stream = streamRef.current;
        try {
            const newMediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
            chunks.current = [];
            newMediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunks.current.push(e.data);
                }
            };
            // newMediaRecorder.onstop = () => {
            //
            // };
            newMediaRecorder.start();
            setMediaRecorder(newMediaRecorder);

            // Start timer
            const startTime = Date.now();
            const timerInterval = setInterval(() => {
                const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
                setTimer(elapsedTime);
            }, 1000);

            // Clear interval on stop
            newMediaRecorder.onstop = () => {
                const blob = new Blob(chunks.current, { type: 'video/webm' });
                const file = new File([blob], 'video.webm', { type: 'video/webm' });
                const url = URL.createObjectURL(file);
                setRecordedVideoUrl(url);  // Change here
                fileReady(file, url);
                closeModal();
                clearInterval(timerInterval);
            };
        } catch (error) {
            console.error('Error initializing MediaRecorder:', error);
            setIsRecording(false);
        }
    };

    return (
        <>
            <button onClick={openModal} className="p-1 text-gray-400 hover:text-gray-200">
                <CameraIcon className="w-6" />
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center flex items-center justify-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
                        </Transition.Child>

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full">
                                <div className="p-4">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 dark:text-gray-200 text-gray-900"
                                    >
                                        {isRecording ? 'Recording Video' : 'Camera Preview'}
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <video
                                            ref={videoRef}
                                            autoPlay
                                            className="w-full h-64 bg-black rounded-lg"
                                        ></video>
                                        {!isRecording && (
                                            <canvas
                                                ref={captureCanvasRef}
                                                className="hidden"
                                            ></canvas>
                                        )}
                                    </div>
                                    <div className="mt-6 flex justify-end">
                                        <SecondaryButton onClick={closeModal}>
                                            Cancel
                                        </SecondaryButton>
                                        {!isRecording && (

                                            <PrimaryButton className="ms-3" onClick={handleCapture}>
                                                Capture
                                            </PrimaryButton>
                                        )}

                                        <div className="mt-2 text-gray-500 text-sm">
                                            {isRecording ? `Recording... ${timer}s` : ''}
                                        </div>

                                        <PrimaryButton className="ms-3" onClick={handleRecord}>
                                            {isRecording ? 'Stop' : 'Record'}
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default CustomMediaRecorder;
