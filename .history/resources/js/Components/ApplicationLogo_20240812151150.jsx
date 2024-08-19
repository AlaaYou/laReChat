export default function ApplicationLogo(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 400 400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {/* Outer Circle */}
            <circle
                cx="200"
                cy="200"
                r="180"
                stroke="#1e40af"
                strokeWidth="16"
            />

            {/* Chat Bubble */}
            <rect
                x="100"
                y="100"
                width="200"
                height="150"
                rx="20"
                ry="20"
                fill="#ffffff"
                stroke="#1e40af"
                strokeWidth="12"
            />
            <path
                d="M190 250 L140 300 L140 250 Z"
                fill="#1e40af"
            />

            {/* Letter W */}
            <path
                d="M130 160 L170 220 L210 160 L250 220 L290 160"
                stroke="#1e40af"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Letter V */}
            <path
                d="M220 160 L260 220 L300 160"
                stroke="#1e40af"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}