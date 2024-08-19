import { Fragment, useEffect, useMemo, useState } from "react";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { PaperClipIcon, XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { isAudio, isImage, isPDF, isPreviewable, isVideo } from "@/helpers";

export default function AttachmentPreviewModal({
    attachments,
    index,
    show = false,
    onClose = () => {},
}) {
    const [currentIndex, setCurrentIndex] = useState(index);

    const attachment = useMemo(() => {
        return attachments[currentIndex];
    }, [attachments, currentIndex]);

    const previewableAttachments = useMemo(() => {
        return attachments.filter((attachment) => isPreviewable(attachment));
    }, [attachments]);

    const close = () => {
        onClose();
    };

    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const next = () => {
        if (currentIndex < previewableAttachments.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    useEffect(() => {
        setCurrentIndex(index);
    }, [index]);

    return (
        <Transition show={show} as={Fragment} leave="duration-200">
            <Dialog
                as="div"
                id="modal"
                className="relative z-50"
                onClose={close}
            >
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="h-screen w-screen">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <DialogPanel
                                className="flex flex-col w-full h-full transform 
                                overflow-hidden bg-slate-800 text-left align-middle
                                shadow-xl transition-all "
                            >
                                <button 
                                    onClick={close}
                                    className="absolute right-3 top-3 w-10 h-10 rounded-full hover:bg-black/10 
                                    transition flex items-center justify-center text-gray-100 z-40"
                                >
                                    <XMarkIcon className="w-6 h-6"/>
                                </button>
                                <div className="relative group h-full">
                                    {currentIndex > 0 && (
                                        <div
                                            onClick={prev}
                                            className="absolute opacity-100 text-gray-100 cursor-pointer flex items-center
         