import { useEventBus } from "@/EventBus";
import { useState } from "react";

export default function Toast({}){
    const [toasts,setToasts]= useState(null);
    const {on}= useEventBus();
    return (
        <div className="toast">
            <div className="alert alert-success py-3 px-4 text-gray-100 rounded-md ">
                <span>New message arrived.</span>
            </div>
        </div>
    );
}