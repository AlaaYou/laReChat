
import React, { useRef } from "react";

export const EventBusContext = React.createContext();

import React, { useRef } from "react";

export const EventBusProvider = ({ children }) => {
    const eventsRef = useRef({});

    const emit = (name, data) => {
        const events = eventsRef.current;
        if (events[name]) {
            for (let cb of events[name]) {
                cb(data);
            }
        }
    };

    const on = (name, cb) => {
        const events = eventsRef.current;
        if (!events[name]) {
            events[name] = [];
        }
        events[name].push(cb);

        return () => {
            events[name] = events[name].filter((callback) => callback !== cb);
        };
    };

    return (
        <EventBusContext.Provider value={{ emit, on }}>
            {children}
        </EventBusContext.Provider>
    );
};

export const useEventBus = () => {
  return React.useContext(EventBusContext)
}