import { useEventBus } from "@/EventBus";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Toast({}){
    const [toasts,setToasts]= useState(null);
    const {on}= useEventBus();

    useEffect(()=>{
        on('toast.show',(message)=>{
            const uuid=uuidv4();
            setToasts((oldToasts)=>[...oldToasts, {message,uuid}]);

            setTimeout(()=>{
                setToasts((oldToasts)=> oldToasts.filter((toasts)=> toasts.uuid !== uuid ));
            },6000)
        });
    },[on])

    return (
        <div className="toast">
            {toasts.map((toast,index)=>(
                <div key={toast.uuid} className="alert alert-success py-3 px-4 text-gray-100 rounded-md min-W-[280PX] ">
                <span>{toast.message}</span>
            </div>
            ))}
        </div>
    );
}