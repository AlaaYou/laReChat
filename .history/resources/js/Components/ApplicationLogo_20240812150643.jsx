export default function ApplicationLogo(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
        >
            <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="4" fill="none" />
            <path
                d="M35 35 H65 A15 15 0 0 1 50 65 V75 L35 65 Z"
                fill="currentColor"
            />
            <circle cx="35" cy="35" r="5" fill="currentColor" />
            <circle cx="65" cy="35" r="5" fill="currentColor" />
        </svg>
    );
}
