import { useEffect } from "react";
import { useEventBus } from "@/EventBus.jsx";

export default function PushNotification() {
    const { on } = useEventBus();

    useEffect(() => {
        const showHandler = (message) => {
            if (Notification.permission === "granted") {
                new Notification("New Notification", {
                    body: message,
                });
            }
        };

        // Request notification permission if not granted
        if (Notification.permission === "default") {
            Notification.requestPermission();
        }

        // Listen for the push notification event
        on('pushNotification.show', showHandler);

        // Cleanup function
        return () => {
            // Optionally, implement an 'off' method in your EventBus to remove the listener
        };
    }, [on]);

    return null; // This component does not need to render anything
}
