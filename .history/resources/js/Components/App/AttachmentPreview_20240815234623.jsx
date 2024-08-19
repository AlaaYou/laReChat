import React from 'react';
import {DocumentIcon, PaperClipIcon} from "@heroicons/react/24/solid/index.js";
import {formatBytes, isPDF, canPreview} from "@/helpers.jsx";

const AttachmentPreview = ({file}) => {
    return (
        <div className="w-full flex items-center gap-2 py-2 px-3 rounded-md bg-slate-800">
            <div>
                {isPDF(file.file) && (
                    <div className="flex justify-center items-center w-10 h-10 bg-gray-700 rounded">
                        {/*<PaperClipIcon className="w-6"/>*/}
                        <DocumentIcon className="w-6"/>
                        {/*<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"*/}
                        {/*     className="size-6">*/}
                        {/*    <path*/}
                        {/*        d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625Z"/>*/}
                        {/*    <path*/}
                        {/*        d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z"/>*/}
                        {/*</svg>*/}

                    </div>
                )}
                {!canPreview(file.file) && (
                    <div className="flex justify-center items-center w-10 h-10 bg-gray-700 rounded">
                        <PaperClipIcon className="w-6"/>
                    </div>
                )}
            </div>
            <div className="flex-1 text-gray-400 text-nowrap text-ellipsis overflow-hidden">
                <h3>{file.file.name}</h3>
                <p className="text-xs">{formatBytes(file.file.size)}</p>
            </div>
        </div>
    );
}

export default AttachmentPreview;
