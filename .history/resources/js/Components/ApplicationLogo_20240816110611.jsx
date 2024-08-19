export default function ApplicationLogo(props) {
    return (
        <svg {...props} viewBox="0 0 1000 900" xmlns="http://www.w3.org/2000/svg">
            <path d="M500 50a450 450 0 1 0 450 450 450 450 0 0 0 -450-450Zm0 600a350 350 0 1 1 350-350 350 350 0 0 1 -350 350Z" fill="#333" />
            <circle cx="350" cy="350" r="75" fill="#fff" />
            <circle cx="650" cy="350" r="75" fill="#fff" />
            <circle cx="350" cy="650" r="75" fill="#fff" />
            <circle cx="650" cy="650" r="75" fill="#fff" />
            <rect x="400" y="400" width="200" height="100" rx="10" fill="#fff" />
            <path d="M500 450l0 50" stroke="#333" strokeWidth="20" strokeLinecap="round" />
            <path d="M450 500l50 0" stroke="#333" strokeWidth="20" strokeLinecap="round" />
        </svg>
    );
}