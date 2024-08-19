export default function ApplicationLogo(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 300 100"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
        >
            <text x="10" y="40" fontSize="30" fontWeight="bold" fill="#007BFF">
                Web
            </text>
            <text x="90" y="40" fontSize="30" fontWeight="bold" fill="#28A745">
                Vue
            </text>
            <text x="170" y="40" fontSize="30" fontWeight="bold" fill="#FF5733">
                Chat
            </text>
            <rect x="10" y="50" width="280" height="40" rx="10" ry="10" fill="#f0f0f0" />
            <text x="20" y="80" fontSize="20" fontWeight="bold" fill="#343A40">
                Simplify your conversations
            </text>
        </svg>
    );
}
