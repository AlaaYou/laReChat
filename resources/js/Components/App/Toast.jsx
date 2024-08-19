import { useEffect, useState } from "react";
import { useEventBus } from "@/EventBus.jsx";
import { v4 as uuidv4 } from "uuid";

export default function Toast() {
    const [toasts, setToasts] = useState([]);
    const { on } = useEventBus();

    useEffect(() => {
        const showHandler = (message, className = 'success') => {
            const uuid = uuidv4();
            setToasts((oldToasts) => [...oldToasts, { message, className, uuid }]);

            setTimeout(() => {
                setToasts((oldToasts) => oldToasts.filter(toast => toast.uuid !== uuid));
            }, 5000);
        };

        on('toast.show', showHandler);

        // Cleanup function
        return () => {
            // Optionally, implement an 'off' method in your EventBus to remove the listener
        };
    }, [on]);

    return (
        <div className="toast min-w-[280px] w-full xs:w-auto">
            {
                toasts.map((toast) => (
                    <div key={toast.uuid} className={`alert alert-${toast.className} py-3 px-4 rounded-md text-gray-100`}>
                        <span>{toast.message}</span>
                    </div>
                ))
            }
        </div>
    );
}
