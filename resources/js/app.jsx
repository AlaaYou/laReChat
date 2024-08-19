import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { EventBusProvider } from "@/EventBus.jsx";
import { useEffect } from 'react';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

function AppWithNotifications({ el, App, props }) {
    useEffect(() => {
        if ('Notification' in window) {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    console.log('Notification permission granted.');
                } else {
                    console.log('Notification permission denied.');
                }
            });
        }
    }, []);

    function showNotification(message) {
        if (Notification.permission === 'granted') {
            new Notification('New Notification', {
                body: message,
            });
        }
    }

    // Example function to simulate receiving a new message
    function simulateNewMessage() {
        // Call this function when you receive a new message
        showNotification('Welcome Aboard');
    }

    // Simulate receiving a new message after 5 seconds
    useEffect(() => {
        const timer = setTimeout(simulateNewMessage, 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <EventBusProvider>
            <App {...props} />
        </EventBusProvider>
    );
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<AppWithNotifications {...{ el, App, props }} />);
    },
    progress: {
        color: '#4B5563',
    },
});