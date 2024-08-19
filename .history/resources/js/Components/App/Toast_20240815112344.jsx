import { useEventBus } from "@/EventBus";
import { useState } from "react";

export default function Toast({}){
    const [toasts,setToasts]= useState(null);
    const {on}= useEventBus();
    return (
        <div className="toast">
            <div className="alert alert-success">
                <span>New message arrived.</span>
            </div>
        </div>
    );
}