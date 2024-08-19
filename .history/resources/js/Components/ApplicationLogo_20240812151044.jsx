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
            {/* Chat Bubble */}
            <rect
                x="30"
                y="30"
                width="256"
                height="200"
                rx="20"
                ry="20"
                fill="#ffffff"
                stroke="#1e40af"
                strokeWidth="12"
            />
            <path
                d="M130 230 L90 270 L90 230 Z"
                fill="#1e40af"
            />

            {/* Letter W */}
            <path
                d="M80 140 L110 180 L140 140 L170 180 L200 140"
                stroke="#1e40af"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Letter V */}
            <path
                d="M160 140 L190 180 L220 140"
                stroke="#1e40af"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}