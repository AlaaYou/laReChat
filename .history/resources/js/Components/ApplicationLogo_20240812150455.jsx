export default function ApplicationLogo(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {/* Outer Circle */}
            <circle cx="32" cy="32" r="30" stroke="#42b883" fill="#42b883" />

            {/* Chat Bubble */}
            <path
                d="M20 24h24v16H20z"
                fill="#ffffff"
                stroke="#35495e"
            />
            <path
                d="M16 24v16l8-8"
                fill="none"
                stroke="#35495e"
            />

            {/* Web Symbol */}
            <circle cx="32" cy="32" r="6" fill="#35495e" />
            <path
                d="M26 32a6 6 0 0112 0"
                fill="none"
                stroke="#35495e"
            />

            {/* "Web Vue" Symbol */}
            <path
                d="M20 48L32 36l12 12"
                fill="none"
                stroke="#35495e"
            />
            <path
                d="M24 52L32 44l8 8"
                fill="none"
                stroke="#35495e"
            />
        </svg>
    );
}