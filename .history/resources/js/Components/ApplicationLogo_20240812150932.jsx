export default function ApplicationLogo(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 316 316"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {/* Outer Chat Bubble */}
            <path
                d="M50 50 H266 A20 20 0 0 1 286 70 V226 A20 20 0 0 1 266 246 H90 L50 286 V70 A20 20 0 0 1 50 50 Z"
            />

            {/* Letter W */}
            <path
                d="M100 110 L120 190 L140 130 L160 190 L180 110"
            />

            {/* Letter V */}
            <path
                d="M200 110 L230 190 L260 110"
            />
        </svg>
    );
}
