import React from "react";
import { PaperClipIcon } from "@heroicons/react/24/solid";
import { formatBytes, isPDF, isPreviewable } from "@/helpers";

const AttachmentPreview = ({ file }) => {
    if (!file || !file.file) {
        return <div className="text-red-500">No file data available</div>;
    }

    const { name, size } = file.file;
    const isFilePreviewable = isPreviewable(file.file);
    const isFilePDF = isPDF(file.file);

    return (
        <div className="w-full flex items-center gap-2 py-2 px-3 rounded-md bg-slate-800">
            <div>
                {isFilePDF && <img src="/img/pdf.png" alt="PDF Icon" className="w-8"/>}
                {!isFilePreviewable && (
                    <div className="flex justify-center items-center w-10 h-10 bg-gray-700 rounded">
                        <PaperClipIcon className="w-6"/>
                    </div>
                )}
            </div>
            <div className="flex-1 text-gray-400 text-nowrap text-ellipsis overflow-hidden">
                <h3 className="text-sm font-medium">{name}</h3>
                <p className="text-xs">{formatBytes(size)}</p>
            </div>
        </div>
    );
};

export default AttachmentPreview;
